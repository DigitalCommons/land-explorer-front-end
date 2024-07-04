import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLngLat, zoomIn, zoomOut, setZoom, setCurrentLocation } from '../../actions/MapActions';
import { openModal, closeModal } from "../../actions/ModalActions";
import constants from '../../constants';
import MenuLayers from './MenuLayers';
import MenuKey from './MenuKey';

const ControlButtons = () => {
    const [menuLayersOpen, setMenuLayersOpen] = useState(false);
    const [menuKeyOpen, setMenuKeyOpen] = useState(false);
    const [zooming, setZooming] = useState(false);
    const landDataLayers = useSelector((state) => state.mapLayers.landDataLayers);
    const propertiesDisplayed = useSelector(
      (state) =>
        state.landOwnership.displayActive ||
        state.landOwnership.pendingDisplayActive
    );
    const dispatch = useDispatch();

    const getLocation = () => {
        if (navigator.geolocation) {
            dispatch(openModal('location'));
            navigator.geolocation.getCurrentPosition((position) => {
                console.log("geolocation position", position);
                let lat = position.coords.latitude;
                let lng = position.coords.longitude;
                dispatch(closeModal('location'));
                dispatch(setZoom([17]));
                dispatch(setLngLat(lng, lat));
                dispatch(setCurrentLocation(lng, lat));
            }, (error) => {
                console.log("There was an error", error);
                dispatch(closeModal('location'));
            });
        }
    }

    return <div>
        <MenuLayers open={menuLayersOpen} setOpen={(open) => {
            setMenuLayersOpen(open);
            open && setMenuKeyOpen(false)
        }} />
        {
            // If layers are active show button toggle key menu
            landDataLayers.length && <MenuKey open={menuKeyOpen} setOpen={(open) => {
                setMenuKeyOpen(open);
                open && setMenuLayersOpen(false)
            }} />
        }
        <div id="controls">
            <div className="zoom-button zoom-location"
                onClick={() => getLocation()}
            />
            <div className="controls-slider">
                {propertiesDisplayed &&
                    <div className="zoom-button zoom-properties"
                        style={{ marginBottom: '24px' }}
                        onClick={() => {
                            if (!zooming) {
                                dispatch(setZoom([constants.PROPERTY_BOUNDARIES_ZOOM_LEVEL]));
                            }
                        }}
                    />
                }
                <div className="zoom-button zoom-plus"
                    style={{ marginBottom: '24px' }}
                    onClick={() => {
                        if (!zooming) {
                            setZooming(true);
                            dispatch(zoomIn());
                            setTimeout(() => setZooming(false), 600);
                        }
                    }}
                />
                <div className="zoom-button zoom-minus"
                    onClick={() => {
                        if (!zooming) {
                            setZooming(true);
                            dispatch(zoomOut());
                            setTimeout(() => setZooming(false), 600);
                        }
                    }}
                />
            </div>
        </div>
    </div>;
}

export default ControlButtons;
