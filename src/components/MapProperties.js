import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Layer, Feature } from 'react-mapbox-gl';
import axios from "axios";
import constants from "../constants";
import { getAuthHeader } from "../utils/Auth";
import Loading from "../components/common/Loading";
import { highlightProperty } from "../actions/LandOwnershipActions";

const MapProperties = ({ center, map }) => {
  const [propertiesArray, setPropertiesArray] = useState([]);
  const [loadingProperties, setLoadingProperties] = useState(false);

  const displayActive = useSelector(state => state.landOwnership.displayActive);
  const zoom = useSelector(state => state.map.zoom);
  const highlightedProperty = useSelector(state => state.landOwnership.highlightedProperty);

  const activePanel = useSelector(state => state.navigation.active);

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

    const properties = [];

    const propertiesData = response.data;

    propertiesData.map((property) => {
      const json = JSON.parse(property.geojson);
      property.coordinates = json.coordinates[0];
      properties.push(property);
    });

    if (properties.length > 0)
      setPropertiesArray(properties);

    setLoadingProperties(false);
  }

  useEffect(() => {
    if (displayActive && zoom >= constants.PROPERTY_BOUNDARIES_ZOOM_LEVEL)
      getProperties();
  }, [center, map, zoom, displayActive])

  const onClickProperty = (property) => {
    if (activePanel !== 'Drawing Tools') {
      dispatch(highlightProperty(property));
    }
  }

  const createProperties = () => {
    const detailedProperties = [];
    const basicProperties = [];

    propertiesArray.forEach(property => {
      if (property.date_proprietor_added)
        detailedProperties.push(<Feature
          coordinates={[property.coordinates]}
          key={property.coordinates[0][0]}
          onClick={() => onClickProperty(property)}
        />)
      else
        basicProperties.push(<Feature
          coordinates={[property.coordinates]}
          key={property.coordinates[0][0]}
          onClick={() => onClickProperty(property)}
        />)
    })

    return <>
      <Layer
        type={"fill"}
        paint={{
          "fill-opacity": 0.15,
          "fill-color": 'green',
          "fill-outline-color": 'green',
        }}
      >
        {detailedProperties}
      </Layer>
      <Layer
        type={"fill"}
        paint={{
          "fill-opacity": 0.15,
          "fill-color": 'orange',
          "fill-outline-color": 'green',
        }}
      >
        {basicProperties}
      </Layer>
    </>
  }

  const createHighlightedProperties = () => {
    const properties = []
    highlightedProperty.forEach(highlightedProperty =>
      properties.push(<Feature
        coordinates={[highlightedProperty.coordinates]}
        key={highlightedProperty.coordinates[0][0]}
      />)
    )
    return <Layer type={"fill"}
      paint={{
        "fill-opacity": 0.4,
        "fill-color": 'red'
      }}>
      {properties}
    </Layer>
  }

  if (displayActive && zoom >= constants.PROPERTY_BOUNDARIES_ZOOM_LEVEL)
    return <>
      {loadingProperties && <Loading message={"fetching property boundaries"} />}
      {propertiesArray && createProperties()}
      {highlightedProperty && createHighlightedProperties()}
    </>;
  if (highlightedProperty.length > 0)
    return <>
      {createHighlightedProperties()}
    </>
  else return null;
}

export default MapProperties;
