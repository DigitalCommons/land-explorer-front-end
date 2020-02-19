import React, {Component} from 'react';
import {GeoJSONLayer } from 'react-mapbox-gl';
import {stHelens, golborne, dalgarno,  nottingDale, colville,
    norland, pembridge, holland, campden, abingdon, queensGate,
    earlsCourt, courtfield, bromptonAndHansTown, redcliffe, stanley,
    chelseaRiverside, royalHospital} from '../data/wardOutlines';
  
class MapCouncilLayers extends Component {
    createGeoJSONLayer(boundary){
        return <GeoJSONLayer
                data = {{
                    'type': 'FeatureCollection',
                    'features': [
                        {
                        'type': 'Feature',
                        'geometry': {
                        'type': 'LineString',
                        'coordinates': boundary,
                            }
                        }
                    ]
                }}
                linePaint = { {
                    'line-color': 'blue',
                    'line-width': 5
                }}
            />
    }
    render() {
        let arr = [stHelens, golborne, dalgarno,  nottingDale, colville,
            norland, pembridge, holland, campden, abingdon, queensGate,
            earlsCourt, courtfield, bromptonAndHansTown, redcliffe, stanley,
            chelseaRiverside, royalHospital];
        return (
            <React.Fragment>
                {arr.map(this.createGeoJSONLayer)}

            </React.Fragment>
        );
    }
}


export default MapCouncilLayers;
