import axios from "axios/index";
import constants, { VERSION } from "../constants";
import { getAuthHeader } from "./Auth";

export const saveExistingMap = async (existingMap) => {
    const { map } = existingMap;
    const { name, eid } = existingMap.map;

    const mapData = JSON.parse(map.data);
    console.log(mapData)

    const saveData = {
        map: {
            gettingLocation: false,
            name: name,
            currentLocation: null,
            searchMarker: null,
        },
        ...mapData,
        version: VERSION,
        name: name,
    };

    console.log(saveData)

    const body = {
        "eid": eid,
        "name": name,
        "data": JSON.stringify(saveData),
        "isSnapshot": false
    }

    return axios.post(`${constants.ROOT_URL}/api/user/map/save/`, body, getAuthHeader());
}