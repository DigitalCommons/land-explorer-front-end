import React, { Component } from 'react';
import ToggleSwitch from './ToggleSwitch';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class CouncilNavTrayItem extends Component {
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
                type: `ASSET_TYPE_${this.state.on ? 'ON' : 'OFF'}`,
                payload: {
                    communityAssetsType: this.props.layerId,
                }
            });
        }
    }

    render() {
        let { title, draggable, layerId, activeCommunityAssets } = this.props;
        let active = activeCommunityAssets.indexOf(layerId) !== -1;
        return (
            <div
                className={`tray-item`}
                onClick={this.toggleSwitch}
            >
                <div className={`tray-item-title ${draggable && 'draggable'}`}>
                    {title}
                </div>
                <ToggleSwitch on={active} tooltip="showHideData" />
            </div>
        );
    }
}

CouncilNavTrayItem.propTypes = {
    draggable: PropTypes.bool,
    active: PropTypes.bool,
    title: PropTypes.string,
};

const mapStateToProps = ({ communityAssets }) => ({
    activeCommunityAssets: communityAssets.activeCommunityAssets
})

export default connect(mapStateToProps)(CouncilNavTrayItem);
