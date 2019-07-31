import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {VERSION} from '../constants';
import Modal from './common/Modal';
import axios from 'axios';
import constants from '../constants';

class Save extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
        }
    }

    saveMap = (withId) => {
        let {map, drawings, markers, mapLayers, readOnly, currentMapId, saveAs} = this.props;
        let saveData = {
            map: {
                ...map,
                gettingLocation: false,
                name: withId ? map.name : this.state.name,
                currentLocation: null,
                searchMarker: null,
            },
            drawings: drawings,
            markers: markers,
            mapLayers: mapLayers,
            version: VERSION,
            name: withId ? map.name : this.state.name,
        };
        saveData = JSON.stringify(saveData);
        this.setState({name: ''});
        let body = {
            "eid": withId ? currentMapId : "",
            "name": withId ? map.name : this.state.name,
            "data": saveData
        }
        axios.put(`${constants.ROOT_URL}/api/user/map/save/`, body)
            .then((response) => {
                console.log("save response", response);
                axios.get(`${constants.ROOT_URL}/api/user/maps/`)
                    .then((response) => {
                        this.props.dispatch({type: 'POPULATE_MY_MAPS', payload: response.data});
                        this.props.dispatch({
                            type: 'CLOSE_MODAL',
                            payload: 'save'
                        });
                        if (this.props.currentMapId === null) {
                            let newMap = response.data[response.data.length -1];
                            console.log("THE NEW MAP", newMap);
                            let newMapId = newMap.map.eid;
                            console.log("newmapid", newMapId);
                            this.props.dispatch({
                                type: 'SET_MAP_ID',
                                payload: newMapId
                            });
                            this.props.dispatch({
                                type: 'LOAD_MAP',
                                payload: JSON.parse(newMap.map.data),
                                id: newMapId
                            });
                            setTimeout(() => {
                                this.props.dispatch({
                                    type: 'CHANGE_MOVING_METHOD',
                                    payload: 'flyTo',
                                })
                                this.props.dispatch({ type: 'LOADED_DRAWINGS' })
                            }, 1000);
                        }
                    })
            })
    }

    render() {
        let {map, readOnly, saveAs} = this.props;
        console.log("save - readOnly?", readOnly);
        if (readOnly) {
            return (
                <Modal id="save" customClose={() => {
                    this.props.dispatch({ type: 'SAVE_AS_OFF' })
                }}>
                    <div className="modal-title">Save copy of "{map.name}"</div>
                    <div className="modal-content">
                        <input
                            className="text-input"
                            type="text"
                            placeholder="Name"
                            style={{marginBottom: '22px'}}
                            value={this.state.name}
                            onChange={(e) => {
                                let value = e.target.value;
                                this.setState({name: value});
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
                                     this.setState({name: ''});
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
                <Modal id="save" customClose={() => {
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
                                        display: 'flex'
                                    }}>
                                        <p style={{marginBottom: 0}}>or,</p>
                                        <p
                                            style={{
                                                marginBottom: 0,
                                                borderBottom: '1px solid grey',
                                                width: '120px',
                                                paddingBottom: '2px'
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
                                        style={{marginBottom: '22px'}}
                                        value={this.state.name}
                                        onChange={(e) => {
                                            let value = e.target.value;
                                            this.setState({name: value});
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
                                                 this.setState({name: ''});
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

const mapStateToProps = ({drawings, map, markers, mapLayers, readOnly, mapMeta, save}) => ({
    drawings: drawings,
    mapLayers: mapLayers,
    map: map,
    markers: markers,
    readOnly: readOnly.readOnly,
    currentMapId: mapMeta.currentMapId,
    saveAs: save.saveAs
})

export default connect(mapStateToProps)(Save);
