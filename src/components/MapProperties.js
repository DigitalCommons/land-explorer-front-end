import React, { Component } from "react";
import { connect } from "react-redux";
import { Layer, Feature } from 'react-mapbox-gl';
import axios from "axios";
import constants from "../constants";
import { getAuthHeader } from "../utils/Auth";
import Loading from "../components/common/Loading";
import { highlightProperty } from "../actions/LandOwnershipActions";

class MapProperties extends Component {
  constructor(props) {
    super(props);

    this.state = {
      propertiesArray: [],
      loadingProperties: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps != this.props &&
      prevProps.highlightedProperty == this.props.highlightedProperty &&
      this.props.displayActive &&
      this.props.zoom >= constants.PROPERTY_BOUNDARIES_ZOOM_LEVEL)
      this.getProperties();
  }

  async getProperties() {
    const mapBoundaries = this.props.map.getBounds();

    this.setState({ loadingProperties: true });

    const response = await axios
      .get(
        `${constants.ROOT_URL}/api/ownership/?sw_lng=` +
        mapBoundaries._sw.lng +
        "&sw_lat=" +
        mapBoundaries._sw.lat +
        "&ne_lng=" +
        mapBoundaries._ne.lng +
        "&ne_lat=" +
        mapBoundaries._ne.lat,
        getAuthHeader()
      );

    let properties = [];

    const propertiesData = response.data;

    propertiesData.map((property) => {
      let json = JSON.parse(property.geojson);
      property.coordinates = json.coordinates[0];
      properties.push(property);
    });

    if (properties.length > 0)
      this.setState({
        propertiesArray: properties
      });

    this.setState({ loadingProperties: false });
  }

  createProperties() {
    const detailedProperties = [];
    const basicProperties = [];

    this.state.propertiesArray.forEach(property => {
      if (property.date_proprietor_added)
        detailedProperties.push(<Feature
          coordinates={[property.coordinates]}
          key={property.coordinates[0][0]}
          onClick={() => this.props.highlightProperty(property)}
        />)
      else
        basicProperties.push(<Feature
          coordinates={[property.coordinates]}
          key={property.coordinates[0][0]}
          onClick={() => this.props.highlightProperty(property)}
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

  createHighlightedProperties() {
    let properties = []
    this.props.highlightedProperty.forEach(highlightedProperty =>
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

  render() {
    const { loadingProperties, propertiesArray } = this.state;
    const { highlightedProperty } = this.props;

    if (this.props.displayActive && this.props.zoom >= constants.PROPERTY_BOUNDARIES_ZOOM_LEVEL)
      return <>
        {loadingProperties && <Loading message={"fetching property boundaries"} />}
        {propertiesArray && this.createProperties()}
        {highlightedProperty && this.createHighlightedProperties()}
      </>;
    if (highlightedProperty.length > 0)
      return <>
        {highlightedProperty && this.createHighlightedProperties()}
      </>
    else return null;
  }
}

const mapStateToProps = ({ landOwnership, map }) => ({
  displayActive: landOwnership.displayActive,
  zoom: map.zoom,
  highlightedProperty: landOwnership.highlightedProperty
});

export default connect(mapStateToProps, { highlightProperty })(MapProperties);
