import React, { Component } from 'react';
import { GeoJSONLayer, Marker } from 'react-mapbox-gl';
import { connect } from "react-redux";
import DrawingPopup from './DrawingPopup';
import * as turf from "@turf/turf";

class Drawing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            input: '',
            popupClosed: false
        }
    }

    componentDidUpdate(prevProps) {
        let uuid = this.props.polygon.uuid;
        if ((prevProps.activePolygon === uuid) && (this.props.activePolygon !== uuid)) {
            this.setState({ popupClosed: false });
        }
    }

    render() {
        let { polygon } = this.props;
        const { type, activePolygon, activeTool, baseLayer } = this.props;
        const isActive = polygon.uuid === activePolygon;
        const showPopup = !this.state.popupClosed && isActive && !activeTool;
        console.log("ACTIVE TOOL", activeTool);
        console.log(polygon.data);

        const drawingLayer = (
            <GeoJSONLayer
                key={polygon.uuid}
                data={polygon.data}
                linePaint={{
                    "line-color": isActive ? "red" : (baseLayer === 'aerial') ? 'white' : "black",
                    "line-width": (type === "polygon") ? 2 : 3,
                    "line-opacity": activeTool ? 0 : 1,
                }}
                fillPaint={(type === "polygon") && {
                    "fill-color": isActive ? "red" : (baseLayer === 'aerial') ? 'white' : "black",
                    "fill-opacity": activeTool ? 0 : .05,
                }}
                fillOnClick={(e) => {
                    console.log("Active tool on fill click", activeTool);
                    if (activeTool !== 'drop-pin') {
                        if (!(activeTool)) {
                            console.log("the polygon was clicked", e);
                            if (isActive) {
                                this.props.dispatch({
                                    type: 'CLEAR_ACTIVE_POLYGON',
                                })
                            } else {
                                this.props.dispatch({
                                    type: 'SET_ACTIVE_POLYGON',
                                    payload: polygon.uuid
                                });
                                this.setState({ popupClosed: false });
                            }
                        }
                    }
                }}
                lineOnClick={(e) => {
                    console.log("Active tool on line click", activeTool);
                    if (activeTool !== 'drop-pin') {
                        if (isActive) {
                            this.props.dispatch({
                                type: 'CLEAR_ACTIVE_POLYGON',
                            })
                        } else {
                            this.props.dispatch({
                                type: 'SET_ACTIVE_POLYGON',
                                payload: polygon.uuid
                            });
                            this.setState({ popupClosed: false });
                        }
                    }
                }}
            />
        )

        return <>
            {drawingLayer}
            {showPopup && (
                <Marker
                    key={polygon.uuid + "2"}
                    coordinates={polygon.centre || turf.pointOnFeature(polygon.data).geometry.coordinates}
                    name={polygon.name}
                    description={polygon.description}
                    anchor="bottom"
                    style={{
                        height: "40px",
                        zIndex: 4
                    }}
                >
                    <DrawingPopup
                        object={polygon}
                        type={type}
                        source={"map"}
                        closeDescription={() => this.setState({ popupClosed: true })}
                    />
                </Marker>
            )}
        </>;
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
