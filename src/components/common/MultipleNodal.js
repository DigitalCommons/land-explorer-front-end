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

            return <div class="nodal">
            <span onClick = {this.closePopup} class="nodal_close">&#x2715;</span>
            <h2 class="nodal_title">Company registered:</h2>
            <div class="nodal_body">
                {this.props.councilData.map((el,key) => {
                    return <div class="nodal_body_content" onClick={() => this.readCompany(key)}>&#8594; {el.Name}</div>
                })}
            </div>
            <div className="SpeechBubble"></div>                    
          </div>;
        }

        //Show the selected company from the list

        if(this.state.infoBox === 'company'){
            if(this.state.viewCompany !== ''){
                let companyData = this.props.councilData[this.state.viewCompany];
                return <div class="nodal">
                <span onClick = {this.closePopup} class="nodal_close">&#x2715;</span>
                <h2 class="nodal_title">{companyData.Name}</h2>
                {this.state.checkBoxState ? 
                    <div>
                        <table class="w3-table">
                            <tr>
                                <td valign="top">Address:</td>
                                <td>{companyData.Address_1} {companyData.Add_2_RD_St} {companyData.Add_3} {companyData.Add_4}</td>
                            </tr>
                            <tr>
                                <td>Postcode:</td>
                                <td>{companyData.Postcode}</td>
                            </tr>
                            <tr>
                                <td>Category:</td>
                                <td>{companyData.Sub_Cat}</td>
                            </tr>
                            <tr>
                                <td>Ward:</td>
                                <td>{companyData.Ward}</td>
                            </tr>
                            {(companyData.Telephone_No) && (companyData.Telephone_No !== "") ?
                                <tr>
                                    <td>Phone:</td>
                                    <td>{companyData.Telephone_No}</td>
                                </tr>:""
                            } 
                            {(companyData.Contact_Email) && (companyData.Contact_Email !== "") ?
                                <tr>
                                    <td>Email:</td>
                                    <td>{companyData.Contact_Email}</td>
                                </tr>:""
                            } 
                            {(companyData.Web_Address) && (companyData.Web_Address !== "") ?
                                <tr>
                                    <td>Website:</td>
                                    <td>{companyData.Web_Address}</td>
                                </tr>:""
                            } 
                            {(companyData.Space_AvailableTT) && (companyData.Space_AvailableTT !== "") ?
                                <tr>
                                    <td>Space Available:</td>
                                    <td>{companyData.Space_AvailableTT}</td>
                                </tr>:""
                            } 
                            {(companyData.Specialist_Spaces) && (companyData.Specialist_Spaces !== "") ?
                                <tr>
                                    <td>Specialist Space:</td>
                                    <td>{companyData.Specialist_Spaces}</td>
                                </tr>:""
                            } 
                            {(companyData.Kitchen) && (companyData.Kitchen !== "") ?
                                <tr>
                                    <td>Kitchen:</td>
                                    <td>{companyData.Kitchen === "Y" ? "Yes" : companyData.Kitchen}</td>
                                </tr>:""
                            } 
                            {(companyData.Disabled_Access) && (companyData.Disabled_Access !== "") ?
                                <tr>
                                    <td>Disabled Access:</td>
                                    <td>{companyData.Disabled_Access === "Y" ? "Yes" : companyData.Disabled_Access}</td>
                                </tr>:""
                            } 
                            {(companyData.Price_Range) && (companyData.Price_Range !== "") ?
                                <tr>
                                    <td>Price Range:</td>
                                    <td>{companyData.Price_Range}</td>
                                </tr>:""
                            } 
                        </table>
                        <button onClick = { this.readLess} class="nodal_action">Read less &#8594;</button>
                    </div> 
                    : 
                    <div>
                        <table class="w3-table">
                            <tr>
                                <td valign="top">Address:</td>
                                <td>{companyData.Address_1} {companyData.Add_2_RD_St} {companyData.Add_3} {companyData.Add_4}</td>
                            </tr>
                            <tr>
                                <td>Postcode:</td>
                                <td>{companyData.Postcode}</td>
                            </tr>
                            <tr>
                                <td>Category:</td>
                                <td>{companyData.Sub_Cat}</td>
                            </tr>
                            <tr>
                                <td>Ward:</td>
                                <td>{companyData.Ward}</td>
                            </tr>
                        </table>
                        <button onClick = { this.readMore} class="nodal_action">Read more &#8594;</button>
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
        coordinates = {this.props.location}
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