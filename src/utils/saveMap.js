import axios from "axios/index";
import constants, { VERSION } from "../constants";
import { getAuthHeader } from "./Auth";

export const saveExistingMap = async (existingMap) => {
    const { map, drawings, markers, mapLayers, activeDataGroups, currentMapId } = existingMap;
    const { name } = existingMap;

    const activeDataGroupsInfo = activeDataGroups.map(group => ({
        iddata_groups: group.iddata_groups,
        title: group.title,
        userGroupId: group.userGroupId
    }));
    const saveData = {
        map: {
            ...map,
            gettingLocation: false,
            name: name,
            currentLocation: null,
            searchMarker: null,
        },
        drawings: drawings,
        markers: markers,
        mapLayers: {
            landDataLayers: mapLayers.landDataLayers,
            myDataLayers: activeDataGroupsInfo
        },
        version: VERSION,
        name: name,

    };

    console.log(saveData)

    const body = {
        "eid": withId ? currentMapId : null,
        "name": withId ? map.name : name,
        "data": JSON.stringify(saveData),
        "isSnapshot": false
    }

    return axios.post(`${constants.ROOT_URL}/api/user/map/save/`, body, getAuthHeader());
}