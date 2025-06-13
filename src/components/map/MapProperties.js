// Updated MapProperties.js using Feature + dual Layer approach for thicker borders + unregistered layer placeholder

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

const MapProperties = ({ center, map }) => {
  // Extract necessary state from Redux store
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

  // Fetch properties if zoom level and display settings allow
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

  // Handle click for newly visible property
  const onClickNewProperty = (property) => {
    if (activePanel !== "Drawing Tools") {
      dispatch(highlightProperties({ [property.poly_id]: property }));
      dispatch(setActiveProperty(property.poly_id));
    }
  };

  // Handle click for highlighted property
  const onClickHighlightedProperty = (property) => {
    if (activePanel !== "Drawing Tools") {
      dispatch(setActiveProperty(property.poly_id));
    }
  };

  // Extract the outer ring of a polygon for line layers
  const getOuterRing = (coords) =>
    Array.isArray(coords?.[0]) && Array.isArray(coords[0][0])
      ? coords[0]
      : coords;

  // Prepare Feature components for properties with and without ownership
  const propertyFeaturesWithOwnershipData = [];
  const propertyLineFeaturesWithOwnershipData = [];
  const propertyFeaturesWithoutOwnershipData = [];
  const propertyLineFeaturesWithoutOwnershipData = [];

  // Placeholder arrays for unregistered properties
  const propertyFeaturesUnregistered = [];
  const propertyLineFeaturesUnregistered = [];

  visibleProperties?.forEach((property) => {
    const polyKey = property.poly_id || property.geom.coordinates[0][0];
    const fill = (
      <Feature
        coordinates={[property.geom.coordinates]}
        key={`fill-${polyKey}`}
        onClick={() => onClickNewProperty(property)}
      />
    );
    const line = (
      <Feature
        coordinates={getOuterRing(property.geom.coordinates)}
        key={`line-${polyKey}`}
        onClick={() => onClickNewProperty(property)}
      />
    );

    if (property.tenure === "unregistered") {
      propertyFeaturesUnregistered.push(fill);
      propertyLineFeaturesUnregistered.push(line);
    } else if (property.tenure) {
      propertyFeaturesWithOwnershipData.push(fill);
      propertyLineFeaturesWithOwnershipData.push(line);
    } else {
      propertyFeaturesWithoutOwnershipData.push(fill);
      propertyLineFeaturesWithoutOwnershipData.push(line);
    }
  });

  // Prepare Feature components for highlighted properties
  const highlightedPropertyFeatures = [];
  const highlightedLineFeatures = [];

  Object.values(highlightedProperties).forEach((highlightedProperty) => {
    const polyKey =
      highlightedProperty.poly_id || highlightedProperty.geom.coordinates[0][0];
    highlightedPropertyFeatures.push(
      <Feature
        coordinates={[highlightedProperty.geom.coordinates]}
        key={`fill-hl-${polyKey}`}
        onClick={() => onClickHighlightedProperty(highlightedProperty)}
      />
    );
    highlightedLineFeatures.push(
      <Feature
        coordinates={getOuterRing(highlightedProperty.geom.coordinates)}
        key={`line-hl-${polyKey}`}
        onClick={() => onClickHighlightedProperty(highlightedProperty)}
      />
    );
  });

  // Add active property again for visual emphasis
  if (activeProperty) {
    const polyKey =
      activeProperty.poly_id || activeProperty.geom.coordinates[0][0];
    highlightedPropertyFeatures.push(
      <Feature
        coordinates={[activeProperty.geom.coordinates]}
        key={`fill-active-${polyKey}`}
      />
    );
    highlightedLineFeatures.push(
      <Feature
        coordinates={getOuterRing(activeProperty.geom.coordinates)}
        key={`line-active-${polyKey}`}
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

            {/* Owned Properties - Fill */}
            <Layer
              type="fill"
              paint={{
                "fill-opacity": 0.2,
                "fill-color": "#BE4A97",
              }}
            >
              {propertyFeaturesWithOwnershipData}
            </Layer>
            {/* Owned Properties - Border */}
            <Layer
              type="line"
              paint={{
                "line-color": "#BE4A97",
                "line-width": 2,
                "line-opacity": 1,
              }}
            >
              {propertyLineFeaturesWithOwnershipData}
            </Layer>

            {/* Unowned Properties - Fill */}
            <Layer
              type="fill"
              paint={{
                "fill-opacity": 0.2,
                "fill-color": "#39ABB3",
              }}
            >
              {propertyFeaturesWithoutOwnershipData}
            </Layer>
            {/* Unowned Properties - Border */}
            <Layer
              type="line"
              paint={{
                "line-color": "#39ABB3",
                "line-width": 2,
                "line-opacity": 1,
              }}
            >
              {propertyLineFeaturesWithoutOwnershipData}
            </Layer>

            {/* Unregistered Properties - Fill (placeholder for future functionality) */}
            <Layer
              type="fill"
              paint={{
                "fill-opacity": 0.2,
                "fill-color": "#B85800",
              }}
            >
              {propertyFeaturesUnregistered}
            </Layer>
            {/* Unregistered Properties - Border */}
            <Layer
              type="line"
              paint={{
                "line-color": "#B85800",
                "line-width": 2,
                "line-opacity": 1,
              }}
            >
              {propertyLineFeaturesUnregistered}
            </Layer>

            {/* Highlighted Properties */}
            <Layer
              type="fill"
              paint={{
                "fill-opacity": 0.4,
                "fill-color": "#244673",
              }}
            >
              {highlightedPropertyFeatures}
            </Layer>
            <Layer
              type="line"
              paint={{
                "line-color": "#244673",
                "line-width": 2,
              }}
            >
              {highlightedLineFeatures}
            </Layer>
          </>
        )}
    </>
  );
};

export default MapProperties;
