import React from 'react';
import { useSelector } from 'react-redux';
import { Source, Layer } from 'react-mapbox-gl';

const MapLayers = () => {
    const landDataLayers = useSelector(state => state.mapLayers.landDataLayers);

    // TODO: reflect the order that layer toggles have been dragged in LeftPaneLandData?
    return (
        <React.Fragment>
            <Source
                tileJsonSource={{
                    "type": "vector",
                    "url": "mapbox://joolzt.ay7acj73,joolzt.9edhyytu,joolzt.6dd4p92w,joolzt.50odxxr1,joolzt.cpacrvmx,joolzt.c3j1rh4t,joolzt.75llshed,joolzt.4i2tzpgj,kingmob.8cgpa2xi,"
                }}
                id="composite"
            />
            <Layer
                id="provisional-agricultural-land-ab795l"
                type="fill"
                sourceId="composite"
                sourceLayer="Provisional_Agricultural_Land-ab795l"
                minZoom={9}
                layout={{
                    "visibility": "visible"
                }}
                paint={{
                    "fill-color": [
                        "match",
                        [
                            "get",
                            "ALC_GRADE"
                        ],
                        "Grade 1",
                        "#3980d0",
                        "Grade 2",
                        "#10c3ef",
                        "Grade 3",
                        "#0fb08f",
                        "Grade 4",
                        "#f9f90d",
                        "Grade 5",
                        "#c9748e",
                        "Exclusion",
                        "#b2b2b2",
                        "Non Agricultural",
                        "#b2b2b2",
                        "Urban",
                        "#b2b2b2",
                        "hsl(0, 83%, 56%)"
                    ],
                    "fill-opacity": landDataLayers.indexOf('provisional-agricultural-land-ab795l') !== -1 ? .4 : 0,
                }}
            />
            <Layer
                id="national-forest-estate-soil-g-18j2ga"
                type="fill"
                sourceId="composite"
                sourceLayer="NATIONAL_FOREST_ESTATE_SOIL_G-18j2ga"
                minZoom={8}
                layout={{
                    "visibility": "visible",
                }}
                paint={{
                    "fill-color": [
                        "match",
                        [
                            "get",
                            "S1_Group"
                        ],
                        "Basin Bog",
                        "#b2b2b2",
                        "Brown Earth",
                        "#895c44",
                        "Calcareous Soil",
                        "#4de600",
                        "Eroded Bog",
                        "#9c9c9c",
                        "Flat or Raised Bogs",
                        "#686868",
                        "Flushed Blanket Bog",
                        "#333333",
                        "Ground-water Gley",
                        "#014ea6",
                        "Ironpan Soil",
                        "#fc5601",
                        "Littoral Soil",
                        "#fefe67",
                        "Man-made Soil",
                        "#ab00e5",
                        "Peaty Surface-water Gley",
                        "#0085a8",
                        "Podzol",
                        "#e60002",
                        "Skeletal Soil",
                        "#e7e600",
                        "Surface-water Gley",
                        "#00a8e7",
                        "Unflushed Blanket Bog",
                        "#010101",
                        "Valley Complex",
                        "#8d8ead",
                        "#3980d0"
                    ],
                    "fill-opacity": landDataLayers.indexOf('national-forest-estate-soil-g-18j2ga') !== -1 ? .4 : 0,
                }}
            />
            <Layer
                id="historic-flood-map-5y05ao"
                type="fill"
                sourceId="composite"
                sourceLayer="Historic_Flood_Map-5y05ao"
                minZoom={8}
                layout={{
                    "visibility": "visible",
                }}
                paint={{
                    "fill-color": "hsl(196, 80%, 70%)",
                    "fill-opacity": landDataLayers.indexOf('historic-flood-map-5y05ao') !== -1 ? .4 : 0,
                }}
            />
            <Layer
                id="sites-of-special-scientific-i-09kaq4"
                type="fill"
                sourceId="composite"
                sourceLayer="Sites_of_Special_Scientific_I-09kaq4"
                minZoom={8}
                layout={{
                    "visibility": "visible"
                }}
                paint={{
                    "fill-color": "hsl(1, 40%, 40%)",
                    "fill-opacity": landDataLayers.indexOf('sites-of-special-scientific-i-09kaq4') !== -1 ? .4 : 0,
                }}
            />
            <Layer
                id="special-protection-areas-engl-71pdjg"
                type="fill"
                sourceId="composite"
                sourceLayer="Special_Protection_Areas_Engl-71pdjg"
                minZoom={8}
                layout={{
                    "visibility": "visible"
                }}
                paint={{
                    "fill-color": "hsl(51, 40%, 40%)",
                    "fill-opacity": landDataLayers.indexOf('special-protection-areas-engl-71pdjg') !== -1 ? .4 : 0,
                }}
            />
            <Layer
                id="special-areas-of-conservation-bm41zr"
                type="fill"
                sourceId="composite"
                sourceLayer="Special_Areas_of_Conservation-bm41zr"
                minZoom={8}
                layout={{
                    "visibility": "visible"
                }}
                paint={{
                    "fill-color": "hsl(101, 40%, 40%)",
                    "fill-opacity": landDataLayers.indexOf('special-areas-of-conservation-bm41zr') !== -1 ? .4 : 0,
                }}
            />
            <Layer
                id="local-authority-greenbelt-bou-9r44t6"
                type="fill"
                sourceId="composite"
                sourceLayer="Local_Authority_Greenbelt_bou-9r44t6"
                minZoom={8}
                layout={{
                    "visibility": "visible"
                }}
                paint={{
                    "fill-color": "hsla(113, 97%, 50%, 0.4)",
                    "fill-opacity": landDataLayers.indexOf('local-authority-greenbelt-bou-9r44t6') !== -1 ? .4 : 0,
                }}
            />
            <Layer
                id="ncc-brownfield-sites"
                type="fill"
                sourceId="composite"
                sourceLayer="NCC_Brownfield_Sites"
                minZoom={8}
                layout={{
                    "visibility": "visible"
                }}
                paint={{
                    "fill-color": "hsla(0, 24%, 20%, 0.5)",
                    "fill-opacity": landDataLayers.indexOf('ncc-brownfield-sites') !== -1 ? .4 : 0,
                }}
            />
            <Source
                tileJsonSource={{
                    "type": "vector",
                    "url": "mapbox://joolzt.25vn26he"
                }}
                id="wards"
            />
            <Layer
                id="wards-cu4dni"
                type="line"
                sourceId="wards"
                sourceLayer="wards-cu4dni"
                //minZoom={6}
                layout={{
                    "visibility": "visible"
                }}
                paint={{
                    "line-color": "hsla(245, 100%, 50%, 0.3)",
                    "line-width": 3,
                    "line-opacity": landDataLayers.indexOf('wards-cu4dni') !== -1 ? 1 : 0,
                }}
            />
            <Source
                tileJsonSource={{
                    "type": "vector",
                    "url": "mapbox://joolzt.6s8qdvfi"
                }}
                id="county"
            />
            <Layer
                id="county-4ef4ik"
                type="line"
                sourceId="county"
                sourceLayer="county-4ef4ik"
                minZoom={6}
                layout={{
                    "visibility": "visible"
                }}
                paint={{
                    "line-color": "hsla(113, 97%, 50%, 0.4)",
                    "line-width": 3,
                    "line-opacity": landDataLayers.indexOf('county-4ef4ik') !== -1 ? 1 : 0
                }}
            />
            <Source
                tileJsonSource={{
                    "type": "vector",
                    "url": "mapbox://joolzt.2d1u9n5a"
                }}
                id="constituency"
            />
            <Layer
                id="westminster_const_region-8r33ph"
                type="line"
                sourceId="constituency"
                sourceLayer="westminster_const_region-8r33ph"
                minZoom={6}
                layout={{
                    "visibility": "visible"
                }}
                paint={{
                    "line-color": "hsla(183, 97%, 50%, 0.4)",
                    "line-width": 3,
                    "line-opacity": landDataLayers.indexOf('westminster_const_region-8r33ph') !== -1 ? 1 : 0
                }}
            />
            <Source
                tileJsonSource={{
                    "type": "vector",
                    "url": "mapbox://joolzt.c5ulw4oz"
                }}
                id="councils"
            />
            <Layer
                id="district_borough_unitary_regi-bquzqt"
                type="line"
                sourceId="councils"
                sourceLayer="district_borough_unitary_regi-bquzqt"
                minZoom={6}
                layout={{
                    "visibility": "visible"
                }}
                paint={{
                    "line-color": "hsla(56, 97%, 50%, 0.4)",
                    "line-width": 3,
                    "line-opacity": landDataLayers.indexOf('district_borough_unitary_regi-bquzqt') !== -1 ? 1 : 0
                }}
            />
            <Source
                tileJsonSource={{
                    "type": "vector",
                    "url": "mapbox://joolzt.6kicmrlr,joolzt.b1kdveqs"
                }}
                id="devolved-composite"
            />
            <Layer
                id="greater_london_const_region-aplvbp"
                type="line"
                sourceId="devolved-composite"
                sourceLayer="greater_london_const_region-aplvbp"
                minZoom={6}
                layout={{
                    "visibility": "visible"
                }}
                paint={{
                    "line-color": "hsla(320, 97%, 50%, 0.4)",
                    "line-width": 3,
                    "line-opacity": landDataLayers.indexOf('devolved-powers') !== -1 ? 1 : 0
                }}
            />
            <Layer
                id="scotland_and_wales-8wahad"
                type="line"
                sourceId="devolved-composite"
                sourceLayer="scotland_and_wales-8wahad"
                minZoom={6}
                layout={{
                    "visibility": "visible"
                }}
                paint={{
                    "line-color": "hsla(320, 97%, 50%, 0.4)",
                    "line-width": 3,
                    "line-opacity": landDataLayers.indexOf('devolved-powers') !== -1 ? 1 : 0
                }}
            />
            <Source
                tileJsonSource={{
                    "type": "vector",
                    "url": "mapbox://joolzt.cq0hagq5,joolzt.dj4c79tf,joolzt.0bha665k,joolzt.b68bzxbu"
                }}
                id="parishes-composite"
            />
            <Layer
                id="parish_1-bcfcla"
                type="line"
                sourceId="parishes-composite"
                sourceLayer="parish_1-bcfcla"
                minZoom={9}
                layout={{
                    "visibility": "visible"
                }}
                paint={{
                    "line-color": "hsla(280, 60%, 70%, 0.4)",
                    "line-width": 3,
                    "line-opacity": landDataLayers.indexOf('parish') !== -1 ? 1 : 0
                }}
            />
            <Layer
                id="parish_2-c6mbmy"
                type="line"
                sourceId="parishes-composite"
                sourceLayer="parish_2-c6mbmy"
                minZoom={9}
                layout={{
                    "visibility": "visible"
                }}
                paint={{
                    "line-color": "hsla(280, 60%, 70%, 0.4)",
                    "line-width": 3,
                    "line-opacity": landDataLayers.indexOf('parish') !== -1 ? 1 : 0
                }}
            />
            <Layer
                id="parish_3-chtvqw"
                type="line"
                sourceId="parishes-composite"
                sourceLayer="parish_3-chtvqw"
                minZoom={9}
                layout={{
                    "visibility": "visible"
                }}
                paint={{
                    "line-color": "hsla(280, 60%, 70%, 0.4)",
                    "line-width": 3,
                    "line-opacity": landDataLayers.indexOf('parish') !== -1 ? 1 : 0
                }}
            />
            <Layer
                id="parish_4-cwfy3j"
                type="line"
                sourceId="parishes-composite"
                sourceLayer="parish_4-cwfy3j"
                minZoom={9}
                layout={{
                    "visibility": "visible"
                }}
                paint={{
                    "line-color": "hsla(280, 60%, 70%, 0.4)",
                    "line-width": 3,
                    "line-opacity": landDataLayers.indexOf('parish') !== -1 ? 1 : 0
                }}
            />
        </React.Fragment>
    );
}


export default MapLayers;
