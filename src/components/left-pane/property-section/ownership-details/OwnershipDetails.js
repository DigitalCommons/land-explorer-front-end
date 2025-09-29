import React, { useState } from "react";
import ProprietorCard from "./proprietor-card/ProprietorCard";
import PropertySectionSmallPrint from "../property-section-small-print/PropertySectionSmallPrint";

const OwnershipDetails = ({ title_no, tenure, dateAdded, proprietors }) => {
  const [showingMore, setShowingMore] = useState(false);
  const proprietorCount = proprietors.length;
  const proprietorOne = proprietors[0];

  return proprietors[0]?.name ? (
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

      {showingMore && (
        <>
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
          <PropertySectionSmallPrint
            title_no={title_no}
            unregistered={tenure === "unregistered"}
          />
        </>
      )}
      <div
        className={`property__${
          showingMore ? "show-less" : "show-more"
        }-container`}
      >
        <button
          className={`button-text button-show-more ${
            showingMore ? "less" : "more"
          }`}
          onClick={() => setShowingMore((prev) => !prev)}
        >
          {showingMore ? "Show Less" : "Show More"}
        </button>
      </div>
    </section>
  ) : (
    // If no proprietors, just show the small print without expandable section
    <PropertySectionSmallPrint
      title_no={title_no}
      unregistered={tenure === "unregistered"}
    />
  );
};

export default OwnershipDetails;
