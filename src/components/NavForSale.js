import React, {Component} from 'react';
import NavTray from './NavTray';
import ToggleSwitch from './common/ToggleSwitch';
import PropertyList from './PropertyList';

class NavForSale extends Component {
    constructor(props){
        super(props);
        this.state = {
            numberAvailable: 8,
            searchArea: this.getSearchArea(),
            searchRadius: 4,
            type: 'conversion',
            minPrice: '750000',
            maxPrice: '1000000',
            private: true,
        };
    }

    getSearchArea (){
        return 'Newcastle upon Tyne';
    }

    toggleSwitch(){
        console.log(this);
        
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

                <p>Showing {this.state.numberAvailable} properties in {this.state.searchArea}</p>
            
                <select name="Property Type">
                    <option value="propertyType">Property Type</option>
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
                <select name="Search Radius">
                    <option value="searchRadius">Search Radius</option>
                    <option value="1mile">1 mile</option>
                    <option value="5miles">5 miles</option>
                    <option value="10miles">10 miles</option>
                    <option value="20miles">20 miles</option>
                    <option value="50miles">50 miles</option>
                </select>
                <select name="Minimum Price">
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
                <select name="Maximum Price">
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
                    <ToggleSwitch on={this.state.private} tooltip="publicToPrivate" toggle={this.toggleSwitch} ></ToggleSwitch>
                    <p>Public Land</p>  
                </div>

            </div>

            <PropertyList></PropertyList>
           
            </NavTray>
        )
    }
}

export default NavForSale;