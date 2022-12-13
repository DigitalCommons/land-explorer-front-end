import React from "react";
import { Marker, GeoJSONLayer } from "react-mapbox-gl";
import DataGroupPopup from "./DataGroupPopup";

const DataGroupPolygon = ({ polygon, setPopupVisible, popupVisible }) => {
    const polygonData = {
        geometry: {
            coordinates: polygon.vertices.coordinates,
            type: 'Polygon'
        },
        id: polygon.uuid,
        properties: {},
        type: "Feature"
    }

    const polygonLayer = <GeoJSONLayer
        key={polygon.uuid}
        data={polygonData}
        linePaint={{
            "line-color": "green",
            "line-width": 2,
            "line-opacity": 1,
        }}
        fillPaint={{
            "fill-color": "green",
            "fill-opacity": .05,
        }}
        fillOnClick={() => setPopupVisible(polygon.uuid)}
    />

    if (popupVisible === polygon.uuid)
        return <>
            {polygonLayer}
            <Marker
                key={polygon.uuid + "2"}
                coordinates={polygon.center.coordinates}
                name={polygon.name}
                description={polygon.description}
                anchor="bottom"
                style={{
                    height: "40px",
                    zIndex: popupVisible == polygon.uuid ? 4 : 3
                }}
                onClick={() => {
                    if (popupVisible !== polygon.uuid)
                        setPopupVisible(polygon.uuid);
                }}
            >
                <DataGroupPopup
                    object={polygon}
                    type={"polygon"}
                    closeDescription={() => setPopupVisible(-1)}
                />
            </Marker>
        </>
    else
        return polygonLayer;
}

export default DataGroupPolygon;
