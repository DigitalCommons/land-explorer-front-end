import React, { Component } from "react";
import { connect } from "react-redux";
import Property from "../components/Property";
import axios from "axios";
import constants from "../constants";
import { getAuthHeader } from "./Auth";
import Loading from "../components/common/Loading";

class MapProperties extends Component {
  constructor(props) {
    super(props);

    this.state = {
      propertiesArray: [],
      loadingProperties: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps != this.props)
      if (this.props.displayActive && this.props.zoom >= 18)
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

    const propertiesData = response.data.slice(0, 100);

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
    let properties = [];

    if (this.state.propertiesArray.length > 0)
      this.state.propertiesArray.forEach((propertyInfo) =>
        properties.push(<Property propertyInfo={propertyInfo} />)
      );

    if (this.props.highlightedProperty.length > 0) {
      this.props.highlightedProperty.forEach(highlightedProperty =>
        properties.push(<Property propertyInfo={highlightedProperty} highlight={true} />)
      )
    }

    return properties;
  }

  createHighlightedProperties() {
    let properties = []
    this.props.highlightedProperty.forEach(highlightedProperty =>
      properties.push(<Property propertyInfo={highlightedProperty} highlight={true} />)
    )
    return properties;
  }

  render() {
    const { loadingProperties } = this.state;

    if (this.props.displayActive && this.props.zoom >= 18)
      return <React.Fragment>
        {loadingProperties && <Loading message={"fetching property boundaries"} />}
        {this.createProperties()}
      </React.Fragment>;
    if (this.props.highlightedProperty.length > 0)
      return <React.Fragment>
        {this.createHighlightedProperties()}
      </React.Fragment>
    else return null;
  }
}

const mapStateToProps = ({ landOwnership, map }) => ({
  displayActive: landOwnership.displayActive,
  zoom: map.zoom,
  highlightedProperty: landOwnership.highlightedProperty
});

export default connect(mapStateToProps)(MapProperties);
