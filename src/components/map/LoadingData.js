import React, { Component } from 'react';

class LoadingData extends Component {
    render() {
        const { message } = this.props

        return <div className="loading-circle">
            <p className="loading-text">{message}</p>
        </div>
    }
}

export default LoadingData;
