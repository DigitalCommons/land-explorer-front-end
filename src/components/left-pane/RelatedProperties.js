import React from "react";

const RelatedProperties = ({ property }) => {

  return (
    <div className="relatedProperty" key={property.title_no}>
        <h4>{property.property_address}</h4>
        <p>{property.proprietor_name_1}</p>
        <p>{property.title_no}</p>
    </div>
  );
};

export default RelatedProperties;
