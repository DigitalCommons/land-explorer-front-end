import React, { Component, useState, useRef, useEffect } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import ReactMapboxGl from "react-mapbox-gl";
import { v4 as uuidv4 } from 'uuid';
import * as turf from "@turf/turf";
import MapboxDraw from "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.js";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import StaticMode from "@mapbox/mapbox-gl-draw-static-mode";
import Markers from "./Markers";
import MapLayers from "./MapLayers";
import DrawingLayers from "./DrawingLayers";
import ZoomWarning from "./ZoomWarning";
import LeftPane from "../left-pane/LeftPane";
import Modals from "../modals/Modals";
import constants from "../../constants";
import mapSources from "../../data/mapSources";
import MapProperties from "./MapProperties";
import MapDataGroups from "./MapDataGroups";
import { autoSave, setLngLat, setZoom } from '../../actions/MapActions';

// Create Map Component with settings
const Map = ReactMapboxGl({
  accessToken: constants.MAPBOX_TOKEN,
  scrollZoom: true,
  dragRotate: false,
  minzoom: 6,
  maxzoom: 11,
  keyboard: false,
  touchZoomRotate: false,
  doubleClickZoom: true,
});

const MapboxMap = ({ }) => {
  const dispatch = useDispatch();
  const drawControlRef = useRef();
  const mapRef = useRef();
  const { zoom, lngLat, movingMethod } = useSelector(state => state.map);
  const { markers, currentMarker } = useSelector(state => state.markers);
  const baseLayer = useSelector(state => state.mapBaseLayer.layer);
  const { landDataLayers } = useSelector(state => state.mapLayers);
  const { activeTool } = useSelector(state => state.leftPane);
  const { activePolygon, polygons, lines, loadingDrawings, polygonsDrawn, linesDrawn } = useSelector(state => state.drawings);
  const { menu, user } = useSelector(state => state);
  const propertiesDisplay = useSelector(state => state.landOwnership.displayActive);

  const [loaded, setLoaded] = useState(false);
  const [styleLoaded, setStyleLoaded] = useState(false);
  const [drawings, setDrawings] = useState();
  const [redrawing, setRedrawing] = useState(false);
  const [dataGroupPopupVisible, setDataGroupPopupVisible] = useState(-1);
  const { sources, satelliteLayer, topographyLayer } = mapSources;

  const [map, setMap] = useState(null);

  const modes = MapboxDraw.modes;
  modes.static = StaticMode;

  useEffect(() => {

    const onClick = (evt) => {
      setDataGroupPopupVisible(-1);
      console.log("yello", activeTool)

      const drawControl = drawControlRef.current;

      const mode = drawControl.draw.getMode();
      console.log(mode, activePolygon);

      if (mode === "simple_select") {
        const features = drawControl.draw.getFeatureIdsAt(evt.point);
        /* If there are no features where clicked, deselect tools */
        if (features.length === 0) {
          drawControl.draw.changeMode("static");
          // this.props.dispatch({ type: "DESELECT_TOOLS" });  // couldn't tell you why this was there
          redrawPolygons();
        }
      }
      // Close all menus (my account, wordpress links, layers, key)
      dispatch({ type: "CLOSE_MENUS" });
      // If active tool is drop-pin, create and place the marker
      if (activeTool === "drop-pin") {
        dispatch({
          type: "SET_MARKER",
          payload: {
            coordinates: [evt.lngLat.lng, evt.lngLat.lat],
            uuid: uuidv4()
          }
        });
        dispatch(autoSave());
      } else {
        // if polygon or marker is selected, deselect them
        if (activePolygon) {
          dispatch({ type: "CLEAR_ACTIVE_POLYGON" });
        } else if (currentMarker) {
          dispatch({ type: "CLEAR_CURRENT_MARKER" });
        }
      }
    };

    if (map) {
      console.log(map)
      map.on('mousedown', onClick);
    }
    //mapRef.current.addEventListener('onclick', updatedOnClick);

  }, [activeTool, activePolygon, currentMarker])

  const onZoomEnd = () => {
    // Keeps map zoom in sync
    if (styleLoaded) {
      const zoom = map.getZoom();
      dispatch(setZoom([zoom]));
    }
  };

  const onDragEnd = () => {
    // Keeps map position in sync
    if (styleLoaded) {
      const { lng, lat } = map.getCenter();
      dispatch(setLngLat(lng, lat));
    }
  };

  console.log(activeTool);


  const onDrawCreate = (e) => {
    /*
            This takes the feature created in drawing and creates a copy of it
            and stores it in the redux store, so that it can be rendered as a react GeoJSON component
        */
    const drawControl = drawControlRef.current;

    if (redrawing) {
      // features are the shapes themselves (the geometry is the 'points/nodes' of the shapes)
      const feature = e.features[0];
      const featureCopy = {
        id: feature.id,
        type: feature.type,
        geometry: feature.geometry,
        properties: {},
      };
      const type = feature.geometry.type;
      // Use turf to convert the polygon to a line so we can get the length of it (perimeter)
      const line =
        type === "Polygon"
          ? turf.polygonToLine(featureCopy.geometry)
          : featureCopy;
      const name =
        type === "Polygon"
          ? `Polygon ${polygonsDrawn + 1}`
          : `Line ${linesDrawn + 1}`;
      // Create polygon object with length, area and centre point worked out by turf
      const polygon = {
        data: featureCopy,
        name: name,
        center: turf.pointOnFeature(featureCopy).geometry.coordinates,
        type: type,
        length: turf.length(line, { units: "kilometers" }),
        area: type === "Polygon" ? turf.area(featureCopy) : 0,
        uuid: feature.id,
      };
      dispatch({
        type: "ADD_POLYGON",
        payload: polygon,
      });
      dispatch(autoSave());
      // change drawing mode back to static and deselct all tools
      setTimeout(() => {
        drawControl.draw.changeMode("static");
        // this.props.dispatch({ type: "DESELECT_TOOLS" });
      }, 100);
      setDrawings(drawControl.draw.getAll());
    }
  };

  const onDrawUpdate = (e) => {
    /*
          This takes all the drawing features and creates a copies of them
          and stores them the redux store, so that they can be rendered as react GeoJSON components
      */
    const { features } = e;
    features.map((feature) => {
      console.log("happening", feature.type)
      const featureCopy = {
        id: feature.id,
        type: feature.type,
        geometry: feature.geometry,
        properties: {},
      };

      const type = feature.geometry.type;
      const line =
        type === "Polygon"
          ? turf.polygonToLine(featureCopy.geometry)
          : featureCopy;
      dispatch({
        type: "UPDATE_POLYGON",
        payload: {
          data: featureCopy,
          center: turf.pointOnFeature(featureCopy).geometry.coordinates,
          length: turf.length(line, { units: "kilometers" }),
          area: turf.area(featureCopy),
          uuid: feature.id,
        },
      });
      dispatch({
        type: "CLEAR_ACTIVE_POLYGON",
      });
      dispatch(autoSave());
    });
  };

  const onDrawSelectionChange = (e) => {
    const drawControl = drawControlRef.current;
    const mode = drawControl.draw.getMode();
    if (mode === "simple_select") {
      if (e.features.length) {
        const { id } = e.features[0];
        // We pass the featureId of the feature we want to be automatically selected when
        // the mode changes
        drawControl.draw.changeMode("direct_select", {
          featureId: id,
        });
      }
    }
  };

  const redrawPolygons = () => {
    const drawControl = drawControlRef.current;
    setRedrawing(true);
    drawControl.draw.deleteAll();
    if (polygons) {
      polygons.map((polygon) => {
        drawControl.draw.add({
          ...polygon.data,
          id: polygon.uuid,
        });
      });
      drawControl.draw.changeMode("static");
    }
    dispatch({ type: "LOADED_DRAWINGS" });
    setTimeout(() => {
      setRedrawing(false);
    }, 300);
  };

  const baseLayers = [
    baseLayer === "aerial"
      ? satelliteLayer
      : topographyLayer,
  ];
  const style = {
    version: 8,
    sources: sources,
    // these are the base tile sets, aerial or streets
    layers: baseLayers,
  };

  return (
    <div>
      {/* This is the ReactMapbox instance we created at the top of the file */}
      <Map
        ref={mapRef}
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
        onZoomEnd={onZoomEnd}
        onDragEnd={onDragEnd}
        center={lngLat}
        onStyleLoad={(m, evt) => {
          setMap(m);
          setStyleLoaded(true);
        }}
        onClick={(map, evt) => console.log("hello")}
        maxBounds={constants.MAP_BOUNDS}
        // this is how the map moves automatically from one location to another (default is jumpTo, but we disable this temporarily when we load a new map)
        movingMethod={movingMethod}
      >
        {/* Map Layers (greenbelt etc.)*/}
        <MapLayers />
        {/* Map Data Groups displaying My Data, except data group markers, which are in Markers to cluster together */}
        <MapDataGroups
          popupVisible={dataGroupPopupVisible}
          setPopupVisible={(markerId) => {
            if (currentMarker) {
              dispatch({ type: "CLEAR_CURRENT_MARKER" });
            }
            setDataGroupPopupVisible(markerId);
          }}
        />
        {/*For displaying the property boundaries*/}
        {constants.LR_POLYGONS_ENABLED && (
          <MapProperties center={lngLat} map={map} />
        )}
        {/* Markers, including markers from data groups */}
        {styleLoaded && <Markers
          map={map}
          popupVisible={dataGroupPopupVisible}
          setPopupVisible={(markerId) => {
            if (currentMarker) {
              dispatch({ type: "CLEAR_CURRENT_MARKER" });
            }
            setDataGroupPopupVisible(markerId);
          }} />}
        {/* Shows zoom warning if active layers are out of view */}
        <ZoomWarning
          show={
            (zoom < 9 && landDataLayers.length > 0) ||
            (zoom < constants.PROPERTY_BOUNDARIES_ZOOM_LEVEL &&
              propertiesDisplay &&
              constants.LR_POLYGONS_ENABLED)
          }
        />
        {/* Drawing tools */}
        <DrawControl
          addControl={map}
          ref={drawControlRef}
          position="bottom-right"
          onDrawCreate={onDrawCreate}
          modes={modes}
          defaultMode="simple_select"
          onDrawModeChange={(e) => console.log("draw mode changed", e)}
          onDrawUpdate={onDrawUpdate}
          onDrawSelectionChange={onDrawSelectionChange}
          onDrawActionable={(e) => console.log("draw actionable", e)}
        />
        {
          /* Render the drawing layers if they are not currently being redrawn */
          /* This is the GEOJSON Layers, the react components with click events, that we use to display the popups*/
          !redrawing && <DrawingLayers />
        }
      </Map>
      <LeftPane drawControl={drawControlRef.current} />
      <Modals />
      <div className="os-accreditation">
        Contains OS data © Crown copyright and database rights 2022 OS
        0100059691
        {propertiesDisplay &&
          zoom >= constants.PROPERTY_BOUNDARIES_ZOOM_LEVEL && (
            <>
              <br />
              This information is subject to Crown copyright and database
              rights 2022 and is reproduced with the permission of HM Land
              Registry.
              <br />
              The polygons (including the associated geometry, namely x, y
              co-ordinates) are subject to{" "}
              <a href="https://use-land-property-data.service.gov.uk/datasets/inspire#conditions">
                Crown copyright and database rights
              </a>{" "}
              2022 Ordnance Survey 100026316.
            </>
          )}
      </div>
    </div>
  );
}


