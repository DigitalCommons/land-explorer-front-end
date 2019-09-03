import React, {Component} from 'react';

class PropertyListing extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className='listing'>
                <img className='listing-image' src={this.props.imageURL} alt={this.props.imageDescription}></img>
                <p>{this.props.location}</p>
                <p>{this.props.agent}</p>
                <p>{this.props.price}</p>
            </div>
        )
    }
}

export default PropertyListing;