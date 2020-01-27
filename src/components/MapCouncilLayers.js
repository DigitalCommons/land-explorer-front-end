import React, {Component} from 'react';
import {GeoJSONLayer } from 'react-mapbox-gl';
import {stHelens, golborne, dalgarno,  nottingDale, colville} from '../data/wardOutlines';
  
class MapCouncilLayers extends Component {
    render() {
        return (
            <React.Fragment>
                {/*StHelens*/}
                <GeoJSONLayer
                    data = {{
                        'type': 'FeatureCollection',
                        'features': [
                            {
                            'type': 'Feature',
                            'geometry': {
                            'type': 'LineString',
                            'coordinates': stHelens,
                                }
                            }
                        ]
                    }}
                    linePaint = { {
                        'line-color': 'blue',
                        'line-width': 5
                      }}
                />
                 {/* Golborne */}
                 <GeoJSONLayer
                    data = {{
                        'type': 'FeatureCollection',
                        'features': [
                            {
                            'type': 'Feature',
                            'geometry': {
                            'type': 'LineString',
                            'coordinates': golborne,
                                }
                            }
                        ]
                    }}
                    linePaint = { {
                        'line-color': 'blue',
                        'line-width': 5
                      }}
                />
                {/* Dalgarno */}
                <GeoJSONLayer
                    data = {{
                        'type': 'FeatureCollection',
                        'features': [
                            {
                            'type': 'Feature',
                            'geometry': {
                            'type': 'LineString',
                            'coordinates': dalgarno,
                                }
                            }
                        ]
                    }}
                    linePaint = { {
                        'line-color': 'blue',
                        'line-width': 5
                      }}
                />
                {/* Notting Dale */}
                <GeoJSONLayer
                    data = {{
                        'type': 'FeatureCollection',
                        'features': [
                            {
                            'type': 'Feature',
                            'geometry': {
                            'type': 'LineString',
                            'coordinates': nottingDale,
                                }
                            }
                        ]
                    }}
                    linePaint = { {
                        'line-color': 'blue',
                        'line-width': 5
                      }}
                />
                {/* Colville */}
                <GeoJSONLayer
                    data = {{
                        'type': 'FeatureCollection',
                        'features': [
                            {
                            'type': 'Feature',
                            'geometry': {
                            'type': 'LineString',
                            'coordinates': colville,
                                }
                            }
                        ]
                    }}
                    linePaint = { {
                        'line-color': 'blue',
                        'line-width': 5
                      }}
                />

            </React.Fragment>
        );
    }
}


export default MapCouncilLayers;
