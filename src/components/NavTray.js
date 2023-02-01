import React from 'react';

const NavTray = ({ css, open, title, onClose, header, footer, children }) => {

    return <div className={css ? css : 'nav-left-tray'}
        style={{
            transform: open ? 'translateX(0%)' : 'translateX(-200%)',
            boxShadow: open ? '3px 0 6px 0 rgba(0, 0, 0, 0.16)' : 'none',
            overflow: 'scroll'
        }}
    >
        <div className="nav-left-tray-container">
            <div className="tray-top">
                <div className="tray-title">
                    <div className="title">{title}</div>
                    <div className="close-tray"
                        onClick={onClose}
                    ></div>
                </div>
                {header ? header : null}
            </div>
            <div className="tray-content">
                {children}
            </div>
            {footer}
        </div>
    </div>

}

export default NavTray;
