import React from 'react';
import { useSelector } from 'react-redux';
import Drawing from './Drawing';

const DrawingLayers = () => {
    const drawings = useSelector((state) => state.drawings.drawings);

    const renderPolygonsAndLines = () => {
      return drawings.map((polygonOrLine) => {
        const type =
          polygonOrLine.data.geometry.type === "Polygon" ? "polygon" : "line";
        return (
          <Drawing
            type={type}
            key={polygonOrLine.uuid}
            polygonOrLine={polygonOrLine}
            name={polygonOrLine.name}
          />
        );
      });
    };

    return <div>{drawings.length && renderPolygonsAndLines()}</div>;
};

export default DrawingLayers;
