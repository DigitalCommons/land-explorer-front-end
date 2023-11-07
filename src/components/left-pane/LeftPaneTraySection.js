import React from 'react';
import { useDispatch } from 'react-redux';

const LeftPaneTraySection = ({ title, children, open: initialOpen, sectionId }) => {
    const dispatch = useDispatch();

    return (
        <div className="left-pane-tray-section">
            <div
                className="left-pane-tray-section-title"
                onClick={() =>
                    dispatch({
                        type: 'TOGGLE_SECTION',
                        payload: sectionId
                    })
                }
            >
                <h4 style={{ marginLeft: '42px', fontWeight: 'bold', width: '140px' }}>{title}</h4>
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        right: '12px',
                        width: '24px',
                        height: '24px',
                        textAlign: 'center'
                    }}
                >
                    <img
                        src={require('../../assets/img/icon-chevron.svg')}
                        alt=""
                        style={{
                            transformOrigin: 'center',
                            transform: open ? 'rotate(180deg)' : 'rotate(0deg)'
                        }}
                    />
                </div>
            </div>

            <div
                style={{
                    overflow: open ? '' : 'hidden',
                    height: open ? 'auto' : '0'
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default LeftPaneTraySection;
