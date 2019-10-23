import React, {Component} from 'react';
import NavTray from './NavTray';
import NavTrayItem from './common/NavTrayItem';
import Draggable from './Draggable';
import {turnOnLayer, turnOffLayer} from '../actions/CommunityAssetsActions';
import { connect } from 'react-redux';

class NavCommunityAssets extends Component {
    constructor(props){
        super(props);

        this.doDispatch = this.doDispatch.bind(this);
        this.clearLayer = this.clearLayer.bind(this);
    }

    doDispatch(){
        this.props.turnOnLayer("new nodes");
        return;
    }

    clearLayer(){
        this.props.turnOffLayer("new nodes");
        return;
    }

    render(){
        return(
            <NavTray
                title="Community Assets"
                open={this.props.open && this.props.active === 'Community Assets'}
                onClose={this.props.onClose}
            >
                <button onClick={this.doDispatch}>TURN ON LAYER</button>
                <button onClick={this.clearLayer}>TURN OFF LAYER</button>
                

            </NavTray>
        );
    }
}

export default connect(null,{turnOnLayer,turnOffLayer})(NavCommunityAssets);