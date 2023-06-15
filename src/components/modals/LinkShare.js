import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import constants from '../../constants';
import { getAuthHeader } from "../../utils/Auth";
import Modal from './Modal';

const LinkShare = () => {
    const [stage, setStage] = useState("generate");
    const [linkText, setLinkText] = useState("Generate link...");
    const currentMapId = useSelector((state) => state.mapMeta.currentMapId);
    const dispatch = useDispatch();

    const generate = async () => {
        try {
            const result = await axios.post(`${constants.ROOT_URL}/api/user/map/share/public`,
                {
                    mapId: currentMapId
                },
                getAuthHeader());

            const link = constants.ROOT_URL + result.data;
            setLinkText(link);
            setStage("copy");
        }
        catch (err) {
            setLinkText(err.response.data);
        }
    };

    const copy = () => {
        navigator.clipboard.writeText(linkText);
        setStage("copied");
    }

    if (currentMapId === null)
        return <Modal id="link">
            <div className="modal-title">Generate GeoJSON</div>
            <div className="modal-content">
                <div>Please save map first!</div>
            </div>
        </Modal>

    const reset = () => {
        setLinkText("Generate link...");
        setStage("generate");
    }

    return <Modal id="link" customClose={reset}>
        <div className="modal-title">Generate GeoJSON</div>
        <input type="text" disabled={true} value={linkText} className='link-text-input'></input>
        <p className='modal-warning'>Note: anyone with this link will be able to view your map's data</p>
        <div className="modal-buttons-float">
            <div className="button button-cancel rounded-button-full modal-button-cancel"
                onClick={() => { dispatch({ type: 'CLOSE_MODAL', payload: 'link' }); reset(); }}
            >
                Cancel
            </div>
            <div className={`button rounded-button-full modal-button-confirm`}
                onClick={stage == "generate" ? generate : copy}
            >
                {stage == "generate" ? "Generate" : stage == "copy" ? "Copy" : "Copied!"}
            </div>
        </div>
    </Modal>
}

export default LinkShare;
