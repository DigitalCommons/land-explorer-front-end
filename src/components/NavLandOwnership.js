import React, {Component} from 'react';
import NavTray from './NavTray';
import NavTrayItem from './common/NavTrayItem';
import Checkbox from './common/Checkbox';

class NavLandOwnership extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            //Postcode field
            postcode: '',
            //Search results based on postcode given
            houses: [],
            //Which houses are selected from the houses array. (index based) 
            selected_houses: new Set([]),
            //There are currently 3 stage to land ownership process
            //1. User search for property by postcode. Mode: search
            //2. User select the list of property based on search results. Mode: select
            //3. User add to cart (title or plan). Mode: cart
            mode: 'search',

        }
        this.searchHouses = this.searchHouses.bind(this)
        this.addToCartView = this.addToCartView.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.closeTray = this.closeTray.bind(this)
    }

    //When postcode is filled
    handleChange(event) {
        this.setState({postcode: event.target.value});
    }    

    //When property are chosen
    handleCheckboxChange = changeEvent => {
        const { name } = changeEvent.target;
        if (this.state.selected_houses.has(name)) {
            this.state.selected_houses.delete(name);
        } else {
            this.state.selected_houses.add(name);
        }
    };   

    //Reset mode when nav tray are closed
    closeTray = () => {
        this.setState({mode: 'search'});
        this.props.onClose();
    }

    //Call api to get address based on give postcode
    addressAPI() {
        if(this.state.postcode)
        {
            fetch("https://api.ideal-postcodes.co.uk/v1/postcodes/"+this.state.postcode+"?api_key=iddqd")
            .then(res => res.json())
            .then(
            (data) => {
                this.setState({
                    houses: data.result,
                    mode: "select"
                });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                this.setState({
                error
                });
            }
            )
        }
        else{
            //React to empty postcode
        }
    }

    //Dummy data for address lookup
    fakeDate(){
        let data = [{"postcode":"NE1 4BD","postcode_inward":"4BD","postcode_outward":"NE1","post_town":"NEWCASTLE UPON TYNE","dependant_locality":"","double_dependant_locality":"","thoroughfare":"Westgate Road","dependant_thoroughfare":"","building_number":"","building_name":"Rehearsal Rooms 115-119","sub_building_name":"Apartment 1","po_box":"","department_name":"","organisation_name":"","udprn":28220399,"umprn":"","postcode_type":"S","su_organisation_indicator":"","delivery_point_suffix":"1A","line_1":"Apartment 1","line_2":"Rehearsal Rooms","line_3":"115-119 Westgate Road","premise":"Apartment 1, Rehearsal Rooms, 115-119","longitude":-1.621149,"latitude":54.970542,"eastings":424351,"northings":564057,"country":"England","traditional_county":"Northumberland","administrative_county":"","postal_county":"Tyne and Wear","county":"Tyne and Wear","district":"Newcastle upon Tyne","ward":"Monument"},{"postcode":"NE1 4BD","postcode_inward":"4BD","postcode_outward":"NE1","post_town":"NEWCASTLE UPON TYNE","dependant_locality":"","double_dependant_locality":"","thoroughfare":"Westgate Road","dependant_thoroughfare":"","building_number":"","building_name":"Rehearsal Rooms 115-119","sub_building_name":"Apartment 2","po_box":"","department_name":"","organisation_name":"","udprn":28220402,"umprn":"","postcode_type":"S","su_organisation_indicator":"","delivery_point_suffix":"1B","line_1":"Apartment 2","line_2":"Rehearsal Rooms","line_3":"115-119 Westgate Road","premise":"Apartment 2, Rehearsal Rooms, 115-119","longitude":-1.621149,"latitude":54.970542,"eastings":424351,"northings":564057,"country":"England","traditional_county":"Northumberland","administrative_county":"","postal_county":"Tyne and Wear","county":"Tyne and Wear","district":"Newcastle upon Tyne","ward":"Monument"}];
        this.setState({
            houses: data,
            mode: "select"
        });
    }

    //Main method invoked to search property based on postcode
    //This is only here for development, to switch between dummy data and real API
    searchHouses(event) {
        event.preventDefault();
        //Commenting the API calls to reduce usage as there is limitations for free version 
        this.addressAPI()

        //Using dummy property data
        //this.fakeDate();
    }

    //Serve the page where user can add property title/plan to cart
    addToCartView(event) {
        event.preventDefault();

        this.setState({
            mode: "cart"
        })
    }

    //The sub component view for postcode form 
    propertySearch = () => {
        return ( 
            <div className="land-ownership-padding">
                <h4 className="land-ownership-subsection">Property information Search</h4>
                <h5>Use Drawing tools to select an area or enter address details below:</h5>
                <form onSubmit={this.searchHouses}>
                    {/*
                    <label>
                    <input type="text" placeholder="House Name or No." />
                    </label>
                    */}
                    <label>
                    <input type="text" placeholder="Post code" value={this.state.postcode} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }

    //Helper function to format a house object into a one line string
    displayHouse = (house) => {
        let data = "";
        data +=  house.line_1;
        if(house.line_2) data += ', ' + house.line_2;
        if(house.line_3) data += ', ' + house.line_3;
        return data;
    
    }

    //The sub component view for property checkbox form 
    propertySelect = () => {
        return ( 
            <div className="land-ownership-padding">
               <div id="property-list">
                    <hr />
                    <h4 class="land-ownership-subsection">Select property</h4>
                </div>
                <form onSubmit={this.addToCartView}>        
                    {
                        this.state.houses.map((house,index) => {
                            return <div class="select-property-checkbox"><label><input type="checkbox" name={index} value={index} key={index} onChange={this.handleCheckboxChange} className="form-check-input" /> { this.displayHouse(house) } <br /></label></div>
                            //return <label><input type="checkbox" name={index} value={index} key={index} onChange={this.handleCheckboxChange} className="form-check-input" /> {house.line_1}, {house.line_2} <br /></label>
                        })
                    }
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }

   //The sub component view where user can add title/plan to cart
    purchaseDocument = (house) => {
        return ( 
            <div className="purchase-card">
                <div className="purchase-container">
                    <span>
                        <b>{this.displayHouse(house)}</b>
                        <p className="purchase-detail">{house.post_town}</p>
                        <p className="purchase-detail">{house.postcode}</p>
                    </span>

                    <p class="add-to-basket-button">TITLE - Add to Basket: £3.99</p>
                    <p class="add-to-basket-button">PLAN - Add to Basket: £3.99</p>

                </div>
            </div>
        ); 
    }

    //Footer view to go back to seach/select mode or continue to purchase
    navFooter = () =>{
        return (
            <div className="nav-tray-footer">
                <div className="nav-tray-footer-item" onClick={this.backAction}>
                    BACK
                </div>
                <div className="nav-tray-footer-item" onClick={this.continueAction}>
                    CONTINUE
                </div>

            </div>
        );
    }

    //Return to select omde. Attached at the nav footer
    backAction = () => {
        this.setState({mode: 'select'});
    }

    //Continue towards purchasing. Attached at the nav footer
    continueAction = () => {

    }

    render() {
        if(this.state.mode === 'search') {
            return (
                <NavTray
                    title="Land Ownership"
                    open={this.props.open && this.props.active === 'Land Ownership'}
                    onClose={this.closeTray}
                >   
                
                { this.propertySearch() }
                </NavTray>
            )
        }else if(this.state.mode === 'select'){
            return (
                <NavTray
                    title="Land Ownership"
                    open={this.props.open && this.props.active === 'Land Ownership'}
                    onClose={this.closeTray}
                >   

                
                { this.propertySearch() }
                { this.propertySelect() }
 
                </NavTray>
            )
        }else if(this.state.mode === 'cart'){

            return (
                <NavTray
                    title="Purchase Documents"
                    open={this.props.open && this.props.active === 'Land Ownership'}
                    onClose={this.closeTray}
                >   

                {
                    this.state.houses.map((house, index) => {
                        if(this.state.selected_houses.has(index.toString())){
                            
                            return this.purchaseDocument(house);
                            //return <div>{house.line_1 + ',' + house.line_2 + ',' + house.line_3}</div>
                        }
                    })
                }

                { this.navFooter() }
                </NavTray>
            )
        }
    };
}

/*
const NavLandOwnership = ({ open, active, onClose, searchHouses, houses }) => (
    <NavTray
        title="Land Ownership"
        open={open && active === 'Land Ownership'}
        onClose={onClose}
    >   
        <h4>Property information Search</h4>
        <h5>Use Drawing tools to select an area or enter address details below:</h5>
        <form onSubmit={searchHouses}>
            <label>
            <input type="text" placeholder="House Name or No." />
            </label>
            <label>
            <input type="text" />
            </label>
            <input type="submit" value="Submit" />
        </form>

        <div id="property-list">
            <hr />
            <h4>Select property</h4>
        </div>
        <form action="/action_page.php">        
            {
                houses.map((house) => {
                    return <label><input type="checkbox" name="house" value="{house.id}" /> {house.address} <br /></label>
                })
            }
            <input type="submit" value="Submit" />
        </form>


   </NavTray>

);
*/
export default NavLandOwnership;