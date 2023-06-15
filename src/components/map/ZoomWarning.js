import React from 'react';

const ZoomWarning = ({ show }) =>
    <div style={{
        position: 'fixed',
        top: '84px',
        right: '12px',
        color: 'white',
        padding: '6px 12px',
        background: 'rgba(208, 2, 78, 0.95)',
        fontSize: '12px',
        fontWeight: 'bold',
        width: 'auto',
        height: 'auto',
        borderRadius: '40px',
        zIndex: 1,
        transition: 'opacity 300ms, transform 300ms',
        transform: show ? 'translateX(0px)' : 'translateX(12px)',
        opacity: show ? 1 : 0,
    }}>
        Please zoom in to see layer
    </div>

export default ZoomWarning;