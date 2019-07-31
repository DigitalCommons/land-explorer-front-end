import React, {Component} from 'react';
import PropTypes from 'prop-types';

class NavDrawingTray extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { open, title, onClose } = this.props;
        return (
            <div className="nav-left-tray"
                 style={{
                     transform: open ? 'translateX(0%)' : 'translateX(-200%)',
                     boxShadow: open ? '3px 0 6px 0 rgba(0, 0, 0, 0.16)' : 'none',
                     overflow: 'scroll',
                 }}
            >
                <div className="tray-title">
                    <div className="title">{title}</div>
                    <div className="close-tray"
                         style={{ right: '27px' }}
                         onClick={onClose}
                    />
                </div>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

NavDrawingTray.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default NavDrawingTray;
