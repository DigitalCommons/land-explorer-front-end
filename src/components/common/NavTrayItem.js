import React, { Component } from 'react';
import ToggleSwitch from './ToggleSwitch';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class NavTrayItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            on: false
        }
    }
    toggleSwitch = () => {
        this.setState({
            on: !this.state.on
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.on !== this.state.on) {
            this.props.dispatch({
                type: `LAYER_${this.state.on ? 'ON' : 'OFF'}`,
                payload: this.props.layerId
            });
        }
    }

    render() {
        let { title, draggable, layerId, landDataLayers } = this.props;
        let active = landDataLayers.indexOf(layerId) !== -1;
        return (
            <div
                className={`tray-item`}
                onClick={this.toggleSwitch}
            >
                <div className={`tray-item-title ${draggable && 'draggable'}`}>
                    {title}
                </div>
                <ToggleSwitch on={active} tooltip="showHideData" toggle={this.toggleSwitch} />
            </div>
        );
    }
}

NavTrayItem.propTypes = {
    draggable: PropTypes.bool,
    active: PropTypes.bool,
    title: PropTypes.string,
};

const mapStateToProps = ({ mapLayers }) => ({
    landDataLayers: mapLayers.landDataLayers
})

export default connect(mapStateToProps)(NavTrayItem);
