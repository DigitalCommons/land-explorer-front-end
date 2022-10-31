import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from '../../common/Modal';
import EmailShare from './EmailShare';
import LinkShare from './LinkShare';
import Download from './Download';

const Share = () => {
    const mapToShare = useSelector((state) => state.share.mapToShare);
    const currentMapId = useSelector((state) => state.mapMeta.currentMapId);
    const [stage, setStage] = useState("share");

    if (!mapToShare && currentMapId == null)
        return <Modal id="share">
            <div className="modal-title">Share</div>
            <div className="modal-content">
                <div>Please save map first!</div>
            </div>
        </Modal>

    const mapId = mapToShare ? mapToShare.map.eid : currentMapId;

    let modalContent;

    if (stage == "share")
        modalContent = <div className='modal-options-container'>
            <div onClick={() => setStage("email")} className="modal-option">
                <img src={require("../../../assets/img/icon-share.svg")} className='modal-option-icon' />
                <p className='modal-option-text'>Share Invite</p>
            </div>
            <div className='modal-option-divider'></div>
            <div onClick={() => setStage("export")} className="modal-option">
                <img src={require("../../../assets/img/icon-export.svg")} className='modal-option-icon' />
                <p className='modal-option-text'>Export Data</p>
            </div>
        </div>

    if (stage == "export")
        modalContent = <div className='modal-options-container'>
            <div onClick={() => setStage("link")} className="modal-option">
                <img src={require("../../../assets/img/icon-link.svg")} className='modal-option-icon' />
                <p className='modal-option-text'>Generate GEOJson link</p>
            </div>
            <div className='modal-option-divider'></div>
            <div onClick={() => setStage("download")} className="modal-option">
                <img src={require("../../../assets/img/icon-download.svg")} className='modal-option-icon' />
                <p className='modal-option-text'>Download Shapefile</p>
            </div>
        </div>

    if (stage == "email")
        modalContent = <EmailShare cancel={() => setStage("share")} mapId={mapId} />

    if (stage == "link")
        modalContent = <LinkShare cancel={() => setStage("share")} mapId={mapId} />

    if (stage == "download")
        modalContent = <Download cancel={() => setStage("share")} mapId={mapId} />

    return <Modal id="share" customClose={() => setStage("share")}>
        {modalContent}
    </Modal>
}

export default Share;