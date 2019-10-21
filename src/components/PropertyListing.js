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
        var rgx = /(\d)(?=(\d{3}) + (?!\d)) /g; 
        return `£ ${this.props.price}`.replace(/(\d)(?=(\d{3}) + (?!\d)) /g);
        //  +  + RegExp(/(\d)(?=(\d{3}) + (?!\d)) /g)
         // .replace(/(\d)(?=(\d{3})+(?!\d)) /g,'$1 ,'  )
         


    }

    hide()
    {
             document.getElementById(this.getKey()).style.display = 'none';
    }

    getKey()
    {
        return 'id' + this.props.id;
    }

    render(){
          return (            
            <div className='listing' id = { this.getKey() }>
               
              <button className = "closeListing" onClick = { this.hide } > X </button> 
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