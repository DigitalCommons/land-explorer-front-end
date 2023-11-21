import React from "react";
import { useDispatch } from "react-redux";
import { showPropertyPolygon } from "../../actions/LandOwnershipActions";

const RelatedProperties = ({ property }) => {
  const dispatch = useDispatch();

  const handlePropertyClick = () => {
    dispatch(showPropertyPolygon(property.geom.coordinates[0]));
    console.log("Property clicked", property.geom.coordinates);
    console.log("title_no", property.title_no);
  };

  return (
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

      {/* <div className="search-result__proprietor">
        <i>
          <svg
            className="icon-proprietor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 18"
          >
            <path
              d="M15,15a4.5,4.5,0,1,0-4.5-4.5A4.5,4.5,0,0,0,15,15Zm0,2.25c-3,0-9,1.507-9,4.5V24H24V21.75C24,18.757,18,17.25,15,17.25Z"
              transform="translate(-6 -6)"
            />
          </svg>
        </i>
        {property.proprietor_name_1}
      </div> */}
    </div>
  );
};

export default RelatedProperties;
