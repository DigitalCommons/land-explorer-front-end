import React, { Component } from 'react';
import Modal from '../common/Modal';
import { connect } from 'react-redux';
import axios from 'axios';
import constants from '../../constants';
import { isMobile } from 'react-device-detect';
import analytics from "../../analytics";
import { getAuthHeader } from "../Auth";
const moment = require('moment/moment.js');


class MyMaps extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: {
                id: null,
                name: null
            },
            trash: false,
            load: false,
        }
    }

    renderMapList = () => {
        let myMaps = this.props.myMaps.filter((map) => map.access === 'WRITE');
        return myMaps.map((item, i) => {
            let map = item.map;
            let momentDate = moment(map.lastModified).format("DD/MM/YYYY");
            return (
                <tr key={`map-${i}`}
                    className={`table-map ${this.state.active.id === map.eid ? 'active' : ''}`}
                    onClick={() => {
                        this.setState({ active: { id: map.eid, name: map.name } })
                    }}
                >
                    <td style={{ width: '230px' }}>{map.name}</td>
                    <td>{momentDate}</td>
                    <td className="table-icon table-share" style={{ width: '24px' }}
                        onClick={() => {
                            analytics.pageview('/app/my-maps/share');
                            this.props.dispatch({
                                type: 'SET_MAP_TO_SHARE',
                                payload: item
                            })
                            this.props.dispatch({ type: "CLOSE_MODAL", payload: "myMaps" })
                            this.props.dispatch({ type: 'OPEN_MODAL', payload: "share" })
                        }}
                    />
                    <td className="table-icon table-trash"
                        onClick={() => this.setState({ trash: true })}
                    />
                </tr>
            )
        });
    }

    render() {
        let { currentMapId } = this.props;
        let myMaps = this.props.myMaps.filter((map) => map.access === 'WRITE');
        if (this.state.trash) {
            return (
                <Modal id="myMaps" padding={true} customClose={() => {
                    this.setState({ trash: false })
                }}>
                    <div className="modal-title">My Maps</div>
                    <div className="modal-content modal-content-trash">
                        {`Delete "${this.state.active.name}"? This cannot be undone.`}
                    </div>
                    <div className="modal-buttons">
                        <div className="button button-cancel button-small"
                            onClick={() => {
                                this.setState({ trash: false })
                            }}
                        >
                            Cancel
                        </div>
                        <div className="button button-small"
                            onClick={() => {
                                axios.post(`${constants.ROOT_URL}/api/user/map/delete/`, {
                                    "eid": this.state.active.id
                                }, getAuthHeader())
                                    .then((response) => {
                                        if (this.state.active.id === currentMapId) {
                                            this.props.dispatch({ type: 'NEW_MAP' });
                                            this.props.drawControl.draw.deleteAll();
                                            setTimeout(() => {
                                                this.props.dispatch({ type: 'CHANGE_MOVING_METHOD', payload: 'flyTo' })
                                            });
                                        }
                                        axios.get(`${constants.ROOT_URL}/api/user/maps/`, getAuthHeader())
                                            .then((response) => {
                                                this.props.dispatch({ type: 'POPULATE_MY_MAPS', payload: response.data });
                                                this.setState({ trash: false });
                                            })
                                            .catch(() => {
                                                this.setState({ trash: false });
                                            })
                                    });
                            }}
                        >
                            Delete
                        </div>
                    </div>
                </Modal>
            )
        } else if (this.state.load) {
            return (
                <Modal id="myMaps" padding={true} customClose={() => {
                    this.setState({ load: false })
                }}>
                    <div className="modal-title">My Maps</div>
                    <div className="modal-content modal-content-trash"
                        style={{ textAlign: 'center' }}>
                        {`Load "${this.state.active.name}"?`}
                        <br />
                        <br />
                        Any unsaved changes to the current map will be lost.
                    </div>
                    <div className="modal-buttons">
                        <div className="button button-cancel button-small"
                            onClick={() => {
                                this.setState({ load: false })
                            }}
                        >
                            Cancel
                        </div>
                        <div className="button button-small"
                            onClick={() => {
                                let savedMap = this.props.myMaps.filter((item) => item.map.eid === this.state.active.id);
                                savedMap = JSON.parse(savedMap[0].map.data);
                                console.log("saved map", savedMap);
                                if (savedMap) {
                                    this.props.drawControl.draw.deleteAll();
                                    axios.post(`${constants.ROOT_URL}/api/user/map/view/`, {
                                        "eid": this.state.active.id,
                                    }, getAuthHeader())
                                    //pick up the old name for the landDataLayers
                                    if (savedMap.mapLayers.activeLayers) {
                                        savedMap.mapLayers.landDataLayers = savedMap.mapLayers.activeLayers;
                                    }
                                    //fix that some have no dataLayers
                                    if (!savedMap.mapLayers.myDataLayers) {
                                        savedMap.mapLayers.myDataLayers = [];
                                    }

                                    this.props.dispatch({
                                        type: 'LOAD_MAP',
                                        payload: savedMap,
                                        id: this.state.active.id
                                    });
                                    this.props.dispatch({
                                        type: 'CLOSE_MODAL',
                                        payload: 'myMaps'
                                    });
                                    this.setState({ load: false });
                                    if (!isMobile) {
                                        this.props.dispatch({ type: 'READ_ONLY_OFF' });
                                    }
                                    setTimeout(() => {
                                        this.props.redrawPolygons();
                                    }, 200);
                                    setTimeout(() => {
                                        this.props.dispatch({
                                            type: 'CHANGE_MOVING_METHOD',
                                            payload: 'flyTo'
                                        })
                                    }, 1000)
                                }
                            }}
                        >
                            Ok
                        </div>
                    </div>
                </Modal>
            )
        } else if (myMaps.length) {
            return (
                <Modal id="myMaps" padding={true}>
                    <div className="modal-title">My Maps</div>
                    <div className="modal-content">
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ width: '230px' }}>Name</th>
                                    <th>Modified</th>
                                    <th className="table-icon" style={{ width: '24px' }}></th>
                                    <th className="table-icon"></th>
                                </tr>
                            </thead>
                        </table>
                        <div style={{
                            height: '130px',
                            overflowY: 'scroll',
                        }}>
                            <table>
                                <tbody>
                                    {this.renderMapList()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="modal-buttons">
                        <div className="button button-cancel button-small"
                            onClick={() => this.props.dispatch({
                                type: 'CLOSE_MODAL',
                                payload: 'myMaps'
                            })}
                        >
                            Cancel
                        </div>
                        <div className="button button-small"
                            onClick={() => {
                                if (this.state.active !== null) {
                                    this.setState({ load: true })
                                }
                            }}
                        >
                            Open
                        </div>
                    </div>
                </Modal>
            );
        } else {
            return (
                <Modal id="myMaps" padding={true}>
                    <div className="modal-title">My Maps</div>
                    <div className="modal-content modal-content-trash">
                        <p>There are no maps.</p>
                    </div>
                </Modal>
            )
        }
    }
}

const mapStateToProps = ({ user, save, myMaps, mapMeta }) => ({
    user: user,
    savedMaps: save.savedMaps,
    myMaps: myMaps.maps,
    currentMapId: mapMeta.currentMapId
});

export default connect(mapStateToProps)(MyMaps);
