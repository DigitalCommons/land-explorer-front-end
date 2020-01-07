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
            councilData : [],
        }        

        this.createNodal = this.createNodal.bind(this);
        this.createNodalBackEnd = this.createNodalBackEnd.bind(this);
        
        this.openPopup              = this.openPopup.bind(this);
        this.displayInfoIfActive    = this.displayInfoIfActive.bind(this);
        this.closePopup             = this.closePopup.bind(this);
        this.readMore               = this.readMore.bind(this);
        this.readLess               = this.readLess.bind(this)
        
    }

    componentDidMount() {
        axios.post(`${constants.ROOT_URL}/api/council/markers/all/`,{},getAuthHeader())
        .then((response) => {
            let arr = [];
            //API return data from all layer
            //Optimise by grouping the data according to its layers

            response.data.forEach( el => {
                //Each element has a layer id
                if(arr[el.layer_id] == null){
                    //push element to different index according to its layer id
                    arr[el.layer_id] = [];
                }
                arr[el.layer_id].push(el);
            });
            
            this.setState({councilData : arr});

            
            this.setState({councilDataFull : response.data});
        });
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

        if(this.props.activeCommunityAssets.includes("Community Space")){
            nodes.push(<Cluster ClusterMarkerFactory={this.clusterMarker} radius={this.state.radius} zoomOnClick={this.state.clickZoom}>
                {
                    //communitySpace.map(this.createNodalBackEnd)
                    this.state.councilData[1].map(this.createNodalBackEnd)
                }
                </Cluster>);
            //nodes.push(communitySpace.map(this.createNodal))
        }

        if(this.props.activeCommunityAssets.includes("Public")){
            nodes.push(<Cluster ClusterMarkerFactory={this.clusterMarker} radius={this.state.radius} zoomOnClick={this.state.clickZoom}>
                {
                    //publicLayer.map(this.createNodal)
                    this.state.councilData[2].map(this.createNodalBackEnd)
                }
                </Cluster>);
            //nodes.push(publicLayer.map(this.createNodal))
        }

        if(this.props.activeCommunityAssets.includes("Sports Leisure")){
            nodes.push(<Cluster ClusterMarkerFactory={this.clusterMarker} radius={this.state.radius} zoomOnClick={this.state.clickZoom}>
                {
                    //sportsLeisure.map(this.createNodal)                    
                    this.state.councilData[3].map(this.createNodalBackEnd)
                }
                </Cluster>);
            //nodes.push(sportsLeisure.map(this.createNodal))
        }

        if(this.props.activeCommunityAssets.includes("Community Business")){    
            nodes.push(<Cluster ClusterMarkerFactory={this.clusterMarker} radius={this.state.radius} zoomOnClick={this.state.clickZoom}>
                {
                    //communityBusiness.map(this.createNodal)
                    this.state.councilData[4].map(this.createNodalBackEnd)
                }
                </Cluster>);
            //nodes.push(communityBusiness.map(this.createNodal))
        }

        if(this.props.activeCommunityAssets.includes("Business Night")){         
            nodes.push(<Cluster ClusterMarkerFactory={this.clusterMarker} radius={this.state.radius} zoomOnClick={this.state.clickZoom}>
                {
                    //businessNight.map(this.createNodal)
                    this.state.councilData[5].map(this.createNodalBackEnd)
                }
                </Cluster>);
            //nodes.push(businessNight.map(this.createNodal))
        }

        if(this.props.activeCommunityAssets.includes("Business")){ 
            nodes.push(<Cluster ClusterMarkerFactory={this.clusterMarker} radius={this.state.radius} zoomOnClick={this.state.clickZoom}>
                {
                    //business.map(this.createNodal)
                    this.state.councilData[6].map(this.createNodalBackEnd)
                }
                </Cluster>);
            //nodes.push(business.map(this.createNodal))
        }

        if(this.props.activeCommunityAssets.includes("Voluntary Sector")){
            nodes.push(<Cluster ClusterMarkerFactory={this.clusterMarker} radius={this.state.radius} zoomOnClick={this.state.clickZoom}>
                {
                    //voluntarySector.map(this.createNodal)
                    this.state.councilData[7].map(this.createNodalBackEnd)
                }
                </Cluster>);
            //nodes.push(voluntarySector.map(this.createNodal))
        }


        return nodes;
    }

    createNodesOneCluster(){

        //17 is the magic number. At a zoom level of 17, even all layers on is smooth
        
        let nodes = [];
        let activeLayers = [];

        if(this.props.activeCommunityAssets.includes("Community Space")){
            activeLayers.push(1);
        }

        if(this.props.activeCommunityAssets.includes("Public")){
            activeLayers.push(2);
        }

        if(this.props.activeCommunityAssets.includes("Sports Leisure")){
            activeLayers.push(3);
        }

        if(this.props.activeCommunityAssets.includes("Community Business")){            
            activeLayers.push(4);
        }

        if(this.props.activeCommunityAssets.includes("Business Night")){            
            activeLayers.push(5);
        }

        if(this.props.activeCommunityAssets.includes("Business")){            
            activeLayers.push(6);
        }

        if(this.props.activeCommunityAssets.includes("Voluntary Sector")){            
            activeLayers.push(7);
        }

        if(activeLayers.length > 0){
            nodes.push(<Cluster ClusterMarkerFactory={this.clusterMarker} radius={this.state.radius} zoomOnClick={this.state.clickZoom}>
                {
                    this.state.councilDataFull.map(el => {
                        if(activeLayers.includes(el.layer_id)){
                            this.createNodalBackEnd
                        }
                    })
                }
                </Cluster>);
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