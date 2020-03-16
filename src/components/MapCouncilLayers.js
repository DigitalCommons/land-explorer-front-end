import React, { Component } from "react";
import { GeoJSONLayer, Marker } from "react-mapbox-gl";
import {
  stHelens,
  golborne,
  dalgarno,
  nottingDale,
  colville,
  norland,
  pembridge,
  holland,
  campden,
  abingdon,
  queensGate,
  earlsCourt,
  courtfield,
  bromptonAndHansTown,
  redcliffe,
  stanley,
  chelseaRiverside,
  royalHospital
} from "../data/wardOutlines";

class MapCouncilLayers extends Component {
  constructor(props) {
    super(props);

    this.createGeoJSONLayer = this.createGeoJSONLayer.bind(this);
  }

  createGeoJSONLayer(boundary) {
    return (
      <GeoJSONLayer
        data={{
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates: boundary
              }
            }
          ]
        }}
        linePaint={{
          "line-color": "grey",
          "line-width": this.props.zoom > 15 ? 5 : 2
        }}
      />
    );
  }

  createLabel(label) {
    //add if the label is visible or not based on its coordinates and the open map

    return (
      <Marker coordinates={label.coordinates}>
        <h1>{label.name}</h1>
      </Marker>
    );
  }
  render() {
    let wardBoundaries = [
      stHelens,
      golborne,
      dalgarno,
      nottingDale,
      colville,
      norland,
      pembridge,
      holland,
      campden,
      abingdon,
      queensGate,
      earlsCourt,
      courtfield,
      bromptonAndHansTown,
      redcliffe,
      stanley,
      chelseaRiverside,
      royalHospital
    ];

    let wardNames = [
      { name: "St Helen's", coordinates: ["-0.220544", "51.524929"] },
      { name: "Golborne", coordinates: ["-0.207939", "51.522323"] },
      { name: "Dalgarno", coordinates: ["-0.217240", "51.517794"] },
      { name: "Notting Dale", coordinates: ["-0.213941", "51.511803"] },
      { name: "Colville", coordinates: ["-0.202294", "51.515883"] },
      { name: "Norland", coordinates: ["-0.213623", "51.506567"] },
      { name: "Pembridge", coordinates: ["-0.198597", "51.511169"] },
      { name: "Holland", coordinates: ["-0.206638", "51.501232"] },
      { name: "Campden", coordinates: ["-0.195197", "51.504216"] },
      { name: "Abingdon", coordinates: ["-0.194988", "51.497828"] },
      { name: "Queen's Gate", coordinates: ["-0.184237", "51.498497"] },
      { name: "Earl's Court", coordinates: ["-0.193405", "51.491410"] },
      { name: "Courtfield", coordinates: ["-0.180079", "51.492860"] },
      {
        name: "Brompton and Hans Town",
        coordinates: [" -0.164959", "51.495764"]
      },
      { name: "Redcliffe", coordinates: [" -0.186794", "51.487586"] },
      { name: "Stanley", coordinates: [" -0.174044", "51.487041"] },
      { name: "Chelsea Riverside", coordinates: ["-0.17", "51.483368"] },
      { name: "Royal Hospital", coordinates: [" -0.161159", "51.488852"] }
    ];

    return (
      <React.Fragment>
        {wardBoundaries.map(this.createGeoJSONLayer)}
        {wardNames.map(this.createLabel)}
      </React.Fragment>
    );
  }
}

export default MapCouncilLayers;
