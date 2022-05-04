import React, { useState } from 'react';
import axios from 'axios';
import constants from '../../../constants';
import { getAuthHeader } from "../../Auth";

const LinkShare = ({ cancel, mapId }) => {
    const [stage, setStage] = useState("generate");
    const [linkText, setLinkText] = useState("Generate link...");

    const generate = async () => {
        const result = await axios.post(`${constants.ROOT_URL}/api/user/map/share/public`,
            {
                mapId: mapId
            },
            getAuthHeader());

        const { success, URI, message } = result.data;

        if (success) {
            const link = constants.ROOT_URL + URI;
            setLinkText(link);
            setStage("copy");
        }
        else {
            setLinkText(message);
        }
    };

    const copy = () => {
        navigator.clipboard.writeText(linkText);
        setStage("copied");
    }

    return <>
        <div className="modal-title">Export</div>
        <input type="text" disabled={true} value={linkText} className='link-text-input'></input>
        <div className="modal-buttons-float">
            <div className="button button-cancel rounded-button-full modal-button-cancel"
                onClick={cancel}
            >
                Cancel
            </div>
            <div className={`button rounded-button-full modal-button-confirm`}
                onClick={stage == "generate" ? generate : copy}
            >
                {stage == "generate" ? "Generate" : stage == "copy" ? "Copy" : "Copied!"}
            </div>
        </div>
    </>
}

export default LinkShare;