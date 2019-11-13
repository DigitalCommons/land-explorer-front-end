import React, {Component} from 'react';
import { Marker, Popup } from 'react-mapbox-gl';


class Nodal extends Component 
{
    constructor(props){
        super(props);
        this.state = {
            display: false,
        }

        this.SetDisplay  = this.SetDisplay.bind(this);
        this.openPopup   = this.openPopup.bind(this);
        this.closePopup  = this.closePopup.bind(this);
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

   
   

    SetDisplay()
    {
        this.setState ({ display : true});
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

                        <input type = "checkbox" id = "MoreInfo" className= "Info"  />
                        
                        <p className = "wrapper">
                        <span className = "ReadMore">  Opening Times </span>
                        <span className = "ReadMore">  Capacity </span>
                        <span className = "ReadMore">  Rooms/sizes/rates </span>
                        </p>
                        
                        <label htmlFor ="MoreInfo" className = "More" />
                        
                    </div>;
        return;
    }
    
    closePopup()
    {
        this.setState ({ display : false});

        console.log("Closed");
    }

    

    render(){

        return (        
        <Marker style = { this.getStyleByType(this.props.type) }  coordinates = {this.props.location} className =  "fa fa-map-marker" onClick={this.SetDisplay}>
            {this.openPopup()}
            {/* <Popup style = { this.getStyleByType(this.props.type) }  coordinates = {this.props.location}>
                </Popup> */}
         </Marker>
        )

    }
}

export default Nodal;