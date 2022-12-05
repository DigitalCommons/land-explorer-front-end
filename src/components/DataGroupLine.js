import React from "react";
import { Marker, GeoJSONLayer } from "react-mapbox-gl";
import DataGroupPopup from "./DataGroupPopup";
import * as turf from '@turf/turf';

const DataGroupLine = ({ line, setPopupVisible, popupVisible }) => {
    const lineData = {
        geometry: {
            coordinates: line.vertices.coordinates,
            type: 'LineString'
        },
        id: line.uuid,
        properties: {},
        type: "Feature"
    }
    line.center = turf.pointOnFeature(lineData);

    const lineLayer = <GeoJSONLayer
        key={line.uuid}
        data={lineData}
        linePaint={{
            "line-color": "green",
            "line-width": 2,
            "line-opacity": 1,
        }}
        lineOnClick={() => setPopupVisible(line.uuid)}
    />

    if (popupVisible === line.uuid)
        return <>
            {lineLayer}
            <Marker
                key={line.uuid + "2"}
                coordinates={line.center.geometry.coordinates}
                name={line.name}
                description={line.description}
                anchor="bottom"
                style={{
                    height: "40px",
                    zIndex: popupVisible == line.uuid ? 4 : 3
                }}
                onClick={() => {
                    if (popupVisible !== line.uuid)
                        setPopupVisible(line.uuid);
                }}
            >
                <DataGroupPopup
                    object={line}
                    type={"line"}
                    closeDescription={() => setPopupVisible(-1)}
                />
            </Marker>
        </>
    else
        return lineLayer;
}

export default DataGroupLine;
