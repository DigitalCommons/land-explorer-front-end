import React, {Component} from 'react';
import { connect } from 'react-redux';
import Nodal from './common/Nodal';
import { Marker } from 'react-mapbox-gl';

class MapCommunityAssets extends Component {
    constructor(props){
        super(props);
        this.state = {
            count: 0
        }
        
    }
    
    getCommunitySpaces(){
        
        let spaces = [
            <Nodal 
                type = {1}
                location = {[-1.6118509274478185, 54.973665159663256]}
                key = {343}
                info = "Vegetarian cafe opens 7pm"
            />,
        ]

        return spaces;
    }

    getPublic(){
        
        let spaces = [
            <Nodal 
                type = {2}
                location = {[-1.6118509274478185, 54.913665159663256]}
                key = {345}
                info = "The Police"
            />,
        ]

        return spaces;
    }

    createNodes(){
        
        let nodes = [];

        if(this.props.activeCommunityAssets.includes("Community Space")){
            nodes.push(this.getCommunitySpaces())
        }

        if(this.props.activeCommunityAssets.includes("Public")){
            nodes.push(this.getPublic())
        }


        return nodes;
    }

    render(){

        return (
            <React.Fragment>
                {this.createNodes()}
            </React.Fragment>
        );
    }
}

MapCommunityAssets.propTypes = {

};

const mapStateToProps = ({ communityAssets }) => ({
    activeCommunityAssets: communityAssets.activeCommunityAssets,
});

export default connect(mapStateToProps)(MapCommunityAssets);