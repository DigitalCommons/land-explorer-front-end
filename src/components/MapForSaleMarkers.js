import React, { Component } from "react";
import { connect } from "react-redux";
import { Marker,Popup } from "react-mapbox-gl";
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
          <div>
          <Marker
            key={546 + i}
            coordinates={markerInformationSet[i].location}
            price = {markerInformationSet[i].price}
            name={"Tyneside Cinema"}
            description={"great description"}
            anchor="bottom"
            style={{ height: "10px", zIndex: 1,color:"white" }}
          >

            {console.log(markerInformationSet[i].price)}
            <img
              src={markerIcon}
              alt=""
              style={{
                height: 40,
                width: 40,
                zIndex: 1
              }}
            />
            
          </Marker>
          
            <Popup  className ="mapboxgl-popup"coordinates = {markerInformationSet[i].location} > {`£ ${markerInformationSet[i].price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`}</Popup>
          
          </div>
        );

    return markers;
   
    
 
  }

  // PriceModal()
  // {
  //   // console.log(this.props.price);
  //   console.log(this.props.price)
  // }
  render() {
    let { markerInformationSet } = this.props;
    if (markerInformationSet)
      return (
        <React.Fragment>
          {this.createMarkers()}
          {this.sendDetailsToNav()}
          {/* {this.PriceModal()} */}
          
        </React.Fragment>
      );
    return null;
  }
}

const mapStateToProps = ({ forSale }) => ({
  markerInformationSet: forSale.markerInformationSet,
  location: forSale.markerInformationSet.location,
  price:   forSale.markerInformationSet.price
});

export default connect(mapStateToProps, { postCurrentView })(MapForSaleMarkers);
