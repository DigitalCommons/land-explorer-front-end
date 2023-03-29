import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import constants from '../../constants';
import { getAuthHeader } from "../../utils/Auth";
import Modal from '../common/Modal';
import { getMyMaps } from '../../actions/MapActions';

const EmailShare = () => {
    const [input, setInput] = useState('');
    const [emails, setEmails] = useState([]);
    const [mapName, setMapName] = useState('');
    const myMaps = useSelector(state => state.myMaps.maps);
    const mapToShare = useSelector((state) => state.share.mapToShare);
    const currentMapId = useSelector((state) => state.mapMeta.currentMapId);
    const mapId = mapToShare ? mapToShare.map.eid : currentMapId;

    const dispatch = useDispatch();

    const populateEmails = (emails) => {
        setEmails(emails.map(email => email.emailAddress));
    }

    const removeEmail = (i) => {
        const newEmails = emails.slice();
        newEmails.splice(i, 1)
        setEmails(newEmails);
    }

    const addEmail = () => {
        if (emailRegexp.test(input)) {
            const newEmails = emails.slice();
            newEmails.push(input);
            setEmails(newEmails);
            setInput('');
        }
    }

    const closeModal = () => {
        dispatch({ type: 'CLOSE_MODAL', payload: 'emailShare' });
        setInput('')
        setEmails([]);
    }

    useEffect(() => {
        myMaps.forEach(map => {
            if (map.map.eid === mapId) {
                populateEmails(map.map.sharedWith);
                setMapName(map.map.name);
            }
        })
    }, [])

    const share = (id) => {
        const newEmails = emails.slice();
        if (input != '') {
            if (emailRegexp.test(input)) {
                newEmails.push(input);
                setInput('');
                setEmails(newEmails);
            }
        }
        if (newEmails.length === 0)
            return;
        const shareData = {
            "eid": id,
            "emailAddresses": newEmails
        };
        axios.post(`${constants.ROOT_URL}/api/user/map/share/sync`, shareData, getAuthHeader())
            .then(() => {
                closeModal();
                dispatch(getMyMaps());
            })
            .catch((err) => console.log("share error", err));
    }

    if (!mapToShare && currentMapId == null)
        return <Modal id="emailShare">
            <div className="modal-title">Share</div>
            <div className="modal-content">
                <div>Please save map first!</div>
            </div>
        </Modal>

    return <Modal id="emailShare">
        <div className="modal-title">Share {mapName}</div>
        <div className="modal-content">
            <input
                className="text-input"
                type="text"
                placeholder="Email address"
                value={input}
                onChange={(e) => {
                    setInput(e.target.value);
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
                                    onClick={() => removeEmail(i)}
                                />
                            </div>
                        )
                    })
                }
            </div>
        </div>
        <div className="round-button round-button-plus"
            style={{ position: 'absolute' }}
            onClick={addEmail}
        />
        <div className="modal-buttons-float">
            <div className="button button-cancel rounded-button-full modal-button-cancel"
                onClick={closeModal}
            >
                Cancel
            </div>
            <div className={`button rounded-button-full modal-button-confirm`}
                onClick={() => {
                    share(mapId);
                }}
            >
                Share
            </div>
        </div>
    </Modal>
}

const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default EmailShare;
