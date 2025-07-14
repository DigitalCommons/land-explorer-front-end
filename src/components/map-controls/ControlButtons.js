import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLngLat, zoomIn, zoomOut, setZoom, setCurrentLocation } from '../../actions/MapActions';
import { openModal, closeModal } from "../../actions/ModalActions";
import constants from '../../constants';

const ControlButtons = () => {
    const { zooming } = useSelector((state) => state.map);
    const propertiesDisplay = useSelector(
      (state) => state.landOwnership.activeDisplay
    );
    const dispatch = useDispatch();

    const getLocation = () => {
      if (navigator.geolocation) {
        dispatch(openModal("location"));
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log("geolocation position", position);
            let lat = position.coords.latitude;
            let lng = position.coords.longitude;
            dispatch(closeModal("location"));
            dispatch(setZoom([17]));
            dispatch(setLngLat(lng, lat));
            dispatch(setCurrentLocation(lng, lat));
          },
          (error) => {
            console.log("There was an error", error);
            dispatch(closeModal("location"));
          }
        );
      }
    };

    return (
      <div>
        <div id="controls">
          <div
            className="zoom-button zoom-location"
            onClick={() => getLocation()}
          />
          <div className="controls-slider">
            {propertiesDisplay && (
              <div
                className="zoom-button zoom-properties"
                style={{ marginBottom: "24px" }}
                onClick={() => {
                  if (!zooming) {
                    dispatch(
                      setZoom([
                        constants.PROPERTY_BOUNDARIES_ZOOM_LEVELS[
                          propertiesDisplay
                        ],
                      ])
                    );
                  }
                }}
              />
            )}
            <div
              className="zoom-button zoom-plus"
              style={{ marginBottom: "24px" }}
              onClick={() => {
                if (!zooming) {
                  dispatch(zoomIn());
                }
              }}
            />
            <div
              className="zoom-button zoom-minus"
              onClick={() => {
                if (!zooming) {
                  dispatch(zoomOut());
                }
              }}
            />
          </div>
        </div>
      </div>
    );
}

export default ControlButtons;
