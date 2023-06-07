import React, { Component } from 'react';
import { connect } from "react-redux";
import Drawing from './Drawing';

class DrawingLayers extends Component {
    renderPolygons = () => {
        return this.props.polygons.map((polygon, i) => {
            let type = polygon.data.geometry.type === 'Polygon' ? 'polygon' : 'line';
            return (<Drawing
                type={type}
                key={polygon.uuid}
                polygon={polygon}
                name={polygon.name}
            />)
        })
    }
    render() {
        return (
            <div>
                {this.props.polygons.length && this.renderPolygons()}
            </div>
        );
    }
}

DrawingLayers.propTypes = {};

const mapStateToProps = ({ drawings, leftPane }) => ({
    polygons: drawings.polygons,
    activeTool: leftPane.activeTool
});

export default connect(mapStateToProps)(DrawingLayers);
