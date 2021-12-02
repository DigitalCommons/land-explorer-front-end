import React, { Component } from "react";
import { connect } from "react-redux";
import { GeoJSONLayer, Marker } from "react-mapbox-gl";
import { viewAddressInfo, highlightProperty } from "../actions/LandOwnershipActions";

class Property extends Component {
  placeMiddle() {

    let halfLength = Math.floor(this.props.propertyInfo.coordinates.length / 2);
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
          linePaint={this.props.highlight ?
            {
              "line-color": "red",
              "line-width": 3,
            }
            :
            {
              "line-color": "green",
              "line-width": 2,
            }}
          lineOnClick={e => {
            console.log("clicked on property")
            this.props.highlightProperty(this.props.propertyInfo);
          }}
        />
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
          fillPaint={this.props.highlight ?
            {
              "fill-color": "red",
              "fill-opacity": 0.05,
            }
            :
            this.props.propertyInfo.date_proprietor_added ?
              {
                "fill-color": "green",
                "fill-opacity": 0.05,
              }
              :
              {
                "fill-color": "orange",
                "fill-opacity": 0.05,
              }
          }
          fillOnClick={() => {
            this.props.highlightProperty(this.props.propertyInfo);
          }}
        />
        <Marker coordinates={this.placeMiddle()}>
          <p>{this.props.propertyInfo.poly_id}</p>
        </Marker>
      </React.Fragment>
    );
  }
}

export default connect(null, { viewAddressInfo, highlightProperty })(Property);
