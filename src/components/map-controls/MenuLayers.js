import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class MenuLayers extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { open, baseLayer, dispatch } = this.props;
        return (
            <div style={{
                display: open ? 'block' : 'none'
            }}>
                <div className="tooltip-menu tooltip-menu-layers modal"
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                    }}
                >
                    <div className="tooltip-menu-item"
                        onClick={(e) => {
                            e.stopPropagation();
                            dispatch({ type: 'MAP_LAYER_AERIAL' });
                        }}
                        style={baseLayer === 'aerial' ? { background: 'rgba(0, 0, 0, 0.1)' } : {}}
                    >
                        Aerial
                    </div>
                    <div className="tooltip-menu-item"
                        onClick={(e) => {
                            e.stopPropagation();
                            dispatch({ type: 'MAP_LAYER_TOPOGRAPHY' });
                        }}
                        style={baseLayer === 'topography' ? { background: 'rgba(0, 0, 0, 0.1)' } : {}}
                    >
                        Topography
                    </div>
                </div>
            </div>
        );
    }
}

MenuLayers.propTypes = {
    open: PropTypes.bool.isRequired,
    baseLayer: PropTypes.string.isRequired
};

const mapStateToProps = ({ menu, mapBaseLayer }) => ({
    open: menu.layers,
    baseLayer: mapBaseLayer.layer,
});

export default connect(mapStateToProps)(MenuLayers);
