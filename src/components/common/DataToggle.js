import React from 'react';
import ToggleSwitch from './ToggleSwitch';

const DataToggle = ({ title, active, onToggle }) => {
    return (
        <div
            className={`tray-item`}
        >
            <div className={`tray-item-title`}
                onClick={onToggle}
            >
                {title}
            </div>
            <ToggleSwitch on={active} tooltip="showHideData" toggle={onToggle} />
        </div>
    )
}

export default DataToggle;
