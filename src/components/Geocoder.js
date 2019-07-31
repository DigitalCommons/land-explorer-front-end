import React, { createElement, Component } from 'react';
import { Map } from 'mapbox-gl';
import PropTypes from 'prop-types';
import { accessToken } from '../token';
import { connect } from 'react-redux';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { setSearchMarker, clearSearchMarker } from "../actions/MapActions";

class GeoCoder extends Component {

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const { map } = this.context;
        var geocoder = new MapboxGeocoder({
            accessToken,
            placeholder: ' Enter Location',
            country: 'gb',
            zoom: 13,
        });
        document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
        geocoder.on('results', (results) => {
            console.log("geocoding results", results);
        });
        geocoder.on('result', (result) => {
            this.props.setSearchMarker({
                lng: result.result.center[0],
                lat: result.result.center[1]
            });
        })
        geocoder.on('clear', this.props.clearSearchMarker)
    }

    render() {
        return null;
    }

    static contextTypes = {
        map: PropTypes.object.isRequired
    };
}

const mapStateToProps = ({ map }) => ({
    center: map.center,
})

export default connect(mapStateToProps, { setSearchMarker, clearSearchMarker })(GeoCoder);