import React, {Component} from 'react';
import { Marker, Popup } from 'react-mapbox-gl';
import {connect} from 'react-redux';

class Nodal extends Component 
{
    constructor(props){
        super(props);
        this.state = {
            checkBoxState : false,
        }

        this.SetDisplayTrue         = this.SetDisplayTrue.bind(this);
        this.displayInfoIfActive    = this.displayInfoIfActive.bind(this);
        this.closePopup             = this.closePopup.bind(this);
        this.ReadMore               = this.ReadMore.bind(this);
        this.ReadLess               = this.ReadLess.bind(this)
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
   
    ReadMore() 
     {
   this.setState({ checkBoxState:true  });
     }

     ReadLess()
     {
        this.setState({ checkBoxState: false  });
     }

     ExtraInfo()
     {
         return( 
         <div>
            <p> Opening Times </p>
            
            <p> Capacity </p>
           
            <p> Telephone No </p>
           
            <p> Contact Name </p>
           
            <p> Email Address </p>
        </div> 
        
    )
     }


    SetDisplayTrue()
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

        const x = require('../../assets/img/icon-close-new.svg')

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
                        <img src={x} style={closeStyle} onClick = {this.closePopup}/>
                        <h2>{this.props.name}</h2>
                        <p>{this.props.addressLine1}</p>
                        <p>{this.props.addressLine2}</p>
                        <p>{this.props.addressLine3}</p>
                        <p>{this.props.addressLine4}</p>
                        <p>{this.props.postcode}</p>
                        <p>{this.props.subcat}</p>
                        <p>{this.props.telephone}</p>
                        <p>{this.props.website}</p>

                        {/* <button  
                                id = "MoreInfo"   
                                onClick = { this.ReadMore} 
                                onDoubleClick = {this.ReadLess}  
                                className = "Info">
                                Less
                            </button> */}

                        { this.state.checkBoxState ? 
                        <div>
                        <button  
                        id = "MoreInfo"   
                        onClick = { this.ReadLess} 
                        className = "Info">
                        Less
                    </button>
                       { this.ExtraInfo() }
                        </div> 
                        : 
                        <div>
                        <button  
                                id = "MoreInfo"   
                                onClick = { this.ReadMore} 
                                
                                className = "Info">
                                More
                            </button>
                            </div>
                        }
                          <div className = "SpeechBubble"></div>
                    </div>;
                  
        return;
    }
    
    
    render(){
        if(this.props.id == this.props.activeNodal)
            return(
                <Marker 
            style = { { zIndex: this.props.id == this.props.activeNodal? 4 : 3}}  
            coordinates = {this.props.location}>
            {this.displayInfoIfActive()}
            <img    src={this.getImgByType(this.props.type)} 
                    style={{
                        height: '30px',
                        width: '30px',
                        }}
                />
         </Marker>
            )
        return (        
        <Marker 
        style = { { zIndex: this.props.id == this.props.activeNodal? 4 : 3}}  
            coordinates = {this.props.location}
            onClick={this.SetDisplayTrue} >
            {this.displayInfoIfActive()}
            <img    src={this.getImgByType(this.props.type)} 
                    style={{
                        height: '30px',
                        width: '30px',
                        }}
                />
         </Marker>
        )
    }
}

const mapStateToProps = ({ nodal }) => ({
    activeNodal: nodal.activeNodal,
});

export default connect(mapStateToProps)(Nodal);

