import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useDispatch } from 'react-redux';

const Share = () => {
    const [stage, setStage] = useState("share");
    const dispatch = useDispatch();

    const shareByEmail = () => {
        dispatch({
            type: "CLOSE_MODAL",
            payload: "share",
        });
        dispatch({
            type: "OPEN_MODAL",
            payload: "email-share",
        });
    }

    let modalContent;

    if (stage == "share")
        modalContent = <>
            <p onClick={shareByEmail}>Share Invite</p>
            <p onClick={() => setStage("export")}>Export Data</p>
        </>

    if (stage == "export")
        modalContent = <>
            <p onClick={() => setStage("link")}>Generate GEOJson link</p>
            <p onClick={() => setStage("download")}>Download Shapefile</p>
        </>

    if (stage == "link")
        modalContent = <>
            <p>Copy this link</p>
        </>

    if (stage == "download")
        modalContent = <>
            <p>enjoy your download!</p>
        </>

    return <Modal id="share">
        {modalContent}
    </Modal>
}

export default Share;