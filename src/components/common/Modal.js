import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            translateY: '-100%',
            opacity: 0,
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.open === false && this.props.open === true) {
            setTimeout(() => {
                this.setState({
                    opacity: 1,
                    translateY: '-50%'
                });
            }, 100);
        }
    }
    closeModal = () => {
        this.setState({ opacity: 0, translateY: '-100%' });
        setTimeout(() => {
            this.props.dispatch({ type: 'CLOSE_MODAL', payload: this.props.id });
            if (this.props.customClose) {
                this.props.customClose();
            }
        }, 300);
    }
    render() {
        let { opacity, translateY } = this.state;
        let { style, canToggle, padding } = this.props;
        return (
            <div id={this.props.id} className="Modal modal"
                style={Object.assign({}, style, this.props.open === false ? { display: 'none' } : { opacity: opacity })}
            >
                <div className="ModalBackground"
                    onClick={() => {
                        if (canToggle === true) {
                            this.closeModal();
                        }
                    }}
                />
                <div className={"ModalContent modal" + (padding ? " modal-padding" : "")}
                    style={{ transform: `translateX(-50%) translateY(${translateY})` }}
                >
                    {
                        canToggle === true && (
                            <div className="modal-close" onClick={this.closeModal} />
                        )
                    }
                    {this.props.children}
                </div>
            </div>
        )
    }
}

Modal.propTypes = {
    open: PropTypes.bool,
    canToggle: PropTypes.bool,
    id: PropTypes.string,
    customClose: PropTypes.func,
};

const mapStateToProps = (state, ownProps) => ({
    open: state.modal[ownProps.id].open,
    canToggle: state.modal[ownProps.id].canToggle,
});

export default connect(mapStateToProps)(Modal);
