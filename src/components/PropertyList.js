import React, {Component} from 'react';
import PropertyListing from './PropertyListing';

class PropertyList extends Component {
    constructor(props){
        super(props);
        this.state = {
            properties: this.getProperties()
        }
    }

    getProperties(){
        let properties = [
            {
                imageDescription: 'field',
                imageURL:   'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Flodden_Field_%28Braxton%29_-_2004-Feb-06_-_Looking_SSE_from_the_monument.jpg/1024px-Flodden_Field_%28Braxton%29_-_2004-Feb-06_-_Looking_SSE_from_the_monument.jpg',
                location:   'Snarestone, Lecestershire',
                price:      '£600,000',
                agent:      'Humberts'
            },
           {
                imageDescription:        'meadow',
                imageURL:   'https://upload.wikimedia.org/wikipedia/commons/a/a8/UCSC_Meadow.JPG',
                location:   'Snarestone, Lecestershire',
                price:      '£600,000',
                agent:      'plotfinder.net'
            },
            {
                imageDescription:        'prarie',
                imageURL:   'https://upload.wikimedia.org/wikipedia/commons/a/a8/UCSC_Meadow.JPG',
                location:   'Snarestone, Lecestershire',
                price:      '£600,000',
                agent:      'plotfinder.net'
            },
             {
                imageDescription:   'grassland',
                imageURL:   'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Flodden_Field_%28Braxton%29_-_2004-Feb-06_-_Looking_SSE_from_the_monument.jpg/1024px-Flodden_Field_%28Braxton%29_-_2004-Feb-06_-_Looking_SSE_from_the_monument.jpg',
                location:   'Snarestone, Lecestershire',
                price:      '£600,000',
                agent:      'Humberts'
            }
        ]
        return properties; 
    }

    createList(){
        let propertyArray = [];

        for(let i = 0;i<this.state.properties.length;i++){
            propertyArray.push(
                <PropertyListing imageURL={this.state.properties[i].imageURL} imageDescription={this.state.properties[i].imageDescription} location={this.state.properties[i].location} agent={this.state.properties[i].agent} price={this.state.properties[i].price}></PropertyListing>
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