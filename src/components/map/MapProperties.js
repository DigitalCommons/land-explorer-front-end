// Updated MapProperties.js using GeoJSONLayer from react-mapbox-gl

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Layer, Feature } from "react-mapbox-gl";
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

  // Handle GeoJSON click events safely
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
        properties: {
          ...property,
        },
      })) || [],
  };

  const geoJsonWithoutOwnership = {
    type: "FeatureCollection",
    features:
      visibleProperties?.filter((p) => !p.tenure).map((property) => ({
        type: "Feature",
        geometry: property.geom,
        properties: {
          ...property,
        },
      })) || [],
  };

  const highlightedPropertyFeatures = Object.values(highlightedProperties).map(
    (highlightedProperty) => (
      <Feature
        coordinates={[highlightedProperty.geom.coordinates]}
        key={highlightedProperty.geom.coordinates[0][0]}
        onClick={() => onClickHighlightedProperty(highlightedProperty)}
      />
    )
  );

  if (activeProperty) {
    highlightedPropertyFeatures.push(
      <Feature
        coordinates={[activeProperty.geom.coordinates]}
        key={activeProperty.geom.coordinates[0][0]}
      />
    );
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
          </>
        )}

      <Layer
        type="fill"
        paint={{
          "fill-opacity": 0.3,
          "fill-color": "#0057B7",
          "fill-outline-color": "#0057B7",
        }}
      >
        {highlightedPropertyFeatures}
      </Layer>
    </>
  );
};

export default MapProperties;
