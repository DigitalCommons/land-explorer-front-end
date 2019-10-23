import React, {Component} from 'react';
import { Marker } from 'react-mapbox-gl';

class Nodal extends Component {
    getIconByType(type){
        const icon1 = require('../../assets/img/icon-marker-red.svg');
        const icon2 = require('../../assets/img/icon-marker-blue.svg');

        switch (type){
            case 1: return icon1;
            case 2: return icon2;
        }
    }

    render(){
        
        return <Marker
        key={546}
        coordinates = {this.props.location}
        name={'Tyneside Cinema'}
        description={'great description'}
        anchor="bottom"
        style={{ height: '40px', zIndex: 1}}
            >
           <img src={ this.getIconByType(this.props.type) } alt=""
                style={{
                    height: 40,
                    width: 40,
                    zIndex: 1
                }}
            />
    </Marker>
    }
}

export default Nodal;