import React, {Component} from 'react';

class PropertyListing extends Component
{
    constructor(props)
    {
        super(props);
        
        this.state = 
        {
            display: true,
        }

        this.formatPrice    = this.formatPrice.bind(this);
        this.getKey         = this.getKey.bind(this);
        this.hide           = this.hide.bind(this);

      }

    formatPrice()
    {
        return "£ " + this.props.price;
    }

    hide()
    {
        // if(document.getElementById(this.getKey()))
        //     document.getElementById(this.getKey()).style.display = 'none';
        console.log("Peeka a Boo!!");
    }

    getKey()
    {
        return 'idk' + this.props.id;
    }

    render(){
          return (            
            <div className='listing' id = { this.getKey() }>
               
              <button className = "closeListing" onClick = { this.hide }> X </button> 
                <img className = 'listing-image' src = { this.props.imageURL } alt = { this.props.imageDescription }></img>
                
                  <p> { this.props.location } </p>
                  <p> { this.props.agent } </p>
                  <p> { this.formatPrice() }</p>
                <br />
            </div>
        )
    }
}


export default PropertyListing;