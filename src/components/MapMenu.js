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

    return <div className='map-menu-container' style={{ top: expanded ? 130 : 0 }} ref={ref}>
        <img
            src={require('../assets/img/chevron.svg')} alt="map-menu-icon"
            style={{ height: 21, width: 30 }}
            onClick={() => setExpanded(!expanded)}
        />
        {expanded && <div className='map-menu'>
            <p className='map-menu-option' onClick={() => {
                setExpanded(false);
                analytics.event(analytics._event.SIDE_NAV + ' New Map', 'Clicked');
                dispatch({
                    type: 'OPEN_MODAL',
                    payload: 'newMap'
                });
            }}>New</p>
            <p className='map-menu-option' onClick={() => {
                setExpanded(false);
                analytics.event(analytics._event.SIDE_NAV + ' Open Map', 'Clicked');
                dispatch({
                    type: 'OPEN_MODAL',
                    payload: 'openMap'
                });
            }}>Open</p>
            <p className='map-menu-option'>Save a copy</p>
            <p className='map-menu-option'>Create Snapshot</p>
            <p className='map-menu-option' onClick={() => {
                setExpanded(false);
                analytics.event(analytics._event.SIDE_NAV + ' Share map with email', 'Clicked');
                dispatch({
                    type: 'OPEN_MODAL',
                    payload: 'emailShare'
                });
            }}>Share</p>
            <p className='map-menu-option' onClick={() => {
                setExpanded(false);
                analytics.event(analytics._event.SIDE_NAV + ' Download shapefile', 'Clicked');
                dispatch({
                    type: 'OPEN_MODAL',
                    payload: 'download'
                });
            }}>Export Shapefile</p>
            <p className='map-menu-option' onClick={() => {
                setExpanded(false);
                analytics.event(analytics._event.SIDE_NAV + ' GeoJSON Link', 'Clicked');
                dispatch({
                    type: 'OPEN_MODAL',
                    payload: 'link'
                });
            }}>Generate GeoJSON</p>
        </div>}
    </div>
}

export default MapMenu;