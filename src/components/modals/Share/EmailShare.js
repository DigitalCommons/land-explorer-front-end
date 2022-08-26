import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import constants from '../../../constants';
import { getAuthHeader } from "../../Auth";

class EmailShare extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
        }
    }

    removeEmail = (i) => {
        this.props.dispatch({
            type: 'REMOVE_SHARE_EMAIL',
            payload: i
        })
    }

    addEmail = () => {
        if (emailRegexp.test(this.state.input)) {
            this.props.dispatch({
                type: 'ADD_SHARE_EMAIL',
                payload: this.state.input
            });
            this.setState({ input: '' })
        }
    }

    closeModal = () => {
        this.props.dispatch({ type: 'CLOSE_MODAL', payload: 'share' });
        this.props.dispatch({ type: 'CLEAR_MAP_TO_SHARE' });
    }

    share(id) {
        let dt = {
            "eid": id,
            "emailAddresses": this.props.emails
        };
        console.log(dt);
        axios.post(`${constants.ROOT_URL}/api/user/map/share/sync/`, {
            "eid": id,
            "emailAddresses": this.props.emails
        }, getAuthHeader())
            .then((response) => {
                if (response.status === 200) {
                    this.closeModal();
                    axios.get(`${constants.ROOT_URL}/api/user/maps/`, getAuthHeader())
                        .then((response) => {
                            console.log("maps response", response);
                            this.props.dispatch({ type: 'POPULATE_MY_MAPS', payload: response.data })
                        })
                } else {
                    console.log("There was an error sharing this map.")
                }
            })
            .catch((err) => console.log("share error", err));
    }

    componentDidUpdate(prevProps) {
        if ((prevProps.mapToShare === null) && (this.props.mapToShare !== null)) {
            console.log("MAP TO SHARE VIA MYMAPS");
            console.log("share", this.props.mapToShare);
        }
    }

    render() {
        let { mapToShare, mapId, emails, cancel } = this.props;
        console.log("EMAILS", emails);
        return (
            <>
                <div className="modal-title">Share{mapToShare ? ` "${mapToShare.map.name}"` : ""}</div>
                <div className="modal-content">
                    <input
                        className="text-input"
                        type="text"
                        placeholder="Email address"
                        value={this.state.input}
                        onChange={(e) => {
                            this.setState({ input: e.target.value })
                        }}
                        style={{ marginBottom: '22px' }}
                    />
                    <div style={{ marginBottom: '24px' }}>
                        {
                            emails.map((email, i) => {
                                return (
                                    <div className="rounded-button-split" style={{ marginBottom: '6px' }} key={email}>
                                        <div className="rounded-button-left">{email}</div>
                                        <div className="rounded-button-right rounded-button-close"
                                            onClick={() => this.removeEmail(i)}
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="round-button round-button-plus"
                    style={{ position: 'absolute' }}
                    onClick={this.addEmail}
                />
                <div className="modal-buttons-float">
                    <div className="button button-cancel rounded-button-full modal-button-cancel"
                        onClick={cancel}
                    >
                        Cancel
                    </div>
                    <div className={`button rounded-button-full modal-button-confirm`}
                        onClick={() => this.share(mapId)}
                    >
                        Share
                    </div>
                </div>
            </>
        )
    }
}

const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

EmailShare.propTypes = {};

const mapStateToProps = ({ map, share, myMaps, mapMeta }) => ({
    name: map.name,
    mapToShare: share.mapToShare,
    emails: share.emails,
    myMaps: myMaps.maps,
});

export default connect(mapStateToProps)(EmailShare);