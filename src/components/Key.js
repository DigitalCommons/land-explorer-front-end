import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Key extends Component {
    renderKeys = () => {
        let { data } = this.props;
        let dataKeys = Object.keys(data);
        return dataKeys.map((key, i) => {
            return (
                <div key={i}
                     style={{
                         display: 'flex',
                         marginBottom: '6px'
                     }}
                >
                    <div style={{
                        backgroundColor: data[key],
                        opacity: '.6',
                        height: '16px',
                        width: '16px',
                        marginRight: '6px'
                    }}/>
                    <div style={{ fontSize: '14px'}}>{key}</div>
                </div>
            )
        })
    }
    render() {
        let { name } = this.props;
        return (
            <div style={{
                marginBottom: '24px'
            }}>
                <div style={{
                    display: 'inline-block',
                    paddingBottom: '6px',
                    marginTop: 0,
                    marginBottom: 0,
                }}>{name}</div>
                <div style={{
                    borderBottom: '1px solid #d0d0d0',
                    width: '100%',
                    marginBottom: '12px',
                }}/>
                { this.renderKeys() }
            </div>
        );
    }
}

Key.propTypes = {};

export default Key;
