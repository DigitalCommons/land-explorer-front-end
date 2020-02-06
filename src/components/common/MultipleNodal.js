import React, {Component} from 'react';
import {Marker} from 'react-mapbox-gl';
import {connect} from 'react-redux';
 



class MultipleNodal extends Component 
{
    constructor(props){
        super(props);
        this.state = {
            checkBoxState : false,
            infoBox : 'close',
            viewCompany : '',
        }

        this.openPopup              = this.openPopup.bind(this);
        this.displayInfoIfActive    = this.displayInfoIfActive.bind(this);
        this.closePopup             = this.closePopup.bind(this);
        this.readMore               = this.readMore.bind(this);
        this.readLess               = this.readLess.bind(this);
        this.readCompany            = this.readCompany.bind(this);
    }


  
    getImgByType(type){
        const redMarker = require('../../assets/img/icon-community-asset-red.svg');
        const blueMarker =  require('../../assets/img/icon-community-asset-blue.svg');
        const purpleMarker = require('../../assets/img/icon-community-asset-purple.svg');
        const greenMarker = require('../../assets/img/icon-community-asset-green.svg');
        const brownMarker = require('../../assets/img/icon-community-asset-brown.svg');
        const greyMarker = require('../../assets/img/icon-community-asset-grey.svg');
        const orangeMarker = require('../../assets/img/icon-community-asset-orange.svg');
        
        switch(type){
            case "0": return orangeMarker;
            case "1": return redMarker;
            case "2": return blueMarker;
            case "3": return purpleMarker;
            case "4": return greenMarker;
            case "5": return brownMarker;
            case "6": return greyMarker;
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
        this.setState({infoBox : 'list'})
    }

    closePopup()
    {
        this.props.dispatch({
            type: 'CLOSE_NODALS',
        });
        this.setState({infoBox : 'close'})
    }

    readCompany(id){
        this.setState({ viewCompany:  id, infoBox : 'company' });
    }

    deleteNodal = (e, data) => {
        // access to e.target here
        console.log(data);
    }

    displayInfoIfActive(){
 
        if(this.props.id !== this.props.activeNodal) return;

        const closeIcon = require('../../assets/img/icon-close-new.svg')
        const DeleteCommunityAsset = require('../../assets/img/icon-trash-red.svg')

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

        //Show list of companies in this marker
        if(this.state.infoBox === 'list'){

            return <div className="nodal">
            <span onClick = {this.closePopup} className="nodal_close">&#x2715;</span>
            <h2 className="nodal_title">Organisations:</h2>
            <div className="nodal_body">
                {this.props.councilData.map((el,key) => {
                    return <div className="nodal_body_content" onClick={() => this.readCompany(key)}>&#8594; {el.name}</div>
                })}
            </div>
            <div className="SpeechBubble"></div>                    
          </div>;
        }

        //Show the selected company from the list

        if(this.state.infoBox === 'company'){
            if(this.state.viewCompany !== ''){
                let companyData = this.props.councilData[this.state.viewCompany];
                return <div className="nodal">
                <span onClick = {this.closePopup} className="nodal_close">&#x2715;</span>
                <h2 className="nodal_title">{companyData.name}</h2>
                {this.state.checkBoxState ? 
                    <div>
                        <table className="w3-table">
                            <tbody>
                            <tr>
                                <td valign="top">Address:</td>
                                <td>{companyData.address_1} {companyData.address_2} {companyData.address_3} {companyData.address_4}</td>
                            </tr>
                            <tr>
                                <td>Postcode:</td>
                                <td>{companyData.postcode}</td>
                            </tr>
                            <tr>
                                <td>Category:</td>
                                <td>{companyData.sub_category}</td>
                            </tr>
                            <tr>
                                <td>Type:</td>
                                <td>{companyData.type}</td>
                            </tr>
                            <tr>
                                <td>Ward:</td>
                                <td>{companyData.ward}</td>
                            </tr>
                            {(companyData.contact_name) && (companyData.contact_name !== "") ?
                                <tr>
                                    <td>Contact name:</td>
                                    <td>{companyData.contact_name}</td>
                                </tr>:""
                            } 
                            {(companyData.telephone) && (companyData.telephone !== "") ?
                                <tr>
                                    <td>Phone:</td>
                                    <td>{companyData.telephone}</td>
                                </tr>:""
                            } 
                            {(companyData.email) && (companyData.email !== "") ?
                                <tr>
                                    <td>Email:</td>
                                    <td>{companyData.email}</td>
                                </tr>:""
                            } 
                            {(companyData.web_address) && (companyData.web_address !== "") ?
                                <tr>
                                    <td>Website:</td>
                                    <td>{companyData.web_address}</td>
                                </tr>:""
                            } 
                            {(companyData.community_space) && (companyData.community_space !== "") ?
                                <tr>
                                    <td>Community space:</td>
                                    <td>{companyData.community_space}</td>
                                </tr>:""
                            } 
                            {(companyData.council_facility) && (companyData.council_facility !== "") ?
                                <tr>
                                    <td>Council facility:</td>
                                    <td>{companyData.council_facility}</td>
                                </tr>:""
                            } 
                            {(companyData.notes) && (companyData.notes !== "") ?
                                <tr>
                                    <td>Notes:</td>
                                    <td>{companyData.notes}</td>
                                </tr>:""
                            } 
                            {(companyData.space_available) && (companyData.space_available !== "") ?
                                <tr>
                                    <td>Space Available:</td>
                                    <td>{companyData.space_available}</td>
                                </tr>:""
                            } 
                            {(companyData.specialist_spaces) && (companyData.specialist_spaces !== "") ?
                                <tr>
                                    <td>Specialist Space:</td>
                                    <td>{companyData.specialist_spaces}</td>
                                </tr>:""
                            } 
                            {(companyData.kitchen) && (companyData.kitchen !== "") ?
                                <tr>
                                    <td>Kitchen:</td>
                                    <td>{companyData.kitchen === "Y" ? "Yes" : companyData.kitchen}</td>
                                </tr>:""
                            } 
                            {(companyData.disabled_access) && (companyData.disabled_access !== "") ?
                                <tr>
                                    <td>Disabled Access:</td>
                                    <td>{companyData.disabled_access === "Y" ? "Yes" : companyData.disabled_access}</td>
                                </tr>:""
                            } 
                            {(companyData.price_range) && (companyData.price_range !== "") ?
                                <tr>
                                    <td>Price Range:</td>
                                    <td>{companyData.price_range}</td>
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
                                    <td>{companyData.address_1} {companyData.address_2} {companyData.address_3} {companyData.address_4}</td>
                                </tr>
                                <tr>
                                    <td>Postcode:</td>
                                    <td>{companyData.postcode}</td>
                                </tr>
                                <tr>
                                    <td>Category:</td>
                                    <td>{companyData.sub_category}</td>
                                </tr>
                                <tr>
                                    <td>Type:</td>
                                    <td>{companyData.type}</td>
                                </tr>
                                <tr>
                                    <td>Ward:</td>
                                    <td>{companyData.ward}</td>
                                </tr>
                            </tbody>
                        </table>
                        <button onClick = { this.readMore} className="nodal_action">Read more &#8594;</button>
                    </div> 
                }
                <div className="SpeechBubble"></div>                    
            </div>;
            }
        }
    }
    
    
    render(){
        return <Marker 
        style = { { zIndex: this.props.id === this.props.activeNodal? 4 : 3}}  
        coordinates = {this.props.coordinates}
        >
        {this.displayInfoIfActive()}
        <img 
            alt="Marker on map"
            src={this.getImgByType(this.props.type)} 
            style={{height: '30px',width: '30px', }}
            onClick={this.openPopup}
        />
    </Marker>
    /*
        if(this.props.councilData[0].id === this.props.activeNodal)
        {
           
            return (<Marker 
                        style = { { zIndex: this.props.councilData[0].id === this.props.activeNodal? 4 : 3}}  
                        coordinates = {[this.props.councilData[0].Lng,this.props.councilData[0].Lat]}
                    >
                    {this.displayInfoIfActive()}
                    <img 
                        alt="Marker in Map"
                        src={this.getImgByType(this.props.councilData[0].Layer.slice(0,1))} 
                        style={{height: '30px',width: '30px', }}
                    />
                    </Marker>);
        }
        else
            return (<Marker 
                        style = { { zIndex: this.props.councilData[0].id === this.props.activeNodal? 4 : 3}}  
                        coordinates = {[this.props.councilData[0].Lng,this.props.councilData[0].Lat]}
                        onClick={this.openPopup}
                    >
                        {this.displayInfoIfActive()}
                        <img 
                            alt="Marker in Map"
                            src={this.getImgByType(this.props.councilData[0].Layer.slice(0,1))} 
                            style={{height: '30px',width: '30px', }}
                        />
                    </Marker>);
                    */
    }
}

const mapStateToProps = ({ nodal , map }) => ({
    activeNodal: nodal.activeNodal,
    zoom: map.zoom
    
});




export default connect(mapStateToProps)(MultipleNodal);