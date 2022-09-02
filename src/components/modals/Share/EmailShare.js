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
            emails: [],
            mapName: ''
        }
    }

    componentDidMount() {
        const { myMaps, mapId } = this.props;
        myMaps.forEach(map => {
            if (map.map.eid == mapId) {
                this.populateEmails(map.map.sharedWith);
                this.setState({ mapName: map.map.name });
            }
        })
    }

    componentDidUpdate(prevProps) {
        if ((prevProps.mapToShare === null) && (this.props.mapToShare !== null)) {
            console.log("MAP TO SHARE VIA MYMAPS");
            console.log("share", this.props.mapToShare);
        }
    }

    populateEmails = (emails) => {
        this.setState({ emails: emails.map(email => email.emailAddress) });
    }

    removeEmail = (i) => {
        const emails = this.state.emails.slice();
        emails.splice(i, 1)
        this.setState({ emails: emails });
    }

    addEmail = () => {
        if (emailRegexp.test(this.state.input)) {
            const emails = this.state.emails.slice();
            emails.push(this.state.input);
            this.setState({ input: '', emails: emails });
        }
    }

    closeModal = () => {
        this.props.dispatch({ type: 'CLOSE_MODAL', payload: 'share' });
        this.setState({ input: '', emails: [] });
    }

    share(id) {
        const emails = this.state.emails.slice();
        if (this.state.input != '') {
            if (emailRegexp.test(this.state.input)) {
                emails.push(this.state.input);
                this.setState({ input: '', emails: emails });
            }
        }
        if (emails.length == 0)
            return;
        const shareData = {
            "eid": id,
            "emailAddresses": emails
        };
        axios.post(`${constants.ROOT_URL}/api/user/map/share/sync/`, shareData, getAuthHeader())
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

    render() {
        const { mapId, cancel } = this.props;
        const { emails, mapName } = this.state;
        const emailsShared = this.props.emails;
        console.log("EMAILS", emails);
        console.log("EMAILS shared", emailsShared)
        return (
            <>
                <div className="modal-title">Share {mapName}</div>
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
                        onClick={() => {
                            this.share(mapId);
                        }}
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