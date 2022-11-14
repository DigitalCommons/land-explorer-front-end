import React, { Component } from 'react';
import { connect } from 'react-redux';
import MarkerPin from './MarkerPin';
import { Cluster, Marker } from 'react-mapbox-gl';

const ClusterMarker = (coordinates, pointCount) => {
    return (
        <Marker
            key={coordinates.toString()}
            coordinates={coordinates}
            style={{ height: "40px", zIndex: 2 }}
        >
            <div className="cluster-container cluster-grey-transparent">
                <div className="cluster-background cluster-grey">
                    <p className="cluster-text">{pointCount}</p>
                </div>
            </div>
        </Marker>
    );
};

class Markers extends Component {

    handleMarkerClick = (evt, marker) => {
        let { dispatch, map } = this.props;
        if (this.props.activeTool === 'trash') {
            dispatch({
                type: 'CLEAR_MARKER',
                payload: marker.uuid
            })
        } else {
            let coords = marker.coordinates;
            let point = map.project(coords);
            const features = map.queryRenderedFeatures(point);
            const sourceFeatures = map.querySourceFeatures('composite');
            console.log("source features", sourceFeatures);
            dispatch({ type: 'CLEAR_INFO' });
            if (features.length) {
                features.map((feature) => {
                    if (feature.layer.id === 'provisional-agricultural-land-ab795l') {
                        dispatch({
                            type: 'SET_INFO_AGRICULTURAL',
                            payload: feature.properties
                        });
                        dispatch({
                            type: 'OPEN_SECTION',
                            payload: 'agriculturalGrade'
                        });
                        dispatch({
                            type: 'OPEN_SECTION',
                            payload: 'siteArea'
                        });
                    }
                });
            }
            console.log("features", features);
            dispatch({
                type: 'SET_CURRENT_MARKER',
                payload: marker.uuid
            })
            dispatch({ type: 'OPEN_NAVIGATION' });
            dispatch({
                type: 'SET_ACTIVE',
                payload: 'Land Information'
            });
        }
    }

    render() {
        let { markers, searchMarker, currentLocation } = this.props;
        console.log("marker map?", this.props.map);
        console.log("search marker", searchMarker);
        return (
            <React.Fragment>
                {
                    searchMarker && (
                        <Marker
                            coordinates={searchMarker}
                            style={{ zIndex: 1 }}
                        >
                            <img src={require('../assets/img/icon-marker-new--red.svg')} alt=""
                                style={{
                                    height: 40,
                                    width: 40
                                }}
                            />
                        </Marker>
                    )
                }
                {
                    currentLocation && (
                        <Marker
                            coordinates={currentLocation}
                            style={{ zIndex: 1 }}
                        >
                            <img src={require('../assets/img/icon-current-location--blue.svg')} alt=""
                                style={{
                                    height: 30,
                                    width: 30
                                }}
                            />
                        </Marker>
                    )
                }
                {
                    markers && <Cluster ClusterMarkerFactory={ClusterMarker}>
                        {markers.map((marker) => (
                            <MarkerPin
                                key={marker.uuid}
                                coordinates={marker.coordinates}
                                marker={marker}
                                handleMarkerClick={this.handleMarkerClick}
                            />
                        ))}
                    </Cluster>
                }
            </React.Fragment>
        );
    }
}

Markers.propTypes = {};

const mapStateToProps = ({ map, markers }) => ({
    searchMarker: map.searchMarker,
    currentLocation: map.currentLocation,
    markers: markers.markers,
});

export default connect(mapStateToProps)(Markers);
