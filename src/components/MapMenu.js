import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import analytics from '../analytics';
import { openModal } from '../actions/ModalActions';

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

    const clickToOpenModal = (analyticsMessage, modalId) => {
        setExpanded(false);
        analytics.event(analytics._event.SIDE_NAV + analyticsMessage, 'Clicked');
        dispatch(openModal(modalId));
    }

    return <div className='map-menu-container' style={{ marginTop: expanded ? 280 : 0 }} ref={ref}>
        <img
            src={require('../assets/img/chevron.svg')} alt="map-menu-icon"
            style={{ height: 21, width: 30, margin: 5, cursor: "pointer" }}
            onClick={() => setExpanded(!expanded)}
        />
        {expanded && <div className='map-menu'>
            <p className='map-menu-option' onClick={() => clickToOpenModal(" New Map", "newMap")}>New</p>
            <p className='map-menu-option' onClick={() => clickToOpenModal(" Open Map", "openMap")}>Open</p>
            <p className='map-menu-option' onClick={() => clickToOpenModal(" Save copy", "saveCopy")}>Save a copy</p>
            <p className='map-menu-option' onClick={() => clickToOpenModal(" Save snapshot", "saveSnapshot")}>Create Snapshot</p>
            <p className='map-menu-option' onClick={() => clickToOpenModal(" Share map with email", "emailShare")}>Share</p>
            <p className='map-menu-option' onClick={() => clickToOpenModal(" Download shapefile", "download")}>Export Shapefile</p>
            <p className='map-menu-option' onClick={() => clickToOpenModal(" GeoJSON Link", "link")}>Generate GeoJSON</p>
        </div>}
    </div>
}

export default MapMenu;
