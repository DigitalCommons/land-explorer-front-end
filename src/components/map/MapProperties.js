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
  const layerVisible =
    activeDisplay &&
    zoom >= constants.PROPERTY_BOUNDARIES_ZOOM_LEVELS[activeDisplay];

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

  // For each property polygon, we need to render both a fill and a line layer, since React Mapbox
  // GL does not support configuring both the fill and border in a single layer.

  // Extract poly border only for line layers TODO: this can be improved with turf.polygonToLine and
  // turf.flatten for polygons that have holes or multiple parts
  const getBorder = (coords) =>
    Array.isArray(coords?.[0]) && Array.isArray(coords[0][0])
      ? coords[0]
      : coords;

  // All the different layers that we will render
  const propertyFeaturesWithOwnershipData = [];
  const propertyLineFeaturesWithOwnershipData = [];
  const propertyFeaturesWithoutOwnershipData = [];
  const propertyLineFeaturesWithoutOwnershipData = [];
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
        coordinates={getBorder(property.geom.coordinates)}
        key={`line-${polyKey}`}
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

  const highlightedPropertyFeatures = [];
  const highlightedLineFeatures = [];

  // Add highlighted properties i.e. those selected by the user
  // We change the key to include 'without-layer' so that the features re-render when the layer
  // visibility changes. This ensures that highlighted properties are always positioned above the
  // visible property layers.
  Object.values(highlightedProperties).forEach((highlightedProperty) => {
    const polyKey =
      highlightedProperty.poly_id || highlightedProperty.geom.coordinates[0][0];
    highlightedPropertyFeatures.push(
      <Feature
        coordinates={[highlightedProperty.geom.coordinates]}
        key={`fill-hl-${polyKey}${layerVisible ? "" : "-without-layer"}`}
        onClick={() => onClickHighlightedProperty(highlightedProperty)}
      />
    );
    highlightedLineFeatures.push(
      <Feature
        coordinates={getBorder(highlightedProperty.geom.coordinates)}
        key={`line-hl-${polyKey}${layerVisible ? "" : "-without-layer"}`}
      />
    );
  });

  // If there is an active property that the user is currently interacting with, add it again to the
  // highlighted features. This will cause it to appear darker. We will also add a thicker border
  // later.
  if (activeProperty) {
    const polyKey =
      activeProperty.poly_id || activeProperty.geom.coordinates[0][0];
    highlightedPropertyFeatures.push(
      <Feature
        coordinates={[activeProperty.geom.coordinates]}
        key={`fill-active-${polyKey}${layerVisible ? "" : "-without-layer"}`}
      />
    );
    highlightedLineFeatures.push(
      <Feature
        coordinates={getBorder(activeProperty.geom.coordinates)}
        key={`line-active-${polyKey}${layerVisible ? "" : "-without-layer"}`}
      />
    );
  }

  return (
    <>
      {layerVisible && (
        <>
          {loadingProperties && (
            <LoadingData message={"fetching property boundaries"} />
          )}

          {/* Properties data public - Fill */}
          <Layer
            id="all"
            type="fill"
            paint={{
              "fill-opacity": 0.2,
              "fill-color": "#BE4A97",
            }}
          >
            {propertyFeaturesWithOwnershipData}
          </Layer>
          {/* Properties data public - Border */}
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

          {/* Properties data private - Fill */}
          <Layer
            type="fill"
            paint={{
              "fill-opacity": 0.2,
              "fill-color": "#39ABB3",
            }}
          >
            {propertyFeaturesWithoutOwnershipData}
          </Layer>
          {/* Properties data private - Border */}
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

          {/* Unregistered Properties - Fill */}
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
          {/* Highlighted Properties - Fill */}
          <Layer
            type="fill"
            paint={{
              "fill-opacity": 0.4,
              "fill-color": "#244673",
            }}
          >
            {highlightedPropertyFeatures}
          </Layer>
          {/* Highlighted Properties - Border */}
          <Layer
            type="line"
            paint={{
              "line-color": "#244673",
              "line-width": 2,
            }}
          >
            {highlightedLineFeatures}
          </Layer>

          {/* Selected Properties - Border */}
          {activeProperty && (
            <Layer
              type="line"
              paint={{
                "line-color": "#000000",
                "line-width": 3,
                "line-dasharray": [3, 3],
                "line-opacity": 1,
              }}
            >
              <Feature
                coordinates={getBorder(activeProperty.geom.coordinates)}
                key={`line-active-${
                  activeProperty.poly_id ||
                  activeProperty.geom.coordinates[0][0]
                }`}
              />
            </Layer>
          )}
        </>
      )}
      {/* Highlighted Properties - Fill */}
      <Layer
        type="fill"
        paint={{
          "fill-opacity": 0.4,
          "fill-color": "#244673",
        }}
      >
        {highlightedPropertyFeatures}
      </Layer>
      {/* Highlighted Properties - Border */}
      <Layer
        type="line"
        paint={{
          "line-color": "#244673",
          "line-width": 2,
        }}
      >
        {highlightedLineFeatures}
      </Layer>

      {/* Selected Properties - Border */}
      {activeProperty && (
        <Layer
          type="line"
          paint={{
            "line-color": "#000000",
            "line-width": 3,
            "line-dasharray": [3, 3],
            "line-opacity": 1,
          }}
        >
          <Feature
            coordinates={getBorder(activeProperty.geom.coordinates)}
            key={`line-active-${
              activeProperty.poly_id || activeProperty.geom.coordinates[0][0]
            }${layerVisible ? "" : "-without-layer"}`}
          />
        </Layer>
      )}
    </>
  );
};

export default MapProperties;
