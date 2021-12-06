import React, { Component } from "react";

class PropertyListing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: true
    };

    this.formatPrice = this.formatPrice.bind(this);
    this.getKey = this.getKey.bind(this);
    this.hide = this.hide.bind(this);
  }

  formatPrice(price) {
    return `£ ${price.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
  }

  hide() {
    document.getElementById(this.getKey()).style.display = "none";
  }

  getKey() {
    return "id" + this.props.id;
  }

  render() {
    return (
      <div className="listing" id={this.getKey()}>
        <button className="closeListing" onClick={this.hide}>
          {" "}
          X{" "}
        </button>
        <img
          className="listing-image"
          src={this.props.imageURL}
          alt={this.props.imageDescription}
        ></img>

        <p> {this.props.locationName} </p>
        <p> {this.props.agent} </p>
        <p> {this.formatPrice(this.props.price)}</p>


        <br />
      </div>
    );
  }
}

export default PropertyListing;
