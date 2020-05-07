import React, { Component } from "react";
import { connect } from "react-redux";
import { GeoJSONLayer, Marker } from "react-mapbox-gl";
import { viewAddressInfo } from "../actions/LandOwnershipActions";

class Property extends Component {
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
            "line-color": "red",
            "line-width": 4,
          }}
        />
        <Marker coordinates={this.props.propertyInfo.coordinates[0]}>
          <button
            onClick={() => {
              this.props.viewAddressInfo(this.props.propertyInfo.address);
            }}
          >
            see info on {this.props.propertyInfo.address}
          </button>
        </Marker>
      </React.Fragment>
    );
  }
}

export default connect(null, { viewAddressInfo })(Property);