class MapboxMap2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...mapSources,
      loaded: false,
      styleLoaded: false,
      drawings: null,
      redrawing: false,
      dataGroupPopupVisible: -1,
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
    if (prevProps.baseLayer !== this.props.baseLayer ||
      (!prevProps.loadingDrawings && this.props.loadingDrawings)) {
      // when the map tiles change, or new drawings are loading, rerender all polygons
      this.redrawPolygons();
    }
    if (this.props.currentMarker && this.state.dataGroupPopupVisible !== -1) {
      // hide data group drawing popup if a marker is active
      this.setState({ dataGroupPopupVisible: -1 });
    }
  }

  onClick = (map, evt) => {
    this.setState({ dataGroupPopupVisible: -1 });

    const mode = this.drawControl.draw.getMode();
    if (mode === "simple_select") {
      const features = this.drawControl.draw.getFeatureIdsAt(evt.point);
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
        payload: {
          coordinates: [evt.lngLat.lng, evt.lngLat.lat],
          uuid: uuidv4()
        }
      });
      this.props.dispatch(autoSave());
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
      this.props.dispatch(setZoom([zoom]));
    }
  };

  onDragEnd = () => {
    // Keeps map position in sync
    if (this.state.styleLoaded) {
      let { lng, lat } = this.map.getCenter();
      this.props.dispatch(setLngLat(lng, lat));
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
    if (!this.state.redrawing) {
      // features are the shapes themselves (the geometry is the 'points/nodes' of the shapes)
      let feature = e.features[0];
      let featureCopy = {
        id: feature.id,
        type: feature.type,
        geometry: feature.geometry,
        properties: {},
      };
      let type = feature.geometry.type;
      // Use turf to convert the polygon to a line so we can get the length of it (perimeter)
      let line =
        type === "Polygon"
          ? turf.polygonToLine(featureCopy.geometry)
          : featureCopy;
      let name =
        type === "Polygon"
          ? `Polygon ${this.props.polygonsDrawn + 1}`
          : `Line ${this.props.linesDrawn + 1}`;
      // Create polygon object with length, area and centre point worked out by turf
      let polygon = {
        data: featureCopy,
        name: name,
        center: turf.pointOnFeature(featureCopy).geometry.coordinates,
        type: type,
        length: turf.length(line, { units: "kilometers" }),
        area: type === "Polygon" ? turf.area(featureCopy) : 0,
        uuid: feature.id,
      };
      this.props.dispatch({
        type: "ADD_POLYGON",
        payload: polygon,
      });
      this.props.dispatch(autoSave());
      // change drawing mode back to static and deselct all tools
      setTimeout(() => {
        this.drawControl.draw.changeMode("static");
        // this.props.dispatch({ type: "DESELECT_TOOLS" });
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
        id: feature.id,
        type: feature.type,
        geometry: feature.geometry,
        properties: {},
      };
      let type = feature.geometry.type;
      let line =
        type === "Polygon"
          ? turf.polygonToLine(featureCopy.geometry)
          : featureCopy;
      this.props.dispatch({
        type: "UPDATE_POLYGON",
        payload: {
          data: featureCopy,
          center: turf.pointOnFeature(featureCopy).geometry.coordinates,
          length: turf.length(line, { units: "kilometers" }),
          area: turf.area(featureCopy),
          uuid: feature.id,
        },
      });
      this.props.dispatch({
        type: "CLEAR_ACTIVE_POLYGON",
      });
      this.props.dispatch(autoSave());
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
    this.setState({ redrawing: true });
    this.drawControl.draw.deleteAll();
    if (this.props.polygons) {
      this.props.polygons.map((polygon) => {
        this.drawControl.draw.add({
          ...polygon.data,
          id: polygon.uuid,
        });
      });
      this.drawControl.draw.changeMode("static");
    }
    this.props.dispatch({ type: "LOADED_DRAWINGS" });
    setTimeout(() => {
      this.setState({ redrawing: false });
    }, 300);
  };

  render() {
    const { dataGroupPopupVisible, styleLoaded } = this.state;
    const {
      zoom,
      lngLat,
      baseLayer,
      landDataLayers,
      propertiesDisplay,
      currentMarker,
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
          onStyleLoad={(map, evt) => {
            this.map = map;
            this.setState({ styleLoaded: true });
          }}
          onClick={this.onClick}
          maxBounds={constants.MAP_BOUNDS}
          // this is how the map moves automatically from one location to another (default is jumpTo, but we disable this temporarily when we load a new map)
          movingMethod={movingMethod}
        >
          {/* Map Layers (greenbelt etc.)*/}
          <MapLayers />
          {/* Map Data Groups displaying My Data, except data group markers, which are in Markers to cluster together */}
          <MapDataGroups
            popupVisible={dataGroupPopupVisible}
            setPopupVisible={(markerId) => {
              if (this.props.currentMarker) {
                this.props.dispatch({ type: "CLEAR_CURRENT_MARKER" });
              }
              this.setState({ dataGroupPopupVisible: markerId })
            }}
          />
          {/*For displaying the property boundaries*/}
          {constants.LR_POLYGONS_ENABLED && (
            <MapProperties center={lngLat} map={this.map} />
          )}
          {/* Markers, including markers from data groups */}
          {styleLoaded && <Markers
            map={this.map}
            popupVisible={dataGroupPopupVisible}
            setPopupVisible={(markerId) => {
              if (currentMarker) {
                this.props.dispatch({ type: "CLEAR_CURRENT_MARKER" });
              }
              this.setState({ dataGroupPopupVisible: markerId })
            }} />}
          {/* Shows zoom warning if active layers are out of view */}
          <ZoomWarning
            show={
              (zoom < 9 && landDataLayers.length > 0) ||
              (zoom < constants.PROPERTY_BOUNDARIES_ZOOM_LEVEL &&
                propertiesDisplay &&
                constants.LR_POLYGONS_ENABLED)
            }
          />
          {/* Drawing tools */}
          <DrawControl
            addControl={this.map}
            ref={(drawControl) => {
              // this reference is passed to the Left Pane and Modals to give them access to the methods
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
        <LeftPane drawControl={this.drawControl} />
        <Modals />
        <div className="os-accreditation">
          Contains OS data © Crown copyright and database rights 2022 OS
          0100059691
          {propertiesDisplay &&
            zoom >= constants.PROPERTY_BOUNDARIES_ZOOM_LEVEL && (
              <>
                <br />
                This information is subject to Crown copyright and database
                rights 2022 and is reproduced with the permission of HM Land
                Registry.
                <br />
                The polygons (including the associated geometry, namely x, y
                co-ordinates) are subject to{" "}
                <a href="https://use-land-property-data.service.gov.uk/datasets/inspire#conditions">
                  Crown copyright and database rights
                </a>{" "}
                2022 Ordnance Survey 100026316.
              </>
            )}
        </div>
      </div>
    );
  }
}

MapboxMap.propTypes = {};

const mapStateToProps = ({
  map,
  mapBaseLayer,
  mapLayers,
  leftPane,
  markers,
  drawings,
  menu,
  user,
  landOwnership,
}) => ({
  zoom: map.zoom,
  lngLat: map.lngLat,
  markers: markers.markers,
  currentMarker: markers.currentMarker,
  baseLayer: mapBaseLayer.layer,
  landDataLayers: mapLayers.landDataLayers,
  activeTool: leftPane.activeTool,
  activePolygon: drawings.activePolygon,
  polygons: drawings.polygons,
  polygonsDrawn: drawings.polygonsDrawn || 0,
  linesDrawn: drawings.linesDrawn || 0,
  lines: drawings.lines,
  loadingDrawings: drawings.loadingDrawings,
  movingMethod: map.movingMethod,
  menu: menu,
  user,
  propertiesDisplay: landOwnership.displayActive,
});


export default MapboxMap;
//export default connect(mapStateToProps)(MapboxMap2);
