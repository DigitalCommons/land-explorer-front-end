import React, {Component} from 'react';
import { connect } from 'react-redux';
import Nodal from './common/Nodal';

import axios from 'axios';
import {getAuthHeader} from "./Auth";
import constants from '../constants';

import {Marker,Cluster} from 'react-mapbox-gl';
import {communitySpace,
        publicLayer,
        sportsLeisure,
        communityBusiness,
        businessNight,
        business,
        voluntarySector, } from '../data/councilAssetsNew';

class MapCommunityAssets extends Component {
    constructor(props){
        super(props);
        this.state = {
            checkBoxState : false,
            clickZoom : true,
            radius : 30,
        }        

        this.createNodal = this.createNodal.bind(this);
        this.createNodalBackEnd = this.createNodalBackEnd.bind(this);
        
        this.openPopup              = this.openPopup.bind(this);
        this.displayInfoIfActive    = this.displayInfoIfActive.bind(this);
        this.closePopup             = this.closePopup.bind(this);
        this.readMore               = this.readMore.bind(this);
        this.readLess               = this.readLess.bind(this)
        
    }

    getImgByType(type){
        const redMarker = require('../assets/img/icon-community-asset-red.svg');
        const blueMarker =  require('../assets/img/icon-community-asset-blue.svg');
        const purpleMarker = require('../assets/img/icon-community-asset-purple.svg');
        const greenMarker = require('../assets/img/icon-community-asset-green.svg');
        const brownMarker = require('../assets/img/icon-community-asset-brown.svg');
        const greyMarker = require('../assets/img/icon-community-asset-grey.svg');
        const orangeMarker = require('../assets/img/icon-community-asset-orange.svg');

        switch(type){
            case "1": return redMarker;
            case "2": return blueMarker;
            case "3": return purpleMarker;
            case "4": return greenMarker;
            case "5": return brownMarker;
            case "6": return greyMarker;
            case "7": return orangeMarker;
        }
    }    

    readMore() 
     {
        this.setState({ checkBoxState:  true  });
     }

     readLess()
     {
        this.setState({ checkBoxState:  false  });
     }

     extraInfo()
     {
         return(<div>
            <p> Opening Times </p>
            
            <p> Capacity </p>
           
            <p> Telephone No </p>
           
            <p> Contact Name </p>
           
            <p> Email Address </p>
        </div> );
     }


    openPopup()
    {
        this.props.dispatch({
            type: 'TURN_ON_NODAL',
            payload: {
                id:     this.props.id,
            }
        });
    }

    closePopup()
    {
        this.props.dispatch({
            type: 'CLOSE_NODALS',
        });
    }


    displayInfoIfActive(){

        const closeIcon = require('../assets/img/icon-close-new.svg')

        let buttonStyle={
            color: 'grey',
            textDecoration: 'underline',
        }

        let closeStyle =
         {
            height: '10px',
            width: '10px',
            borderRadius: '50%',
            position: 'absolute',
            top: '12px',
            cursor: 'pointer',
            right: '12px',
            zIndex: '5',
        }

        if(this.props.id === this.props.activeNodal)
            return <div className = "Popup">
                        <img 
                            src={closeIcon} 
                            style={closeStyle} 
                            onClick = {this.closePopup}
                        />
                        <h2>{this.props.name}</h2>
                        <p>{this.props.addressLine1}</p>
                        <p>{this.props.addressLine2}</p>
                        <p>{this.props.addressLine3}</p>
                        <p>{this.props.addressLine4}</p>
                        <p>{this.props.postcode}</p>
                        <p>{this.props.subcat}</p>
                        <p>{this.props.telephone}</p>
                        <p>{this.props.website}</p>


                    {this.state.checkBoxState ? 
                        <div>
                             { this.extraInfo() }
                            <div  
                                id = "LessInfo"   
                                onClick = { this.readLess}>
                                <p style={buttonStyle}>Less</p>
                            </div>
                        </div> 
                    : 
                        <div>
                            <div  
                                id = "MoreInfo"   
                                onClick = { this.readMore}>
                                <p style={buttonStyle}>More</p>
                            </div>
                        </div>
                    }
                        <div className="SpeechBubble"></div>  
                    </div>;
        else
            return;
    }    

    createNodal(communityAsset){

        let boundaries = this.props.map.getBounds();

        //This boundary check currently crashes the app as the <Cluster> is already called before this function
        //Returning nothing will make the cluster try to access a null 
        //Can't think of a good way to fix this right now

        //if(communityAsset.Long < boundaries._ne.lng && communityAsset.Long > boundaries._sw.lng)
        //if(communityAsset.Lat < boundaries._ne.lat && communityAsset.Lat > boundaries._sw.lat)
            return <Nodal
                    type = {communityAsset.Layer.slice(0,1)}
                    location = {[communityAsset.Long,communityAsset.Lat]}
                    coordinates={[communityAsset.Long,communityAsset.Lat]}
                    name = {communityAsset.Name}
                    postcode = {communityAsset.Postcode}
                    subcat = {communityAsset["Sub Cat"]}
                    key = {communityAsset["Ref:No"]}
                    id = {communityAsset["Ref:No"]}
                    telephone = {communityAsset["Telephone No."]}
                    ward = {communityAsset.Ward}
                    website = {communityAsset["Web Address"]}
                    addressLine1 = {communityAsset["Address 1"]}
                    addressLine2 = {communityAsset["Add 2 (RD - St)"]}
                    addressLine3 = {communityAsset["Add 3"]}
                    addressLine4 = {communityAsset["Add 4"]}
                    />
    }

