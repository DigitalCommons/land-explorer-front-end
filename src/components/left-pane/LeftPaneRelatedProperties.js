import React from "react";
import LeftPaneTray from "./LeftPaneTray";
import { useSelector } from "react-redux";
import RelatedProperties from "./RelatedProperties";

const LeftPaneRelatedProperties = ({ onClose, open }) => {
  const otherProperties = useSelector(
    (state) => state.relatedProperties.properties
  );
  return (
    <LeftPaneTray title="Related Properties" open={open} onClose={onClose}>
      {otherProperties.length ? (
        <>
          {otherProperties.map((property, i) => (
            <RelatedProperties property={property} key={`property-${i}`} />
          ))}
        </>
      ) : (
        <div>No related Properties</div>
      )}
    </LeftPaneTray>
  );
};

export default LeftPaneRelatedProperties;
