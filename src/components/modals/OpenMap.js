import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Modal from '../common/Modal';
import { MyMaps } from './MyMaps';
import { MySharedMaps } from './MySharedMaps';

const OpenMap = ({ drawControl, redrawPolygons }) => {
    const [tab, setTab] = useState("myMaps");
    const [myMapsStage, setMyMapsStage] = useState("list");
    const [sharedMapsStage, setSharedMapsStage] = useState("list");

    const dispatch = useDispatch();
    const closeModal = () => dispatch({
        type: 'CLOSE_MODAL',
        payload: 'openMap'
    });

    return <Modal id="openMap" padding={true} customClose={() => setMyMapsStage("list")}>
        <div className='open-map-tab-container'>
            <p className={`open-map-tab ${tab === "myMaps" && "tab-active"}`} onClick={() => setTab("myMaps")}>My Maps</p>
            <p className={`open-map-tab ${tab === "sharedMaps" && "tab-active"}`} onClick={() => setTab("sharedMaps")}>Shared Maps</p>
        </div>
        {tab === "myMaps" && <MyMaps stage={myMapsStage} setStage={setMyMapsStage} drawControl={drawControl} redrawPolygons={redrawPolygons} closeModal={closeModal} />}
        {tab === "sharedMaps" && <MySharedMaps stage={sharedMapsStage} setStage={setSharedMapsStage} drawControl={drawControl} redrawPolygons={redrawPolygons} closeModal={closeModal} />}
    </Modal>
}

export default OpenMap;
