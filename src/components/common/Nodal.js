import React, {Component} from 'react';
import { Marker, Popup } from 'react-mapbox-gl';
import {connect} from 'react-redux';


class Nodal extends Component 
{
    constructor(props){
        super(props);
        this.state = {
            display: false,
            checkBoxState : false,
        }

        this.SetDisplay  = this.SetDisplay.bind(this);
        this.openPopup   = this.openPopup.bind(this);
        this.closePopup  = this.closePopup.bind(this);
        this.ReadMore = this.ReadMore.bind(this);
        this.ReadLess = this.ReadLess.bind(this)
    }

    getStyleByType(type){
        const redStyle = {
            color: 'red',
            zIndex: this.state.display? 4 : 3,
        }
        const blueStyle = {
            color: 'blue',
            zIndex: this.state.display? 4 : 3,
            
        }
        const purpleStyle = {
            color: 'purple',
            zIndex: this.state.display? 4 : 3,
        }
        const greenStyle = {
            color: 'green',
            zIndex: this.state.display? 4 : 3,
        }
        const brownStyle = {
            color: 'brown',
            zIndex: this.state.display? 4 : 3,
        }
        const greyStyle = {
            
            color: 'grey',
            zIndex: this.state.display? 4 : 3,
        }
        const orangeStyle = {
            color: 'orange',
            zIndex: this.state.display? 4 : 3,
        }

        switch (type){
            case "1": return redStyle;
            case "2": return blueStyle;
            case "3": return purpleStyle;
            case "4": return greenStyle;
            case "5": return brownStyle;
            case "6": return greyStyle;
            case "7": return orangeStyle;
        }
    }

    
   
    ReadMore() 
     {
   this.setState({ checkBoxState:true  });
     }

     ReadLess()
     {
        this.setState({ checkBoxState: false  });
     }

     ExtraInfo()
     {
         return( 
         <div>
            <p> Opening Times </p>
            
            <p> Capacity </p>
           
            <p> Telephone No </p>
           
            <p> Contact Name </p>
           
            <p> Email Address </p>

{/* if() */}
 {/* <button  id = "MoreInfo"   onClick = { this.ReadLess}  className = "Info">Read Less </button> */}
        </div> 
        
    )
     }


    SetDisplay()
    {
        const {display} = this.state;
        this.setState ({ display : true});
    }

    closePopup()
    {
        const {display} = this.state;
        this.setState ({ display : false});

        alert(display);
    }


    openPopup(){

        if(this.state.display)
            return <div className = "Popup">
                        <button onClick = {this.closePopup}>X</button>
                        <h2>{this.props.name}</h2>
                        <p>{this.props.addressLine1}</p>
                        <p>{this.props.addressLine2}</p>
                        <p>{this.props.addressLine3}</p>
                        <p>{this.props.addressLine4}</p>
                        <p>{this.props.postcode}</p>
                        <p>{this.props.subcat}</p>
                        <p>{this.props.telephone}</p>
                        <p>{this.props.website}</p>

                        
     { this.state.checkBoxState ?this.ExtraInfo()  : <button  id = "MoreInfo"   onClick = { this.ReadMore} onDoubleClick = {this.ReadLess}  className = "Info">
      Less
      </button>}
 
 
                        
    </div>;
        return;
    }
    
 
    
    render(){
        return (        
        <Marker style = { this.getStyleByType(this.props.type) }  coordinates = {this.props.location} className =  "fa fa-map-marker" onClick={this.SetDisplay} >
            {this.openPopup()}
            
         </Marker>
        )
    }
}

const mapStateToProps = ({ nodal }) => ({
    activeNodal: nodal.activeNodal,
});

export default connect(mapStateToProps)(Nodal);