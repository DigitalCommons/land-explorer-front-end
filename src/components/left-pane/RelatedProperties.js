import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectRelatedProperties, clearSelectedProperty } from "../../actions/LandOwnershipActions";
import { setLngLat } from "../../actions/MapActions";

const RelatedProperties = ({ property }) => {
  const dispatch = useDispatch();
  const { selectedProperties } = useSelector(state => state.relatedProperties);
  const active = selectedProperties.hasOwnProperty(property.poly_id);

  const lng = property.geom.coordinates[0][0][1];
  const lat = property.geom.coordinates[0][0][0];

  const handlePropertyClick = () => {
    if (active)
      dispatch(clearSelectedProperty(property.poly_id));
    else
      dispatch(selectRelatedProperties({ [property.poly_id]: property }));

  };

  const gotoProperty = () => {
    dispatch(setLngLat(lng, lat));
    dispatch(selectRelatedProperties({ [property.poly_id]: property }));
  }

  return (
    <div
      className={`search-result ${active ? "active" : ""}`}
      key={property.title_no}
    >
      <i onClick={handlePropertyClick}>
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
      <div
        className="search-result__property"
        onClick={handlePropertyClick}
      >
        <h4 className="search-result__property-address">
          {property.property_address}
        </h4>
        <div className="search-result__title-no">
          Title no: {property.title_no}
        </div>
      </div>
      <button
        alt="move map to property icon"
        title="Go to Property"
        className="search-result__goto-icon"
        onClick={gotoProperty}
      />
    </div>
  );

};

export default RelatedProperties;
