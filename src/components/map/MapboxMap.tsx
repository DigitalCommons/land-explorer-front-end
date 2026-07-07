import React, { useState, useRef, useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/react-redux";
import { useDebounceCallback, useInterval } from "usehooks-ts";
import mapboxgl, { MapMouseEvent } from "mapbox-gl";
import ReactMapboxGl, { Popup as MapboxPopup } from "react-mapbox-gl";
// react-mapbox-gl's Popup d.ts omits children (React 18 types dropped implicit children)
const Popup = MapboxPopup as React.ComponentType<
  React.ComponentProps<typeof MapboxPopup> & { children?: React.ReactNode }
>;
import { v4 as uuidv4 } from "uuid";
import * as turf from "@turf/turf";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import StaticMode from "@mapbox/mapbox-gl-draw-static-mode";
import Markers from "./Markers";
import MapLandDataLayers from "./MapLandDataLayers";
import DrawingLayers from "./DrawingLayers";
import ZoomWarning from "./ZoomWarning";
import LeftPane from "../left-pane/LeftPane";
import Modals from "../modals/Modals";
import constants from "../../constants";
import mapSources from "../../data/mapSources";
import MapProperties from "./MapProperties";
import MapDataGroups from "./MapDataGroups";
import {
  autoSave,
  reloadCurrentMap,
  setLngLat,
  setZoom,
  setZooming,
} from "../../actions/MapActions";
import FeedbackTab from "../common/FeedbackTab";
import MapBeingEditedToast from "./MapBeingEditedToast";
import AdministrativeBoundaryTooltip, {
  ADMIN_BOUNDARY_FILL_LAYER_IDS,
  ADMIN_BOUNDARY_LAYER_GROUP_IDS,
  AdminBoundaryRow,
  getAdminBoundaryRows,
} from "./AdministrativeBoundaryTooltip";
import BaseLayerMenu from "../map-controls/BaseLayerMenu";
import MapLayerKey from "../map-controls/MapLayerKey";
import ConsentBanner from "./ConsentBanner";

// Set access token globally so all mapbox-gl instances share it
mapboxgl.accessToken = constants.MAPBOX_TOKEN ?? "";

// Create Map Component with settings
const Map = ReactMapboxGl({
  accessToken: constants.MAPBOX_TOKEN!!,
  scrollZoom: true,
  dragRotate: false,
  minZoom: 6,
  maxZoom: 20,
  keyboard: false,
  doubleClickZoom: true,
}) as React.ComponentType<any>;

const MapboxMap = () => {
  const dispatch = useAppDispatch();
  const drawControlRef = useRef<any>(null);
  const mapRef = useRef<any>(null);
  const { currentMapId, unsavedMapUuid, lockedByOtherUserInitials } =
    useAppSelector((state) => state.mapMeta);
  const { zoom, lngLat, movingMethod } = useAppSelector((state) => state.map);
  const { currentMarker } = useAppSelector((state) => state.markers);
  const baseLayer = useAppSelector((state) => state.mapBaseLayer.layer);
  const { landDataLayers } = useAppSelector((state) => state.landDataLayers);
  const { activeTool } = useAppSelector((state) => state.leftPane);
  const { activeDrawing, drawings, polygonsDrawn, linesDrawn } = useAppSelector(
    (state) => state.drawings,
  );
  const propertiesDisplay = useAppSelector(
    (state) => state.landOwnership.activeDisplay,
  );
  const { visibleProperties } = useAppSelector((state) => state.landOwnership);

  const showZoomWarning =
    (landDataLayers.length > 0 &&
      zoom[0] < constants.LAND_DATA_LAYER_ZOOM_LEVEL) ||
    !!(
      propertiesDisplay &&
      zoom[0] <
        constants.PROPERTY_BOUNDARIES_ZOOM_LEVELS[
          propertiesDisplay as keyof typeof constants.PROPERTY_BOUNDARIES_ZOOM_LEVELS
        ]
    );

  useInterval(
    () => {
      dispatch(reloadCurrentMap());
    },
    // Refresh map data every 30 seconds if the map is locked by another user who is editing it
    lockedByOtherUserInitials ? 30000 : null,
  );

  // Redraw polygons and lines when changing maps or clearing an unsaved map
  useEffect(() => {
    redrawPolygonsAndLines();
  }, [currentMapId, unsavedMapUuid]);

  const [styleLoaded, setStyleLoaded] = useState(false);
  const [redrawing, setRedrawing] = useState(false);
  const [dataGroupPopupVisible, setDataGroupPopupVisible] = useState(-1);
  const { sources, satelliteLayer, topographyLayer } = mapSources;
  const [onClickListener, setOnClickListener] = useState<any[]>([]);
  const [adminBoundaryPopup, setAdminBoundaryPopup] = useState<{
    lngLat: [number, number];
    rows: AdminBoundaryRow[];
  } | null>(null);

  const [map, setMap] = useState<mapboxgl.Map>();

  const modes = MapboxDraw.modes;
  modes.static = StaticMode;

  const onClick = (evt: MapMouseEvent) => {
    setDataGroupPopupVisible(-1);
    const drawControl = drawControlRef.current;
    const mode = drawControl.draw.getMode();

    if (mode === "simple_select") {
      const features = drawControl.draw.getFeatureIdsAt(evt.point);
      /* If there are no features where clicked, deselect Edit tool */
      if (features.length === 0) {
        drawControl.draw.changeMode("static");
        dispatch({ type: "DESELECT_TOOLS" });
        dispatch({ type: "CLOSE_TRAY" });
      } else {
        console.log("Clicked on features with simple_select:", features);
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
      // if polygon, line or marker is selected, deselect them
      if (activeDrawing) {
        dispatch({ type: "CLEAR_ACTIVE_DRAWING" });
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
  }, [activeTool, activeDrawing, currentMarker]);

  /**
   * This takes the feature created by mapbox-gl-draw and creates a copy of it and stores it in the
   * redux store, so that it can be rendered as a React GeoJSON component
   */
  const onDrawCreate = (e: any) => {
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
    // Use turf to extract the border of a polygon so we can get the length of it (perimeter)
    const border =
      type === "Polygon"
        ? turf.polygonToLine(featureCopy.geometry)
        : featureCopy;
    const name =
      type === "Polygon"
        ? `Polygon ${polygonsDrawn + 1}`
        : `Line ${linesDrawn + 1}`;
    // Create drawing object with length, area and centre point worked out by turf
    const drawing = {
      data: featureCopy,
      name: name,
      center: turf.pointOnFeature(featureCopy).geometry.coordinates,
      type: type,
      length: turf.length(border, { units: "kilometers" }),
      area: type === "Polygon" ? turf.area(featureCopy) : 0,
      uuid: feature.id,
    };
    dispatch({
      type: "ADD_DRAWING",
      payload: drawing,
    });
    dispatch(autoSave());
    // change drawing mode back to static
    setTimeout(() => {
      drawControl.draw.changeMode("static");
    }, 100);
  };

  /**
   * This takes the drawing feature(s) that were updated and creates a copies of them and stores
   * them in the Redux store, so that they can be rendered as React GeoJSON components
   */
  const onDrawUpdate = (e: any) => {
    const { features } = e;
    features.map((feature: any) => {
      const featureCopy = {
        id: feature.id,
        type: feature.type,
        geometry: feature.geometry,
        properties: {},
      };

      const type = feature.geometry.type;
      const border =
        type === "Polygon"
          ? turf.polygonToLine(featureCopy.geometry)
          : featureCopy;
      dispatch({
        type: "UPDATE_DRAWING",
        payload: {
          data: featureCopy,
          center: turf.pointOnFeature(featureCopy).geometry.coordinates,
          length: turf.length(border, { units: "kilometers" }),
          area: turf.area(featureCopy),
          uuid: feature.id,
        },
      });
      dispatch({
        type: "CLEAR_ACTIVE_DRAWING",
      });
      dispatch(autoSave());
    });
  };

  const onDrawSelectionChange = (e: any) => {
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

  const redrawPolygonsAndLines = () => {
    const drawControl = drawControlRef.current;
    if (!drawControl || redrawing) return; // skip if already redrawing or component hasn't rendered
    setRedrawing(true);

    console.log("Redrawing polygons and lines");

    drawControl.draw.deleteAll();
    if (drawings) {
      drawings.map((polygonOrLine: any) => {
        drawControl.draw.add({
          ...polygonOrLine.data,
          id: polygonOrLine.uuid,
        });
      });
      drawControl.draw.changeMode("static");
    }
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

  const mouseMove = useCallback(
    (e: MapMouseEvent) => {
      if (!map) return;
      const features = map.queryRenderedFeatures(e.point, {
        layers: ADMIN_BOUNDARY_FILL_LAYER_IDS,
      });

      if (!features?.length) {
        setAdminBoundaryPopup(null);
        return;
      }

      const rows = getAdminBoundaryRows(features, landDataLayers);
      if (rows.length === 0) {
        setAdminBoundaryPopup(null);
        return;
      }

      setAdminBoundaryPopup({ lngLat: [e.lngLat.lng, e.lngLat.lat], rows });
    },
    [map, landDataLayers],
  );

  const debouncedMouseMove = useDebounceCallback(mouseMove, 300);

  useEffect(() => {
    if (
      !map ||
      !landDataLayers.some((id) => ADMIN_BOUNDARY_LAYER_GROUP_IDS.includes(id))
    ) {
      setAdminBoundaryPopup(null);
      return;
    }
    map.on("mousemove", debouncedMouseMove);
    return () => {
      map.off("mousemove", debouncedMouseMove);
      debouncedMouseMove.cancel();
    };
  }, [map, landDataLayers, debouncedMouseMove]);

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
        onZoomStart={() => dispatch(setZooming(true))}
        onZoomEnd={(map: any) => {
          dispatch(setZoom([map.getZoom()]));
          dispatch(setZooming(false));
        }}
        onDragEnd={(map: any) =>
          dispatch(setLngLat(map.getCenter().lng, map.getCenter().lat))
        }
        center={lngLat}
        onStyleLoad={(m: any, _evt: any) => {
          setMap(m);
          setStyleLoaded(true);
          // Disable rotation and pitch with touch gestures
          m?.touchZoomRotate?.disableRotation();
          m?.touchPitch?.disable();
        }}
        maxBounds={constants.MAP_BOUNDS}
        // this is how the map moves automatically from one location to another (default is jumpTo, but we disable this temporarily when we load a new map)
        movingMethod={movingMethod}
      >
        {/* Map Layers (greenbelt etc.)*/}
        <MapLandDataLayers />
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
        <MapProperties center={lngLat} map={map} />
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
        {adminBoundaryPopup && (
          <Popup
            coordinates={adminBoundaryPopup.lngLat}
            offset={[0, -20]}
            className="admin-boundary-popup"
          >
            <AdministrativeBoundaryTooltip rows={adminBoundaryPopup.rows} />
          </Popup>
        )}
        {/* Shows zoom warning if active layers are out of view */}
        <ZoomWarning show={showZoomWarning} />
        {/* Drawing tools */}
        <DrawControl
          ref={(node: any) => {
            if (!drawControlRef.current) {
              console.log("Draw control ref set", node);
              drawControlRef.current = node;
              redrawPolygonsAndLines();
            }
          }}
          position="bottom-right"
          onDrawCreate={onDrawCreate}
          modes={modes}
          defaultMode="simple_select"
          onDrawModeChange={(e: any) => console.log("draw mode changed", e)}
          onDrawUpdate={onDrawUpdate}
          onDrawSelectionChange={onDrawSelectionChange}
        />
        {
          /* Render the drawing layers if they are not currently being redrawn */
          /* This is the GEOJSON Layers, the react components with click events, that we use to display the popups*/
          !redrawing && <DrawingLayers />
        }
      </Map>
      <LeftPane drawControl={drawControlRef.current} />
      <BaseLayerMenu />

      {/* Show the layer key if there's an active property layer, visible properties, or land data layers */}
      <div
        style={{
          display:
            propertiesDisplay ||
            Object.keys(visibleProperties).length > 0 ||
            landDataLayers.length > 0
              ? "block"
              : "none",
        }}
      >
        <MapLayerKey />
      </div>

      <FeedbackTab />
      <MapBeingEditedToast />
      <Modals />
      <ConsentBanner />
      <div className="os-accreditation">
        Contains OS data © Crown copyright and database rights 2022 OS
        0100059691
        {propertiesDisplay &&
          zoom[0] >=
            constants.PROPERTY_BOUNDARIES_ZOOM_LEVELS[
              propertiesDisplay as keyof typeof constants.PROPERTY_BOUNDARIES_ZOOM_LEVELS
            ] && (
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
