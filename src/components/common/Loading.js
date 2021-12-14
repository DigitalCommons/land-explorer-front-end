import React, { Component } from 'react';

class Loading extends Component {
    render() {
        const { message } = this.props

        return <div className="loading-circle">
            <p className="loading-text">{message}</p>
        </div>
    }
}

export default Loading;