import React, { useState } from 'react';

const MapMenu = ({ }) => {
    const [expanded, setExpanded] = useState(false);

    return <div className='map-menu-container'><img
        src={require('../assets/img/chevron.svg')} alt=""
        style={{ height: 21, width: 30 }}
        onClick={() => setExpanded(!expanded)}
    />
        {expanded && <div className='map-menu'>
            <p>New</p>
            <p>Open</p>
            <p>Save a copy</p>
            <p>Create Snapshot</p>
            <p>Share</p>
            <p>Export Shapefile</p>
            <p>Generate GeoJSON</p>
        </div>}
    </div>
}

export default MapMenu;