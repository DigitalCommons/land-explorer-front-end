import React, {Component} from 'react';
import {Marker} from 'react-mapbox-gl';
import {connect} from 'react-redux';
import axios from 'axios';
import {getAuthHeader} from "../Auth";
import constants from '../../constants';
import Swal from "sweetalert2";



class Nodal extends Component 
{
    constructor(props){
        super(props);
        this.state = {
            checkBoxState : false,
            deleteDialog : false
           
        }

        this.openPopup              = this.openPopup.bind(this);
        this.displayInfoIfActive    = this.displayInfoIfActive.bind(this);
        this.closePopup             = this.closePopup.bind(this);
        this.readMore               = this.readMore.bind(this);
        this.readLess               = this.readLess.bind(this)
        this.deleteNodal            = this.deleteNodal.bind(this);
    }


  
    getImgByCategory(id){
        const redMarker = require('../../assets/img/icon-community-asset-red.svg');
        const blueMarker =  require('../../assets/img/icon-community-asset-blue.svg');
        const purpleMarker = require('../../assets/img/icon-community-asset-purple.svg');
        const greenMarker = require('../../assets/img/icon-community-asset-green.svg');
        const brownMarker = require('../../assets/img/icon-community-asset-brown.svg');
        const greyMarker = require('../../assets/img/icon-community-asset-grey.svg');
        const orangeMarker = require('../../assets/img/icon-community-asset-orange.svg');
        
        switch(id){
            case 0: return orangeMarker;
            case 1: return redMarker;
            case 2: return blueMarker;
            case 3: return purpleMarker;
            case 4: return greenMarker;
            case 5: return brownMarker;
            case 6: return greyMarker;
            default: return orangeMarker;
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

    openPopup()
    {   

        
        this.props.dispatch({
            type: 'TURN_ON_NODAL',
            payload: {
                id:     this.props.id,
            }
        });
        // let zoom = this.map.getZoom();
        // alert(zoom);

    }

    closePopup()
    {
        this.props.dispatch({
            type: 'CLOSE_NODALS',
        });
    }

    deleteNodal = e =>   
    {
    Swal.fire({
        icon: 'warning',
        title: 'Confirm Deleting the asset',
        text: `If you delete ${this.props.name} ,all other assets at this adddres will be deleted! `,
        confirmButtonText: 'DELETE',
        cancelButtonText:'I want to keep the asset!',
        showCancelButton: true,
        showLoaderOnConfirm: true,

        preConfirm: () => 
        {
            axios.post(`${constants.ROOT_URL}/api/council/markers/delete/`, {
                "id": this.props.id
            }, getAuthHeader())
            .then((response) => {
                //       let {id} = props; 
                // this.setState({ id:this.props.id-- });
                // console.log(this.props.id)
                this.props.refresh();

                // this.props.dispatch({
                //     type: 'DELETE_NODAL',
                //     payload: {
                //         id:     this.props.id,
                //     }
                // });

                Swal.fire({
                    icon: 'success',
                    title: 'Changes have been saved',
                  })
            }).catch((err) => {
                console.log(err)
                console.trace(err)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong! Please try again later.',
                  })
            });
        },
        
    })
    };

