import React, { Component } from "react";
import { connect } from "react-redux";
import { Marker } from "react-mapbox-gl";
import { postCurrentView } from "../actions/ForSaleActions";

class MapForSaleMarkers extends Component {
  constructor(props) {
    super(props);
  }


  sendDetailsToNav() {
    let output = {};

    output.center = this.props.center;

    if (this.props.map) {
      output.bounds = this.props.map.getBounds();
    }

    this.props.postCurrentView(output);
  }


  createMarkers() {
    let { markerInformationSet } = this.props;
    const markerIcon = require("../assets/img/icon-marker-new--dark-grey.svg");

    let markers = [];

    if (markerInformationSet.length > 0)
      for (let i = 0; i < markerInformationSet.length; i++)
     
        markers.push(

          <Marker
            key={546 + i}
            coordinates={markerInformationSet[i].location}
            name={"Tyneside Cinema"}
            description={"great description"}
            anchor="bottom"
            style={{  zIndex: 1, marginLeft: "-83px",paddingBottom :  "47px"}}
            className = "PriceMarker"
          >

        <main className = "PriceModal">
        <div>{ `£ ${this.props.markerInformationSet[i].price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}` }</div>
        <div className ="ModalPointer"></div>
        </main>
         
{/* 
            {/* <img

              src={markerIcon}
              alt=""
              style={{
                height: 40,
                width: 40,
                zIndex: 1
              }}
            /> */}
          </Marker>
        );
        
    return markers;
  }



  render() {
    let { markerInformationSet, active } = this.props;
    if (markerInformationSet && active == "For Sale")
      return (
        <React.Fragment>
          {this.createMarkers()}
          {this.sendDetailsToNav()}
          
        </React.Fragment>
      );
    return null;
  }
}

const mapStateToProps = ({ navigation, forSale }) => ({
  markerInformationSet: forSale.markerInformationSet,
  active: navigation.active,
});

export default connect(mapStateToProps, { postCurrentView })(MapForSaleMarkers);