import React, {Component} from 'react';
import PropertyListing from './PropertyListing';

class PropertyList extends Component {
    constructor(props){
        super(props);
        this.state = {
            properties: this.props.listings,
        }

    }

    createList(){

        console.log(this.state.properties);


        let propertyArray = [];

        for(let i = 0;i<this.state.properties.length;i++){
            propertyArray.push(
                <PropertyListing imageURL={this.state.properties[i].imageURL} imageDescription={this.state.properties[i].imageDescription} location={this.state.properties[i].location} agent={this.state.properties[i].agent} price={this.state.properties[i].price}></PropertyListing>
            );

        }
        //console.log("the listings here are " + this.state.properties[0].private);

        return propertyArray;
    }

    render(){
        return(
            <div className="grid-of-listings">
                {this.createList()}
            </div>
            
        )
        
    }
}

export default PropertyList;