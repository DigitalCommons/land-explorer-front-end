import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { autoSave } from '../../actions/MapActions';
import LeftPaneToggle from './LeftPaneToggle';

const LandDataLayerToggle = ({ title, layerId, draggable = false }) => {
    const dispatch = useDispatch();
    const activeLayers = useSelector((state) => state.mapLayers.landDataLayers);

    const onToggle = () => {
        dispatch({ type: "TOGGLE_LAYER", payload: layerId });
        dispatch(autoSave());
    }

    return (
        <LeftPaneToggle
            title={title}
            on={activeLayers.includes(layerId)}
            onToggle={onToggle}
            draggable={draggable}
        />
    );
}

export default LandDataLayerToggle;