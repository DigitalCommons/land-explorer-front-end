import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/react-redux";
import * as turf from "@turf/turf";
import { Layer, Feature } from "react-mapbox-gl";
import constants from "../../constants";
import LoadingData from "./LoadingData";
import {
  fetchPropertiesInBox,
  highlightProperties,
  setActiveProperty,
} from "../../actions/LandOwnershipActions";

type Props = {
  center: any;
  map: any;
};

const MapProperties = ({ center, map }: Props) => {
  const {
    activeDisplay,
    visibleProperties,
    loadingProperties,
    highlightedProperties,
    activePropertyTitleNo,
  } = useAppSelector((state) => state.landOwnership);
  const activeProperty =
    activePropertyTitleNo !== null
      ? highlightedProperties[activePropertyTitleNo] || null
      : null;
  const { zoom, zooming } = useAppSelector((state) => state.map);
  const activePanel = useAppSelector((state) => state.leftPane.active);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      !zooming &&
      activeDisplay &&
      map &&
      zoom[0] >= constants.PROPERTY_BOUNDARIES_ZOOM_LEVELS[activeDisplay as keyof typeof constants.PROPERTY_BOUNDARIES_ZOOM_LEVELS]
    ) {
      const { _sw, _ne } = map.getBounds();
      dispatch(fetchPropertiesInBox(_sw.lng, _sw.lat, _ne.lng, _ne.lat));
    }
  }, [center, zooming, activeDisplay]);

  const onClickProperty = (property: any) => {
    if (activePanel !== "Drawing Tools") {
      dispatch(highlightProperties({ [property.title_no]: property }));
      dispatch(setActiveProperty(property.title_no));
    }
  };

  // For each property polygon, we need to render both a fill and a line layer, since React Mapbox
  // GL does not support configuring both the fill and border in a single layer.

  // Extract array of linestrings that form the border of the polygon. Usually will just be an array
  // of length 1, but can be longer if the polygon has holes.
  const getBorderLinestrings = (geometry: any) => {
    // we can only handle Polygon geometries currently, so just take the first polygon if a MultiPolygon
    const coords =
      geometry.type === "MultiPolygon"
        ? geometry.coordinates[0]
        : geometry.coordinates;
    return turf.flatten(turf.polygonToLine(turf.polygon(coords))).features;
  };

  // All the different layers that we will render
  const propertyWithOwnershipFillFeatures: React.ReactElement[] = [];
  const propertyWithOwnershipBorderFeatures: React.ReactElement[] = [];
  const propertyWithoutOwnershipFillFeatures: React.ReactElement[] = [];
  const propertyWithoutOwnershipBorderFeatures: React.ReactElement[] = [];
  const unregisteredFillFeatures: React.ReactElement[] = [];
  const unregisteredBorderFeatures: React.ReactElement[] = [];

  if (
    activeDisplay &&
    zoom[0] >= constants.PROPERTY_BOUNDARIES_ZOOM_LEVELS[activeDisplay as keyof typeof constants.PROPERTY_BOUNDARIES_ZOOM_LEVELS]
  ) {
    Object.values(visibleProperties)?.forEach((property: any) => {
      if (
        (activeDisplay === "unregistered" ||
          property.tenure === "unregistered") &&
        activeDisplay !== property.tenure
      ) {
        return; // Show unregistered land if and only if the active display is "unregistered"
      }

      property.polygons.forEach((polygon: any) => {
        const polyKey = polygon.geom.coordinates[0][0];
        const fill = (
          <Feature
            coordinates={[polygon.geom.coordinates]}
            key={`fill-${polyKey}`}
            onClick={() => onClickProperty(property)}
          />
        );
        const borders = getBorderLinestrings(polygon.geom).map(
          (lineString: any, index: number) => (
            <Feature
              coordinates={lineString.geometry.coordinates}
              key={`line-${polyKey}-${index}`}
            />
          )
        );

        if (property.tenure === "unregistered") {
          unregisteredFillFeatures.push(fill);
          unregisteredBorderFeatures.push(...borders);
        } else if (property.tenure) {
          // tenure is a mandatory field in ownerships data, but will be null if no linked ownership
          propertyWithOwnershipFillFeatures.push(fill);
          propertyWithOwnershipBorderFeatures.push(...borders);
        } else {
          propertyWithoutOwnershipFillFeatures.push(fill);
          propertyWithoutOwnershipBorderFeatures.push(...borders);
        }
      });
    });
  }

  const highlightedFillFeatures: React.ReactElement[] = [];
  const highlightedBorderFeatures: React.ReactElement[] = [];

  // Add highlighted properties i.e. those selected by the user
  Object.values(highlightedProperties).forEach((property: any) => {
    property.polygons.forEach((polygon: any) => {
      const polyKey = polygon.geom.coordinates[0][0];

      highlightedFillFeatures.push(
        <Feature
          coordinates={[polygon.geom.coordinates]}
          key={`fill-hl-${polyKey}`}
          onClick={() => onClickProperty(property)}
        />
      );
      highlightedBorderFeatures.push(
        ...getBorderLinestrings(polygon.geom).map((lineString: any, index: number) => (
          <Feature
            coordinates={lineString.geometry.coordinates}
            key={`line-hl-${polyKey}-${index}`}
          />
        ))
      );
    });
  });

  // If there is an active property that the user is currently interacting with, add it again to the
  // highlighted features. This will cause it to appear darker. We will also add a dashed border
  // later.
  if (activeProperty) {
    activeProperty.polygons.forEach((polygon: any) => {
      const polyKey = polygon.geom.coordinates[0][0];
      highlightedFillFeatures.push(
      <Feature
        coordinates={[polygon.geom.coordinates]}
        key={`fill-active-${polyKey}`}
      />
    );
    });
  }

  return (
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
        {propertyWithOwnershipFillFeatures}
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
        {propertyWithOwnershipBorderFeatures}
      </Layer>

      {/* Properties data private - Fill */}
      <Layer
        type="fill"
        paint={{
          "fill-opacity": 0.2,
          "fill-color": "#39ABB3",
        }}
      >
        {propertyWithoutOwnershipFillFeatures}
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
        {propertyWithoutOwnershipBorderFeatures}
      </Layer>

      {/* Unregistered Properties - Fill */}
      <Layer
        type="fill"
        paint={{
          "fill-opacity": 0.2,
          "fill-color": "#B85800",
        }}
      >
        {unregisteredFillFeatures}
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
        {unregisteredBorderFeatures}
      </Layer>

      {/* Highlighted Properties - Fill */}
      <Layer
        type="fill"
        paint={{
          "fill-opacity": 0.4,
          "fill-color": "#244673",
        }}
      >
        {highlightedFillFeatures}
      </Layer>
      {/* Highlighted Properties - Border */}
      <Layer
        type="line"
        paint={{
          "line-color": "#244673",
          "line-width": 2,
        }}
      >
        {highlightedBorderFeatures}
      </Layer>

      {/* Selected Properties - Border */}
      <Layer
        type="line"
        paint={{
          "line-color": "#000000",
          "line-width": 3,
          "line-dasharray": [3, 3],
          "line-opacity": 1,
        }}
      >
        {activeProperty &&
          activeProperty.polygons.flatMap((polygon: any) =>
            getBorderLinestrings(polygon.geom).map((lineString: any, index: number) => (
              <Feature
                coordinates={lineString.geometry.coordinates}
                key={`line-active-${
                  polygon.poly_id || polygon.geom.coordinates[0][0]
                }-${index}`}
              />
            ))
          )}
      </Layer>
    </>
  );
};

export default MapProperties;
