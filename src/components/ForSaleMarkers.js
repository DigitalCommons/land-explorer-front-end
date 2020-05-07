import React, { Component } from "react";
import { connect } from "react-redux";
import { addMarker, clearMarkers } from "../actions/ForSaleActions";

class ForSaleMarkers extends Component {
  constructor(props) {
    super(props);

    this.dispatchItem = this.dispatchItem.bind(this);
  }

  dispatchItem() {
    console.log(this.props.active);
    if (this.props.active != "For Sale") this.props.clearMarkers();

    let markers = this.props.properties;

    if (this.props.active == "For Sale") {
      for (let i = 0; i < markers.length; i++) {
        this.props.addMarker(markers[i]);
      }
    }
  }

  render() {
    return <div>{this.dispatchItem()}</div>;
  }
}

export default connect(null, { addMarker, clearMarkers })(ForSaleMarkers);
