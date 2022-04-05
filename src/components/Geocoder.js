import React, { createElement, Component } from "react";
import { Map } from "mapbox-gl";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import * as MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import constants from "../constants";
import { setSearchMarker, clearSearchMarker, setLngLat } from "../actions/MapActions";

class GeoCoder extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { map } = this.context;
    var geocoder = new MapboxGeocoder({
      accessToken: constants.GEOCODER_TOKEN,
      placeholder: " Enter Location",
      countries: "gb",
      zoom: 13,
      reverseGeocode: true
    });

    document.getElementById("geocoder").appendChild(geocoder.onAdd(map));

    geocoder.on("result", result => {
      this.props.setSearchMarker({
        lng: result.result.center[0],
        lat: result.result.center[1]
      });
      this.props.setLngLat({
        lng: result.result.center[0],
        lat: result.result.center[1]
      })
    });
    geocoder.on("clear", this.props.clearSearchMarker);
  }

  render() {
    return null;
  }

  static contextTypes = {
    map: PropTypes.object.isRequired
  };
}

const mapStateToProps = ({ map }) => ({
  center: map.center
});

export default connect(mapStateToProps, { setSearchMarker, clearSearchMarker, setLngLat })(
  GeoCoder
);
