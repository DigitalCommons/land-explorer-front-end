import React from "react";
import { GeoJSONLayer } from "react-mapbox-gl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCertificate,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

const MarkerPin = ({ marker, active }) => {
  const dispatch = useDispatch();
  const activeTool = useSelector((state) => state.leftPane.activeTool);
  const baseLayer = useSelector((state) => state.mapBaseLayer.layer);
  const [popupClosed, setPopupClosed] = useState(false);

  const showPopup = !popupClosed && active && !activeTool;

  const toggleMarker = () => {
    if (!activeTool) {
      if (active) {
        dispatch({ type: "CLEAR_CURRENT_MARKER" });
        setPopupClosed(false);
      } else {
        dispatch({
          type: "SET_CURRENT_MARKER",
          payload: marker.uuid,
        });
      }
    }
  };

  const markerFeature = {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: marker.coordinates,
    },
    properties: {
      uuid: marker.uuid,
      name: marker.name,
      description: marker.description,
      active,
    },
  };

  const markerLayer = (
    <GeoJSONLayer
      key={marker.uuid}
      data={markerFeature}
      symbolLayout={{
        "icon-image": "map-marker", // Name of the uploaded SVG icon
        "icon-size": 1.5,
        "icon-allow-overlap": true,
        "text-field": ["get", "name"], // Display marker name
        "text-font": ["Open Sans Bold"],
        "text-anchor": "top",
        "text-offset": [0, 1],
        "text-size": 12,
      }}
      symbolPaint={{
        "icon-color": [
          "case",
          ["boolean", ["get", "active"], false], // Check if the marker is active
          "#FF0000", // Active color (red)
          "#00FF00", // Default color (green)
        ],
      }}
    />
  );

  return markerLayer;
};

export default MarkerPin;
