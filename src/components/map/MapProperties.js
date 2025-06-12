import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import constants from "../../constants";
import LoadingData from "./LoadingData";
import {
  fetchPropertiesInBox,
  highlightProperties,
  setActiveProperty,
} from "../../actions/LandOwnershipActions";
import { GeoJSONLayer } from "react-mapbox-gl";

const MapProperties = ({ center, map }) => {
  const {
    activeDisplay,
    visibleProperties,
    loadingProperties,
    highlightedProperties,
    activePropertyId,
  } = useSelector((state) => state.landOwnership);
  const activeProperty = highlightedProperties[activePropertyId] || null;
  const { zoom, zooming } = useSelector((state) => state.map);
  const activePanel = useSelector((state) => state.leftPane.active);

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      !zooming &&
      activeDisplay &&
      map &&
      zoom >= constants.PROPERTY_BOUNDARIES_ZOOM_LEVELS[activeDisplay]
    ) {
      const { _sw, _ne } = map.getBounds();
      dispatch(fetchPropertiesInBox(_sw.lng, _sw.lat, _ne.lng, _ne.lat));
    }
  }, [center, zooming, activeDisplay]);

  const onClickNewProperty = (property) => {
    if (!property.poly_id || !property.geom?.coordinates) {
      console.warn("Invalid property passed to click handler", property);
      return;
    }
    if (activePanel !== "Drawing Tools") {
      dispatch(highlightProperties({ [property.poly_id]: property }));
      dispatch(setActiveProperty(property.poly_id));
    }
  };

  const onClickHighlightedProperty = (property) => {
    if (activePanel !== "Drawing Tools") {
      dispatch(setActiveProperty(property.poly_id));
    }
  };

  const handleGeoJsonClick = (evt, callback) => {
    console.log("Raw event:", evt);
    const feature = evt?.features?.[0] || evt?.feature;
    if (feature?.properties && feature?.geometry) {
      const property = {
        ...feature.properties,
        geom: feature.geometry,
      };
      console.log("Safe reconstructed property:", property);
      callback(property);
    } else {
      console.warn("Missing feature properties or geometry", feature);
    }
  };

  const geoJsonWithOwnership = {
    type: "FeatureCollection",
    features:
      visibleProperties?.filter((p) => p.tenure).map((property) => ({
        type: "Feature",
        geometry: property.geom,
        properties: { ...property },
      })) || [],
  };

  const geoJsonWithoutOwnership = {
    type: "FeatureCollection",
    features:
      visibleProperties?.filter((p) => !p.tenure).map((property) => ({
        type: "Feature",
        geometry: property.geom,
        properties: { ...property },
      })) || [],
  };

  const geoJsonHighlighted = {
    type: "FeatureCollection",
    features: Object.values(highlightedProperties).map((property) => ({
      type: "Feature",
      geometry: property.geom,
      properties: { ...property },
    })),
  };

  if (activeProperty) {
    geoJsonHighlighted.features.push({
      type: "Feature",
      geometry: activeProperty.geom,
      properties: { ...activeProperty },
    });
  }

  return (
    <>
      {activeDisplay &&
        zoom >= constants.PROPERTY_BOUNDARIES_ZOOM_LEVELS[activeDisplay] && (
          <>
            {loadingProperties && (
              <LoadingData message={"fetching property boundaries"} />
            )}

            <GeoJSONLayer
              id="with-ownership-layer"
              data={geoJsonWithOwnership}
              fillPaint={{
                "fill-opacity": 0.2,
                "fill-color": "#6A0DAD",
              }}
              linePaint={{
                "line-color": "#6A0DAD",
                "line-width": 2,
                "line-opacity": 1,
              }}
              fillOnClick={(evt) => handleGeoJsonClick(evt, onClickNewProperty)}
            />

            <GeoJSONLayer
              id="without-ownership-layer"
              data={geoJsonWithoutOwnership}
              fillPaint={{
                "fill-opacity": 0.2,
                "fill-color": "#D92546",
              }}
              linePaint={{
                "line-color": "#D92546",
                "line-width": 2,
                "line-opacity": 1,
              }}
              fillOnClick={(evt) => handleGeoJsonClick(evt, onClickNewProperty)}
            />

            <GeoJSONLayer
              id="highlighted-property-layer"
              data={geoJsonHighlighted}
              fillPaint={{
                "fill-opacity": 0.3,
                "fill-color": "#0057B7",
              }}
              linePaint={{
                "line-color": "#0057B7",
                "line-width": 2,
              }}
              fillOnClick={(evt) => handleGeoJsonClick(evt, onClickHighlightedProperty)}
            />
          </>
        )}
    </>
  );
};

export default MapProperties;
