import React, {Component} from 'react';
import { connect } from 'react-redux';
import Nodal from './common/Nodal';
import MultipleNodal from './common/MultipleNodal';

import axios from 'axios';
import {getAuthHeader} from "./Auth";
import constants from '../constants';

import {Marker,Cluster} from 'react-mapbox-gl';


class MapCommunityAssets extends Component {
    constructor(props){
        super(props);
        this.state = {
            checkBoxState : false,
            radius : 30,
            councilData : [],
        }        

        this.createNodalBackEnd = this.createNodalBackEnd.bind(this);
        this.packDuplicateCoordinate = this.packDuplicateCoordinate.bind(this);
  
        
    }

    componentDidMount() {
        axios.post(`${constants.ROOT_URL}/api/council/markers/all/`,{},getAuthHeader())
        .then((response) => {
            let arr = [];
            //API return data from all layer
            //Optimise by grouping the data according to its layers

            //First index of arr would be marker objects with layer_id 1, and so on
            response.data.forEach( el => {
                //Each element has a layer id
                if(arr[el.layer_id] == null){
                    //push element to different index according to its layer id
                    arr[el.layer_id] = [];
                }
                arr[el.layer_id].push(el);
            });

            this.setState({councilData : arr});

            //this.setState({councilDataFull : response.data});
        });
    }

    packDuplicateCoordinate(arr){
        let arrOfSingleNodal = [];
        let arrOfMultipleNodal = [];

        while(arr.length > 0){
            let arrOfTempNodals = [];

            //If it is last element, move to single nodal array
            if(arr.length === 1){
                arrOfSingleNodal = arrOfSingleNodal.concat(arr);
                arr = [];
            }else{
                for(let i = 1; i < arr.length; i++){
                    //Compare first indexed item against other items on array
                    if(arr[0].Lng === arr[i].Lng && arr[0].Lat === arr[i].Lat){
                        //If there is duplicate coordinate, move item to arrOfTempNodals
                        arrOfTempNodals = arrOfTempNodals.concat(arr.splice(i, 1));
                        i--;
                    }
                }

                let thisItem = arr.splice(0, 1);
                if(arrOfTempNodals.length > 0){
                    //If this item had duplicate coordindate
                    arrOfMultipleNodal.push(arrOfTempNodals.concat(thisItem));
                }else{
                    arrOfSingleNodal.push(thisItem[0]);
                }
            }
        }

        //Now the data become a mixed array of: Nodal object and array of Nodal objects
        return arrOfSingleNodal.concat(arrOfMultipleNodal);
        
    }   

    createNodalBackEnd(communityAsset){
        let boundaries = this.props.map.getBounds();

        //This boundary check currently crashes the app as the <Cluster> is already called before this function
        //Returning nothing will make the cluster try to access a null 
        //Can't think of a good way to fix this right now

        //if(communityAsset.Long < boundaries._ne.lng && communityAsset.Long > boundaries._sw.lng)
        //if(communityAsset.Lat < boundaries._ne.lat && communityAsset.Lat > boundaries._sw.lat)

        if(communityAsset.Name !== undefined){
            return <Nodal
                type = {communityAsset.Layer.slice(0,1)}
                location = {[communityAsset.Lng,communityAsset.Lat]}
                coordinates={[communityAsset.Lng,communityAsset.Lat]}
                name = {communityAsset.Name}
                postcode = {communityAsset.Postcode}
                subcat = {communityAsset["Sub_Cat"]}
                key = {communityAsset["RefNo"]}
                id = {communityAsset["RefNo"]}
                ward = {communityAsset.Ward}
                addressLine1 = {communityAsset["Address_1"]}
                addressLine2 = {communityAsset["Add_2_RD_St"]}
                addressLine3 = {communityAsset["Add_3"]}
                addressLine4 = {communityAsset["Add_4"]}
                website = {communityAsset["Web_Address"]}
                email = {communityAsset["Contact_Email"]}
                telephone = {communityAsset["Telephone_No"]}
                spaceAvailable = {communityAsset["Space_AvailableTT"]}
                specialistSpace = {communityAsset["Specialist_Spaces"]}
                kitchen = {communityAsset["Kitchen"]}
                disabled = {communityAsset["Disabled_Access"]}
                price = {communityAsset["Price_Range"]}
                />
        }else{
            return <MultipleNodal
            councilData = {communityAsset}
            type = '0'
            location = {[communityAsset[0].Lng,communityAsset[0].Lat]}
            coordinates={[communityAsset[0].Lng,communityAsset[0].Lat]}
            name = {communityAsset[0].Name}
            postcode = {communityAsset[0].Postcode}
            subcat = {communityAsset["Sub_Cat"]}
            key = {communityAsset["RefNo"]}
            id = {communityAsset["RefNo"]}
            ward = {communityAsset.Ward}
            addressLine1 = {communityAsset["Address_1"]}
            addressLine2 = {communityAsset["Add_2_RD_St"]}
            addressLine3 = {communityAsset["Add_3"]}
            addressLine4 = {communityAsset["Add_4"]}
            website = {communityAsset["Web_Address"]}
            email = {communityAsset["Contact_Email"]}
            telephone = {communityAsset["Telephone_No"]}
            spaceAvailable = {communityAsset["Space_AvailableTT"]}
            specialistSpace = {communityAsset["Specialist_Spaces"]}
            kitchen = {communityAsset["Kitchen"]}
            disabled = {communityAsset["Disabled_Access"]}
            price = {communityAsset["Price_Range"]}
            />
        }
    }

