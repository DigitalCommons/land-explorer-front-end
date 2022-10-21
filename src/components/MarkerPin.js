import React, { Component } from 'react';
import { Marker, Popup } from 'react-mapbox-gl';
import { connect } from 'react-redux';

class MarkerPin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            hidden: false,
            input: '',
        }
    }

    componentDidUpdate(prevProps) {
        if ((prevProps.currentMarker === this.props.marker.uuid) && (this.props.currentMarker !== this.props.marker.uuid)) {
            this.setState({ hidden: false });
        }
    }

    render() {
        let { marker, currentMarker, activeTool, readOnly, baseLayer } = this.props;
        let { hidden, input, editing } = this.state;
        let active = currentMarker === marker.uuid;
        let showPopup = active && !activeTool;
        console.log("active", active);
        return (
            <div>
                <Marker
                    key={marker.uuid}
                    coordinates={marker.coordinates}
                    name={marker.name}
                    description={marker.description}
                    anchor="bottom"
                    style={{ height: '40px', zIndex: 1 }}
                >
                    <div className={active ? "marker-icon-active" : baseLayer === 'aerial' ? "marker-icon-aerial" : "marker-icon"}
                        style={{
                            height: 40,
                            width: 40,
                            zIndex: 1
                        }}
                        onClick={(evt) => {
                            if (!activeTool) {
                                if (marker.uuid === currentMarker) {
                                    this.props.dispatch({ type: 'CLEAR_CURRENT_MARKER' });
                                    this.setState({ hidden: false });
                                } else {
                                    this.props.dispatch({
                                        type: 'SET_CURRENT_MARKER',
                                        payload: marker.uuid
                                    })
                                }
                            }
                        }}
                    />
                </Marker>
                <Popup
                    coordinates={marker.coordinates}
                    offset={{
                        'bottom': [0, -60]
                    }}
                    anchor={"bottom"}
                    className="drawing-popup"
                    style={{
                        display: !hidden && showPopup ? 'block' : 'none',
                        zIndex: 2
                    }}
                >
                    <div
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                        }}
                        className="drawing-popup-content"
                    >
                        {!this.state.editing && (
                            <div
                                className="popup-close"
                                onClick={() => {
                                    this.setState({ hidden: true })
                                }}
                            />
                        )}
                        {this.state.editing ? (
                            <input
                                type="text"
                                className="text-input"
                                style={{
                                    textAlign: 'center',
                                    padding: 0
                                }}
                                value={this.state.input}
                                onChange={(e) => {
                                    this.setState({
                                        input: e.target.value
                                    })
                                }}
                            />
                        ) : (
                            <h2 className="marker-name">{marker.name}</h2>
                        )}
                        {
                            this.state.editing ? (
                                <div className="popup-buttons">
                                    <div className="left"
                                        style={{
                                            color: 'rgba(208, 2, 78, 0.95)'
                                        }}
                                        onClick={() => {
                                            this.setState({
                                                editing: !this.state.editing,
                                                input: null
                                            });
                                        }}
                                    >Cancel
                                    </div>
                                    <div className="right"
                                        style={{
                                            color: '#2ecc71'
                                        }}
                                        onClick={() => {
                                            if (this.state.input) {
                                                this.props.dispatch({
                                                    type: 'RENAME_MARKER',
                                                    payload: {
                                                        name: this.state.input,
                                                        uuid: marker.uuid
                                                    }
                                                })
                                                this.setState({
                                                    editing: !this.state.editing,
                                                    input: null
                                                });
                                            }
                                        }}
                                    >OK
                                    </div>
                                </div>
                            ) : (
                                <div className="popup-buttons">
                                    <div className="left"
                                        onClick={() => {
                                            this.props.dispatch({
                                                type: 'OPEN_NAVIGATION',
                                            })
                                            this.props.dispatch({
                                                type: 'SET_ACTIVE',
                                                payload: 'Land Information'
                                            })
                                        }}
                                    >Info
                                    </div>
                                    <div className="right"
                                        onClick={() => {
                                            if (!readOnly) {
                                                this.setState({
                                                    editing: !this.state.editing,
                                                    input: marker.name
                                                });
                                            }
                                        }}
                                    >Rename
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </Popup>
            </div>
        );
    }
}

MarkerPin.propTypes = {};

const mapStateToProps = ({ markers, navigation, readOnly, mapBaseLayer }) => ({
    currentMarker: markers.currentMarker,
    activeTool: navigation.activeTool,
    readOnly: readOnly.readOnly,
    baseLayer: mapBaseLayer.layer,
})

export default connect(mapStateToProps)(MarkerPin);
