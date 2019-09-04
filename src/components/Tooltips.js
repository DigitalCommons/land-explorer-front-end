import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';

class Tooltips extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { readOnly } = this.props;
        return (
            <div>
                <ReactTooltip id="showHideData" className="tooltip no-xs" place="right" type="light" effect="solid" delayShow={1200}>Show and hide data</ReactTooltip>
                <ReactTooltip id="ttDrawingTools" className="tooltip no-xs" place="right" type="light" effect="solid" delayShow={1200}>{ readOnly ? 'Read only!' : 'Drawing Tools'}</ReactTooltip>
                <ReactTooltip id="ttNewMap" className="tooltip no-xs" place="right" type="light" effect="solid" delayShow={1200}>New Map</ReactTooltip>
                <ReactTooltip id="ttLandData" className="tooltip no-xs" place="right" type="light" effect="solid" delayShow={1200}>Land Data</ReactTooltip>
                <ReactTooltip id="ttInfo" className="tooltip no-xs" place="right" type="light" effect="solid" delayShow={1200}>Land Information</ReactTooltip>
                <ReactTooltip id="ttForSale" className="tooltip no-xs" place="right" type="light" effect="solid" delayShow={1200}>Land For Sale</ReactTooltip>
                <ReactTooltip id="ttLandOwnership" className="tooltip no-xs" place="right" type="light" effect="solid" delayShow={1200}>Land Ownership</ReactTooltip>
                <ReactTooltip id="ttBoundaries" className="tooltip no-xs" place="right" type="light" effect="solid" delayShow={1200}>Land Boundaries</ReactTooltip>
                <ReactTooltip id="ttPoliticalData" className="tooltip no-xs" place="right" type="light" effect="solid" delayShow={1200}>Political Data</ReactTooltip>
                <ReactTooltip id="ttSave" className="tooltip no-xs" place="right" type="light" effect="solid" delayShow={1200}>Save</ReactTooltip>
                <ReactTooltip id="ttShare" className="tooltip no-xs" place="right" type="light" effect="solid" delayShow={1200}>{ readOnly ? 'Read only!' : 'Share' }</ReactTooltip>
                <ReactTooltip id= "publicToPrivate" className="tooltip no-xs" place="right" type="light" effect="solid" delayShow={1200}>Private / Public</ReactTooltip>
            </div>
        );
    }
}

Tooltips.propTypes = {};

const mapStateToProps = ({ readOnly }) => ({
    readOnly: readOnly.readOnly
});

export default connect(mapStateToProps)(Tooltips);
