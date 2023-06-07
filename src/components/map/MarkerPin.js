import React, { Component } from 'react';
import { Marker } from 'react-mapbox-gl';
import { connect } from 'react-redux';
import DrawingPopup from './DrawingPopup';

class MarkerPin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popupClosed: false,
            input: '',
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.active && !this.props.active) {
            // Reset so that popup opens if we set the marker to active again
            this.setState({ popupClosed: false });
        }
    }

    render() {
        let { marker, active, activeTool, baseLayer } = this.props;
        let showPopup = !this.state.popupClosed && active && !activeTool;
        return (
            <Marker
                key={marker.uuid}
                coordinates={marker.coordinates}
                name={marker.name}
                description={marker.description}
                anchor="bottom"
                style={{ height: '40px', zIndex: active ? 4 : 3 }}
            >
                <div>
                    <div
                        data-tooltip={marker.name}
                        className="pointer">
                        <div className={active ? "marker-icon-active" : baseLayer === 'aerial' ? "marker-icon-aerial" : "marker-icon"}
                            style={{
                                height: 40,
                                width: 40,
                                zIndex: 2,
                                position: "absolute",
                                top: '0px',
                                left: '-20px',
                            }}
                            onClick={() => {
                                if (!activeTool) {
                                    if (active) {
                                        this.props.dispatch({ type: 'CLEAR_CURRENT_MARKER' });
                                        this.setState({ popupClosed: false });
                                    } else {
                                        this.props.dispatch({
                                            type: 'SET_CURRENT_MARKER',
                                            payload: marker.uuid
                                        })
                                    }
                                }
                            }}
                        />
                        <span className="marker-shadow"></span>
                    </div>
                    {showPopup && (
                        <div style={{
                            position: "relative",
                            bottom: "-5px"
                        }}>
                            <DrawingPopup
                                object={marker}
                                type={"marker"}
                                source={"map"}
                                closeDescription={() => this.setState({ popupClosed: true })}
                            />
                        </div>
                    )}
                </div>
            </Marker>
        );
    }
}

MarkerPin.propTypes = {};

const mapStateToProps = ({ leftPane, mapBaseLayer }) => ({
    activeTool: leftPane.activeTool,
    baseLayer: mapBaseLayer.layer,
})

export default connect(mapStateToProps)(MarkerPin);
