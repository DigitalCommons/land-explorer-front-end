import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import analytics from '../analytics';
import { openModal } from '../actions/ModalActions';

const MapMenu = ({ }) => {
    const isOnline = useSelector(state => state.connectivity.isOnline);
    const writeAccess = useSelector((state) => state.mapMeta.writeAccess);
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

    const clickToOpenModal = (analyticsMessage, modalId, needsConnection = false) => {
        if (needsConnection && !isOnline) return;
        setExpanded(false);
        analytics.event(analytics._event.SIDE_NAV + analyticsMessage, 'Clicked');
        dispatch(openModal(modalId));
    }

    const needsConnectionClassName = isOnline ? 'map-menu-option' : 'map-menu-option-disabled';

    return <div className='map-menu-container' style={{ top: expanded ? 130 : 0 }} ref={ref}>
        <img
            src={require('../assets/img/chevron.svg')} alt="map-menu-icon"
            style={{ height: 21, width: 30, margin: 5, cursor: "pointer" }}
            onClick={() => setExpanded(!expanded)}
        />
        {expanded && <div className='map-menu'>
            <p className='map-menu-option' onClick={() => clickToOpenModal(" New Map", "newMap")}>New</p>
            <p className='map-menu-option' onClick={() => clickToOpenModal(" Open Map", "openMap")}>Open</p>
            <p className={needsConnectionClassName} onClick={() => clickToOpenModal(" Save copy", "saveCopy", true)}>Save a copy</p>
            <p className={needsConnectionClassName} onClick={() => clickToOpenModal(" Save snapshot", "saveSnapshot", true)}>Create Snapshot</p>
            {writeAccess &&
                <p className={needsConnectionClassName} onClick={() => clickToOpenModal(" Share map with email", "emailShare", true)}>Share</p>
            }
            <p className={needsConnectionClassName} onClick={() => clickToOpenModal(" Download shapefile", "download", true)}>Export Shapefile</p>
            {writeAccess &&
                <p className={needsConnectionClassName} onClick={() => clickToOpenModal(" GeoJSON Link", "link", true)}>Generate GeoJSON</p>
            }
        </div>}
    </div>
}

export default MapMenu;
