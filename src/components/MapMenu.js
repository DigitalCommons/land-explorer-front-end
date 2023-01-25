import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import analytics from '../analytics';

const MapMenu = ({ }) => {
    const [expanded, setExpanded] = useState(false);
    const dispatch = useDispatch();

    const ref = useRef();

    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (expanded && ref.current && !ref.current.contains(e.target)) {
                setExpanded(false);
            }
        }

        document.addEventListener("mousedown", checkIfClickedOutside);

        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside);
        }
    }, [expanded])

    const openModal = (analyticsMessage, modalId) => {
        setExpanded(false);
        analytics.event(analytics._event.SIDE_NAV + analyticsMessage, 'Clicked');
        dispatch({
            type: 'OPEN_MODAL',
            payload: modalId
        });
    }

    return <div className='map-menu-container' style={{ top: expanded ? 130 : 0 }} ref={ref}>
        <img
            src={require('../assets/img/chevron.svg')} alt="map-menu-icon"
            style={{ height: 21, width: 30, cursor: "pointer" }}
            onClick={() => setExpanded(!expanded)}
        />
        {expanded && <div className='map-menu'>
            <p className='map-menu-option' onClick={() => openModal(" New Map", "newMap")}>New</p>
            <p className='map-menu-option' onClick={() => openModal(" Open Map", "openMap")}>Open</p>
            <p className='map-menu-option' onClick={() => openModal(" Save copy", "saveCopy")}>Save a copy</p>
            <p className='map-menu-option' onClick={() => openModal(" Save snapshot", "saveSnapshot")}>Create Snapshot</p>
            <p className='map-menu-option' onClick={() => openModal(" Share map with email", "emailShare")}>Share</p>
            <p className='map-menu-option' onClick={() => openModal(" Download shapefile", "download")}>Export Shapefile</p>
            <p className='map-menu-option' onClick={() => openModal(" GeoJSON Link", "link")}>Generate GeoJSON</p>
        </div>}
    </div>
}

export default MapMenu;