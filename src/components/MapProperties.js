import React, { Component } from "react";
import { connect } from "react-redux";
import Property from "../components/Property";
import axios from "axios";
import constants from "../constants";
import { getAuthHeader } from "./Auth";

class MapProperties extends Component {
  constructor(props) {
    super(props);

    this.state = {
      propertiesArray: [],
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps != this.props) {
      console.log("cdu");
      if (this.props.displayActive) this.getProperties();
    }
  }

  async getProperties() {
    const mapBoundaries = this.props.map.getBounds();

    axios
      .get(
        `${constants.ROOT_URL}/api/ownership/?sw_lng=` +
          mapBoundaries._sw.lng +
          "&sw_lat=" +
          mapBoundaries._sw.lat +
          "&ne_lng=" +
          mapBoundaries._ne.lng +
          "&ne_lat=" +
          mapBoundaries._ne.lat,
        getAuthHeader()
      )
      .then((response) => {
        let array = [];

        response.data = response.data.slice(0,100);

        response.data.map((property) => {
          let json = JSON.parse(property.geojson);
          property.coordinates = json.coordinates[0];
          array.push(property);
        });

        console.log(array);

        if (array.length > 0)
          this.setState({
            propertiesArray: array,
          });
      });

    /*
    propertiesArray = [
      {
        id: 1,
        poly_id: "19786272",
        title_no: "AV7150",
        rec_status: "A",
        estate_intrst_code: null,
        class_title_code: null,
        pend_nt_code: null,
        uprn: null,
        coordinates: [
          [-2.5746523067064, 51.486529542481],
          [-2.5745856248021, 51.486495250861],
          [-2.5744979252892, 51.486450272031],
          [-2.5742058499061, 51.486301539773],
          [-2.5741928152305, 51.486295758937],
          [-2.5741877967697, 51.486292951098],
          [-2.5741429434818, 51.486330432583],
          [-2.574159525248, 51.486339981596],
          [-2.5744168168972, 51.486471350378],
          [-2.5745371287471, 51.486532804292],
          [-2.5746045250943, 51.48656664285],
          [-2.5746523067064, 51.486529542481],
        ],
      },
      {
        id: 11227,
        poly_id: "19786032",
        title_no: "BL40856",
        rec_status: "A",
        estate_intrst_code: null,
        class_title_code: null,
        pend_nt_code: null,
        uprn: null,
        coordinates: [
          [-2.5745856248021, 51.486495250861],
          [-2.5746523067064, 51.486529542481],
          [-2.5747036433958, 51.486488827962],
          [-2.5746376928877, 51.486455431965],
          [-2.5745159353141, 51.486393535647],
          [-2.5742376319123, 51.486251929422],
          [-2.5742255093101, 51.486261430136],
          [-2.5741877967697, 51.486292951098],
          [-2.5741928152305, 51.486295758937],
          [-2.5742058499061, 51.486301539773],
          [-2.5744979252892, 51.486450272031],
          [-2.5745856248021, 51.486495250861],
        ],
      },
      {
        id: 11270,
        poly_id: "19786541",
        title_no: "BL19048",
        rec_status: "A",
        estate_intrst_code: null,
        class_title_code: null,
        pend_nt_code: null,
        uprn: null,
        coordinates: [
          [-2.5746045250943, 51.48656664285],
          [-2.5745371287471, 51.486532804292],
          [-2.5744168168972, 51.486471350378],
          [-2.574159525248, 51.486339981596],
          [-2.5741429434818, 51.486330432583],
          [-2.5740950970962, 51.486370419421],
          [-2.5741117603685, 51.486378430449],
          [-2.574126257785, 51.486386002488],
          [-2.5744016644211, 51.486526274397],
          [-2.5744886326124, 51.486570357703],
          [-2.5745553145544, 51.486604649377],
          [-2.5746045250943, 51.48656664285],
        ],
      },
    ];*/
  }

  createProperties() {
    let properties = [];

    if (this.state.propertiesArray.length > 0)
      this.state.propertiesArray.map((propertyInfo) =>
        properties.push(<Property propertyInfo={propertyInfo} />)
      );

    return properties;
  }

  render() {
    if (this.props.displayActive && this.props.zoom >= 18)
      return <React.Fragment>{this.createProperties()}</React.Fragment>;
    else return null;
  }
}

const mapStateToProps = ({ landOwnership, map }) => ({
  displayActive: landOwnership.displayActive,
  zoom: map.zoom,
});

export default connect(mapStateToProps)(MapProperties);
