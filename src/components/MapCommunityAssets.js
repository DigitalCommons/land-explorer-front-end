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
        axios.post(`${constants.ROOT_URL}/api/council/markers/all2/`,{},getAuthHeader())
        .then((response) => {
            let arr = [];
            //API return data from all layer
            //Optimise by grouping the data according to its category id

            //First index of arr would be marker objects with category_id 1, and so on
            response.data.forEach( el => {
                //Each element has a category_id
                if(arr[el.category_id] == null){
                    //push element to different index according to its category_id
                    arr[el.category_id] = [];
                }
                arr[el.category_id].push(el);
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
                    if(arr[0].longitude === arr[i].longitude && arr[0].latitude === arr[i].latitude){
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

        //if(communityAsset.Long < boundaries._ne.longitude && communityAsset.Long > boundaries._sw.longitude)
        //if(communityAsset.latitude < boundaries._ne.latitude && communityAsset.latitude > boundaries._sw.latitude)
        //console.log(communityAsset);
        if(communityAsset.name !== undefined){
            return <Nodal
                key = {communityAsset.id}
                id = {communityAsset.id}
                name = {communityAsset.name}
                addressLine1 = {communityAsset.address_1}
                addressLine2 = {communityAsset.address_2}
                addressLine3 = {communityAsset.address_3}
                addressLine4 = {communityAsset.address_4}
                postcode = {communityAsset.postcode}
                ward = {communityAsset.ward}
                category_id = {communityAsset.category_id}
                subcat = {communityAsset.sub_category}
                type = {communityAsset.type}

                community_space = {communityAsset.community_space}
                council_facility = {communityAsset.council_facility}
                notes = {communityAsset.notes}
                website = {communityAsset.web_address}
                email = {communityAsset.email}
                telephone = {communityAsset.telephone}
                contact_name = {communityAsset.contact_name}

                coordinates={[communityAsset.longitude,communityAsset.latitude]}
                
                spaceAvailable = {communityAsset.space_available}
                specialistSpace = {communityAsset.specialist_spaces}
                kitchen = {communityAsset.kitchen}
                disabled = {communityAsset.disabled_access}
                price = {communityAsset.price_range}
                />
        }else{
            return <MultipleNodal
            councilData = {communityAsset}
            key = {communityAsset[0].id}
            type = '0'
            coordinates={[communityAsset[0].longitude,communityAsset[0].latitude]}
            name = {communityAsset[0].name}
            postcode = {communityAsset[0].postcode}
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

    // createNodes(){

    //     //17 is the magic number. At a zoom level of 17, even all layers on is smooth
    //     let nodes = [];

    //     if(this.state.councilData.length === 0) return;

    //     if(this.props.activeCommunityAssets.includes("Community Space")){
    //         nodes.push(<Cluster key="1" ClusterMarkerFactory={this.clusterMarkerOne} radius={this.state.radius}>
    //             {
    //                 this.state.councilData[1].map(this.createNodalBackEnd)
    //             }
    //             </Cluster>);
    //     }

    //     if(this.props.activeCommunityAssets.includes("Public")){
    //         nodes.push(<Cluster key="2" ClusterMarkerFactory={this.clusterMarkerTwo} radius={this.state.radius}>
    //             {
    //                 this.state.councilData[2].map(this.createNodalBackEnd)
    //             }
    //             </Cluster>);
    //     }

    //     if(this.props.activeCommunityAssets.includes("Sports Leisure")){
    //         nodes.push(<Cluster key="3" ClusterMarkerFactory={this.clusterMarkerThree} radius={this.state.radius}>
    //             {                  
    //                 this.state.councilData[3].map(this.createNodalBackEnd)
    //             }
    //             </Cluster>);
    //     }

    //     if(this.props.activeCommunityAssets.includes("Community Business")){    
    //         nodes.push(<Cluster key="4" ClusterMarkerFactory={this.clusterMarkerFour} radius={this.state.radius}>
    //             {
    //                 this.state.councilData[4].map(this.createNodalBackEnd)
    //             }
    //             </Cluster>);
    //     }

    //     if(this.props.activeCommunityAssets.includes("Business Night")){         
    //         nodes.push(<Cluster key="5" ClusterMarkerFactory={this.clusterMarkerFive} radius={this.state.radius}>
    //             {
    //                 this.state.councilData[5].map(this.createNodalBackEnd)
    //             }
    //             </Cluster>);
    //     }

    //     if(this.props.activeCommunityAssets.includes("Voluntary Sector")){
    //         nodes.push(<Cluster key="6" ClusterMarkerFactory={this.clusterMarkerSix} radius={this.state.radius}>
    //             {
    //                 this.state.councilData[6].map(this.createNodalBackEnd)
    //             }
    //             </Cluster>);
    //     }

    //     return nodes;
    // }

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
        let activeLayersKey = activeLayers;

        if(activeLayers.length > 0){
            nodes.push(<Cluster key="1" ClusterMarkerFactory={this.clusterMarkerSeven} radius={this.state.radius}>
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