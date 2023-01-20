import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../common/Modal";
import axios from 'axios';
import constants, { VERSION } from '../../constants';
import { getAuthHeader } from "../../utils/Auth";

const SaveCopy = () => {
    const map = useSelector(state => state.map);
    const dispatch = useDispatch();
    const drawings = useSelector(state => state.drawings);
    const mapLayers = useSelector(state => state.mapLayers);
    const markers = useSelector(state => state.markers);
    const { activeDataGroups } = useSelector(state => state.dataGroups);
    const { isSnapshot } = useSelector(state => state.mapMeta);

    if (!map.name)
        return <Modal id="saveCopy">
            <div className="modal-title">Save a copy</div>
            <div className="modal-content">
                <div>Please add a title to save the map first</div>
            </div>
        </Modal>

    const saveMap = () => {
        const activeDataGroupsInfo = activeDataGroups.map(group => ({
            iddata_groups: group.iddata_groups,
            title: group.title,
            userGroupId: group.userGroupId
        }));
        const saveData = {
            map: {
                ...map,
                gettingLocation: false,
                name: map.name,
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
            name: map.name,

        };

        console.log(saveData)

        const body = {
            "eid": null,
            "name": map.name,
            "data": JSON.stringify(saveData),
            "isSnapshot": isSnapshot
        }
        axios.post(`${constants.ROOT_URL}/api/user/map/save/`, body, getAuthHeader())
            .then(() => {
                axios.get(`${constants.ROOT_URL}/api/user/maps/`, getAuthHeader())
                    .then((response) => {
                        dispatch({ type: 'POPULATE_MY_MAPS', payload: response.data });
                        dispatch({
                            type: 'CLOSE_MODAL',
                            payload: 'saveCopy'
                        });
                        dispatch({ type: 'SAVE_AS_OFF' });
                        const newMap = response.data[response.data.length - 1];

                        const newMapId = newMap.map.eid;
                        dispatch({
                            type: 'SET_MAP_ID',
                            payload: newMapId
                        });
                        const mapData = JSON.parse(newMap.map.data);
                        mapData.isSnapshot = isSnapshot;
                        dispatch({
                            type: 'LOAD_MAP',
                            payload: mapData,
                            id: newMapId
                        });
                        if (isSnapshot) {
                            dispatch({
                                type: 'READ_ONLY_ON'
                            });;
                        }
                        setTimeout(() => {
                            dispatch({
                                type: 'CHANGE_MOVING_METHOD',
                                payload: 'flyTo',
                            })
                            dispatch({ type: 'LOADED_DRAWINGS' })
                        }, 1000);
                    })
            })

        setName('');
    }

    return <Modal id="saveCopy" padding={true}>
        <div className="modal-title">Save copy of "{map.name}"</div>
        <div className="modal-buttons">
            <div className="button button-cancel rounded-button-full modal-button-cancel"
                onClick={() => {
                    dispatch({
                        type: 'CLOSE_MODAL',
                        payload: 'saveCopy'
                    });
                    setName('');
                }}
            >
                Cancel
            </div>
            <div className="button rounded-button-full modal-button-confirm"
                onClick={saveMap}
            >
                Save
            </div>
        </div>
    </Modal>
}

export default SaveCopy;