import React from 'react';
import Modal from '../common/Modal';
import { connect } from 'react-redux';

const NewMap = (props) => (
    <Modal id="newMap" canToggle={true}>
        <div className="modal-title">New Map</div>
        <div className="modal-content">
            <p>Any unsaved changes to the current map will be lost.</p>
        </div>
        <div className="modal-buttons">
            <div className="button button-cancel rounded-button-full  modal-button-cancel"
                 onClick={() => {
                     props.dispatch({
                         type: 'CLOSE_MODAL',
                         payload: 'newMap'
                     });
                 }}
            >
                Cancel
            </div>
            <div className="button rounded-button-full  modal-button-confirm"
                 onClick={() => {
                     props.dispatch({
                         type: 'NEW_MAP'
                     });
                     props.dispatch({
                         type: 'CLOSE_MODAL',
                         payload: 'newMap'
                     });
                     props.drawControl.draw.deleteAll();
                     setTimeout(() => {
                         props.dispatch({
                             type: 'CHANGE_MOVING_METHOD',
                             payload: 'flyTo'
                         })
                     }, 1000);
                 }}
            >
                Ok
            </div>
        </div>
    </Modal>
);

export default connect(null)(NewMap);
