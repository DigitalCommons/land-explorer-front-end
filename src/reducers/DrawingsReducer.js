const INITIAL_STATE = {
    polygons: [],
    activePolygon: null,
    polygonsDrawn: 0,
    linesDrawn: 0,
}

/**
 * TODO: rename POLYGON since these can also be lines
 */
export default (state = INITIAL_STATE, action) => {
    let polygons;
    switch (action.type) {
        case 'ADD_POLYGON':
            polygons = state.polygons.slice();
            polygons.push(action.payload);
            // So the smaller ones are on top, so all the polygons can be clicked!
            polygons = polygons.sort((a, b) => a.area < b.area);
            const polygonsDrawn = state.polygonsDrawn || 0;
            const linesDrawn = state.linesDrawn || 0;
            return {
                ...state,
                polygons: polygons,
                polygonsDrawn: action.payload.type === 'Polygon' ? polygonsDrawn + 1 : polygonsDrawn,
                linesDrawn: action.payload.type === 'LineString' ? linesDrawn + 1 : linesDrawn,
                activePolygon: action.payload.uuid
            };
        case 'UPDATE_POLYGON':
            polygons = state.polygons.map((polygon) => {
                if (polygon.uuid === action.payload.uuid) {
                    return {
                        ...polygon,
                        data: action.payload.data,
                        center: action.payload.center,
                        length: action.payload.length,
                        area: action.payload.area
                    };
                } else {
                    return polygon;
                }
            });
            polygons = polygons.sort((a, b) => a.area < b.area);
            return {
                ...state,
                polygons: polygons
            }
        case 'DELETE_POLYGON':
            polygons = state.polygons.filter((polygon) => {
                if (polygon.uuid === action.payload) {
                    console.log("delete polygon", polygon);
                    return false;
                } else {
                    return true;
                }
            })
            return {
                ...state,
                polygons: polygons,
                activePolygon: null
            }
        case 'RENAME_POLYGON':
            polygons = state.polygons.map((polygon) => {
                if (polygon.uuid === action.payload.uuid) {
                    return {
                        ...polygon,
                        name: action.payload.name,
                        description: action.payload.description,
                    };
                } else {
                    return polygon;
                }
            });
            return {
                ...state,
                polygons: polygons
            }
        case 'SET_ACTIVE_POLYGON':
            return {
                ...state,
                activePolygon: action.payload
            }
        case 'SET_MARKER':
        case 'SET_CURRENT_MARKER':
        case 'CLEAR_ACTIVE_POLYGON':
            return {
                ...state,
                activePolygon: null
            }
        case 'LOAD_MAP':
        case 'RELOAD_MAP':
            return action.payload.data.drawings;
        case 'NEW_MAP':
            return INITIAL_STATE;
        default:
            return state;
    }
}
