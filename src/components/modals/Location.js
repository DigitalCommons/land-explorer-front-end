import React from 'react';
import Modal from '../common/Modal';
//import Spinner from 'react-spinkit';

const Location = () => (
    <Modal id="location">
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <p>Finding your location..</p>
            <br />
            {/*<Spinner name="pulse" fadeIn="none" />*/}
        </div>
    </Modal>
);

export default Location;
