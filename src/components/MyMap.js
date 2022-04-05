import React, { Component } from 'react';
import {
    Map,
    TileLayer,
    Marker,
    Popup,
    Circle,
    FeatureGroup,
    LayerGroup,
    LayersControl,
    CircleMarker,
    Polygon,
    Polyline,
    Rectangle,
    Tooltip,
    GeoJSON
} from 'react-leaflet';
import axios from 'axios';
import { EditControl } from 'react-leaflet-draw';
const { BaseLayer, Overlay } = LayersControl;

class MyMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasLocation: false,
            latlng: {
                lat: 51.505,
                lng: -0.09,
            },
            zoom: 13,
            center: [51.505, -0.09],
            locating: false,
            data: null,
            drawn: []
        }
    }

    onCreated = (e) => {
        let type = e.layerType;
        let layer = e.layer;
        if (type === 'marker') {
            // Do marker specific actions
            console.log("_onCreated: marker created", e);
        }
        else {
            console.log("_onCreated: something else created:", type, e);
        }
        this.onChange();
    }

    onChange = (e) => {
        // this._editableFG contains the edited geometry, which can be manipulated through the leaflet API
        const { onChange } = this.props;
        if (!this._editableFG || !onChange) {
            return;
        }
        const geojsonData = this._editableFG.leafletElement.toGeoJSON();
        this.onChange(geojsonData);
    }

    onEdited = (e) => {
        let numEdited = 0;
        e.layers.eachLayer((layer) => {
            numEdited += 1;
        })
        console.log(`_onEdited: edited ${numEdited} layers`, e);

        this.onChange();
    }

    handleLocationFound = (e) => {
        this.setState({
            locating: false,
            latlng: e.latlng,
            zoom: 15
        })
    }

    zoomIn = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            zoom: this.state.zoom < 18 ? this.state.zoom + 1 : this.state.zoom
        })
    }

    zoomOut = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            zoom: this.state.zoom > 7 ? this.state.zoom - 1 : this.state.zoom
        })
    }

    componentDidMount() {
        axios.get('https://raw.githubusercontent.com/sjwhitworth/london_geojson/master/london_postcodes.json')
            .then((response) => {
                this.setState({ data: response.data });
            });
    }

    render() {

        const marker = this.state.hasLocation ? (
            <Marker position={this.state.latlng}>
                <Popup>
                    <span>You are here</span>
                </Popup>
            </Marker>
        ) : null;

        const polyline = [[51.505, -0.09], [51.51, -0.1], [51.51, -0.12]];

        const multiPolyline = [
            [[51.5, -0.1], [51.5, -0.12], [51.52, -0.12]],
            [[51.5, -0.05], [51.5, -0.06], [51.52, -0.06]],
        ];

        const polygon = [[51.515, -0.09], [51.52, -0.1], [51.52, -0.12]];

        const multiPolygon = [
            [[51.51, -0.12], [51.51, -0.13], [51.53, -0.13]],
            [[51.51, -0.05], [51.51, -0.07], [51.53, -0.07]],
        ];

        const rectangle = [[51.49, -0.08], [51.5, -0.06]];
        console.log("current state", this.state);
        return (
            <div style={styles.container}>
                <Map
                    center={this.state.latlng}
                    zoom={this.state.zoom}
                    length={4}
                    minZoom={7}
                    animate={true}
                    onClick={() => {
                        console.log("The size of the map is!", this.refs.map.leafletElement.getSize())
                    }}
                    onLocationFound={this.handleLocationFound}
                    onViewportChange={(viewport) => {
                        console.log("viewport change", viewport);
                        if (viewport.zoom !== this.state.zoom) {
                            this.setState({ zoom: viewport.zoom });
                        }
                    }}
                    ref="map"
                    zoomControl={false}
                    doubleClickZoom={false}
                >
                    <LayersControl position="topright">
                        <BaseLayer checked name="OrdnanceSurvey">
                            <TileLayer
                                attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                                url="https://api2.ordnancesurvey.co.uk/mapping_api/v1/service/zxy/EPSG%3A3857/Outdoor 3857/{z}/{x}/{y}.png?key=yYbtssbjb7PH3eBKsgoBQAoOAj5xEcQ4"
                                detectRetina={true}
                            />
                        </BaseLayer>
                        <BaseLayer name="OpenStreetMap.BlackAndWhite">
                            <TileLayer
                                attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                                url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
                                detectRetina={true}
                            />
                        </BaseLayer>
                        <BaseLayer name="Test.Postcodes">
                            <TileLayer
                                url="https://api.mapbox.com/styles/v1/mapbox/emerald-v8/tiles/{z}/{x}/{y}?access_token=chrisatspork.cjftriphz01qm2wnxbzh9n3s0-2mvhe"
                            />
                        </BaseLayer>
                        <Overlay checked name="Circles">
                            <LayerGroup>
                                <Circle center={this.state.center} fillColor="blue" radius={150}>
                                    <Tooltip>
                                        <span>omggggg</span>
                                    </Tooltip>
                                </Circle>
                                <CircleMarker
                                    center={[51.51, -0.12]}
                                    color="red" radius={20}
                                >
                                    <Popup
                                        onOpen={() => console.log("circle popup opened")}
                                        onClose={() => console.log("circle popup closed")}
                                    >
                                        <span>Popup in CircleMarker</span>
                                    </Popup>
                                </CircleMarker>
                            </LayerGroup>
                        </Overlay>
                        <Overlay checked name="Marker">
                            <Marker
                                position={this.state.latlng}
                                draggable={true}
                            >
                                <Popup
                                    onOpen={() => console.log("marker popup opened")}
                                    onClose={() => console.log("marker popup closed")}
                                >
                                    <span>Popup in Marker</span>
                                </Popup>
                            </Marker>
                        </Overlay>
                        {this.state.data !== null && (
                            <Overlay checked name="London">
                                <GeoJSON
                                    data={this.state.data} // wont be updated dynamically
                                    style={() => ({
                                        color: 'blue',
                                        strokeWidth: '1px !important',
                                        fillColor: 'transparent'
                                    })}
                                />
                            </Overlay>
                        )}
                        <Overlay name="Polygons">
                            <LayerGroup>
                                <Polyline color="#333" positions={polyline} />
                                <Polyline color="#333" positions={multiPolyline} />
                                <Polygon color="purple" positions={polygon} />
                                <Polygon color="purple" positions={multiPolygon} />
                                <Rectangle bounds={rectangle} color="black" />
                            </LayerGroup>
                        </Overlay>
                        <Overlay checked name="Drawing">
                            <FeatureGroup>
                                <EditControl
                                    position="bottomright"
                                    onEdited={this.onEdited}
                                    onCreated={this.onCreated}
                                    onDeleted={() => console.log("on deleted")}
                                    draw={{
                                        rectangle: true
                                    }}
                                />
                            </FeatureGroup>
                        </Overlay>
                    </LayersControl>
                    <div style={{
                        position: 'fixed',
                        bottom: '20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 10002,
                        display: 'flex',
                        flexDirection: 'row',
                    }}>
                        <div style={styles.circularButton}
                            onClick={this.zoomIn}
                        >
                            <i className="fas fa-plus"></i>
                        </div>
                        <div style={{
                            ...styles.circularButton,
                            marginLeft: '24px',
                            marginRight: '24px',
                        }}
                            onClick={() => {
                                this.setState({ locating: true });
                                this.refs.map.leafletElement.locate()
                            }}
                        >
                            <i className="fas fa-crosshairs"></i>
                        </div>
                        <div style={styles.circularButton}
                            onClick={this.zoomOut}
                        >
                            <i className="fas fa-minus"></i>
                        </div>
                    </div>
                    <div style={{
                        position: 'fixed',
                        left: '50%',
                        top: '50%',
                        transform: 'translateX(-50%) translateY(-50%)',
                        zIndex: 10001,
                        padding: ' 12px 24px',
                        background: 'blue',
                        color: 'white',
                        opacity: this.state.locating ? 1 : 0,
                    }}>
                        Finding Location.....
                    </div>
                </Map>
            </div>
        );
    }
}

MyMap.propTypes = {};

const styles = {
    container: {
        height: '100vh',
        width: '100vw',
        zIndex: 2,
        position: 'fixed',
        top: 0,
        left: 0,
        background: '#0a6ccb'
    },
    circularButton: {
        zIndex: 10000,
        height: '60px',
        width: '60px',
        background: 'white',
        borderRadius: '50%',
        color: 'black',
        boxShadow: '0px 2px 6px rgba(0,0,0,.3)',
        fontSize: '24px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}

export default MyMap;
