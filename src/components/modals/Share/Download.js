import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import constants from '../../../constants';
import { getAuthHeader } from "../../../utils/Auth";
import { saveExistingMap } from "../../../utils/saveMap";

const Download = ({ mapId }) => {
    const mapToDownload = useSelector((state) => state.myMaps.maps).find(map => map.map.eid === mapId);
    const mapName = mapToDownload.map.name;

    const downloadMap = async () => {
        await saveExistingMap(mapToDownload);

        const headers = getAuthHeader();
        headers['Content-Disposition'] = 'attachment';
        headers.responseType = 'blob'

        const response = await axios.get(`${constants.ROOT_URL}/api/user/map/download/${mapId}`, headers);
        //specific map id to come later

        const type = response.headers['content-type']
        const blob = new Blob([response.data], { type: type, encoding: 'UTF-8' })
        const link = document.createElement('a')
        link.href = window.URL.createObjectURL(blob)
        link.download = `${mapName}-shapefile.zip`
        link.click()

        console.log(`Download map ${mapId}`, response.status);
    }

    useEffect(() => {
        downloadMap();
    }, [])

    return <div className='modal-option'>
        <img src={require('../../../assets/img/icon-download-complete.svg')} className='modal-option-icon' />
        <p className='download-text'>Download Complete</p>
    </div>
}

export default Download;
