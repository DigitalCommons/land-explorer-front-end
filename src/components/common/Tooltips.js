import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';

class Tooltips extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { readOnly, isSnapshot } = this.props;
        const tooltipDelay = 300;

        return (
            <>
                <ReactTooltip id="ttShowHideData" className="tooltip no-xs" place="right" type="light" effect="solid" delayShow={tooltipDelay}>Show and hide data</ReactTooltip>
                <ReactTooltip id="ttDrawingTools" className="tooltip no-xs" place="right" type="light" effect="solid" delayShow={tooltipDelay}>{readOnly ? (isSnapshot ? "Can't edit snapshot" : 'Read only!') : 'Drawing Tools'}</ReactTooltip>
                <ReactTooltip id="ttLandData" className="tooltip no-xs" place="right" type="light" effect="solid" delayShow={tooltipDelay}>Land Data</ReactTooltip>
                <ReactTooltip id="ttInfo" className="tooltip no-xs" place="right" type="light" effect="solid" delayShow={tooltipDelay}>Land Information</ReactTooltip>
            </>
        );
    }
}

Tooltips.propTypes = {};

const mapStateToProps = ({ readOnly, mapMeta }) => ({
    readOnly: readOnly.readOnly,
    isSnapshot: mapMeta.isSnapshot
});

export default connect(mapStateToProps)(Tooltips);
