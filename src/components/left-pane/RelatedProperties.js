import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { showPropertyPolygon } from "../../actions/LandOwnershipActions";
import { setLngLat } from "../../actions/MapActions";

const RelatedProperties = ({ property, isActive, onPropertyClick }) => {
  const dispatch = useDispatch();

  const lng = property.geom.coordinates[0][0][1];
  const lat = property.geom.coordinates[0][0][0];

  const handlePropertyClick = () => {
    onPropertyClick();
    dispatch(setLngLat(lng, lat));
    dispatch(showPropertyPolygon(property.geom.coordinates[0]));
  };

  return (
    <>
      {isActive ? (
        <div className="search-result active" key={property.title_no}>
          <i>
            <svg
              className="icon-property"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 12.6 18"
            >
              <path
                d="M13.8,3A6.3,6.3,0,0,0,7.5,9.3c0,4.725,6.3,11.7,6.3,11.7s6.3-6.975,6.3-11.7A6.3,6.3,0,0,0,13.8,3Zm0,8.55A2.25,2.25,0,1,1,16.05,9.3,2.251,2.251,0,0,1,13.8,11.55Z"
                transform="translate(-7.5 -3)"
              />
            </svg>
          </i>
          <div className="search-result__property">
            <h4 className="search-result__property-address">
              {property.property_address}
            </h4>
            <div className="search-result__title-no">
              Title no: {property.title_no}
            </div>
          </div>
        </div>
      ) : (
        <div
          className="search-result"
          key={property.title_no}
          onClick={handlePropertyClick}
        >
          <i>
            <svg
              className="icon-property"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 12.6 18"
            >
              <path
                d="M13.8,3A6.3,6.3,0,0,0,7.5,9.3c0,4.725,6.3,11.7,6.3,11.7s6.3-6.975,6.3-11.7A6.3,6.3,0,0,0,13.8,3Zm0,8.55A2.25,2.25,0,1,1,16.05,9.3,2.251,2.251,0,0,1,13.8,11.55Z"
                transform="translate(-7.5 -3)"
              />
            </svg>
          </i>
          <div className="search-result__property">
            <h4 className="search-result__property-address">
              {property.property_address}
            </h4>
            <div className="search-result__title-no">
              Title no: {property.title_no}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RelatedProperties;
