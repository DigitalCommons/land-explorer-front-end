import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Layer, Feature } from "react-mapbox-gl";
import axios from "axios";
import constants from "../../constants";
import { getAuthHeader } from "../../utils/Auth";
import LoadingData from "./LoadingData";
import {
  highlightProperties,
  setActiveProperty,
} from "../../actions/LandOwnershipActions";

/** Polygons that are pending from an INSPIRE pipeline run. This is just visible to super users */
const MapPendingProperties = ({ center, map }) => {
  const [properties, setProperties] = useState([]);
  const [loadingProperties, setLoadingProperties] = useState(false);

  const displayActive = useSelector(
    (state) => state.landOwnership.pendingDisplayActive
  );
  const { zoom, zooming } = useSelector((state) => state.map);
  const highlightedProperties = useSelector(
    (state) => state.landOwnership.highlightedProperties
  );
  const activePropertyId = useSelector(
    (state) => state.landOwnership.activePropertyId
  );
  const activeProperty = highlightedProperties[activePropertyId] || null;

  const activePanel = useSelector((state) => state.leftPane.active);

  const dispatch = useDispatch();

  const getProperties = async () => {
    setLoadingProperties(true);

    try {
      const mapBoundaries = map.getBounds();

      const response = await axios.get(
        `${constants.ROOT_URL}/api/ownership?sw_lng=` +
          mapBoundaries._sw.lng +
          "&sw_lat=" +
          mapBoundaries._sw.lat +
          "&ne_lng=" +
          mapBoundaries._ne.lng +
          "&ne_lat=" +
          mapBoundaries._ne.lat +
          "&pending=true",
        getAuthHeader()
      );

      const newProperties = response.data.map((property) => ({
        ...property,
        poly_id: `${property.poly_id}-pending`,
        coordinates: property.geom.coordinates[0],
      }));

      if (newProperties.length > 0) {
        setProperties(newProperties);
      }
      setLoadingProperties(false);
    } catch (error) {
      console.error("failed to retrieve property boundaries", error);
    }
  };

  useEffect(() => {
    if (
      !zooming &&
      displayActive &&
      zoom >= constants.PROPERTY_BOUNDARIES_ZOOM_LEVEL
    )
      getProperties();
  }, [center, zooming, displayActive]);

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

  properties.forEach((property) => {
    // tenure is a mandatory field in ownerships data, but will be null if no linked ownership
    if (property.tenure)
      propertyFeaturesWithOwnershipData.push(
        <Feature
          coordinates={[property.coordinates]}
          key={property.coordinates[0][0]}
          onClick={() => onClickNewProperty(property)}
        />
      );
    else
      propertyFeaturesWithoutOwnershipData.push(
        <Feature
          coordinates={[property.coordinates]}
          key={property.coordinates[0][0]}
          onClick={() => onClickNewProperty(property)}
        />
      );
  });

  const highlightedPropertyFeatures = Object.values(highlightedProperties).map(
    (highlightedProperty) => (
      <Feature
        coordinates={[highlightedProperty.coordinates]}
        key={highlightedProperty.coordinates[0][0]}
        onClick={() => onClickHighlightedProperty(highlightedProperty)}
      />
    )
  );

  // Add another polygon for the active property so it appears darker
  if (activeProperty) {
    highlightedPropertyFeatures.push(
      <Feature
        coordinates={[activeProperty.coordinates]}
        key={activeProperty.coordinates[0][0]}
      />
    );
  }

  return (
    <>
      {displayActive && zoom >= constants.PROPERTY_BOUNDARIES_ZOOM_LEVEL && (
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

export default MapPendingProperties;
