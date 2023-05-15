import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { autoSave } from '../../actions/MapActions';
import NavTrayToggle from './NavTrayToggle';

const LandDataLayerToggle = ({ title, layerId, draggable = false }) => {
    const dispatch = useDispatch();
    const activeLayers = useSelector((state) => state.mapLayers.landDataLayers);

    const onToggle = () => {
        dispatch({ type: "TOGGLE_LAYER", payload: layerId });
        dispatch(autoSave());
    }

    return (
        <NavTrayToggle
            title={title}
            on={activeLayers.includes(layerId)}
            onToggle={onToggle}
            draggable={draggable}
        />
    );
}

export default LandDataLayerToggle;
