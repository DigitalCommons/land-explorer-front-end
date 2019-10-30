import React, {Component} from 'react';
import NavTray from './NavTray';
import {turnOnLayer, turnOffLayer} from '../actions/CommunityAssetsActions';
import { connect } from 'react-redux';

class NavCommunityAssets extends Component {
    constructor(props){
        super(props);

        this.buttonHandlerOn    =       this.buttonHandlerOn.bind(this);
        this.buttonHandlerOff   =       this.buttonHandlerOff.bind(this);
    
    }

    buttonHandlerOn(event){
        this.props.turnOnLayer(event.target.value);
    }

    buttonHandlerOff(event){
        this.props.turnOffLayer(event.target.value);
    }

    render(){
        return(
            <NavTray
                title="Community Assets"
                open={this.props.open && this.props.active === 'Community Assets'}
                onClose={this.props.onClose}
            >
                <button onClick={this.buttonHandlerOn} value="Community Space">Turn ON Community Space</button>
                <button onClick={this.buttonHandlerOff}value="Community Space">Turn OFF Community Space</button>
                <button onClick={this.buttonHandlerOn} value="Public">Turn ON Public</button>
                <button onClick={this.buttonHandlerOff}value="Public">Turn OFF Public</button>
                <button onClick={this.buttonHandlerOn} value="Sports Leisure">Turn ON Sports Leisure</button>
                <button onClick={this.buttonHandlerOff}value="Sports Leisure">Turn OFF Sports Leisure</button>
                <button onClick={this.buttonHandlerOn} value="Community Business">Turn ON Community Business</button>
                <button onClick={this.buttonHandlerOff}value="Community Business">Turn OFF Community Business</button>
                <button onClick={this.buttonHandlerOn} value="Business Night">Turn ON Business Night</button>
                <button onClick={this.buttonHandlerOff}value="Business Night">Turn OFF Business Night</button>
                <button onClick={this.buttonHandlerOn} value="Business">Turn ON Business</button>
                <button onClick={this.buttonHandlerOff}value="Business">Turn OFF Business</button>
                <button onClick={this.buttonHandlerOn} value="Voluntary Sector">Turn ON Voluntary Sector</button>
                <button onClick={this.buttonHandlerOff}value="Voluntary Sector">Turn OFF Voluntary Sector</button>


            </NavTray>
        );
    }
}

export default connect(null,{turnOnLayer,turnOffLayer})(NavCommunityAssets);