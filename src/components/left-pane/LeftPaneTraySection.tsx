import React from 'react';
import { useAppDispatch } from '@/hooks/react-redux';
import iconChevron from '../../assets/img/icon-chevron.svg';

type Props = {
    title: string;
    children: React.ReactNode;
    open: boolean;
    sectionId: string;
};

const LeftPaneTraySection = ({ title, children, open: initialOpen, sectionId }: Props) => {
    const dispatch = useAppDispatch();

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
                        src={iconChevron}
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
