import React from 'react';

type Props = {
    css?: string;
    open: boolean;
    title: string;
    onClose: () => void;
    header?: React.ReactNode;
    children: React.ReactNode;
};

const LeftPaneTray = ({ css, open, title, onClose, header, children }: Props) => {

    return <div className={css ? css : 'left-pane-tray'}
        style={{
            transform: open ? 'translateX(0%)' : 'translateX(-200%)',
            boxShadow: open ? '3px 0 6px 0 rgba(0, 0, 0, 0.16)' : 'none',
            overflowY: 'auto'
        }}
    >
        <div className="left-pane-tray-container">
            <div className="tray-top">
                <div className="tray-title">
                    <div className="title">{title}</div>
                    <div className="close-tray"
                        onClick={onClose}
                    ></div>
                </div>
                {header ? header : null}
            </div>
            {children}
        </div>
    </div>

}

export default LeftPaneTray;
