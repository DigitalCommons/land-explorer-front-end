import React, {Component} from 'react';
import NavTray from './NavTray';
import NavTrayItem from './common/NavTrayItem';

class NavLandOwnership extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            postcode: '',
            house_number: '',
            houses: [],
            mode: 'search'
        }
        this.searchHouses = this.searchHouses.bind(this)
        this.purchaseDocument = this.purchaseDocument.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({postcode: event.target.value});
    }    

    addressAPI() {
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

    fakeDate(){
        let data = [{"postcode":"NE1 4BD","postcode_inward":"4BD","postcode_outward":"NE1","post_town":"NEWCASTLE UPON TYNE","dependant_locality":"","double_dependant_locality":"","thoroughfare":"Westgate Road","dependant_thoroughfare":"","building_number":"","building_name":"Rehearsal Rooms 115-119","sub_building_name":"Apartment 1","po_box":"","department_name":"","organisation_name":"","udprn":28220399,"umprn":"","postcode_type":"S","su_organisation_indicator":"","delivery_point_suffix":"1A","line_1":"Apartment 1","line_2":"Rehearsal Rooms","line_3":"115-119 Westgate Road","premise":"Apartment 1, Rehearsal Rooms, 115-119","longitude":-1.621149,"latitude":54.970542,"eastings":424351,"northings":564057,"country":"England","traditional_county":"Northumberland","administrative_county":"","postal_county":"Tyne and Wear","county":"Tyne and Wear","district":"Newcastle upon Tyne","ward":"Monument"},{"postcode":"NE1 4BD","postcode_inward":"4BD","postcode_outward":"NE1","post_town":"NEWCASTLE UPON TYNE","dependant_locality":"","double_dependant_locality":"","thoroughfare":"Westgate Road","dependant_thoroughfare":"","building_number":"","building_name":"Rehearsal Rooms 115-119","sub_building_name":"Apartment 2","po_box":"","department_name":"","organisation_name":"","udprn":28220402,"umprn":"","postcode_type":"S","su_organisation_indicator":"","delivery_point_suffix":"1B","line_1":"Apartment 2","line_2":"Rehearsal Rooms","line_3":"115-119 Westgate Road","premise":"Apartment 2, Rehearsal Rooms, 115-119","longitude":-1.621149,"latitude":54.970542,"eastings":424351,"northings":564057,"country":"England","traditional_county":"Northumberland","administrative_county":"","postal_county":"Tyne and Wear","county":"Tyne and Wear","district":"Newcastle upon Tyne","ward":"Monument"}];
        this.setState({
            houses: data,
            mode: "select"
        });
    }

    searchHouses(event) {
        //Commenting the API calls to reduce usage as there is limitations for free version 
        //this.addressAPI()

        //Using dummy property data
        this.fakeDate();

        //alert(this.state.postcode);
        event.preventDefault();
        //Assume success

        /*
        let array = this.state.houses;
        array = [...array, 
            {id: 1,address: "123 Worwick Street"},
            {id: 2,address: "124 Worwick Street"},
            {id: 3,address: "125 Worwick Street"},
            {id: 4,address: "126 Worwick Street"},

        ];

        this.setState({
            houses: array,
            mode: "select"
        })
        */
    }

    purchaseDocument(event) {
        event.preventDefault();

        this.setState({
            mode: "purchase"
        })
    }

    render() {
        if(this.state.mode === 'search') {
            return (
                <NavTray
                    title="Land Ownership"
                    open={this.props.open && this.props.active === 'Land Ownership'}
                    onClose={this.props.onClose}
                >   
                <h4>Property information Search</h4>
                <h5>Use Drawing tools to select an area or enter address details below:</h5>
                <form onSubmit={this.searchHouses}>
                    <label>
                    <input type="text" placeholder="House Name or No." />
                    </label>
                    <label>
                    <input type="text" placeholder="Post code" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                </NavTray>
            )
        }else if(this.state.mode === 'select'){
            return (
                <NavTray
                    title="Land Ownership"
                    open={this.props.open && this.props.active === 'Land Ownership'}
                    onClose={this.props.onClose}
                >   
                <h4>Property information Search</h4>
                <h5>Use Drawing tools to select an area or enter address details below:</h5>
                <form onSubmit={this.searchHouses}>
                    <label>
                    <input type="text" placeholder="House Name or No." />
                    </label>
                    <label>
                    <input type="text" placeholder="Post code" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
        
                <div id="property-list">
                    <hr />
                    <h4>Select property</h4>
                </div>
                <form onSubmit={this.purchaseDocument}>        
                    {
                        this.state.houses.map((house,index) => {
                            return <label><input type="checkbox" name="house" value={index} /> {house.line_1}, {house.line_2}, {house.line_3}, {house.district} <br /></label>
                        })
                    }
                    <input type="submit" value="Submit" />
                </form>
                </NavTray>
            )
        }else if(this.state.mode === 'purchase'){
            return (
                <NavTray
                    title="Purchase Documents"
                    open={this.props.open && this.props.active === 'Land Ownership'}
                    onClose={this.props.onClose}
                >   

                
                124 Worswick Street
                HUDDERSFIELD
                HD65 3PU

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