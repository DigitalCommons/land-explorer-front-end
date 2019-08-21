import React, {Component} from 'react';
import PropTypes from 'prop-types';


class NavTray extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            css: 'nav-left-tray'
        }

        if(this.props.css)
            this.state.css = this.props.css;
    }
    render() {
        let { open, title, onClose } = this.props;
        return (
            <div className={this.state.css}
                 style={{
                     transform: open ? 'translateX(0%)' : 'translateX(-200%)',
                     boxShadow: open ? '3px 0 6px 0 rgba(0, 0, 0, 0.16)' : 'none',
                     overflow: 'scroll'
                 }}
            >
                <div className="tray-title">
                    <div className="title">{title}</div>
                    <div className="close-tray"
                         onClick={onClose}
                    ></div>
                </div>
                <div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

NavTray.propTypes = {
    title: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default NavTray;
