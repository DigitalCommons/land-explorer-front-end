import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class NavTraySection extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
    }
    toggleChildren = () => {
        this.setState({ open: !this.state.open })
    }
    render() {
        let { title, children, open, dispatch, sectionId } = this.props;
        return (
            <div className="nav-tray-section">
                <div className="nav-tray-section-title"
                     onClick={() => {
                         dispatch({
                             type: 'TOGGLE_SECTION',
                             payload: sectionId
                         })
                     }}
                >
                   <h4 style={{
                       marginLeft: '42px',
                       fontWeight: 'bold',
                       width: '140px'
                   }}>{title}</h4>
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        right: '12px',
                        width: '24px',
                        height: '24px',
                        textAlign: 'center'
                    }}>
                        <img
                            src={require('../../assets/img/chevron.svg')} alt=""
                            style={{
                                transformOrigin: 'center',
                                transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                            }}
                        />
                    </div>
                </div>
                <div style={{
                    overflow: open ? '' : 'hidden',
                    height: open ? 'auto' : '0',
                }}>
                    {children}
                </div>
            </div>
        );
    }
}

NavTraySection.propTypes = {
    title: PropTypes.string.isRequired,
    sectionId: PropTypes.string.isRequired
};

export default connect(null)(NavTraySection);
