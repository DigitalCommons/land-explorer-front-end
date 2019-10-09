import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addMarker, clearMarkers } from '../actions/ForSaleActions';

class ForSaleMarkers extends Component {
    constructor(props){
        super(props);

        this.dispatchItem = this.dispatchItem.bind(this);
    }

    dispatchItem(){
        console.log(this.props.active);

        let markers = [
            {
                coordinates:    [-1.6118509274478185, 54.973665159663256],
                name:           'Tyneside Cinema',
                price:          '£1,000,000',
            },
            {
                coordinates:    [-1.518509274478185, 55.073665159663256],
                name:           'Tyneside Cinema',
                price:          '£1,000,000',
            },
            {
                coordinates:    [-1.418509274478185, 53.073665159663256],
                name:           'Tyneside Cinema',
                price:          '£1,000,000',
            },
        ]

        if(this.props.active == 'For Sale'){
            this.props.addMarker(markers[0]);
            this.props.addMarker(markers[1]);
        }    
        if(this.props.active != 'For Sale')
            this.props.clearMarkers();
    }

    render() {
       
        return (<div>
        {this.dispatchItem()}
        </div>);
    }
}

ForSaleMarkers.propTypes = {

};

export default connect(null,{addMarker, clearMarkers})(ForSaleMarkers);