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

    getStyleByType(type){
        const redStyle = {
            backgroundColor: 'red',
            zIndex: this.state.display? 4 : 3,
        }
        const blueStyle = {
            backgroundColor: 'blue',
            zIndex: this.state.display? 4 : 3,
        }
        const greenStyle = {
            backgroundColor: 'green',
            zIndex: this.state.display? 4 : 3,
        }
        const orangeStyle = {
            backgroundColor: 'orange',
            zIndex: this.state.display? 4 : 3,
        }

        switch (type){
            case "1": return redStyle;
            case "2": return blueStyle;
            case '4': return greenStyle;
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
            return <div>
                        <h1>{this.props.name}</h1>
                        <p>{this.props.subcat}</p>
                        <p>{this.props.telephone}</p>
                        <p>{this.props.ward}</p>
                    </div>;
        return;
    }

    render(){
        return <Popup
            style = {this.getStyleByType(this.props.type)}
            coordinates={this.props.location}
            offset={{
              'bottom-left': [12, -38],  'bottom': [0, -38], 'bottom-right': [-12, -38]
            }}
            onClick={this.toggleDisplay}
            >
            {this.openPopup()}
          </Popup>
    }
}

export default Nodal;