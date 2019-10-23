import React, {Component} from 'react';
import { Marker, Popup } from 'react-mapbox-gl';

class Nodal extends Component {
    constructor(props){
        super(props);
        this.state = {
            display: false,
        }

        this.toggleDisplay  = this.toggleDisplay.bind(this);
        this.openPopup      = this.openPopup.bind(this);
    }

    getIconByType(type){
        const icon1 = require('../../assets/img/icon-marker-red.svg');
        const icon2 = require('../../assets/img/icon-marker-blue.svg');

        switch (type){
            case 1: return icon1;
            case 2: return icon2;
        }
    }

    getStyleByType(type){
        const redStyle = {
            backgroundColor: 'red'
        }
        const blueStyle = {
            backgroundColor: 'blue'
        }

        switch (type){
            case 1: return redStyle;
            case 2: return blueStyle;
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
            return [<h1>{this.props.info}</h1>];
        return;
    }

    render(){
        return <Popup
            coordinates={this.props.location}
            offset={{
              'bottom-left': [12, -38],  'bottom': [0, -38], 'bottom-right': [-12, -38]
            }}
            onClick={this.toggleDisplay}
            style = {this.getStyleByType(this.props.type)}>
            {this.openPopup()}
          </Popup>
    }
}

export default Nodal;