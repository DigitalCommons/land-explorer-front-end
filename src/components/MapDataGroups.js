import React, { useEffect, useState } from 'react';
import axios from "axios/index";
import constants from "../constants";
import { getAuthHeader } from "./Auth";
import { useDispatch, useSelector } from "react-redux";
import { Marker } from "react-mapbox-gl";

const MapDataGroups = () => {
    const dispatch = useDispatch();
    const [dataGroups, setDataGroups] = useState();
    const activeGroups = useSelector((state) => state.dataGroups.activeGroups);

    const loadDataGroups = async () => {
        const result = await axios.get(`${constants.ROOT_URL}/api/datagroups`, getAuthHeader())
        setDataGroups(result.data);

        const dataGroupTitles = result.data.map(dataGroup => dataGroup.title);
        dispatch({
            type: "SET_DATA_GROUP_TITLES",
            payload: dataGroupTitles
        });
    }

    useEffect(() => {
        loadDataGroups();
    }, []);

    const activeDataGroups = dataGroups && dataGroups.filter((group, index) => activeGroups.includes(index));

    const dataGroupMarkers = activeDataGroups && activeDataGroups.map(dataGroup =>
        dataGroup.markers.map(marker =>
            <Marker
                key={marker.idmarkers}
                coordinates={{
                    lng: marker.location.coordinates[0],
                    lat: marker.location.coordinates[1]
                }}
                name={marker.name}
                description={marker.description}
                anchor="bottom"
                style={{ height: '40px', zIndex: 1 }}
            >
                <div className="marker-icon" style={{
                    height: 40,
                    width: 40,
                    zIndex: 1
                }}></div>
            </Marker>)
    );

    return <>
        {dataGroupMarkers}
    </>
}

export default MapDataGroups;