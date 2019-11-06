import React, {Component} from 'react';
import { Marker, Popup } from 'react-mapbox-gl';


class Nodal extends Component 
{
    constructor(props){
        super(props);
        this.state = {
            display: false,
        }

        this.toggleDisplay  = this.toggleDisplay.bind(this);
        this.openPopup      = this.openPopup.bind(this);
    }

    getStyleByType(type){
        const redStyle = {
            color: 'red',
            zIndex: this.state.display? 4 : 3,
        }
        const blueStyle = {
            color: 'blue',
            zIndex: this.state.display? 4 : 3,
            borderRadius: 0,
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

    toggleDisplay(){
        if(this.state.display)
            this.setState({
                display: false
            })
        else
            this.setState({
                display: true
            })
    }

    openPopup(){
        if(this.state.display)
            return <div className ="Popup">
                        <h1>{this.props.name}</h1>
                        <p>{this.props.addressLine1}</p>
                        <p>{this.props.addressLine2}</p>
                        <p>{this.props.addressLine3}</p>
                        <p>{this.props.addressLine4}</p>
                        <p>{this.props.postcode}</p>
                        <p>{this.props.subcat}</p>
                        <p>{this.props.telephone}</p>
                        <p>{this.props.website}</p>
                    </div>;
        return;
    }

    render(){

        return (        
        <Marker style = { this.getStyleByType(this.props.type) } coordinates = {this.props.location} className =  "Marker" onClick={this.toggleDisplay}>
            {this.openPopup()}
         </Marker>
        )

    }
}

export default Nodal;