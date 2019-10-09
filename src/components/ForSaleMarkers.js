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

        let marker = {
            coordinates:    [-1.6118509274478185, 54.973665159663256],
            name:           'Tyneside Cinema',
            price:          '£1,000,000',
        }

        if(this.props.active == 'For Sale')
            this.props.addMarker(marker);
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