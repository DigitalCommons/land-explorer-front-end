import React, { useState } from "react";
import ProprietorCard from "./proprietor-card/ProprietorCard";

const OwnershipDetails = ({ tenure, dateAdded, proprietors }) => {
  const [showMore, setShowMore] = useState(false);
  const proprietorCount = proprietors.length;
  const proprietorOne = proprietors[0];

  return (
    <section>
      <div className="property-inner-section">
        <h3 className="property-inner-section__title">
          <i className="property-inner-section__icon ownership-icon"></i>
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
            <div className="property-details-info__title">
              Proprietor{proprietorCount > 1 && " One"}
            </div>
            <div className="property-details-info__value">
              {proprietorOne.name}
            </div>
          </div>
          <div className="property-details-info__inner">
            <div className="property-details-info__title">Last Change:</div>
            <div className="property-details-info__value">{dateAdded}</div>
          </div>
        </div>
      </div>

      {showMore && (
        <div className="proprietor-list">
          {proprietors.map((proprietor, index) => (
            <ProprietorCard
              key={index}
              name={proprietor.name}
              address={proprietor.address}
              category={proprietor.category}
              number={proprietor.number}
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
