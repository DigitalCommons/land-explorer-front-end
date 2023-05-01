import React from 'react';

const Spinner = ({ className = "spinner" }) =>
    <div className={className}>
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
    </div>

export default Spinner;
