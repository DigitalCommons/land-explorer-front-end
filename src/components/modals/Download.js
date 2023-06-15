import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import constants from '../../constants';
import { getAuthHeader } from "../../utils/Auth";
import Modal from './Modal';

const Download = () => {
    const currentMapId = useSelector((state) => state.mapMeta.currentMapId);
    const maps = useSelector((state) => state.myMaps.maps);
    const [downloaded, setDownloaded] = useState(false);
    const dispatch = useDispatch();

    const downloadMap = async () => {
        const mapToDownload = maps.find(map => map.map.eid === currentMapId);
        const mapName = mapToDownload.map.name;

        const headers = getAuthHeader();
        headers['Content-Disposition'] = 'attachment';
        headers.responseType = 'blob'

        const response = await axios.get(`${constants.ROOT_URL}/api/user/map/download/${currentMapId}`, headers);

        const type = response.headers['content-type']
        const blob = new Blob([response.data], { type: type, encoding: 'UTF-8' })
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = `${mapName}-shapefile.zip`
        link.click()

        console.log(`Download map ${currentMapId}`, response.status);
        setDownloaded(true);
    }

    const closeModal = () => {
        setDownloaded(false);
        dispatch({ type: 'CLOSE_MODAL', payload: 'download' });
    }

    if (currentMapId === null)
        return <Modal id="download">
            <div className="modal-title">Export</div>
            <div className="modal-content">
                <div>Please save map first!</div>
            </div>
        </Modal>

    return <Modal id="download" customClose={() => setDownloaded(false)}>
        <div className='modal-option'>
            {downloaded ? <><img src={require('../../assets/img/icon-download-complete.svg')} className='modal-option-icon' />
                <p className='download-text'>Download Complete</p></>
                :
                <>
                    <p className='download-text'>Are you sure you wish to export this?</p>
                    <div className="modal-buttons-float" style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginRight: 25
                    }}>
                        <div className="button button-cancel rounded-button-full modal-button-cancel"
                            onClick={closeModal}
                        >
                            Cancel
                        </div>
                        <div className={`button rounded-button-full modal-button-confirm`}
                            onClick={downloadMap}
                        >
                            Yes
                        </div>
                    </div>
                </>
            }
        </div>
    </Modal>
}

export default Download;
