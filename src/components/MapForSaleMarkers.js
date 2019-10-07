import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Marker } from 'react-mapbox-gl';

class MapForSaleMarkers extends Component {

    render(){
        let { coordinates } = this.props;
        const markerIcon = require('../assets/img/icon-marker-new--dark-grey.svg');
        console.log(coordinates);

        if(coordinates)
            return (
            <React.Fragment>
                <Marker
                    key={546}
                    coordinates = {coordinates}
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
        else return null;
    }
}

MapForSaleMarkers.propTypes = {

};

const mapStateToProps = ({ forSale }) => ({
    coordinates: forSale.coordinates,
});

export default connect(mapStateToProps)(MapForSaleMarkers);