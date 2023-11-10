import React from "react";

const RelatedProperties = ({ property }) => {
  const { poly_id, title_no, property_address, proprietor_name_1 } = property;

  return (
    <div className="relatedProperty">
      <div key={property.title_no}>
        <h4>{property.property_address}</h4>
        <p>{property.proprietor_name_1}</p>
        <p>{property.title_no}</p>
      </div>
    </div>
  );
};

export default RelatedProperties;
