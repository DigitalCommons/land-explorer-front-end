const INITIAL_STATE = {
    polygons: [],
    activePolygon: null,
    polygonCount: 1,
    lineCount: 1,
    loadingDrawings: false,
}

export default (state = INITIAL_STATE, action) => {
    let polygons;
    switch(action.type) {
        case 'ADD_POLYGON':
            polygons = state.polygons.slice();
            polygons.push(action.payload);
            // So the smaller ones are on top, so all the polygons can be clicked!
            polygons = polygons.sort((a,b) => a.area < b.area);
            return {
                ...state,
                polygons: polygons,
                polygonCount: action.payload.type === 'Polygon' ? state.polygonCount + 1 : state.polygonCount,
                lineCount: action.payload.type !== 'Polygon' ? state.lineCount + 1 : state.lineCount,
                activePolygon: action.payload.id
            };
        case 'UPDATE_POLYGON':
            polygons = state.polygons.map((polygon) => {
                if (polygon.id === action.payload.id) {
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
            polygons = polygons.sort((a,b) => a.area < b.area);
            return {
                ...state,
                polygons: polygons
            }
        case 'DELETE_POLYGON':
            polygons = state.polygons.filter((polygon) => {
                console.log("delete polygon", polygon);
                if (polygon["data"]["properties"]["id"] === action.payload) {
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
                if (polygon.id === action.payload.id) {
                    return {
                        ...polygon,
                        name: action.payload.name
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
        case 'CLEAR_ACTIVE_POLYGON':
            return {
                ...state,
                activePolygon: null
            }
        case 'SET_CURRENT_MARKER':
            return {
                ...state,
                activePolygon: null
            }
        case 'LOAD_MAP':
            return {
                ...action.payload.drawings,
                loadingDrawings: true
            };
        case 'LOADED_DRAWINGS':
            return {
                ...state,
                loadingDrawings: false
            }
        case 'NEW_MAP':
            return INITIAL_STATE;
        default:
            return state;
    }
}