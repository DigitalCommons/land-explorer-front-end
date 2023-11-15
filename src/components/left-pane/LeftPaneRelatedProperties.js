import React from "react";
import LeftPaneTray from "./LeftPaneTray";
import { useSelector } from "react-redux";
import RelatedProperties from "./RelatedProperties";

const LeftPaneRelatedProperties = ({ onClose, open }) => {
  const otherProperties = useSelector(
    (state) => state.relatedProperties.properties
  );

  // Use a Set to store unique properties
  const uniqueProperties = new Set();

  // Filter out duplicates and store unique properties
  const filteredProperties = otherProperties.filter((property) => {
    const isDuplicate = uniqueProperties.has(property.title_no);
    uniqueProperties.add(property.title_no);
    return !isDuplicate;
  });

  return (
    <LeftPaneTray title="Related Properties" open={open} onClose={onClose}>
      {filteredProperties.length ? (
        <>
          {filteredProperties.map((property, i) => (
            <RelatedProperties key={property.title_no} property={property} />
          ))}
        </>
      ) : (
        <div>No related Properties</div>
      )}
    </LeftPaneTray>
  );
};

export default LeftPaneRelatedProperties;