    createNodalBackEnd(communityAsset){
        return <Nodal
            type = {communityAsset.Layer.slice(0,1)}
            location = {[communityAsset.Lng,communityAsset.Lat]}
            coordinates={[communityAsset.Lng,communityAsset.Lat]}
            name = {communityAsset.Name}
            postcode = {communityAsset.Postcode}
            subcat = {communityAsset["Sub_Cat"]}
            key = {communityAsset["RefNo"]}
            id = {communityAsset["RefNo"]}
            //telephone = {communityAsset["Telephone No."]}
            ward = {communityAsset.Ward}
            website = {communityAsset["Web_Address"]}
            addressLine1 = {communityAsset["Address_1"]}
            addressLine2 = {communityAsset["Add_2_RD_St"]}
            addressLine3 = {communityAsset["Add_3"]}
            addressLine4 = {communityAsset["Add_4"]}
            />
    }

    //This is the marker/nodal that would appear when a cluster is shown
    clusterMarker = (coordinates) => (
        <Marker coordinates={coordinates}>
          <span style = { { borderRadius:'50%' , backgroundColor:'red', color : 'white', padding:'5px'}}>C</span>
        </Marker>
      );

    createNodes(){

        //17 is the magic number. At a zoom level of 17, even all layers on is smooth
        
        let nodes = [];

        //Lets use data from back end for community space as a start
        if(this.props.activeCommunityAssets.includes("Community Space")){
            axios.post(`${constants.ROOT_URL}/api/council/markers/`, {
                "category_id": 1
            }, getAuthHeader())
            .then((response) => {
                console.log(response.data);
                nodes.push(<Cluster ClusterMarkerFactory={this.clusterMarker} radius={this.state.radius} zoomOnClick={this.state.clickZoom}>
                {
                    //This is now working, however, the nodes array is already returned and rendered before this 
                    response.data.map(this.createNodalBackEnd)
                }
                </Cluster>);
            });
        }


        // if(this.props.activeCommunityAssets.includes("Community Space")){
        //     nodes.push(<Cluster ClusterMarkerFactory={this.clusterMarker} radius={this.state.radius} zoomOnClick={this.state.clickZoom}>
        //         {
        //             communitySpace.map(this.createNodal)
        //         }
        //         </Cluster>);
        //     //nodes.push(communitySpace.map(this.createNodal))
        // }

        if(this.props.activeCommunityAssets.includes("Public")){
            console.log(publicLayer);

            nodes.push(<Cluster ClusterMarkerFactory={this.clusterMarker} radius={this.state.radius} zoomOnClick={this.state.clickZoom}>
                {
                    publicLayer.map(this.createNodal)
                }
                </Cluster>);
            //nodes.push(publicLayer.map(this.createNodal))
        }

        if(this.props.activeCommunityAssets.includes("Sports Leisure")){
            nodes.push(<Cluster ClusterMarkerFactory={this.clusterMarker} radius={this.state.radius} zoomOnClick={this.state.clickZoom}>
                {
                    sportsLeisure.map(this.createNodal)
                }
                </Cluster>);
            //nodes.push(sportsLeisure.map(this.createNodal))
        }

        if(this.props.activeCommunityAssets.includes("Community Business")){
            nodes.push(<Cluster ClusterMarkerFactory={this.clusterMarker} radius={this.state.radius} zoomOnClick={this.state.clickZoom}>
                {
                    communityBusiness.map(this.createNodal)
                }
                </Cluster>);
            //nodes.push(communityBusiness.map(this.createNodal))
        }

        if(this.props.activeCommunityAssets.includes("Business Night")){
            nodes.push(<Cluster ClusterMarkerFactory={this.clusterMarker} radius={this.state.radius} zoomOnClick={this.state.clickZoom}>
                {
                    businessNight.map(this.createNodal)
                }
                </Cluster>);
            //nodes.push(businessNight.map(this.createNodal))
        }

        if(this.props.activeCommunityAssets.includes("Business")){
            nodes.push(<Cluster ClusterMarkerFactory={this.clusterMarker} radius={this.state.radius} zoomOnClick={this.state.clickZoom}>
                {
                    business.map(this.createNodal)
                }
                </Cluster>);
            //nodes.push(business.map(this.createNodal))
        }

        if(this.props.activeCommunityAssets.includes("Voluntary Sector")){
            nodes.push(<Cluster ClusterMarkerFactory={this.clusterMarker} radius={this.state.radius} zoomOnClick={this.state.clickZoom}>
                {
                    voluntarySector.map(this.createNodal)
                }
                </Cluster>);
            //nodes.push(voluntarySector.map(this.createNodal))
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

const mapStateToProps = ({ communityAssets }) => ({
    activeCommunityAssets: communityAssets.activeCommunityAssets,
});

export default connect(mapStateToProps)(MapCommunityAssets);