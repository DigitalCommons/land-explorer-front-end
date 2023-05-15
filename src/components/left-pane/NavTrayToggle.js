import React from 'react';
import ToggleSwitch from './ToggleSwitch';

const NavTrayToggle = ({ title, on, onToggle, draggable = false }) => {
    return (
        <div
            className={`tray-item`}
            onClick={onToggle}
        >
            <div className={`tray-item-title ${draggable && 'draggable'}`}>
                {title}
            </div>
            <ToggleSwitch on={on} tooltip="ttShowHideData" />
        </div>
    )
}

export default NavTrayToggle;
