import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';

class Tooltips extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { readOnly } = this.props;
        const tooltipDelay = 300;

        return (
            <>
                <ReactTooltip id="showHideData" className="tooltip no-xs" place="right" type="light" effect="solid" delayShow={tooltipDelay}>Show and hide data</ReactTooltip>
                <ReactTooltip id="ttDrawingTools" className="tooltip no-xs" place="right" type="light" effect="solid" delayShow={tooltipDelay}>{readOnly ? 'Read only!' : 'Drawing Tools'}</ReactTooltip>
                <ReactTooltip id="ttNewMap" className="tooltip no-xs" place="right" type="light" effect="solid" delayShow={tooltipDelay}>New Map</ReactTooltip>
                <ReactTooltip id="ttLandData" className="tooltip no-xs" place="right" type="light" effect="solid" delayShow={tooltipDelay}>Land Data</ReactTooltip>
                <ReactTooltip id="ttInfo" className="tooltip no-xs" place="right" type="light" effect="solid" delayShow={tooltipDelay}>Land Information</ReactTooltip>
                <ReactTooltip id="ttForSale" className="tooltip no-xs" place="right" type="light" effect="solid" delayShow={tooltipDelay}>Land For Sale</ReactTooltip>
                <ReactTooltip id="ttLandOwnership" className="tooltip no-xs" place="right" type="light" effect="solid" delayShow={tooltipDelay}>Land Ownership</ReactTooltip>
                <ReactTooltip id="ttBoundaries" className="tooltip no-xs" place="right" type="light" effect="solid" delayShow={tooltipDelay}>Land Boundaries</ReactTooltip>
                <ReactTooltip id="ttPoliticalData" className="tooltip no-xs" place="right" type="light" effect="solid" delayShow={tooltipDelay}>Political Data</ReactTooltip>
                <ReactTooltip id="ttSave" className="tooltip no-xs" place="right" type="light" effect="solid" delayShow={tooltipDelay}>Save</ReactTooltip>
                <ReactTooltip id="ttShare" className="tooltip no-xs" place="right" type="light" effect="solid" delayShow={tooltipDelay}>{readOnly ? 'Read only!' : 'Share'}</ReactTooltip>
                <ReactTooltip id="ttCommunityAssets" className="tooltip no-xs" place="right" type="light" effect="solid" delayShow={tooltipDelay}>Community Assets</ReactTooltip>
                <ReactTooltip id="publicToPrivate" className="tooltip no-xs" place="right" type="light" effect="solid" delayShow={tooltipDelay}>Private / Public</ReactTooltip>
                <ReactTooltip id="highlightSingleMultiple" className="tooltip no-xs" place="right" type="light" effect="solid" delayShow={tooltipDelay}>Highlight single/multiple properties</ReactTooltip>
            </>
        );
    }
}

Tooltips.propTypes = {};

const mapStateToProps = ({ readOnly }) => ({
    readOnly: readOnly.readOnly
});

export default connect(mapStateToProps)(Tooltips);
