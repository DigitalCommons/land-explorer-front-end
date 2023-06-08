import React from 'react';
import ReactTooltip from 'react-tooltip';
import { useSelector } from 'react-redux';

const tooltipDelay = 300;

const Tooltips = () => {
    const readOnly = useSelector(state => state.readOnly.readOnly);
    const isSnapshot = useSelector(state => state.mapMeta.isSnapshot);

    return <>
        <ReactTooltip id="ttShowHideData" className="tooltip no-xs" place="right" type="light" effect="solid" delayShow={tooltipDelay}>Show and hide data</ReactTooltip>
        <ReactTooltip id="ttDrawingTools" className="tooltip no-xs" place="right" type="light" effect="solid" delayShow={tooltipDelay}>{readOnly ? (isSnapshot ? "Can't edit snapshot" : 'Read only!') : 'Drawing Tools'}</ReactTooltip>
        <ReactTooltip id="ttLandData" className="tooltip no-xs" place="right" type="light" effect="solid" delayShow={tooltipDelay}>Land Data</ReactTooltip>
        <ReactTooltip id="ttInfo" className="tooltip no-xs" place="right" type="light" effect="solid" delayShow={tooltipDelay}>Land Information</ReactTooltip>
        <ReactTooltip id="ttShare" className="tooltip no-xs" place="right" type="light" effect="solid" delayShow={tooltipDelay}>{readOnly ? (isSnapshot ? 'Share snapshot' : 'Read only!') : 'Share'}</ReactTooltip>
    </>
}

export default Tooltips;