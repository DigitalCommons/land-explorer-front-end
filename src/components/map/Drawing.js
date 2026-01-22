import React, { useEffect, useState } from "react";
import { GeoJSONLayer, Marker } from "react-mapbox-gl";
import { useSelector, useDispatch } from "react-redux";
import DrawingPopup from "./DrawingPopup/DrawingPopup";
import * as turf from "@turf/turf";

const Drawing = ({ type, polygonOrLine }) => {
  const [popupClosed, setPopupClosed] = useState(false);
  const activeTool = useSelector((state) => state.leftPane.activeTool);
  const activeDrawing = useSelector((state) => state.drawings.activeDrawing);
  const baseLayer = useSelector((state) => state.mapBaseLayer.layer);

  const isActive = polygonOrLine.uuid === activeDrawing;
  const showPopup = !popupClosed && isActive && !activeTool;

  useEffect(() => {
    if (isActive) setPopupClosed(false);
  }, [isActive]);

  const dispatch = useDispatch();

  const handleDrawingClick = () => {
    if (!activeTool) {
      console.log("Clicked on drawing:", polygonOrLine);

      if (isActive) {
        dispatch({
          type: "CLEAR_ACTIVE_DRAWING",
        });
      } else {
        dispatch({
          type: "SET_ACTIVE_DRAWING",
          payload: polygonOrLine.uuid,
        });
        setPopupClosed(false);
      }
    }
  };

  const drawingLayer = (
    <GeoJSONLayer
      key={polygonOrLine.uuid}
      data={polygonOrLine.data}
      linePaint={{
        "line-color": isActive
          ? "red"
          : baseLayer === "aerial"
          ? "white"
          : "black",
        "line-width": type === "polygon" ? 2 : 3,
        "line-opacity": activeTool ? 0 : 1,
      }}
      fillPaint={
        type === "polygon" && {
          "fill-color": isActive
            ? "red"
            : baseLayer === "aerial"
            ? "white"
            : "black",
          "fill-opacity": activeTool ? 0 : 0.05,
        }
      }
      fillOnClick={handleDrawingClick}
      lineOnClick={handleDrawingClick}
    />
  );

  return (
    <>
      {drawingLayer}
      {showPopup && (
        <Marker
          key={polygonOrLine.uuid + "2"}
          coordinates={
            polygonOrLine.centre ||
            turf.pointOnFeature(polygonOrLine.data).geometry.coordinates
          }
          name={polygonOrLine.name}
          description={polygonOrLine.description}
          anchor="bottom"
          style={{
            height: "40px",
            zIndex: 4,
          }}
        >
          <DrawingPopup
            object={polygonOrLine}
            type={type}
            source={"map"}
            closeDescription={() => setPopupClosed(true)}
          />
        </Marker>
      )}
    </>
  );
};

export default Drawing;
