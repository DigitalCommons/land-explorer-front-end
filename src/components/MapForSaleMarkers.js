import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Marker } from 'react-mapbox-gl';

class MapForSaleMarkers extends Component {
    constructor(props){
        super(props);
        
    }

    createMarkers(){
        let { markerInformationSet } = this.props;
        const markerIcon = require('../assets/img/icon-marker-new--dark-grey.svg');

        let markers = [];

        console.log("map component reads" + markerInformationSet);

        if(markerInformationSet.length > 0)
        markers.push(
            <Marker
                    key={546}
                    coordinates = {markerInformationSet[0].location}
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
        )

        return markers;
    }

    render(){
        let { markerInformationSet } = this.props;
        console.log("map component reads" + markerInformationSet);
        if(markerInformationSet)
            return (
            <React.Fragment>
                {this.createMarkers()}
            </React.Fragment>
        );
        else return null;
    }
}

MapForSaleMarkers.propTypes = {

};

const mapStateToProps = ({ forSale }) => ({
    markerInformationSet: forSale.markerInformationSet,
});

export default connect(mapStateToProps)(MapForSaleMarkers);