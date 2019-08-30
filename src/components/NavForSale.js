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
            on: true
        };
    }

    getSearchArea (){
        return 'Newcastle upon Tyne';
    }

    toggleSwitch(){
        this.setState({
            on: !this.state.on
        });
    }

    render(){
        return(
            <NavTray
                title="For Sale"
                open={this.props.open && this.props.active === 'For Sale'}
                onClose={this.props.onClose}
                css = "nav-left-tray-wide"
                >
            <p>Showing {this.state.numberAvailable} properties in {this.state.searchArea}</p>
            
            <input type="text" placeholder="Property Type"></input>
            <input type="text" placeholder="Search Radius"></input>
            <input type="text" placeholder="Minimum Price"></input>
            <input type="text" placeholder="Maximum Price"></input>

            
            <p>Private Land</p>
            <ToggleSwitch on={this.props.active} tooltip="publicToPrivate" toggle={this.toggleSwitch} ></ToggleSwitch>
            <p>Public Land</p>          

            <PropertyList></PropertyList>
           
            </NavTray>
        )
    }
}

export default NavForSale;