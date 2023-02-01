import React, { Component } from 'react';
import { connect } from 'react-redux';
import { VERSION } from '../../constants';
import Modal from '../common/Modal';
import axios from 'axios';
import constants from '../../constants';
import { getAuthHeader } from "../../utils/Auth";

class Save extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            isSnapshot: null
        }
    }

    // TODO: Use saveCurrentMap thunk in MapActions
    saveMap = (withId) => {
        const { map, drawings, markers, mapLayers, activeGroups, dataGroupTitlesAndIDs, readOnly, currentMapId, saveAs, dispatch } = this.props;
        const { name, isSnapshot } = this.state;

        const activeDataGroupsInfo = dataGroupTitlesAndIDs
            .filter(group => activeGroups.includes(group.id))
            .map(group => ({
                iddata_groups: group.id,
                title: group.title,
                userGroupId: group.userGroupId
            }));
        const saveData = {
            map: {
                ...map,
                gettingLocation: false,
                name: withId ? map.name : name,
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
            name: withId ? map.name : name,

        };

        console.log(saveData)

        const body = {
            "eid": withId ? currentMapId : null,
            "name": withId ? map.name : name,
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
                            payload: 'save'
                        });
                        dispatch({ type: 'SAVE_AS_OFF' });
                        const newMap = withId ? response.data.find(e => e.map.eid === currentMapId)
                            : response.data[response.data.length - 1];

                        const newMapId = newMap.map.eid;
                        const mapData = JSON.parse(newMap.map.data);
                        mapData.isSnapshot = isSnapshot;
                        dispatch({
                            type: 'LOAD_MAP',
                            payload: mapData,
                            id: newMapId
                        });
                        if (isSnapshot) {
                            this.props.dispatch({
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

        this.setState({ name: '', isSnapshot: null });
    }

    render() {
        const { map, readOnly, saveAs } = this.props;
        const { isSnapshot } = this.state;

        const closeModal = () => {
            this.props.dispatch({ type: 'SAVE_AS_OFF' });
            this.setState({ isSnapshot: null });
        }

        if (readOnly) {
            return (
                <Modal id="save" padding={true} customClose={closeModal}>
                    <div className="modal-title">Save copy of "{map.name}"</div>
                    <div className="modal-content">
                        <input
                            className="text-input"
                            type="text"
                            placeholder="Name"
                            style={{ marginBottom: '22px' }}
                            value={this.state.name}
                            onChange={(e) => {
                                let value = e.target.value;
                                this.setState({ name: value });
                            }}
                        />
                    </div>
                    <div className="modal-buttons">
                        <div className="button button-cancel rounded-button-full modal-button-cancel"
                            onClick={() => {
                                if (saveAs) {
                                    this.props.dispatch({ type: 'SAVE_AS_OFF' })
                                } else {
                                    this.props.dispatch({
                                        type: 'CLOSE_MODAL',
                                        payload: 'save'
                                    });
                                    this.setState({ name: '' });
                                }
                            }}
                        >
                            Cancel
                        </div>
                        <div className="button rounded-button-full modal-button-confirm"
                            onClick={() => {
                                if ((this.state.name !== '') && (this.state.name)) {
                                    this.saveMap(false);
                                }
                            }}
                        >
                            Save
                        </div>
                    </div>
                </Modal>
            )
        }

        if (isSnapshot === null) {
            return <Modal id="save" padding={false} customClose={closeModal}>
                <div className="modal-title">Save map as:</div>
                <div className='modal-options-container'>
                    <div onClick={() => this.setState({ isSnapshot: false })} className="modal-option">
                        <img src={require("../../assets/img/icon-map.svg")} className='modal-option-icon' />
                        <p className='modal-option-text'>Editable Map</p>
                    </div>
                    <div className='modal-option-divider'></div>
                    <div onClick={() => this.setState({ isSnapshot: true })} className="modal-option">
                        <img src={require("../../assets/img/icon-snapshot.svg")} className='modal-option-icon' />
                        <p className='modal-option-text'>Snapshot</p>
                    </div>
                </div>

            </Modal>
        }

        return (
            <Modal id="save" padding={true} customClose={closeModal}>
                <div className="modal-title">Save {isSnapshot ? "as snapshot" : "map"}</div>
                <div className="modal-content">
                    {
                        ((map.name) && !saveAs) && (
                            <div>
                                <div style={{
                                    textAlign: 'center',
                                    marginBottom: '24px'
                                }}>
                                    Save changes to "{map.name}"?
                                </div>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    marginBottom: '12px'
                                }}>
                                    <div className="button button-cancel button-small"
                                        style={{
                                            marginRight: '12px'
                                        }}
                                        onClick={() => {
                                            this.props.dispatch({
                                                type: 'CLOSE_MODAL',
                                                payload: 'save'
                                            });
                                            this.props.dispatch({ type: 'SAVE_AS_OFF' });
                                        }}
                                    >
                                        Cancel
                                    </div>
                                    <div className="button button-small"
                                        onClick={() => {
                                            this.saveMap(true);
                                        }}
                                    >
                                        Save
                                    </div>
                                </div>
                                <div style={{
                                    textAlign: 'center',
                                    marginBottom: '12px',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    display: 'flex',
                                }}>
                                    <p style={{ marginBottom: 0 }}>or,</p>
                                    <p
                                        style={{
                                            marginBottom: 0,
                                            borderBottom: '1px solid grey',
                                            width: '120px',
                                            paddingBottom: '2px',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => {
                                            this.props.dispatch({ type: 'SAVE_AS_ON' })
                                        }}
                                    >
                                        Save as new map
                                    </p>
                                </div>
                            </div>
                        )
                    }
                </div>
                {
                    ((!map.name) || saveAs) && (
                        <div>
                            <div className="modal-content">
                                <input
                                    className="text-input"
                                    type="text"
                                    placeholder="Name"
                                    style={{ marginBottom: '22px' }}
                                    value={this.state.name}
                                    onChange={(e) => {
                                        let value = e.target.value;
                                        this.setState({ name: value });
                                    }}
                                />
                            </div>
                            <div className="modal-buttons">
                                <div className="button button-cancel rounded-button-full modal-button-cancel"
                                    onClick={() => {
                                        if (saveAs) {
                                            this.props.dispatch({ type: 'SAVE_AS_OFF' })
                                        } else {
                                            this.props.dispatch({
                                                type: 'CLOSE_MODAL',
                                                payload: 'save'
                                            });
                                            this.setState({ name: '', isSnapshot: null });
                                        }
                                    }}
                                >
                                    Cancel
                                </div>
                                <div className="button rounded-button-full modal-button-confirm"
                                    onClick={() => {
                                        if ((this.state.name !== '') && (this.state.name)) {
                                            this.saveMap(false);
                                        }
                                    }}
                                >
                                    Save
                                </div>
                            </div>
                        </div>
                    )
                }
            </Modal>
        );


    }
}

const mapStateToProps = ({ drawings, map, markers, mapLayers, dataGroups, readOnly, mapMeta, save }) => ({
    drawings: drawings,
    mapLayers: mapLayers,
    activeGroups: dataGroups.activeGroups,
    dataGroupTitlesAndIDs: dataGroups.dataGroupTitlesAndIDs,
    map: map,
    markers: markers,
    readOnly: readOnly.readOnly,
    currentMapId: mapMeta.currentMapId,
    saveAs: save.saveAs
})

export default connect(mapStateToProps)(Save);
