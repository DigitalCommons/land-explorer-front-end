import React, { Component } from 'react';
import { GeoJSONLayer, Popup } from 'react-mapbox-gl';
import { connect } from "react-redux";
import * as turf from '@turf/turf';

class Drawing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            input: '',
            hidden: false
        }
    }

    componentDidUpdate(prevProps) {
        let polygonId = this.props.polygon.data.id;
        if ((prevProps.activePolygon === polygonId) && (this.props.activePolygon !== polygonId)) {
            this.setState({ hidden: false });
        }
    }

    render() {
        let { polygon, type, activePolygon, activeTool, readOnly, baseLayer } = this.props;
        let { editing, hidden } = this.state;
        let polygonId = polygon.data.id;
        polygon = polygon.data;
        let isActive = polygonId === activePolygon;
        let center = turf.pointOnFeature(polygon);
        let showPopup = isActive && !activeTool;
        let popup = {
            coordinates: center.geometry.coordinates,
            name: this.props.name,
        };
        console.log("ACTIVE TOOL", activeTool);
        return (
            <div>
                {
                    type === 'polygon' ? (
                        <GeoJSONLayer
                            data={polygon}
                            linePaint={{
                                "line-color": isActive ? "red" : (baseLayer === 'aerial') ? 'white' : "black",
                                "line-width": 2,
                                "line-opacity": (activeTool && (activeTool !== 'drop-pin')) ? 0 : 1,
                            }}
                            fillPaint={{
                                "fill-color": isActive ? "red" : (baseLayer === 'aerial') ? 'white' : "black",
                                "fill-opacity": (activeTool && (activeTool !== 'drop-pin')) ? 0 : .05,
                            }}
                            fillOnClick={(e) => {
                                console.log("Active tool on click", activeTool);
                                if (activeTool !== 'drop-pin') {
                                    if (!(activeTool)) {
                                        console.log("the polygon was clicked", e);
                                        let area = turf.area(polygon);
                                        let roundedArea = Math.round(area * 100) / 100;
                                        if (isActive) {
                                            this.props.dispatch({
                                                type: 'CLEAR_ACTIVE_POLYGON',
                                            })
                                        } else {
                                            this.props.dispatch({
                                                type: 'SET_ACTIVE_POLYGON',
                                                payload: polygonId
                                            });
                                            this.setState({ hidden: false });
                                        }
                                    }
                                }
                            }}
                        />
                    ) : (
                        <GeoJSONLayer
                            data={polygon}
                            linePaint={{
                                "line-color": isActive ? "red" : (baseLayer === 'aerial') ? 'white' : "black",
                                "line-width": 3,
                                "line-opacity": activeTool ? 0 : 1,
                            }}
                            lineOnClick={(e) => {
                                console.log("the line was clicked", e);
                                if (isActive) {
                                    this.props.dispatch({
                                        type: 'CLEAR_ACTIVE_POLYGON',
                                    })
                                } else {
                                    this.props.dispatch({
                                        type: 'SET_ACTIVE_POLYGON',
                                        payload: polygonId
                                    });
                                    this.setState({ hidden: false });
                                }
                            }}
                        />
                    )
                }
                <Popup
                    coordinates={popup.coordinates}
                    offset={{
                        'bottom': [0, -10]
                    }}
                    anchor="bottom"
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
                                    let value = e.target.value;
                                    if (value.length < 18) {
                                        this.setState({ input: value })
                                    }
                                }}
                            />
                        ) : (
                            <h2>{popup.name}</h2>
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
                                                    type: 'RENAME_POLYGON',
                                                    payload: {
                                                        name: this.state.input,
                                                        id: polygonId
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
                                        style={{
                                            color: '#2ecc71'
                                        }}
                                        onClick={() => {
                                            this.props.dispatch({ type: 'OPEN_NAVIGATION' });
                                            this.props.dispatch({
                                                type: 'SET_ACTIVE',
                                                payload: 'Land Information'
                                            })
                                        }}
                                    >Info
                                    </div>
                                    <div className="right"
                                        style={{ color: readOnly ? 'rgb(200,200,200)' : '#2ecc71' }}
                                        onClick={() => {
                                            if (!readOnly) {
                                                this.setState({
                                                    editing: !this.state.editing,
                                                    input: popup.name
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
        )
    }
}

Drawing.propTypes = {};

const mapStateToProps = ({ navigation, drawings, readOnly, mapBaseLayer }) => ({
    activeTool: navigation.activeTool,
    activePolygon: drawings.activePolygon,
    readOnly: readOnly.readOnly,
    baseLayer: mapBaseLayer.layer,
});

export default connect(mapStateToProps)(Drawing);
