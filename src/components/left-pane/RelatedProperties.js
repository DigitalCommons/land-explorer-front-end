import React, { useEffect } from "react";

const RelatedProperties = ({ properties, error, getRelatedProperties }) => {
  useEffect(() => {
    getRelatedProperties();
  }, [getRelatedProperties]);

  return (
    <div>
      {error && <p>{error}</p>}
      {properties.length > 0 && (
        <ul>
          {properties.map((property) => (
            <li key={property.title_no}>{property.property_address}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RelatedProperties;
