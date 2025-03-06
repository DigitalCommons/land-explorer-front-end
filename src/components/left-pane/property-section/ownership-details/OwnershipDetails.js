import React from "react";
import ProprietorCard from "./proprietor-card/ProprietorCard";

const OwnershipDetails = ({ tenure, inspireId, proprietors, active }) => {
  const proprietorCount = proprietors.length;
  return (
    <section>
      <div className="ownership-overview">
        <h3>Ownership</h3>
        <div className="property-details-info">
          <div className="property-details-info__inner">
            <div className="property-details-info__title">Proprietors:</div>
            <div className="property-details-info__value">
              {proprietorCount}
            </div>
          </div>
          <div className="property-details-info__inner">
            <div className="property-details-info__title">Tenure:</div>
            <div className="property-details-info__value">{tenure}</div>
          </div>
          <div className="property-details-info__inner">
            <div className="property-details-info__title">INSPIRE IDs:</div>
            <div className="property-details-info__value">{inspireId}</div>
          </div>
        </div>
      </div>

      {proprietors.map((proprietor, index) => (
        <ProprietorCard
          key={index}
          name={proprietor.name}
          address={proprietor.address}
          category={proprietor.category}
          number={proprietor.number}
          active={active}
        />
      ))}
    </section>
  );
};

export default OwnershipDetails;
