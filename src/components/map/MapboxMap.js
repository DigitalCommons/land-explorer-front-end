import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ReactMapboxGl from "react-mapbox-gl";
import { v4 as uuidv4 } from "uuid";
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
import { autoSave, setLngLat, setZoom } from "../../actions/MapActions";

// Create Map Component with settings
const Map = ReactMapboxGl({
  accessToken: constants.MAPBOX_TOKEN,
  scrollZoom: true,
  dragRotate: false,
  minzoom: 6,
  maxzoom: 11,
  keyboard: false,
  touchZoomRotate: true,
  doubleClickZoom: true,
});

const MapboxMap = ({ user }) => {
  const dispatch = useDispatch();
  const drawControlRef = useRef();
  const mapRef = useRef();
  const { zoom, lngLat, movingMethod } = useSelector((state) => state.map);
  const { currentMarker } = useSelector((state) => state.markers);
  const baseLayer = useSelector((state) => state.mapBaseLayer.layer);
  const { landDataLayers } = useSelector((state) => state.mapLayers);
  const { activeTool } = useSelector((state) => state.leftPane);
  const { activePolygon, polygons, polygonsDrawn, linesDrawn } = useSelector(
    (state) => state.drawings
  );
  const propertiesDisplay = useSelector(
    (state) => state.landOwnership.displayActive
  );
  const [styleLoaded, setStyleLoaded] = useState(false);
  const [drawings, setDrawings] = useState();
  const [redrawing, setRedrawing] = useState(false);
  const [dataGroupPopupVisible, setDataGroupPopupVisible] = useState(-1);
  const { sources, satelliteLayer, topographyLayer } = mapSources;
  const [onClickListener, setOnClickListener] = useState([]);

  const [map, setMap] = useState(null);

  const modes = MapboxDraw.modes;
  modes.static = StaticMode;

  const onClick = (evt) => {
    setDataGroupPopupVisible(-1);
    console.log("yello", activeTool);

    const drawControl = drawControlRef.current;

    const mode = drawControl.draw.getMode();
    console.log(mode, activePolygon);

    if (mode === "simple_select") {
      const features = drawControl.draw.getFeatureIdsAt(evt.point);
      /* If there are no features where clicked, deselect tools */
      if (features.length === 0) {
        drawControl.draw.changeMode("static");
        // this.props.dispatch({ type: "DESELECT_TOOLS" });  // couldn't tell you why this was there
        redrawPolygons(polygons);
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
          uuid: uuidv4(),
        },
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

  //mapbox event listener is bad, doesn't like hooks
  useEffect(() => {
    if (map) {
      if (onClickListener[0]) map.off("mousedown", onClickListener[0]);
      map.on("mousedown", onClick);

      setOnClickListener([onClick]);
    }
  }, [activeTool, activePolygon, currentMarker]);

  const onDrawCreate = (e) => {
    /*
            This takes the feature created in drawing and creates a copy of it
            and stores it in the redux store, so that it can be rendered as a react GeoJSON component
        */

    const drawControl = drawControlRef.current;

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
  };

  const onDrawUpdate = (e) => {
    /*
          This takes all the drawing features and creates a copies of them
          and stores them the redux store, so that they can be rendered as react GeoJSON components
      */
    const { features } = e;
    features.map((feature) => {
      console.log("happening", feature.type);
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

  const redrawPolygons = (polygons) => {
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
    baseLayer === "aerial" ? satelliteLayer : topographyLayer,
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
        onZoomEnd={(map) => dispatch(setZoom([map.getZoom()]))}
        onDragEnd={(map) =>
          dispatch(setLngLat(map.getCenter().lng, map.getCenter().lat))
        }
        center={lngLat}
        onStyleLoad={(m, evt) => {
          setMap(m);
          setStyleLoaded(true);
        }}
        // onClick={(map, evt) => console.log("hello")}
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
        {styleLoaded && (
          <Markers
            map={map}
            popupVisible={dataGroupPopupVisible}
            setPopupVisible={(markerId) => {
              if (currentMarker) {
                dispatch({ type: "CLEAR_CURRENT_MARKER" });
              }
              setDataGroupPopupVisible(markerId);
            }}
          />
        )}
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
              This information is subject to Crown copyright and database rights
              2022 and is reproduced with the permission of HM Land Registry.
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
};

export default MapboxMap;
