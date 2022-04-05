import React, { Component } from "react";
import { connect } from "react-redux";
import ReactMapboxGl from "react-mapbox-gl";
import * as turf from "@turf/turf";
import MapboxDraw from "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.js";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import Markers from "./Markers";
import MapLayers from "./MapLayers";
import DrawingLayers from "./DrawingLayers";
import ZoomWarning from "./ZoomWarning";
import Nav from "./Nav";
import GeoCoder from "./Geocoder";
import Modals from "./Modals";
import constants from "../constants";
import mapSources from "../data/mapSources";
import MapCommunityAssets from "./MapCommunityAssets";
import MapCouncilLayers from "./MapCouncilLayers";
import MapProperties from "./MapProperties";

const StaticMode = require("@mapbox/mapbox-gl-draw-static-mode");

// Create Map Component with settings
const Map = ReactMapboxGl({
  accessToken:
    constants.MAPBOX_TOKEN,
  scrollZoom: true,
  dragRotate: false,
  minzoom: 6,
  maxzoom: 11,
  keyboard: false,
  touchZoomRotate: false,
  doubleClickZoom: true,
});



class MapboxMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...mapSources,
      loaded: false,
      styleLoaded: false,
      drawings: null,
      redrawing: false,
    };
    // ref to the mapbox map
    this.map = null;
    // ref to the drawing tools
    this.drawControl = null;
    this.modes = MapboxDraw.modes;
    // this adds the static plugin to the drawing tools
    this.modes.static = StaticMode;
  }

  componentDidUpdate(prevProps) {
    // when the map tiles change, rerender all polygons (as they are a different colour)
    if (prevProps.baseLayer !== this.props.baseLayer) {
      this.redrawPolygons();
    }
  }

  onClick = (map, evt) => {
    let mode = this.drawControl.draw.getMode();
    if (mode === "simple_select") {
      let features = this.drawControl.draw.getFeatureIdsAt(evt.point);
      /* If there are no features where clicked, deselect tools */
      if (features.length === 0) {
        this.drawControl.draw.changeMode("static");
        // this.props.dispatch({ type: "DESELECT_TOOLS" });  // couldn't tell you why this was there
        this.redrawPolygons();
      }
    }
    // Close all menus (my account, wordpress links, layers, key)
    this.props.dispatch({ type: "CLOSE_MENUS" });
    // If active tool is drop-pin, create and place the marker
    if (this.props.activeTool === "drop-pin") {
      this.props.dispatch({
        type: "SET_MARKER",
        payload: [evt.lngLat.lng, evt.lngLat.lat],
      });
    } else {
      // if polygon or marker is selected, deselect them
      if (this.props.activePolygon) {
        this.props.dispatch({ type: "CLEAR_ACTIVE_POLYGON" });
      } else if (this.props.currentMarker) {
        this.props.dispatch({ type: "CLEAR_CURRENT_MARKER" });
      }
    }
  };

  onZoomEnd = () => {
    // Keeps map zoom in sync
    if (this.state.styleLoaded) {
      let zoom = this.map.getZoom();
      this.props.dispatch({
        type: "SET_ZOOM",
        payload: [zoom],
      });
    }
  };

  onDragEnd = () => {
    // Keeps map position in sync
    if (this.state.styleLoaded) {
      let lngLat = this.map.getCenter();
      this.props.dispatch({ type: "SET_LNG_LAT", payload: lngLat });
    }
  };

  isMenuOpen = () => {
    let { main, key, profile, layers } = this.props.menu;
    if (main || key || profile || layers) {
      return true;
    }
  };

  onDrawCreate = (e) => {
    /*
            This takes the feature created in drawing and creates a copy of it
            and stores it in the redux store, so that it can be rendered as a react GeoJSON component
        */
    if (!this.props.loadingDrawings) {
      // features are the shapes themselves (the geometry is the 'points/nodes' of the shapes)
      let feature = e.features[0];
      let featureCopy = {
        type: feature.type,
        geometry: feature.geometry,
        properties: {
          // This is is created by the javascript drawing tools, we store it to keep them in sync
          id: feature.id,
        },
        id: feature.id,
      };
      let type = feature.geometry.type;
      // Use turf to convert the polygon to a line (so we can get the length of it (perimeter)
      let line =
        type === "Polygon"
          ? turf.polygonToLine(featureCopy.geometry)
          : featureCopy;
      let name =
        type === "Polygon"
          ? `Polygon ${this.props.polygonCount}`
          : `Line ${this.props.lineCount}`;
      // Create polygon object with length, area and centre point worked out by turf
      let polygon = {
        data: featureCopy,
        name: name,
        id: feature.id,
        center: turf.pointOnFeature(featureCopy).geometry.coordinates,
        type: type,
        length: turf.length(line, { units: "kilometers" }),
        area: type === "Polygon" ? turf.area(featureCopy) : 0,
      };
      this.props.dispatch({
        type: "ADD_POLYGON",
        payload: polygon,
      });
      // change drawing mode back to static and deselct all tools
      setTimeout(() => {
        this.drawControl.draw.changeMode("static");
        this.props.dispatch({ type: "DESELECT_TOOLS" });
      }, 100);
      this.setState({ drawings: this.drawControl.draw.getAll() });
    }
  };

  onDrawUpdate = (e) => {
    /*
          This takes all the drawing features and creates a copies of them
          and stores them the redux store, so that they can be rendered as react GeoJSON components
      */
    let { features } = e;
    features.map((feature) => {
      let featureCopy = {
        type: feature.type,
        geometry: feature.geometry,
        properties: {
          id: feature.id,
        },
        id: feature.id,
      };
      let type = feature.geometry.type;
      let line =
        type === "Polygon"
          ? turf.polygonToLine(featureCopy.geometry)
          : featureCopy;
      this.props.dispatch({
        type: "UPDATE_POLYGON",
        payload: {
          id: feature.id,
          data: featureCopy,
          center: turf.pointOnFeature(featureCopy).geometry.coordinates,
          length: turf.length(line, { units: "kilometers" }),
          area: turf.area(featureCopy),
        },
      });
      this.props.dispatch({
        type: "CLEAR_ACTIVE_POLYGON",
      });
    });
  };

  onDrawSelectionChange = (e) => {
    let mode = this.drawControl.draw.getMode();
    if (mode === "simple_select") {
      if (e.features.length) {
        let id = e.features[0].id;
        // We pass the featureId of the feature we want to be automatically selected when
        // the mode changes
        this.drawControl.draw.changeMode("direct_select", {
          featureId: id,
        });
      }
    }
  };

  redrawPolygons = () => {
    /*
           This is used when a map is loaded (redraws all the polygons on the map)
        */
    this.setState({ redrawing: true });
    if (this.props.polygons) {
      this.props.polygons.map((polygon) => {
        this.drawControl.draw.add({
          ...polygon.data,
          id: polygon.id,
        });
      });
      this.drawControl.draw.changeMode("static");
      this.props.dispatch({ type: "LOADED_DRAWINGS" });
    }
    setTimeout(() => {
      this.setState({ redrawing: false });
    }, 300);
  };

  renderMapName = (name, navOpen) => {
    if (name !== "New Map") {
      return (
        <div className="map-name" style={{ left: navOpen ? "86px" : "14px" }}>
          {name}
        </div>
      );
    }
  };

  render() {
    const {
      zoom,
      lngLat,
      baseLayer,
      activeLayers,
      name,
      navOpen,
      movingMethod,
      user: { type },
    } = this.props;
    const baseLayers = [
      baseLayer === "aerial"
        ? this.state.satelliteLayer
        : this.state.topographyLayer,
    ];
    const style = {
      version: 8,
      sources: this.state.sources,
      // these are the base tile sets, aerial or streets
      layers: baseLayers,
    };
    const council = type == "council";

    return (
      <div>
        {/* This is the ReactMapbox instance we created at the top of the file */}
        <Map
          style={style}
          detectRetina={true}
          containerStyle={{
            height: "100vh",
            width: "100vw",
            position: "fixed",
            background:
              baseLayer === "aerial"
                ? "#091324"
                : constants.USE_OS_TILES
                  ? "#aadeef"
                  : "#72b6e6",
          }}
          zoom={zoom}
          onZoomEnd={this.onZoomEnd}
          onDragEnd={this.onDragEnd}
          center={lngLat}
          onStyleLoad={(map) => {
            this.map = map;
            this.setState({ styleLoaded: true });
          }}
          onClick={this.onClick}
          //maxBounds={constants.MAP_BOUNDS}
          // this is how the map moves automatically from one location to another (default is jumpTo, but we disable this temporarily when we load a new map)
          movingMethod={movingMethod}
        >
          {/* Map Layers (greenbelt etc.)*/}
          <MapLayers />
          {council &&  /* Map Council Layers (wards etc.)*/
            <MapCouncilLayers zoom={zoom} />
          }
          {council && /*For displaying community assets*/
            <MapCommunityAssets zoom={zoom} center={lngLat} map={this.map} />
          }
          {/*For displaying the property boundaries*/}
          {constants.LR_POLYGONS_ENABLED &&
            <MapProperties center={lngLat} map={this.map} />
          }
          {/* Geocoder - For location search */}
          <GeoCoder bbox={[-11.535645, 49.109838, 3.493652, 63.144431]} />
          {/* Markers */}
          {this.state.styleLoaded && <Markers map={this.map} />}
            /* Map name in lower left corner */
          {this.renderMapName(name, navOpen)}
            /* Shows zoom warning if active layers are out of view */
          <ZoomWarning
            show={
              (zoom < 9 && activeLayers.length > 0) ||
              (zoom < constants.PROPERTY_BOUNDARIES_ZOOM_LEVEL && this.props.propertiesDisplay && constants.LR_POLYGONS_ENABLED)
            }
          />
            /* Drawing tools */
          <DrawControl
            addControl={this.map}
            ref={(drawControl) => {
              // this reference is passed to the Nav and Modals to give them access to the methods
              this.drawControl = drawControl;
            }}
            position="bottom-right"
            onDrawCreate={this.onDrawCreate}
            modes={this.modes}
            defaultMode="simple_select"
            onDrawModeChange={(e) => console.log("draw mode changed", e)}
            onDrawUpdate={this.onDrawUpdate}
            onDrawSelectionChange={this.onDrawSelectionChange}
            onDrawActionable={(e) => console.log("draw actionable", e)}
            onDrawDelete={this.onDrawDelete}
          />
          {
            /* Render the drawing layers if they are not currently being redrawn */
            /* This is the GEOJSON Layers, the react components with click events, that we use to display the popups*/
            !this.state.redrawing && <DrawingLayers />
          }
        </Map>
        <Nav drawControl={this.drawControl} user={this.props.user} />
        <Modals
          drawControl={this.drawControl}
          redrawPolygons={this.redrawPolygons}
        />
        <div className="os-accreditation">
          Contains OS data © Crown copyright and database rights 2022 OS
          0100059691
        </div>
        {/* If menus are open, this invisible layer covers the whole app, when clicked, closes menus */}
        {/*<div
            className="map-click-layer"
            style={{
              display: this.isMenuOpen() ? "block" : "none",
            }}
            onClick={() => {
              this.props.dispatch({ type: "CLOSE_MENUS" });
            }}>
          </div>*/}
      </div>
    );
  }
}

MapboxMap.propTypes = {};

const mapStateToProps = ({
  map,
  mapBaseLayer,
  mapLayers,
  navigation,
  markers,
  drawings,
  menu,
  user,
  landOwnership,
}) => ({
  zoom: map.zoom,
  lngLat: map.lngLat,
  searchMarker: map.searchMarker,
  markers: markers.markers,
  currentMarker: markers.currentMarker,
  markerCount: markers.id,
  baseLayer: mapBaseLayer.layer,
  activeLayers: mapLayers.activeLayers,
  activeTool: navigation.activeTool,
  activePolygon: drawings.activePolygon,
  polygons: drawings.polygons,
  polygonCount: drawings.polygonCount,
  lineCount: drawings.lineCount,
  lines: drawings.lines,
  loadingDrawings: drawings.loadingDrawings,
  name: map.name,
  navOpen: navigation.open,
  movingMethod: map.movingMethod,
  menu: menu,
  user,
  propertiesDisplay: landOwnership.displayActive,
});

export default connect(mapStateToProps)(MapboxMap);
