import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Marker } from 'react-mapbox-gl';
import { addMarker } from '../actions/ForSaleActions';

class ForSaleMarkers extends Component {
    constructor(props){
        super(props);

        this.dispatchItem = this.dispatchItem.bind(this);
    }

    dispatchItem(){
        this.props.addMarker();
    }

    render() {
        let { activeMarkers } = this.props;
        const markerIcon = require('../assets/img/icon-marker-new--dark-grey.svg');
 
        return(<div>
            <button onClick={this.dispatchItem}>Dispatch Something</button>
        </div>);
        return (
            <React.Fragment>
                <Marker
                    key={546}
                    coordinates = {[-1.6118509274478185, 54.973665159663256]}
                    name={'Tyneside Cinema'}
                    description={'great description'}
                    anchor="bottom"
                    style={{ height: '40px', zIndex: 1}}
                    >
                    <img src={ markerIcon } alt=""
                        style={{
                            height: 40,
                             width: 40,
                            zIndex: 1
                            }}
                        />
                </Marker>
            </React.Fragment>
        );
    }
}

ForSaleMarkers.propTypes = {

};

const mapStateToProps = ({ forSale }) => ({
    activeMarkers: forSale.activeMarkers,
});

const mapDispatchToProps = ({ forSale }) => ({
    theaction:      forSale.action,
})

export default connect(null,{addMarker})(ForSaleMarkers);