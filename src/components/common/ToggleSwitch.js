import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ToggleSwitch extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { on, toggle, tooltip } = this.props;
        return (
            <div className="toggle-switch"
                onClick={(e) => {
                    e.preventDefault();
                    toggle();
                }}

                data-tip
                data-for={tooltip}
            >
                <label className="switch">
                    <input
                        type="checkbox"
                        checked={on}
                        onChange={e => { }}
                    />
                    <span className="slider round"></span>
                </label>
            </div>
        );
    }
}

ToggleSwitch.propTypes = {
    on: PropTypes.bool.isRequired,
    toggle: PropTypes.func,
    tooltip: PropTypes.string
};

export default ToggleSwitch;
