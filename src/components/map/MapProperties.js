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
    }
  };

  const onClickHighlightedProperty = (property) => {
    if (activePanel !== "Drawing Tools") {
      dispatch(setActiveProperty(property.poly_id));
    }
  };

  const propertyFeaturesWithOwnershipData = [];
  const propertyFeaturesWithoutOwnershipData = [];

  visibleProperties?.forEach((property) => {
    // tenure is a mandatory field in ownerships data, but will be null if no linked ownership
    if (property.tenure)
      propertyFeaturesWithOwnershipData.push(
        <Feature
          coordinates={[property.geom.coordinates]}
          key={property.geom.coordinates[0][0]}
          onClick={() => onClickNewProperty(property)}
        />
      );
    else
      propertyFeaturesWithoutOwnershipData.push(
        <Feature
          coordinates={[property.geom.coordinates]}
          key={property.geom.coordinates[0][0]}
          onClick={() => onClickNewProperty(property)}
        />
      );
  });

  const highlightedPropertyFeatures = Object.values(highlightedProperties).map(
    (highlightedProperty) => (
      <Feature
        coordinates={[highlightedProperty.geom.coordinates]}
        key={highlightedProperty.geom.coordinates[0][0]}
        onClick={() => onClickHighlightedProperty(highlightedProperty)}
      />
    )
  );

  // Add another polygon for the active property so it appears darker
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
            <Layer
              type={"fill"}
              paint={{
                "fill-opacity": 0.15,
                "fill-color": "green",
                "fill-outline-color": "green",
              }}
            >
              {propertyFeaturesWithOwnershipData}
            </Layer>
            <Layer
              type={"fill"}
              paint={{
                "fill-opacity": 0.15,
                "fill-color": "orange",
                "fill-outline-color": "green",
              }}
            >
              {propertyFeaturesWithoutOwnershipData}
            </Layer>
          </>
        )}
      <Layer
        type={"fill"}
        paint={{
          "fill-opacity": 0.3,
          "fill-color": "red",
        }}
      >
        {highlightedPropertyFeatures}
      </Layer>
    </>
  );
};

export default MapProperties;
