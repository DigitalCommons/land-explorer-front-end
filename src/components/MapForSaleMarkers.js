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


  PriceModal()
  { 
    
   if(this.props.markerInformationSet.length > 0)
   {
     console.log('price has to be paid ');
    for(let i =0; i<this.props.markerInformationSet.length;i++)
    {
      console.log(this.props.markerInformationSet[i].price);
     
      return(
        <main className = "PriceModal">
        <div>{this.props.markerInformationSet[i].price}</div>
        <div className ="ModalPointer"></div>
        </main>
        
      )
     
    }
    
  
  }
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
            style={{ height: "40px", zIndex: 1 }}
          >

        <main className = "PriceModal">
        <div>{ `£ ${this.props.markerInformationSet[i].price}` }</div>
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
    let { markerInformationSet } = this.props;
    if (markerInformationSet)
      return (
        <React.Fragment>
          {this.createMarkers()}
          {this.sendDetailsToNav()}
          
        </React.Fragment>
      );
    return null;
  }
}

const mapStateToProps = ({ forSale }) => ({
  markerInformationSet: forSale.markerInformationSet
});

export default connect(mapStateToProps, { postCurrentView })(MapForSaleMarkers);