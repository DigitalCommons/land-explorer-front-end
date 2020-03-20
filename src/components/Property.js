import React, { Component } from "react";
import { GeoJSONLayer, Marker } from "react-mapbox-gl";

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
                  coordinates: this.props.propertyInfo.coordinates
                }
              }
            ]
          }}
          linePaint={{
            "line-color": "red",
            "line-width": 10
          }}
        />
        <Marker coordinates={this.props.propertyInfo.coordinates[0]}>
          <button>see info</button>
        </Marker>
      </React.Fragment>
    );
  }
}

export default Property;
