import React, { Component } from "react";
import { connect } from "react-redux";
import Property from "../components/Property";
import { stHelens, norland } from "../data/wardOutlines";
import axios from "axios";
import constants from "../constants";
import { getAuthHeader } from "./Auth";

class MapProperties extends Component {
  constructor(props) {
    super(props);
  }
  getProperties() {

    let PropertyBoundaries = this.props.map.getBounds()
    let encodingType = {
    headers : {
      'Contet-Type': 'application/x-www-form-urlencoded'
    }
  }

  console.log(encodingType)
    //use map location in the api call to get all properties in a certain area.
    axios.post(`${constants.ROOT_URL}/api/ownership`,{},getAuthHeader(),PropertyBoundaries,{}, )
    .then(response =>
      {
        console.log(response);
      });
 
    //let propertiesArray = axios.post('apiaddres' + '/properties' , this.props.map.getBounds());
    // server/api/ownership
    //this.props.map.getBounds()

    // console.log(this.props.map.lngLat);
    // console.log(this.props.map.getBounds());

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
    
    //
  //  { console.log(this.props.map.lngLat);}
 
    if (this.props.displayActive)
      return <React.Fragment>{this.createProperties()}</React.Fragment>;
    else return null;
  }
}

const mapStateToProps = ({ landOwnership }) => ({
  displayActive: landOwnership.displayActive,
});

export default connect(mapStateToProps)(MapProperties);
