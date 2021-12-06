import React, { Component } from "react";
import { connect } from "react-redux";
import { GeoJSONLayer, Marker } from "react-mapbox-gl";
import { viewAddressInfo, highlightProperty } from "../actions/LandOwnershipActions";

class Property extends Component {
  constructor(props) {
    super(props);

    this.highlightProperty = this.highlightProperty.bind(this);
  }

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

  highlightProperty() {
    this.props.highlightProperty(this.props.propertyInfo);
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
          lineOnClick={this.highlightProperty}
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
                "fill-opacity": 0.15,
              }
              :
              {
                "fill-color": "orange",
                "fill-opacity": 0.15,
              }
          }
          fillOnClick={this.highlightProperty}
        />
        <Marker coordinates={this.placeMiddle()}>
          <p className={"property-id-number" + (this.props.highlight ? " highlighted" : "")} onClick={this.highlightProperty}>{this.props.propertyInfo.poly_id}</p>
        </Marker>
      </React.Fragment>
    );
  }
}

export default connect(null, { viewAddressInfo, highlightProperty })(Property);
