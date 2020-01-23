import React, {Component} from 'react';
import {Marker} from 'react-mapbox-gl';
import {connect} from 'react-redux';
 



class Nodal extends Component 
{
    constructor(props){
        super(props);
        this.state = {
            checkBoxState : false,
           
        }

        this.openPopup              = this.openPopup.bind(this);
        this.displayInfoIfActive    = this.displayInfoIfActive.bind(this);
        this.closePopup             = this.closePopup.bind(this);
        this.readMore               = this.readMore.bind(this);
        this.readLess               = this.readLess.bind(this)
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
        // let zoom = this.map.getZoom();
        // alert(zoom);

    }

    closePopup()
    {
        this.props.dispatch({
            type: 'CLOSE_NODALS',
        });
    }


    displayInfoIfActive(){
 
         
        console.log(this.props.zoom)
  

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



        if(this.props.id === this.props.activeNodal)
      
            return <div className = "Popup">
                        <img src = {closeIcon} style = {closeStyle} onClick = {this.closePopup} />
                        
                        <figure className = "CommunityAssetControls">
                            <button className = "DeleteCommunityAsset"  >
                            <img src = {DeleteCommunityAsset}   alt = "DeleteCommunityAsset" 
                             onClick ={ console.log("Replace this console log with the event handler for delete ")} style = {{ backgroundColor: 'none'}}  />
                            </button>
                        </figure>
                        
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
    
    
    render(){
        if(this.props.id == this.props.activeNodal)
        {
           
            return (<Marker style = { { zIndex: this.props.id == this.props.activeNodal? 4 : 3}}  
                     coordinates = {this.props.location} 
                    >
                        {this.displayInfoIfActive()}
                        <img 
                            src={this.getImgByType(this.props.type)} 
                            style={{height: '30px', width: '30px', }}
                        />
                    </Marker>);
        }
        else
            return (<Marker 
                        style = { { zIndex: this.props.id == this.props.activeNodal? 4 : 3}}  
                        coordinates = {this.props.location}
                        onClick={this.openPopup}
                    >
                        {this.displayInfoIfActive()}
                        <img 
                            src={this.getImgByType(this.props.type)} 
                            style={{height: '30px',width: '30px', }}
                        />
                    </Marker>);
    }
}

const mapStateToProps = ({ nodal , map }) => ({
    activeNodal: nodal.activeNodal,
    zoom: map.zoom
    
});




export default connect(mapStateToProps)(Nodal);