import React, { Component } from "react";
import { connect } from "react-redux";
import { addMarker, clearMarkers } from "../actions/ForSaleActions";

class ForSaleMarkers extends Component {
  constructor(props) {
    super(props);

    this.dispatchItem = this.dispatchItem.bind(this);
  }

  dispatchItem() 
{
    let markers = this.props.properties;
      


     if (this.props.active =='For Sale')
     {
    
      for (let i = 0; i < markers.length; i++) 
      {
        this.props.addMarker(markers[i]);
      }
     
    }

    else 
    {
      this.props.clearMarkers();
      console.log("Live goes on despite Darkness!")
      
    }
   }   
  

  render() {
    return <span>{this.dispatchItem()}</span>;
  }
}



const mapStateToProps = ({navigation}) => ({
 
  active: navigation.active,
  
});
export default connect(mapStateToProps ,{ addMarker, clearMarkers })(ForSaleMarkers);
