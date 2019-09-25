import React, {Component} from 'react';

class PropertyListing extends Component{
    constructor(props){
        super(props);
        this.state = {
            display: true,
        }

        this.formatPrice    = this.formatPrice.bind(this);
        this.getKey         = this.getKey.bind(this);

    }

    formatPrice(){
        return "£ " + this.props.price;
    }

    hide(){
        document.getElementById(this.getKey()).hide();
    }

    getKey(){
        return 'idk' + this.props.id;
    }

    render(){
          return (
            <div className='listing' id={this.getKey()}>
                <button title = {'close'}
                        onClick = {this.hide()}
                >
                    x
                </button>
                <img className='listing-image' src={this.props.imageURL} alt={this.props.imageDescription}></img>
                <p>{this.props.location}</p>
                <p>{this.props.agent}</p>
                <p>{this.formatPrice()}</p>
            </div>
        )
    }
}

export default PropertyListing;