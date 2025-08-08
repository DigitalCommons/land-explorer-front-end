import React from "react";
import ReactTooltip from "react-tooltip";
import { useSelector } from "react-redux";
import { isMobile } from "react-device-detect";

const tooltipDelay = 100;

const Tooltips = () => {
  const readOnly = useSelector((state) => state.readOnly.readOnly);
  const isSnapshot = useSelector((state) => state.mapMeta.isSnapshot);

  return (
    <>
      <ReactTooltip
        id="ttShowHideData"
        className="tooltip no-xs"
        place="right"
        type="light"
        effect="solid"
        delayShow={tooltipDelay}
        globalEventOff={isMobile ? "click" : undefined}
      >
        Show and hide data
      </ReactTooltip>
      <ReactTooltip
        id="ttDrawingTools"
        className="tooltip no-xs"
        place="right"
        type="light"
        effect="solid"
        delayShow={tooltipDelay}
        globalEventOff={isMobile ? "click" : undefined}
      >
        {readOnly
          ? isSnapshot
            ? "Can't edit snapshot"
            : "Read only!"
          : "Drawing Tools"}
      </ReactTooltip>
      <ReactTooltip
        id="ttLandData"
        className="tooltip no-xs"
        place="right"
        type="light"
        effect="solid"
        delayShow={tooltipDelay}
        globalEventOff={isMobile ? "click" : undefined}
      >
        Land Data
      </ReactTooltip>
      <ReactTooltip
        id="ttInfo"
        className="tooltip no-xs"
        place="right"
        type="light"
        effect="solid"
        delayShow={tooltipDelay}
        globalEventOff={isMobile ? "click" : undefined}
      >
        Land Information
      </ReactTooltip>
      <ReactTooltip
        id="ttRelatedProperties"
        className="tooltip no-xs"
        place="right"
        type="light"
        effect="solid"
        delayShow={tooltipDelay}
        globalEventOff={isMobile ? "click" : undefined}
      >
        Ownership Search
      </ReactTooltip>
      <ReactTooltip
        id="ttToggleLayerKey"
        className="tooltip no-xs"
        place="left"
        type="light"
        effect="solid"
        delayShow={tooltipDelay}
        globalEventOff={isMobile ? "click" : undefined}
      >
        Toggle Layer Key
      </ReactTooltip>
    </>
  );
};

export default Tooltips;
