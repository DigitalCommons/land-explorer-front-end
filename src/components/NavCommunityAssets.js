import React, {Component} from 'react';
import NavTray from './NavTray';
import {turnOnLayer, turnOffLayer} from '../actions/CommunityAssetsActions';
import { connect } from 'react-redux';

class NavCommunityAssets extends Component {
    constructor(props){
        super(props);

        this.communitySpaceOn   =    this.communitySpaceOn.bind(this);
        this.communitySpaceOff  =    this.communitySpaceOff.bind(this);
    }

    communitySpaceOn(){
        this.props.turnOnLayer("Community Space");
        return;
    }

    communitySpaceOff(){
        this.props.turnOffLayer("Community Space");
        return;
    }

    publicOn(){
        this.props.turnOnLayer("Public");
        return;
    }

    publicOff(){
        this.props.turnOffLayer("Public");
        return;
    }

    render(){
        return(
            <NavTray
                title="Community Assets"
                open={this.props.open && this.props.active === 'Community Assets'}
                onClose={this.props.onClose}
            >
                <button onClick={this.communitySpaceOn}>Turn on Community Space LAYER</button>
                <button onClick={this.communitySpaceOff}>Turn off Community Space LAYER</button>
                

            </NavTray>
        );
    }
}

export default connect(null,{turnOnLayer,turnOffLayer})(NavCommunityAssets);