    //This is the marker/nodal that would appear when a cluster is shown
    clusterMarkerOne = (coordinates) => (<Marker coordinates={coordinates}><span style = { { borderRadius:'50%' , backgroundColor:'red', color : 'white', padding:'5px'}}>C</span></Marker>);
    clusterMarkerTwo = (coordinates) => (<Marker coordinates={coordinates}><span style = { { borderRadius:'50%' , backgroundColor:'blue', color : 'white', padding:'5px'}}>C</span></Marker>);
    clusterMarkerThree = (coordinates) => (<Marker coordinates={coordinates}><span style = { { borderRadius:'50%' , backgroundColor:'purple', color : 'white', padding:'5px'}}>C</span></Marker>);
    clusterMarkerFour = (coordinates) => (<Marker coordinates={coordinates}><span style = { { borderRadius:'50%' , backgroundColor:'green', color : 'white', padding:'5px'}}>C</span></Marker>);
    clusterMarkerFive = (coordinates) => (<Marker coordinates={coordinates}><span style = { { borderRadius:'50%' , backgroundColor:'brown', color : 'white', padding:'5px'}}>C</span></Marker>);
    clusterMarkerSix = (coordinates) => (<Marker coordinates={coordinates}><span style = { { borderRadius:'50%' , backgroundColor:'grey', color : 'white', padding:'5px'}}>C</span></Marker>);
    clusterMarkerSeven = (coordinates) => (<Marker coordinates={coordinates}><span style = { { borderRadius:'50%' , backgroundColor:'orange', color : 'white', padding:'5px'}}>C</span></Marker>);

    createNodes(){

        //17 is the magic number. At a zoom level of 17, even all layers on is smooth
        let nodes = [];

        if(this.state.councilData.length === 0) return;

        if(this.props.activeCommunityAssets.includes("Community Space")){
            nodes.push(<Cluster ClusterMarkerFactory={this.clusterMarkerOne} radius={this.state.radius}>
                {
                    this.state.councilData[1].map(this.createNodalBackEnd)
                }
                </Cluster>);
        }

        if(this.props.activeCommunityAssets.includes("Public")){
            nodes.push(<Cluster ClusterMarkerFactory={this.clusterMarkerTwo} radius={this.state.radius}>
                {
                    this.state.councilData[2].map(this.createNodalBackEnd)
                }
                </Cluster>);
        }

        if(this.props.activeCommunityAssets.includes("Sports Leisure")){
            nodes.push(<Cluster ClusterMarkerFactory={this.clusterMarkerThree} radius={this.state.radius}>
                {                  
                    this.state.councilData[3].map(this.createNodalBackEnd)
                }
                </Cluster>);
        }

        if(this.props.activeCommunityAssets.includes("Community Business")){    
            nodes.push(<Cluster ClusterMarkerFactory={this.clusterMarkerFour} radius={this.state.radius}>
                {
                    this.state.councilData[4].map(this.createNodalBackEnd)
                }
                </Cluster>);
        }

        if(this.props.activeCommunityAssets.includes("Business Night")){         
            nodes.push(<Cluster ClusterMarkerFactory={this.clusterMarkerFive} radius={this.state.radius}>
                {
                    this.state.councilData[5].map(this.createNodalBackEnd)
                }
                </Cluster>);
        }

        if(this.props.activeCommunityAssets.includes("Voluntary Sector")){
            nodes.push(<Cluster ClusterMarkerFactory={this.clusterMarkerSix} radius={this.state.radius}>
                {
                    this.state.councilData[6].map(this.createNodalBackEnd)
                }
                </Cluster>);
        }

        return nodes;
    }

    createNodesOneCluster(){

        //17 is the magic number. At a zoom level of 17, even all layers on is smooth
        
        let nodes = [];
        let activeLayers = [];

        if(this.props.activeCommunityAssets.includes("Community Space")){
            activeLayers = activeLayers.concat(this.state.councilData[1]);
        }

        if(this.props.activeCommunityAssets.includes("Public")){
            activeLayers = activeLayers.concat(this.state.councilData[2]);
            //activeLayers.push(2);
        }

        if(this.props.activeCommunityAssets.includes("Sports Leisure")){
            activeLayers = activeLayers.concat(this.state.councilData[3]);
        }

        if(this.props.activeCommunityAssets.includes("Community Business")){    
            activeLayers = activeLayers.concat(this.state.councilData[4]);
        }

        if(this.props.activeCommunityAssets.includes("Business Night")){
            activeLayers = activeLayers.concat(this.state.councilData[5]);
        }

        if(this.props.activeCommunityAssets.includes("Voluntary Sector")){
            activeLayers = activeLayers.concat(this.state.councilData[6]);
        }
        
        activeLayers = this.packDuplicateCoordinate(activeLayers);

        if(activeLayers.length > 0){
            nodes.push(<Cluster ClusterMarkerFactory={this.clusterMarkerSeven} radius={this.state.radius}>
                {
                    activeLayers.map(this.createNodalBackEnd)
                }
                </Cluster>);
        }
        
        return nodes;
    }

    render(){

        return (
            <React.Fragment>
                {this.createNodesOneCluster()}
            </React.Fragment>
        );
    }
}

const mapStateToProps = ({ communityAssets }) => ({
    activeCommunityAssets: communityAssets.activeCommunityAssets,
});

export default connect(mapStateToProps)(MapCommunityAssets);