import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import analytics from '../analytics';

class FourOhFour extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        analytics.pageview('/app/error');
    }
    render() {
        return (
            <div style={{
                minHeight: '100vh',
            }}>
                <Navbar limited={true} />
                <div
                    style={{
                        left: '50%',
                        top: '50%',
                        transform: 'translateX(-50%) translateY(-50%)',
                        position: 'absolute',
                        textAlign: 'center',
                    }}
                >
                    <h1>Error</h1>
                    <p>This page doesn't exist!</p>
                    <div className="button button-large" onClick={() => { window.location = '/app'; }}>Return to site</div>
                </div>
            </div>
        )
    }
}

export default FourOhFour;
