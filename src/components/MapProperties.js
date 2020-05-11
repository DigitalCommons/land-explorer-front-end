import React, { Component } from "react";
import { connect } from "react-redux";
import Property from "../components/Property";
import { stHelens, norland } from "../data/wardOutlines";

class MapProperties extends Component {
  constructor(props) {
    super(props);
  }
  getProperties() {
    //use map location in the api call to get all properties in a certain area.

    //let propertiesArray = axios.post('apiaddres' + '/properties' , map.boundaries);

    let propertiesArray = [
      { coordinates: stHelens, UPRN: 12345, address: "Property 1" },
      { coordinates: norland, UPRN: 67890, address: "Property 2" },
    ];

    return propertiesArray;
  }

  createProperties() {
    let data = this.getProperties();

    let properties = [];

    data.map((propertyInfo) =>
      properties.push(<Property propertyInfo={propertyInfo} />)
    );

    return properties;
  }

  render() {
    //TO ADD: if zoom level is below ~14 (or something) do nothing except trigger the zoom warning.
    if (this.props.displayActive)
      return <React.Fragment>{this.createProperties()}</React.Fragment>;
    else return null;
  }
}

const mapStateToProps = ({ landOwnership }) => ({
  displayActive: landOwnership.displayActive,
});

export default connect(mapStateToProps)(MapProperties);
