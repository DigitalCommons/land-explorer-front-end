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

    getStyleByType(type){
        const redStyle = {
            color: 'red',
            zIndex: this.props.id == this.props.activeNodal? 4 : 3,
        }
        const blueStyle = {
            color: 'blue',
            zIndex: this.props.id == this.props.activeNodal? 4 : 3,
            
        }
        const purpleStyle = {
            color: 'purple',
            zIndex: this.props.id == this.props.activeNodal? 4 : 3,
        }
        const greenStyle = {
            color: 'green',
            zIndex: this.props.id == this.props.activeNodal? 4 : 3,
        }
        const brownStyle = {
            color: 'brown',
            zIndex: this.props.id == this.props.activeNodal? 4 : 3,
        }
        const greyStyle = {
            
            color: 'grey',
            zIndex: this.props.id == this.props.activeNodal? 4 : 3,
        }
        const orangeStyle = {
            color: 'orange',
            zIndex: this.props.id == this.props.activeNodal? 4 : 3,
        }

        switch (type){
            case "1": return redStyle;
            case "2": return blueStyle;
            case "3": return purpleStyle;
            case "4": return greenStyle;
            case "5": return brownStyle;
            case "6": return greyStyle;
            case "7": return orangeStyle;
        }
    }

    getImgByType(type){
        const redMarker = require('../../assets/img/icon-marker-new--red.svg');
        const blueMarker =  require('../../assets/img/icon-marker-new--blue.svg');
        const purpleMarker = require('../../assets/img/icon-marker-new--green.svg');

        switch(type){
            case "1": return redMarker;
            case "2": return blueMarker;
            case "3": return purpleMarker;
            case "4": return purpleMarker;
            case "5": return purpleMarker;
            case "6": return purpleMarker;
            case "7": return purpleMarker;
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

{/* if() */}
 {/* <button  id = "MoreInfo"   onClick = { this.ReadLess}  className = "Info">Read Less </button> */}
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

        let closeStyle = {
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
                        
                    </div>;
        return;
    }
    
    
    render(){
        if(this.props.id == this.props.activeNodal)
            return(
                <Marker 
            style = { this.getStyleByType(this.props.type) }  
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
            style = { this.getStyleByType(this.props.type) }  
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