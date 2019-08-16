import React, {Component} from 'react';
import NavTray from './NavTray';
import NavTrayItem from './common/NavTrayItem';

class NavLandOwnership extends Component {
    constructor(props) {
        super(props);
        this.state = {
            houses: [],
            mode: 'search'
        }
        this.searchHouses = this.searchHouses.bind(this)
        this.purchaseDocument = this.purchaseDocument.bind(this)
    }

    searchHouses(event) {
        //alert('Call backend API for data here...');
        event.preventDefault();
        //Assume success

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
                    <input type="text" />
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
                    <input type="text" />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
        
                <div id="property-list">
                    <hr />
                    <h4>Select property</h4>
                </div>
                <form onSubmit={this.purchaseDocument}>        
                    {
                        this.state.houses.map((house) => {
                            return <label><input type="checkbox" name="house" value="{house.id}" /> {house.address} <br /></label>
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