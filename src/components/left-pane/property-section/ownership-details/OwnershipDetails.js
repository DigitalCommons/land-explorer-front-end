import React, { useState } from "react";
import ProprietorCard from "./proprietor-card/ProprietorCard";

const OwnershipDetails = ({ tenure, inspireId, proprietors, active }) => {
  const [showMore, setShowMore] = useState(false);
  const proprietorCount = proprietors.length;

  return (
    <section>
      {/* the below `div.ownership-overview` should always visible */}
      <div className="ownership-overview">
        <h3 className="ownership-overview__title">
          <i className="ownership-overview__icon"></i>
          <span>Ownership</span>
        </h3>
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

      {/* The below should be revealed / hidden when show more / show less is clicked */}
      {showMore && (
        <div className="proprietor-list">
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
        </div>
      )}
      <div className="property__show-more-container">
        <button
          className={`button-text button-show-more ${
            showMore ? "less" : "more"
          }`}
          onClick={() => setShowMore((prev) => !prev)}
        >
          {showMore ? "Show Less" : "Show More"}
        </button>
      </div>
    </section>
  );
};

export default OwnershipDetails;
