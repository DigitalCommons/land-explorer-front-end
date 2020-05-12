import React, { Component } from "react";
import { connect } from "react-redux";
import { GeoJSONLayer, Marker } from "react-mapbox-gl";
import { viewAddressInfo } from "../actions/LandOwnershipActions";

class Property extends Component {
  placeMiddle() {
    let halfLength = Math.floor(this.props.propertyInfo.coordinates.length / 2);

    console.log(halfLength);
    return [
      (this.props.propertyInfo.coordinates[0][0] +
        this.props.propertyInfo.coordinates[halfLength][0]) /
        2.0,
      (this.props.propertyInfo.coordinates[0][1] +
        this.props.propertyInfo.coordinates[halfLength][1]) /
        2.0,
    ];
  }

  render() {
    return (
      <React.Fragment>
        <GeoJSONLayer
          data={{
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "LineString",
                  coordinates: this.props.propertyInfo.coordinates,
                },
              },
            ],
          }}
          linePaint={{
            "line-color": "green",
            "line-width": 2,
          }}
        />
        <Marker coordinates={this.placeMiddle()}>
          <button
            onClick={() => {
              this.props.viewAddressInfo(this.props.propertyInfo.title_no);
            }}
          >
            {this.props.propertyInfo.title_no}
          </button>
        </Marker>
      </React.Fragment>
    );
  }
}

export default connect(null, { viewAddressInfo })(Property);
