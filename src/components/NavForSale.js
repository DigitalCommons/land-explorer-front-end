import React, {Component} from 'react';
import NavTray from './NavTray';
import ToggleSwitch from './common/ToggleSwitch';
import PropertyList from './PropertyList';
import ReactMapboxGl from 'react-mapbox-gl';
import { Marker } from "react-mapbox-gl";
import {
    Map,
    TileLayer,
    Popup,
    Circle,
    FeatureGroup,
    LayerGroup,
    LayersControl,
    CircleMarker,
    Polygon,
    Polyline,
    Rectangle,
    Tooltip,
    GeoJSON,
    ZoomControl
} from 'react-leaflet';
import PropTypes from 'prop-types';
const {BaseLayer, Overlay, layerContainer} = LayersControl;


class NavForSale extends Component {
    constructor(props){
        super(props);
        this.state = {
            numberAvailable: 4,
            searchArea: this.getSearchArea(),
            searchRadius: 4,
            propertyType: 'all',
            minPrice: '750000',
            maxPrice: '1000000',
            privateListings: true,
            markers:   true,
        };

        this.handleChange           = this.handleChange.bind(this);
        this.toggleSwitch           = this.toggleSwitch.bind(this);
        this.getFilteredListings    = this.getFilteredListings.bind(this);
        //this.displayMarkers         = this.displayMarkers.bind(this.props.drawControl);
        
    }

    getSearchArea(){
        return 'Newcastle upon Tyne';
    }

    getFilteredListings(){

//this filters the listings based on the options selected. First option is public vs private.

        let output = [];

        let properties = this.getProperties();

       //first add all properties to output, remove them if they are wrong

       //or, just don't add them in the first place
    
       //loop through the array and check each item against the state valuess
      
        for(let i = 0;i<properties.length;i++){

            if(properties[i].private == this.state.privateListings)
                if(properties[i].price >= this.state.minPrice)
                    if(properties[i].price <= this.state.maxPrice)
                        output.push(properties[i]);
          
        };
    
        return output; 
    }

    toggleSwitch(){
        this.setState({
            privateListings: !this.state.privateListings
        });
        
    }

   handleChange(event){
    
    if(event.target.name == 'Property Type')
       this.setState({
           propertyType:    event.target.value,
    });

    if(event.target.name == 'Search Radius')
        this.setState({
            searchRadius:   event.target.value,
        })

    if(event.target.name == 'Minimum Price'){

        let numberValue = parseInt(event.target.value,10);
        this.setState({
            minPrice:       numberValue,
        });
        
    }

    if(event.target.name == 'Maximum Price'){
        let numberValue = parseInt(event.target.value,10);
        this.setState({
            maxPrice:       numberValue,
        });
    }
   }

   getProperties(){
       return [
        {
            imageDescription: 'field',
            imageURL:   'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Flodden_Field_%28Braxton%29_-_2004-Feb-06_-_Looking_SSE_from_the_monument.jpg/1024px-Flodden_Field_%28Braxton%29_-_2004-Feb-06_-_Looking_SSE_from_the_monument.jpg',
            location:   'Snarestone, Lecestershire',
            price:      600000,
            agent:      'Humberts-Private',
            private:    true,
        },
       {
            imageDescription:        'meadow',
            imageURL:   'https://upload.wikimedia.org/wikipedia/commons/a/a8/UCSC_Meadow.JPG',
            location:   'Snarestone, Lecestershire',
            price:      550000,
            agent:      'plotfinder.net/public',
            private:    false,
        },
        {
            imageDescription:        'prarie',
            imageURL:   'https://upload.wikimedia.org/wikipedia/commons/a/a8/UCSC_Meadow.JPG',
            location:   'Snarestone, Lecestershire',
            price:      60000,
            agent:      'plotfinder.net/private',
            private:    true,
        },
        {
            imageDescription:   'grassland',
            imageURL:   'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Flodden_Field_%28Braxton%29_-_2004-Feb-06_-_Looking_SSE_from_the_monument.jpg/1024px-Flodden_Field_%28Braxton%29_-_2004-Feb-06_-_Looking_SSE_from_the_monument.jpg',
            location:   'Snarestone, Lecestershire',
            price:      300000,
            agent:      'Humberts-Public',
            private:    false,
        },
        {
            imageDescription:   'grassland',
            imageURL:   'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Flodden_Field_%28Braxton%29_-_2004-Feb-06_-_Looking_SSE_from_the_monument.jpg/1024px-Flodden_Field_%28Braxton%29_-_2004-Feb-06_-_Looking_SSE_from_the_monument.jpg',
            location:   'Snarestone, Lecestershire',
            price:      6000000,
            agent:      'Humberts-Public',
            private:    false,
        },
        {
            imageDescription:        'prarie',
            imageURL:   'https://upload.wikimedia.org/wikipedia/commons/a/a8/UCSC_Meadow.JPG',
            location:   'Snarestone, Lecestershire',
            price:      800000,
            agent:      'plotfinder.net/private',
            private:    true,
        },
        {
            imageDescription:       'Tyneside Cinema',
            imageURL:   'https://i2-prod.chroniclelive.co.uk/incoming/article12536150.ece/ALTERNATES/s615/DMR_NEC_0101217tyneside_05.jpg',
            location:   'Newcastle upon Tyne',
            price:      1000000,
            agent:      'private.cinemasale.co.uk',
            private:    true,
            coordinates: [-1.6118509274478185, 54.973665159663256],
        },
    ];
   }

