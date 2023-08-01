import React, { useEffect, useState } from "react";
import { GeoJSONLayer, Marker } from "react-mapbox-gl";
import { useSelector, useDispatch } from "react-redux";
import DrawingPopup from "./DrawingPopup/DrawingPopup";
import * as turf from "@turf/turf";

const Drawing = ({ type, polygon }) => {
  const [popupClosed, setPopupClosed] = useState(false);
  const activeTool = useSelector((state) => state.leftPane.activeTool);
  const activePolygon = useSelector((state) => state.drawings.activePolygon);
  const baseLayer = useSelector((state) => state.mapBaseLayer.layer);

  const isActive = polygon.uuid === activePolygon;
  const showPopup = !popupClosed && isActive && !activeTool;

  useEffect(() => {
    if (isActive) setPopupClosed(false);
  }, [isActive]);

  const dispatch = useDispatch();

  const handlePolygonClick = () => {
    if (activeTool !== "drop-pin") {
      if (!activeTool) {
        if (isActive) {
          dispatch({
            type: "CLEAR_ACTIVE_POLYGON",
          });
        } else {
          dispatch({
            type: "SET_ACTIVE_POLYGON",
            payload: polygon.uuid,
          });
          setPopupClosed(false);
        }
      }
    }
  };

  const drawingLayer = (
    <GeoJSONLayer
      key={polygon.uuid}
      data={polygon.data}
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
      fillOnClick={handlePolygonClick}
      lineOnClick={handlePolygonClick}
    />
  );

  return (
    <>
      {drawingLayer}
      {showPopup && (
        <Marker
          key={polygon.uuid + "2"}
          coordinates={
            polygon.centre ||
            turf.pointOnFeature(polygon.data).geometry.coordinates
          }
          name={polygon.name}
          description={polygon.description}
          anchor="bottom"
          style={{
            height: "40px",
            zIndex: 4,
          }}
        >
          <DrawingPopup
            object={polygon}
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
