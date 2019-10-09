import React, {Component} from 'react';
import NavTray from './NavTray';
import ToggleSwitch from './common/ToggleSwitch';
import PropertyList from './PropertyList';
import ForSaleMarkers from './ForSaleMarkers';


class NavForSale extends Component {
    constructor(props){
        super(props);
        this.state = {
            numberAvailable: 4,
            searchArea: this.getSearchArea(),
            searchRadius: 4,
            propertyType: 'all',
            minPrice: '25000',
            maxPrice: '1000000',
            privateListings: true,
            markers:   true,
        };

        this.handleChange           = this.handleChange.bind(this);
        this.toggleSwitch           = this.toggleSwitch.bind(this);
        this.getFilteredListings    = this.getFilteredListings.bind(this);
        
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

    if(event.target.name == 'Minimum Price'){0
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
            id:         '4',
        },
        {
            imageDescription:   'nicehouse',
            imageURL:   'https://www.lamudi.com.ph/static/media/bm9uZS9ub25l/2x2x2x380x244/739d8acb199851.jpg',
            location:   'Snarestone, Lecestershire',
            price:      1000000,
            agent:      'Private Houses.com',
            private:    true,
            id:         '5',
        },
        {
            imageDescription:   'detachedhouse',
            imageURL:   'https://media.rightmove.co.uk/dir/crop/10:9-16:9/169k/168902/83714213/168902_9105d0cb-967c-46cc-9fa4-65b5132873cf-91_3_31_101368_IMG_01_0000_max_476x317.jpg',
            location:   'Snarestone, Lecestershire',
            price:      300000,
            agent:      'Humberts-Private',
            private:    true,
            id:         '6',
        },
        {
            imageDescription:   'church',
            imageURL:   'https://ichef.bbci.co.uk/news/660/cpsprodpb/9C76/production/_105745004_gettyimages-684415304.jpg',
            location:   'Snarestone, Lecestershire',
            price:      6500000,
            agent:      'Public-Church-Buy',
            private:    false,
            id:         '7',
        },
        {
            imageDescription:   'brownfield',
            imageURL:   'https://www.map.org.uk/images/shufat-3_cropped_778_518.jpg',
            location:   'Snarestone, Lecestershire',
            price:      20000,
            agent:      'Please buy this rubble from me',
            private:    false,
            id:         '8',
        },
    ];
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
                    <option value="0">Minimum Price</option>
                    <option value="0">POA</option>
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
                    <option value="9999999999999">Maximum Price</option>
                    <option value="9999999999999">POA</option>
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
           
           <ForSaleMarkers active = {this.props.active}></ForSaleMarkers>

            </NavTray>
        )
    }
}


export default (NavForSale);