   displayMarkers(){

        const markerIcon = require('../assets/img/icon-marker-new--dark-grey.svg');
        //const markerIconAerial = require('../assets/img/icon-marker-new--white.svg');
        //const markerIconActive = require('../assets/img/icon-marker-new--green.svg');

        let markers = [];

        /*
        
        var geojson = {
            type: 'FeatureCollection',
            features: [{
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: this.getProperties()[6].coordinates,
              },
              properties: {
                title: 'Mapbox',
                description: this.getProperties()[6].imageDescription,
              }
            },
           ]
          };

          geojson.features.forEach(function(marker) {

            // create a HTML element for each feature
            var el = document.createElement('div');
            el.className = 'marker-section';
          
            // make a marker for each feature and add to the map
            new ReactMapboxGl.Marker(el)
              .setLngLat(marker.geometry.coordinates)
              .addTo(this.props.drawControl.context.map);
          });

          map comes from this.props.drawControl.context.map.
          Marker wants this.context.map to exist
          Marker wants this == this.props.drawControl


        */

       if(this.props.drawControl)
        markers.push( 
                <Marker
                    key={546}
                    position={this.getProperties()[6].coordinates}
                    name={this.getProperties()[6].imageDescription}
                    description={'great description'}
                    anchor="bottom"
                    style={{ height: '40px', zIndex: 1}}
                    >
                    <img src={ markerIcon } alt=""
                         style={{
                             height: 40,
                             width: 40,
                             zIndex: 1
                         }}
                    />
                </Marker>
        );

    if (this.props.active && this.state.markers)
        return markers;
    else
        return;
   }

    render(){
        return(
            <NavTray
                title="Land For Sale"
                open={this.props.open && this.props.active === 'For Sale'}
                onClose={this.props.onClose}
                css = "nav-left-tray-wide"
                >
            <div className="tray-title-section">

                <p>Showing {this.state.propertyType} properties in {this.state.searchArea}</p>
            
                <select value={this.state.propertyType} name="Property Type" onChange={this.handleChange}>
                    <option value="placeholder">Property Type</option>
                    <option value="all">All</option>
                    <option value="plotPlanningPermission">Plot with Planning Permission</option>
                    <option value="development">Development</option>
                    <option value="conversion">Conversion</option>
                    <option value="redevelopment">Redevelopment</option>
                    <option value="multiplePlot">Multiple Plot</option>
                    <option value="landNoPlanningPermisison">Land (no planning permission)</option>
                    <option value=""></option>
                    <option value="improvement">Improvement</option>
                    <option value="updating">Updating</option>
                    <option value="houseWithPlot">House With Plot</option>
                </select>
                <select value={this.state.searchRadius} name="Search Radius" onChange={this.handleChange}>
                    <option value="searchRadius">Search Radius</option>
                    <option value="1mile">1 mile</option>
                    <option value="5miles">5 miles</option>
                    <option value="10miles">10 miles</option>
                    <option value="20miles">20 miles</option>
                    <option value="50miles">50 miles</option>
                </select>
                <select value={this.state.minPrice} name="Minimum Price" onChange={this.handleChange}>
                    <option value="minPrice">Minimum Price</option>
                    <option value="POA">POA</option>
                    <option value="25000">£25,000</option>
                    <option value="50000">£50,000</option>
                    <option value="100000">£100,000</option>
                    <option value="250000">£250,000</option>
                    <option value="500000">£500,000</option>
                    <option value="750000">£750,000</option>
                    <option value="1000000">£1,000,000</option>
                    <option value="2500000">£2,500,000</option>
                    <option value="7500000">£7,500,000</option>
                    <option value="10000000">£10,000,000</option>
                </select>
                <select value={this.state.maxPrice} name="Maximum Price" onChange={this.handleChange}>
                    <option value="maxPrice">Maximum Price</option>
                    <option value="POA">POA</option>
                    <option value="25000">£25,000</option>
                    <option value="50000">£50,000</option>
                    <option value="100000">£100,000</option>
                    <option value="250000">£250,000</option>
                    <option value="500000">£500,000</option>
                    <option value="750000">£750,000</option>
                    <option value="1000000">£1,000,000</option>
                    <option value="2500000">£2,500,000</option>
                    <option value="7500000">£7,500,000</option>
                    <option value="10000000">£10,000,000</option>
                </select>

                <div>
                    <p>Private Land</p>
                    <ToggleSwitch on={this.state.privateListings} tooltip="publicToPrivate" toggle={this.toggleSwitch} ></ToggleSwitch>
                    <p>Public Land</p>  
                </div>

            </div>

            <PropertyList listings = {this.getFilteredListings()}></PropertyList>
           
            {this.displayMarkers()}

            

            </NavTray>
        )
    }
}


export default (NavForSale);