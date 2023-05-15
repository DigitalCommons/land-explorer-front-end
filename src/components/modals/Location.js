import React from 'react';
import Modal from './Modal';
import Spinner from '../common/Spinner';

const Location = () => (
    <Modal id="location" padding={true}>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <p>Finding your location..</p>
            <br />
            <Spinner />
        </div>
    </Modal>
);

export default Location;
