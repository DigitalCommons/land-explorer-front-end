import React, {Component} from 'react';
import { connect } from 'react-redux';
import Nodal from './common/Nodal';
import { Marker } from 'react-mapbox-gl';
import {communitySpace, publicLayer, communityBusiness, voluntarySector} from '../data/councilAssets';

class MapCommunityAssets extends Component {
    constructor(props){
        super(props);
        this.state = {
            count: 0
        }

        this.createNodal = this.createNodal.bind(this);
        
    }
    
    getCommunitySpaces(){
        return communitySpace.map(this.createNodal);;
    }

    getPublic(){
        return publicLayer.map(this.createNodal);
    }

    getCommunityBusiness(){
        return communityBusiness.map(this.createNodal);
    }

    getVoluntarySector(){
        return voluntarySector.map(this.createNodal);
    }

    createNodal(communityAsset){
        return <Nodal
                    type = {communityAsset.Layer.slice(0,1)}
                    location = {[communityAsset.long,communityAsset.lat]}
                    name = {communityAsset.Name}
                    subcat = {communityAsset["Sub Cat"]}
                    key = {this.state.count++}
                    telephone = {communityAsset["Telephone No."]}
                />
    }

    createNodes(){
        
        let nodes = [];

        if(this.props.activeCommunityAssets.includes("Community Space")){
            nodes.push(this.getCommunitySpaces())
        }

        if(this.props.activeCommunityAssets.includes("Public")){
            nodes.push(this.getPublic())
        }

        if(this.props.activeCommunityAssets.includes("Community Business")){
            nodes.push(this.getCommunityBusiness())
        }

        if(this.props.activeCommunityAssets.includes("Voluntary Sector")){
            nodes.push(this.getVoluntarySector())
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