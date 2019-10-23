import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Marker } from 'react-mapbox-gl';

class MapCommunityAssets extends Component {
    constructor(props){
        super(props);
        this.state = {
            count: 0
        }
        
    }
    
    getCommunitySpaces(){
        const markerIcon = require('../assets/img/icon-marker-new--dark-grey.svg');

        let spaces = [
            <Marker
                    key={546}
                    coordinates = {[-1.6118509274478185, 54.973665159663256]}
                    name={'Tyneside Cinema'}
                    description={'great description'}
                    anchor="bottom"
                    style={{ height: '40px', zIndex: 1}}
                        >
                       <img src={ markerIcon } alt=""
                            style={{
                                height: 40,
                                width: 40,
                                zIndex: 1
                            }}
                        />
                </Marker>,
        ]

        return spaces;
    }

    getPublic(){
        const markerIcon = require('../assets/img/icon-marker-new--dark-grey.svg');

        let spaces = [
            <Marker
                    key={546}
                    coordinates = {[-1.6118509274478185, 54.913665159663256]}
                    name={'Tyneside Cinema'}
                    description={'great description'}
                    anchor="bottom"
                    style={{ height: '40px', zIndex: 1}}
                        >
                       <img src={ markerIcon } alt=""
                            style={{
                                height: 40,
                                width: 40,
                                zIndex: 1
                            }}
                        />
                </Marker>,
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
        console.log(this.state.count);

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