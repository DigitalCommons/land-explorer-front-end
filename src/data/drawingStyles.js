export const drawingStyles = [
    // ACTIVE (being drawn)
    // line stroke
    {
        "id": "gl-draw-line",
        "type": "line",
        "filter": ["all", ["==", "$type", "LineString"], ["!=", "mode", "static"]],
        "layout": {
            "line-cap": "round",
            "line-join": "round"
        },
        "paint": {
            "line-color": "#386fd2",
            "line-dasharray": [0.2, 2],
            "line-width": 2
        }
    },
    // polygon fill
    {
        "id": "gl-draw-polygon-fill",
        "type": "fill",
        "filter": ["all", ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
        "paint": {
            "fill-color": "#386fd2",
            "fill-outline-color": "#386fd2",
            "fill-opacity": 0.1
        }
    },
    // polygon outline stroke
    // This doesn't style the first edge of the polygon, which uses the line stroke styling instead
    {
        "id": "gl-draw-polygon-stroke-active",
        "type": "line",
        "filter": ["all", ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
        "layout": {
            "line-cap": "round",
            "line-join": "round"
        },
        "paint": {
            "line-color": "#386fd2",
            "line-dasharray": [0.2, 2],
            "line-width": 2
        }
    },
    // vertex point halos
    {
        "id": "gl-draw-polygon-and-line-vertex-halo-active",
        "type": "circle",
        "filter": ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]],
        "paint": {
            "circle-radius": 5,
            "circle-color": "#FFF"
        }
    },
    // vertex points
    {
        "id": "gl-draw-polygon-and-line-vertex-active",
        "type": "circle",
        "filter": ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]],
        "paint": {
            "circle-radius": 3,
            "circle-color": "#386fd2",
        }
    },

    // INACTIVE (static, already drawn)
    // line stroke
    {
        "id": "gl-draw-line-static",
        "type": "line",
        "filter": ["all", ["==", "$type", "LineString"], ["==", "mode", "static"]],
        "layout": {
            "line-cap": "round",
            "line-join": "round"
        },
        "paint": {
            "line-color": "#000",
            "line-width": 2,
            "line-opacity": 0
        }
    },
    // polygon fill
    {
        "id": "gl-draw-polygon-fill-static",
        "type": "fill",
        "filter": ["all", ["==", "$type", "Polygon"], ["==", "mode", "static"]],
        "paint": {
            "fill-color": "#000",
            "fill-outline-color": "#000",
            "fill-opacity": 0
        }
    },
    // polygon outline
    {
        "id": "gl-draw-polygon-stroke-static",
        "type": "line",
        "filter": ["all", ["==", "$type", "Polygon"], ["==", "mode", "static"]],
        "layout": {
            "line-cap": "round",
            "line-join": "round"
        },
        "paint": {
            "line-color": "#000",
            "line-width": 2,
            "line-opacity": 0
        }
    },
    {
        "id": "gl-draw-line-static",
        "type": "line",
        "filter": ["all", ["==", "$type", "LineString"], ["==", "mode", "static"]],
        "layout": {
            "line-cap": "round",
            "line-join": "round"
        },
        "paint": {
            "line-color": "#000",
            "line-width": 2,
            "line-opacity": 0
        }
    },
    // polygon fill
    {
        "id": "gl-draw-polygon-fill-static",
        "type": "fill",
        "filter": ["all", ["==", "$type", "Polygon"], ["==", "mode", "static"]],
        "paint": {
            "fill-color": "#000",
            "fill-outline-color": "#000",
            "fill-opacity": 0
        }
    },
    // polygon outline
    {
        "id": "gl-draw-polygon-stroke-static",
        "type": "line",
        "filter": ["all", ["==", "$type", "Polygon"], ["==", "mode", "static"]],
        "layout": {
            "line-cap": "round",
            "line-join": "round"
        },
        "paint": {
            "line-color": "#000",
            "line-width": 2,
            "line-opacity": 0
        }
    },
];

export default drawingStyles;