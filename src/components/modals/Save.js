import React, { Component } from 'react';
import { connect } from 'react-redux';
import { VERSION } from '../../constants';
import Modal from '../common/Modal';
import axios from 'axios';
import constants from '../../constants';
import { getAuthHeader } from "../Auth";

class Save extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
        }
    }

    saveMap = (withId) => {
        const { map, drawings, markers, mapLayers, activeDataGroups, readOnly, currentMapId, saveAs, dispatch } = this.props;
        const saveData = {
            map: {
                ...map,
                gettingLocation: false,
                name: withId ? map.name : this.state.name,
                currentLocation: null,
                searchMarker: null,
            },
            drawings: drawings,
            markers: markers,
            mapLayers: {
                landDataLayers: mapLayers.landDataLayers,
                myDataLayers: activeDataGroups
            },
            version: VERSION,
            name: withId ? map.name : this.state.name,
        };

        this.setState({ name: '' });
        const body = {
            "eid": withId ? currentMapId : null,
            "name": withId ? map.name : this.state.name,
            "data": JSON.stringify(saveData)
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
                        const newMap = response.data[response.data.length - 1];
                        const newMapId = newMap.map.eid;
                        dispatch({
                            type: 'SET_MAP_ID',
                            payload: newMapId
                        });
                        dispatch({
                            type: 'LOAD_MAP',
                            payload: JSON.parse(newMap.map.data),
                            id: newMapId
                        });
                        setTimeout(() => {
                            dispatch({
                                type: 'CHANGE_MOVING_METHOD',
                                payload: 'flyTo',
                            })
                            dispatch({ type: 'LOADED_DRAWINGS' })
                        }, 1000);
                    })
            })
    }

    render() {
        const { map, readOnly, saveAs } = this.props;
        if (readOnly) {
            return (
                <Modal id="save" padding={true} customClose={() => {
                    this.props.dispatch({ type: 'SAVE_AS_OFF' })
                }}>
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
                                if ((this.state.name !== '') && (this.state.name !== 'New Map')) {
                                    this.saveMap(false);
                                }
                            }}
                        >
                            Save
                        </div>
                    </div>
                </Modal>
            )
        } else {
            return (
                <Modal id="save" padding={true} customClose={() => {
                    this.props.dispatch({ type: 'SAVE_AS_OFF' })
                }}>
                    <div className="modal-title">Save</div>
                    <div className="modal-content">
                        {
                            ((map.name !== 'New Map') && !saveAs) && (
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
                        ((map.name === 'New Map') || saveAs) && (
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
                                                this.setState({ name: '' });
                                            }
                                        }}
                                    >
                                        Cancel
                                    </div>
                                    <div className="button rounded-button-full modal-button-confirm"
                                        onClick={() => {
                                            if ((this.state.name !== '') && (this.state.name !== 'New Map')) {
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
}

const mapStateToProps = ({ drawings, map, markers, mapLayers, dataGroups, readOnly, mapMeta, save }) => ({
    drawings: drawings,
    mapLayers: mapLayers,
    activeDataGroups: dataGroups.activeDataGroups,
    map: map,
    markers: markers,
    readOnly: readOnly.readOnly,
    currentMapId: mapMeta.currentMapId,
    saveAs: save.saveAs
})

export default connect(mapStateToProps)(Save);
