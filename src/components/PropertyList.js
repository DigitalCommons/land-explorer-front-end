import React, {Component} from 'react';
import PropertyListing from './PropertyListing';

class PropertyList extends Component {
    constructor(props){
        super(props);

    }

    createList(){

        let propertyArray = [];

        for(let i = 0;i<this.props.listings.length;i++){
            propertyArray.push(
                <PropertyListing 
                    imageURL={this.props.listings[i].imageURL} 
                    imageDescription={this.props.listings[i].imageDescription} 
                    location={this.props.listings[i].location} 
                    agent={this.props.listings[i].agent} 
                    price={this.props.listings[i].price}
                    key = {this.props.listings[i].id}
                    id = {this.props.listings[i].id}
                >
                   
                </PropertyListing>
            );
        }
       
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