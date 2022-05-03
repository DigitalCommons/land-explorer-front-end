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
        modalContent = <div className='share-options-container'>
            <div onClick={() => setStage("email")}>
                <img src={require("../../../assets/img/icon-share.svg")} className='share-option-icon' />
                <p className='share-option-text'>Share Invite</p>
            </div>
            <div className='share-option-divider'></div>
            <div onClick={() => setStage("export")}>
                <img src={require("../../../assets/img/icon-export.svg")} className='share-option-icon' />
                <p className='share-option-text'>Export Data</p>
            </div>
        </div>

    if (stage == "export")
        modalContent = <div className='share-options-container'>
            <div onClick={() => setStage("link")}>
                <img src={require("../../../assets/img/icon-link.svg")} className='share-option-icon' />
                <p className='share-option-text'>Generate GEOJson link</p>
            </div>
            <div className='share-option-divider'></div>
            <div onClick={() => setStage("download")}>
                <img src={require("../../../assets/img/icon-download.svg")} className='share-option-icon' />
                <p className='share-option-text'>Download Shapefile</p>
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