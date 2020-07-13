import React, { Component } from "react";
import { connect } from "react-redux";
import NavTray from "./NavTray";
import ToggleSwitch from "./common/ToggleSwitch";
import PropertyList from "./PropertyList";
import ForSaleMarkers from "./ForSaleMarkers";
import { dummyProperties } from "../data/dummyProperties";
import axios from "axios";

class NavForSale extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchRadius: 4,
      propertyType: "all",
      minPrice: "25000",
      maxPrice: "1000000",
      privateListings: true,
      markers: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.toggleSwitch = this.toggleSwitch.bind(this);
    this.getFilteredListings = this.getFilteredListings.bind(this);
    this.getSearchArea = this.getSearchArea.bind(this);
  }

  getSearchArea() {
    //reverse geocoder to get the name

    return {
      name: "Newcastle upon Tyne",
      coordinates: this.props.currentView.center,
    };
  }

  getFilteredListings() {
    let output = [];

    let properties = this.getProperties(
      this.getSearchArea().coordinates,
      this.state.searchRadius
    );

    //loop through the array and check each item against the state values

    for (let i = 0; i < properties.length; i++) {
      if (properties[i].private == this.state.privateListings)
        if (properties[i].price >= this.state.minPrice)
          if (properties[i].price <= this.state.maxPrice)
            output.push(properties[i]);
    }
    return output;
  }

  toggleSwitch() {
    this.setState({
      privateListings: !this.state.privateListings,
    });
  }

  handleChange(event) {
    if (event.target.name == "Property Type")
      this.setState({
        propertyType: event.target.value,
      });

    if (event.target.name == "Search Radius")
      this.setState({
        searchRadius: event.target.value,
      });

    if (event.target.name == "Minimum Price") {
      0;
      let numberValue = parseInt(event.target.value, 10);
      this.setState({
        minPrice: numberValue,
      });
    }

    if (event.target.name == "Maximum Price") {
      let numberValue = parseInt(event.target.value, 10);
      this.setState({
        maxPrice: numberValue,
      });
    }
  }

  getProperties(coordinates, radius) {
    //api call to get properties for sale in 50 miles radius of coordinates
    if (!coordinates) return dummyProperties;

    let baseURL = "http://api.zoopla.co.uk/api/v1/property_listings.js?";
    let request =
      "latitude=" +
      coordinates[1] +
      "&longitude=" +
      coordinates[0] +
      "&radius=" +
      radius;
    let APIKey = "&api_key=6s6rg5s3u68b4ch85n9dkb8u";
    let zooplaAPICall = baseURL + request + APIKey;

    axios
      .get(zooplaAPICall)
      .then((response) => response.json())
      .then((json) => {
        return json;
      });

    return dummyProperties;
  }

  render() {
    return (
      <NavTray
        title="Land For Sale"
        open={this.props.open && this.props.active === "For Sale"}
        onClose={this.props.onClose}
        css="nav-left-tray-wide"
      >
        <div className="tray-title-section">
          <p>
            Showing{" "}
            {this.props.active === "For Sale"
              ? this.getFilteredListings().length
              : ""}{" "}
            properties in {this.getSearchArea().name}
          </p>

          <select
            value={this.state.propertyType}
            name="Property Type"
            onChange={this.handleChange}
          >
            <option value="placeholder">Property Type</option>
            <option value="all">All</option>
            <option value="plotPlanningPermission">
              Plot with Planning Permission
            </option>
            <option value="development">Development</option>
            <option value="conversion">Conversion</option>
            <option value="redevelopment">Redevelopment</option>
            <option value="multiplePlot">Multiple Plot</option>
            <option value="landNoPlanningPermisison">
              Land (no planning permission)
            </option>
            <option value=""></option>
            <option value="improvement">Improvement</option>
            <option value="updating">Updating</option>
            <option value="houseWithPlot">House With Plot</option>
          </select>

          <select
            value={this.state.searchRadius}
            name="Search Radius"
            onChange={this.handleChange}
          >
            <option value="searchRadius">Search Radius</option>
            <option value="1mile">1 mile</option>
            <option value="5miles">5 miles</option>
            <option value="10miles">10 miles</option>
            <option value="20miles">20 miles</option>
            <option value="50miles">50 miles</option>
          </select>

          <select
            value={this.state.minPrice}
            name="Minimum Price"
            onChange={this.handleChange}
          >
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

          <select
            value={this.state.maxPrice}
            name="Maximum Price"
            onChange={this.handleChange}
          >
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

          {this.state.privateListings ? (
            <div style={{ padding: "10px" }}>
              <span className="PublicLand"> Public Land</span>
              <ToggleSwitch
                on={this.state.privateListings}
                tooltip="publicToPrivate"
                toggle={this.toggleSwitch}
              />
              <span className="PrivateLand" style={{ color: "#2ecc71" }}>
                {" "}
                Private Land
              </span>{" "}
            </div>
          ) : (
            <div style={{ padding: "10px" }}>
              <span className="PublicLand" style={{ color: "#2ecc71" }}>
                {" "}
                Public Land
              </span>{" "}
              <ToggleSwitch
                on={this.state.privateListings}
                tooltip="publicToPrivate"
                toggle={this.toggleSwitch}
              />{" "}
              <span className="PrivateLand"> Private Land</span>{" "}
            </div>
          )}
          {/* Make the text color depending on which option has been toggled */}
        </div>
        {this.props.open && this.props.active === "For Sale" ? (
          <div>
            <PropertyList listings={this.getFilteredListings()}></PropertyList>
            <ForSaleMarkers
              active={this.props.active}
              properties={this.getFilteredListings()}
            ></ForSaleMarkers>
          </div>
        ) : (
          <div></div>
        )}
      </NavTray>
    );
  }
}

const mapStateToProps = ({ map, markers, forSale }) => ({
  searchMarker: map.searchMarker,
  currentLocation: map.currentLocation,
  markers: markers.markers,
  currentView: forSale.currentView,
});

export default connect(mapStateToProps)(NavForSale);