    displayInfoIfActive(){
 

        const closeIcon = require('../../assets/img/icon-close-new.svg')
        const DeleteCommunityAsset = require('../../assets/img/icon-trash-red.svg')

        let buttonStyle =
        {
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
       
            return <div className="nodal" key ={this.props.id}>
                    {/* <dialog  className = "ConfirmDialog" style = {{display: this.state.deleteDialog ? 'block': 'none'}}> Are you sure want to remove this nodal from the map ? 
                        
                        < div className = "DecisionButtons">
                       
                         <button id = "Yes"  onClick={ () => this.setState({ deleteDialog: false})}> Yes </button> 
                         
                         <button id = "No"   onClick={ () => this.setState({ deleteDialog: false})}>   No </button>
                         </div>

                         
 
                         </dialog> */}
          {/* {console.log(this.props.id)} */}

            <span onClick = {this.closePopup} className="nodal_close">&#x2715;</span>
            <h2 className = "nodal_title">{this.props.name} <button className = "DeleteCommunityAsset" onClick ={this.deleteNodal}>
                <img src = {DeleteCommunityAsset}   alt = "DeleteCommunityAsset" key = {this.props.id}  />
                </button></h2>
            
            {this.state.checkBoxState ? 
                <div>

                    <table class="w3-table">
                        <tbody>

                        <tr>
                            <td valign="top">Address:</td>
                            <td>{this.props.addressLine1} {this.props.addressLine2} {this.props.addressLine3} {this.props.addressLine4}</td>
                        </tr>
                        <tr>
                            <td>Postcode:</td>
                            <td>{this.props.postcode}</td>
                        </tr>
                        <tr>
                            <td>Category:</td>
                            <td>{this.props.subcat}</td>
                        </tr>
                        <tr>
                            <td>Type:</td>
                            <td>{this.props.type}</td>
                        </tr>
                        <tr>
                            <td>Ward:</td>
                            <td>{this.props.ward}</td>
                        </tr>
                        {(this.props.contact_name) && (this.props.contact_name !== "") ?
                            <tr>
                                <td>Contact name:</td>
                                <td>{this.props.contact_name}</td>
                            </tr>:""
                        } 
                        {(this.props.telephone) && (this.props.telephone !== "") ?
                            <tr>
                                <td>Phone:</td>
                                <td>{this.props.telephone}</td>
                            </tr>:""
                        } 
                        {(this.props.email) && (this.props.email !== "") ?
                            <tr>
                                <td>Email:</td>
                                <td>{this.props.email}</td>
                            </tr>:""
                        } 
                        {(this.props.website) && (this.props.website !== "") ?
                            <tr>
                                <td>Website:</td>
                                <td>{this.props.website}</td>
                            </tr>:""
                        } 
                        {(this.props.community_space) && (this.props.community_space !== "") ?
                            <tr>
                                <td>Community space:</td>
                                <td>{this.props.community_space}</td>
                            </tr>:""
                        } 
                        {(this.props.council_facility) && (this.props.council_facility !== "") ?
                            <tr>
                                <td>Council facility:</td>
                                <td>{this.props.council_facility}</td>
                            </tr>:""
                        } 
                        {(this.props.notes) && (this.props.notes !== "") ?
                            <tr>
                                <td>Notes:</td>
                                <td>{this.props.notes}</td>
                            </tr>:""
                        } 
                        {(this.props.spaceAvailable) && (this.props.spaceAvailable !== "") ?
                            <tr>
                                <td>Space Available:</td>
                                <td>{this.props.spaceAvailable}</td>
                            </tr>:""
                        } 
                        {(this.props.specialistSpace) && (this.props.specialistSpace !== "") ?
                            <tr>
                                <td>Specialist Space:</td>
                                <td>{this.props.specialistSpace}</td>
                            </tr>:""
                        } 
                        {(this.props.kitchen) && (this.props.kitchen !== "") ?
                            <tr>
                                <td>Kitchen:</td>
                                <td>{this.props.kitchen === "Y" ? "Yes" : this.props.kitchen}</td>
                            </tr>:""
                        } 
                        {(this.props.disabled) && (this.props.disabled !== "") ?
                            <tr>
                                <td>Disabled Access:</td>
                                <td>{this.props.disabled === "Y" ? "Yes" : this.props.disabled}</td>
                            </tr>:""
                        } 
                        {(this.props.price) && (this.props.price !== "") ?
                            <tr>
                                <td>Price Range:</td>
                                <td>{this.props.price}</td>
                            </tr>:""
                        } 
                        </tbody>
                    </table>
                    <button onClick = { this.readLess} className="nodal_action">Read less &#8594;</button>
                </div> 
                : 
                <div>

                    <table className="w3-table">
                        <tbody>
                        <tr>
                            <td valign="top">Address:</td>
                            <td>{this.props.addressLine1} {this.props.addressLine2} {this.props.addressLine3} {this.props.addressLine4}</td>
                        </tr>
                        <tr>
                            <td>Postcode:</td>
                            <td>{this.props.postcode}</td>
                        </tr>

                        <tr>
                            <td>Category:</td>
                            <td>{this.props.subcat}</td>
                        </tr>

                        <tr>
                            <td>Type:</td>
                            <td>{this.props.type}</td>
                        </tr>
                        <tr>
                            <td>Ward:</td>
                            <td>{this.props.ward}</td>
                        </tr>
                        </tbody>

                    </table>
                    <button onClick = { this.readMore} className = "nodal_action">Read more &#8594;</button>
                </div> 
            }
            <div className="SpeechBubble"></div>
          </div>;
        else
            return;
    }
    
    
    render(){
        return <Marker 
        style = { { zIndex: this.props.id === this.props.activeNodal? 4 : 3}}  
        coordinates = {this.props.coordinates}
        
    >
        {this.displayInfoIfActive()}
        <img 
            alt="Marker on map"
            src={this.getImgByCategory(this.props.category_id)} 
            style={{height: '30px',width: '30px', }}
            onClick={this.openPopup}
        />
    </Marker>
    }
}

const mapStateToProps = ({ nodal , map }) => ({
    activeNodal: nodal.activeNodal,
    zoom: map.zoom
    
});




export default connect(mapStateToProps)(Nodal);