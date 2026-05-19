import { useAppSelector } from '@/hooks/react-redux';
import Drawing from './Drawing';

const DrawingLayers = () => {
    const drawings = useAppSelector((state) => state.drawings.drawings);

    const renderPolygonsAndLines = () => {
      return drawings.map((polygonOrLine: any) => {
        const type =
          polygonOrLine.data.geometry.type === "Polygon" ? "polygon" : "line";
        return (
          <Drawing
            type={type}
            key={polygonOrLine.uuid}
            polygonOrLine={polygonOrLine}
          />
        );
      });
    };

    return <div>{drawings.length && renderPolygonsAndLines()}</div>;
};

export default DrawingLayers;
