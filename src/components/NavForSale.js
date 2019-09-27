import React, {Component} from 'react';
import NavTray from './NavTray';
import ToggleSwitch from './common/ToggleSwitch';
import PropertyList from './PropertyList';

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
            id:         '1',
        },
       {
            imageDescription:        'meadow',
            imageURL:   'https://upload.wikimedia.org/wikipedia/commons/a/a8/UCSC_Meadow.JPG',
            location:   'Snarestone, Lecestershire',
            price:      550000,
            agent:      'plotfinder.net/public',
            private:    false,
            id:         '2',
        },
        {
            imageDescription:        'prarie',
            imageURL:   'https://upload.wikimedia.org/wikipedia/commons/a/a8/UCSC_Meadow.JPG',
            location:   'Snarestone, Lecestershire',
            price:      60000,
            agent:      'plotfinder.net/private',
            private:    true,
            id:         '3',
        },
        {
            imageDescription:   'grassland',
            imageURL:   'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Flodden_Field_%28Braxton%29_-_2004-Feb-06_-_Looking_SSE_from_the_monument.jpg/1024px-Flodden_Field_%28Braxton%29_-_2004-Feb-06_-_Looking_SSE_from_the_monument.jpg',
            location:   'Snarestone, Lecestershire',
            price:      300000,
            agent:      'Humberts-Public',
            private:    false,
            id:         '4',
        }
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
           
            </NavTray>
        )
    }
}

export default NavForSale;