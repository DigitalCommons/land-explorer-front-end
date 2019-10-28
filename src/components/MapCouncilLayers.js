import React, {Component} from 'react';
import { Source, Layer} from 'react-mapbox-gl';

class MapCouncilLayers extends Component {
    render() {
        
        return (
            <React.Fragment>
                <Source
                    tileJsonSource={{
                        "type": "vector",
                        "url": "mapbox://kingmob.3mzcsn3y,kingmob.13t9w8d9,kingmob.cwck8dxg,kingmob.4v2uu2el,kingmob.8jl57qha"
                    }}
                    id="composite"
                />
                
                {/* St Helen's */}
                <Layer
                    id="144348-st-helens-1h7v6d"
                    type="fill"
                    sourceId="composite"
                    sourceLayer="144348_St_Helens-1h7v6d"
                    minZoom={9}
                    layout={{
                        "visibility": "visible"
                    }}
                    paint={{
                        "fill-color": "hsla(180, 100%, 54%, 0.5)",
                    }}
                />
                {/* Golborne */}
                <Layer
                    id="144351-golborne-5qhq4t"
                    type="fill"
                    sourceId="composite"
                    sourceLayer="144351_Golborne-5qhq4t"
                    minZoom={9}
                    layout={{
                        "visibility": "visible"
                    }}
                    paint={{
                        "fill-color": "hsla(220, 100%, 54%, 0.5)",
                    }}
                />
                {/* Dalgarno */}
                <Layer
                    id="144350-delgarno-26ei0o"
                    type="fill"
                    sourceId="composite"
                    sourceLayer="144350_-_Delgarno-26ei0o"
                    minZoom={9}
                    layout={{
                        "visibility": "visible"
                    }}
                    paint={{
                        "fill-color": "hsla(200, 100%, 54%, 0.5)",
                    }}
                />
                {/* Notting Dale */}
                <Layer
                    id="144347-notting-dale-13vbt0"
                    type="fill"
                    sourceId="composite"
                    sourceLayer="144347_Notting_Dale-13vbt0"
                    minZoom={9}
                    layout={{
                        "visibility": "visible"
                    }}
                    paint={{
                        "fill-color": "hsla(210, 100%, 54%, 0.5)",
                    }}
                />
                {/* Colville */}
                <Layer
                    id="144349-colville-8zqj2a"
                    type="fill"
                    sourceId="composite"
                    sourceLayer="144349_Colville-8zqj2a"
                    minZoom={9}
                    layout={{
                        "visibility": "visible"
                    }}
                    paint={{
                        "fill-color": "hsla(190, 100%, 54%, 0.5)",
                    }}
                />

            </React.Fragment>
        );
    }
}


export default MapCouncilLayers;
