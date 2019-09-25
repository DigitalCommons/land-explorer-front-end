import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ToggleSwitch extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { on, toggle, tooltip } = this.props;
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
                        defaultChecked={on}
                        onChange={this.handleChange}
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
