import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Drawing from './Drawing';
import * as MapboxGL from 'mapbox-gl';

class DrawingLayers extends Component {
    renderPolygons = () => {
        return this.props.polygons.map((polygon, i) => {
            console.log("polygon", polygon);
            let type = polygon.data.geometry.type === 'Polygon' ? 'polygon' : 'line';
            console.log("type", type);
            return (<Drawing
              type={type}
              key={polygon.id}
              polygon={polygon}
              name={polygon.name}
            />)
        })
    }
    render() {
        return (
            <div>
                { this.props.polygons.length && this.renderPolygons() }
            </div>
        );
    }
}

DrawingLayers.propTypes = {};

const mapStateToProps = ({ drawings, navigation }) => ({
    polygons: drawings.polygons,
    activeTool: navigation.activeTool
});

export default connect(mapStateToProps)(DrawingLayers);