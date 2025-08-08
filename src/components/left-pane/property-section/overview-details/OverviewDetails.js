import React from "react";

const OverviewDetails = ({
  address,
  area,
  perimeter,
  polyId,
  unregistered,
}) => {
  return (
    <section>
      <div className="property-inner-section">
        <h3 className="property-inner-section__title">
          <i className="property-inner-section__icon overview-icon"></i>
          <span>Overview</span>
        </h3>
        {address && (
          <div className="property-details-info">
            <div className="property-details-info__title">Full Address:</div>
            <div className="property-details-info__value">{address}</div>
          </div>
        )}
        <div className="property-details-info">
          <div className="property-details-info__inner">
            <div className="property-details-info__title">Area:</div>
            <div className="property-details-info__value">
              {area} m<sup>2</sup>
            </div>
          </div>
          <div className="property-details-info__inner">
            <div className="property-details-info__title">Perimeter:</div>
            <div className="property-details-info__value">{perimeter} m</div>
          </div>
          {!unregistered && (
            <div className="property-details-info__inner">
              <div className="property-details-info__title">Poly ID:</div>
              <div className="property-details-info__value">{polyId}</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OverviewDetails;
