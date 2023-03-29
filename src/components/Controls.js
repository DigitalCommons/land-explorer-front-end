import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setLngLat, zoomIn, zoomOut, setZoom, setCurrentLocation } from '../actions/MapActions';
import { toggleMenuKey, toggleMenuLayers, toggleMenuCouncilKey } from "../actions/MenuActions";
import { openModal, closeModal } from "../actions/ModalActions";
import constants from '../constants';

class Controls extends Component {

    constructor(props) {
        super(props);
        this.state = {
            zooming: false,
        }
    }

    getLocation = () => {
        if (navigator.geolocation) {
            this.props.openModal('location');
            navigator.geolocation.getCurrentPosition((position) => {
                console.log("geolocation position", position);
                let lat = position.coords.latitude;
                let lng = position.coords.longitude;
                this.props.closeModal('location');
                this.props.setZoom([17]);
                this.props.setLngLat(lng, lat);
                this.props.setCurrentLocation(lng, lat);
            }, (error) => {
                console.log("There was an error", error);
                this.props.closeModal('location');
            });
        }
    }

    zoomIn = () => {
        this.setState({ zooming: true });
        this.props.zoomIn();
        setTimeout(() => {
            this.setState({ zooming: false })
        }, 600);
    }

    zoomOut = () => {
        this.setState({ zooming: true });
        this.props.zoomOut();
        setTimeout(() => {
            this.setState({ zooming: false })
        }, 600);
    }

    render() {
        let { landDataLayers, activeCommunityAssets } = this.props;
        let { zooming } = this.state;
        return (
            <div>
                <div className="menu-layers-button"
                    onClick={() => this.props.toggleMenuLayers()}
                />
                {
                    // If layers are active show button toggle key menu
                    landDataLayers.length && (
                        <div className="menu-key-button"
                            onClick={() => this.props.toggleMenuKey()}
                        />
                    )
                }
                {
                    // If layers are active show button toggle key menu
                    activeCommunityAssets.length > 1 && (
                        <div className="menu-key-button"
                            onClick={() => this.props.toggleMenuCouncilKey()}
                        />
                    )
                }
                <div id="controls">
                    <div className="zoom-button zoom-location"
                        onClick={() => this.getLocation()}
                    />
                    <div className="controls-slider">
                        {this.props.propertiesDisplay &&
                            <div className="zoom-button zoom-properties"
                                style={{ marginBottom: '24px' }}
                                onClick={() => {
                                    if (!zooming) {
                                        this.props.setZoom([constants.PROPERTY_BOUNDARIES_ZOOM_LEVEL]);;
                                    }
                                }}
                            />
                        }
                        <div className="zoom-button zoom-plus"
                            style={{ marginBottom: '24px' }}
                            onClick={() => {
                                if (!zooming) {
                                    this.zoomIn();
                                }
                            }}
                        />
                        <div className="zoom-button zoom-minus"
                            onClick={() => {
                                if (!zooming) {
                                    this.zoomOut();
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

Controls.propTypes = {
    zoomIn: PropTypes.func,
    zoomOut: PropTypes.func
};

const mapStateToProps = ({ map, mapLayers, communityAssets, landOwnership }) => ({
    zoom: map.zoom,
    landDataLayers: mapLayers.landDataLayers,
    activeCommunityAssets: communityAssets.activeCommunityAssets,
    propertiesDisplay: landOwnership.displayActive,
});

export default connect(mapStateToProps, { setLngLat, zoomIn, zoomOut, toggleMenuKey, toggleMenuLayers, toggleMenuCouncilKey, setCurrentLocation, closeModal, openModal, setZoom })(Controls);
