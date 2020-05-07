import React, { Component } from "react";
import Property from "../components/Property";
import { stHelens, norland } from "../data/wardOutlines";

class MapProperties extends Component {
  constructor(props) {
    super(props);
  }
  getProperties() {
    //use map location in the api call to get all properties in a certain area.

    //let propertiesArray = axios.get('apiaddres' + '/properties' , map.center);
    let propertiesArray = [
      { coordinates: stHelens, UPRN: 12345, address: "St Helen's Ward" },
      { coordinates: norland, UPRN: 67890, address: "Norland Ward" },
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
    //if zoom level is below ~14 (or something) do nothing except trigger the zoom warning.
    return <React.Fragment>{this.createProperties()}</React.Fragment>;
  }
}

export default MapProperties;
