import React, {Component} from 'react';
import NavTray from './NavTray';
import {turnOnLayer, turnOffLayer} from '../actions/CommunityAssetsActions';
import { connect } from 'react-redux';

class NavCommunityAssets extends Component {
    constructor(props){
        super(props);

        this.communitySpaceOn   =    this.communitySpaceOn.bind(this);
        this.communitySpaceOff  =    this.communitySpaceOff.bind(this);
        this.publicOn   =    this.publicOn.bind(this);
        this.publicOff  =    this.publicOff.bind(this);
        this.communityBusinessOn = this.communityBusinessOn.bind(this);
        this.communityBusinessOff = this.communityBusinessOff.bind(this);
        this.voluntarySectorOn =    this.voluntarySectorOn.bind(this);
        this.voluntarySectorOff =   this.voluntarySectorOff.bind(this);
    
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

    communityBusinessOn(){
        this.props.turnOnLayer("Community Business");
        return;
    }

    communityBusinessOff(){
        this.props.turnOffLayer("Community Business");
        return;
    }

    voluntarySectorOn(){
        this.props.turnOnLayer("Voluntary Sector");
        return;
    }

    voluntarySectorOff(){
        this.props.turnOffLayer("Voluntary Sector");
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
                <button onClick={this.publicOn}>Turn on Public LAYER</button>
                <button onClick={this.publicOff}>Turn off Public LAYER</button>
                <button onClick={this.communityBusinessOn}>Turn on Community Business LAYER</button>
                <button onClick={this.communityBusinessOff}>Turn off Community Business LAYER</button>
                <button onClick={this.voluntarySectorOn}>Turn on Voluntary Sector LAYER</button>
                <button onClick={this.voluntarySectorOff}>Turn off Voluntary Sector LAYER</button>


            </NavTray>
        );
    }
}

export default connect(null,{turnOnLayer,turnOffLayer})(NavCommunityAssets);