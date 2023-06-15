import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Layer, Feature } from 'react-mapbox-gl';
import axios from "axios";
import constants from "../../constants";
import { getAuthHeader } from "../../utils/Auth";
import LoadingData from "./LoadingData";
import { highlightProperty, setActiveProperty } from "../../actions/LandOwnershipActions";

const MapProperties = ({ center, map }) => {
  const [propertiesArray, setPropertiesArray] = useState([]);
  const [loadingProperties, setLoadingProperties] = useState(false);

  const displayActive = useSelector(state => state.landOwnership.displayActive);
  const zoom = useSelector(state => state.map.zoom);
  const highlightedProperties = useSelector(state => state.landOwnership.highlightedProperties);
  const activePropertyId = useSelector(state => state.landOwnership.activePropertyId);
  const activeProperty = activePropertyId !== null ? highlightedProperties.find(p => p.poly_id === activePropertyId) : null;

  const activePanel = useSelector(state => state.leftPane.active);

  const dispatch = useDispatch();

  const getProperties = async () => {
    const mapBoundaries = map.getBounds();

    setLoadingProperties(true);

    const response = await axios
      .get(
        `${constants.ROOT_URL}/api/ownership?sw_lng=` +
        mapBoundaries._sw.lng +
        "&sw_lat=" +
        mapBoundaries._sw.lat +
        "&ne_lng=" +
        mapBoundaries._ne.lng +
        "&ne_lat=" +
        mapBoundaries._ne.lat,
        getAuthHeader()
      );

    const properties = response.data.map((property) => {
      const json = JSON.parse(property.geojson);
      return {
        ...property,
        coordinates: json.coordinates[0]
      }
    });

    if (properties.length > 0)
      setPropertiesArray(properties);

    setLoadingProperties(false);
  }

  useEffect(() => {
    if (displayActive && zoom >= constants.PROPERTY_BOUNDARIES_ZOOM_LEVEL)
      getProperties();
  }, [center, map, zoom, displayActive])

  const onClickNewProperty = (property) => {
    if (activePanel !== 'Drawing Tools') {
      dispatch(highlightProperty(property));
    }
  }

  const onClickHighlightedProperty = (property) => {
    if (activePanel !== 'Drawing Tools') {
      dispatch(setActiveProperty(property.poly_id));
    }
  }

  const detailedPropertyFeatures = [];
  const basicPropertyFeatures = [];

  propertiesArray.forEach(property => {
    if (property.date_proprietor_added)
      detailedPropertyFeatures.push(<Feature
        coordinates={[property.coordinates]}
        key={property.coordinates[0][0]}
        onClick={() => onClickNewProperty(property)}
      />)
    else
      basicPropertyFeatures.push(<Feature
        coordinates={[property.coordinates]}
        key={property.coordinates[0][0]}
        onClick={() => onClickNewProperty(property)}
      />)
  });

  const highlightedPropertyFeatures = highlightedProperties.map(highlightedProperty =>
    <Feature
      coordinates={[highlightedProperty.coordinates]}
      key={highlightedProperty.coordinates[0][0]}
      onClick={() => onClickHighlightedProperty(highlightedProperty)}
    />
  );

  // Add another polygon for the active property so it appears darker
  if (activeProperty) {
    highlightedPropertyFeatures.push(<Feature
      coordinates={[activeProperty.coordinates]}
      key={activeProperty.coordinates[0][0]}
    />);
  }

  return <>
    {
      displayActive && zoom >= constants.PROPERTY_BOUNDARIES_ZOOM_LEVEL && (
        <>
          {loadingProperties && <LoadingData message={"fetching property boundaries"} />}
          <Layer
            type={"fill"}
            paint={{
              "fill-opacity": 0.15,
              "fill-color": 'green',
              "fill-outline-color": 'green',
            }}
          >
            {detailedPropertyFeatures}
          </Layer>
          <Layer
            type={"fill"}
            paint={{
              "fill-opacity": 0.15,
              "fill-color": 'orange',
              "fill-outline-color": 'green',
            }}
          >
            {basicPropertyFeatures}
          </Layer>
        </>
      )
    }
    <Layer
      type={"fill"}
      paint={{
        "fill-opacity": 0.3,
        "fill-color": 'red'
      }}>
      {highlightedPropertyFeatures}
    </Layer>
  </>;
}

export default MapProperties;
