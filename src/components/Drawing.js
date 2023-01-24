import React, { useState } from 'react';
import { GeoJSONLayer, Marker } from 'react-mapbox-gl';
import { useSelector, useDispatch } from "react-redux";
import DrawingPopup from './DrawingPopup';
import * as turf from "@turf/turf";

const Drawing = ({ type, polygon }) => {
    const [popupClosed, setPopupClosed] = useState(false);
    const activeTool = useSelector(state => state.navigation.activeTool);
    const activePolygon = useSelector(state => state.drawings.activePolygon);
    const baseLayer = useSelector(state => state.mapBaseLayer.layer);

    const isActive = polygon.uuid === activePolygon;
    const showPopup = !popupClosed && isActive && !activeTool;

    const dispatch = useDispatch();

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
                            dispatch({
                                type: 'CLEAR_ACTIVE_POLYGON',
                            })
                        } else {
                            dispatch({
                                type: 'SET_ACTIVE_POLYGON',
                                payload: polygon.uuid
                            });
                            setPopupClosed(false);
                        }
                    }
                }
            }}
            lineOnClick={(e) => {
                console.log("Active tool on line click", activeTool);
                if (activeTool !== 'drop-pin') {
                    if (isActive) {
                        dispatch({
                            type: 'CLEAR_ACTIVE_POLYGON',
                        })
                    } else {
                        dispatch({
                            type: 'SET_ACTIVE_POLYGON',
                            payload: polygon.uuid
                        });
                        setPopupClosed(false);
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
                    type={polygon.type}
                    closeDescription={() => setPopupClosed(true)}
                />
            </Marker>
        )}
    </>;
}

export default Drawing;