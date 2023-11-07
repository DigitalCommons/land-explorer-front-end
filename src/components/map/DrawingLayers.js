import React from 'react';
import { useSelector } from 'react-redux';
import Drawing from './Drawing';

const DrawingLayers = () => {
    const polygons = useSelector((state) => state.drawings.polygons);

    const renderPolygons = () => {
        return polygons.map((polygon, i) => {
            const type = polygon.data.geometry.type === 'Polygon' ? 'polygon' : 'line';
            return (
                <Drawing
                    type={type}
                    key={polygon.uuid}
                    polygon={polygon}
                    name={polygon.name}
                />
            );
        });
    };

    return <div>{polygons.length && renderPolygons()}</div>;
};

export default DrawingLayers;
