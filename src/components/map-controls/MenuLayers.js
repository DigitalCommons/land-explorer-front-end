import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const MenuLayers = ({ open, setOpen }) => {
    const baseLayer = useSelector((state) => state.mapBaseLayer.layer);
    const dispatch = useDispatch();

    return <>
        <div className="menu-layers-button"
            onClick={() => setOpen(!open)}
        />
        <div style={{
            display: open ? 'block' : 'none'
        }}>
            <div className="tooltip-menu tooltip-menu-layers modal"
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                }}
            >
                <div className="tooltip-menu-item"
                    onClick={(e) => {
                        e.stopPropagation();
                        dispatch({ type: 'MAP_LAYER_AERIAL' });
                    }}
                    style={baseLayer === 'aerial' ? { background: 'rgba(0, 0, 0, 0.1)' } : {}}
                >
                    Aerial
                </div>
                <div className="tooltip-menu-item"
                    onClick={(e) => {
                        e.stopPropagation();
                        dispatch({ type: 'MAP_LAYER_TOPOGRAPHY' });
                    }}
                    style={baseLayer === 'topography' ? { background: 'rgba(0, 0, 0, 0.1)' } : {}}
                >
                    Topography
                </div>
            </div>
        </div>
    </>;
}

export default MenuLayers;
