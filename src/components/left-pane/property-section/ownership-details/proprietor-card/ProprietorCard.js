import React from "react";
import { fetchRelatedProperties } from "../../../../../actions/LandOwnershipActions";
import Button from "../../../../common/Button";
import { useDispatch } from "react-redux";

const ProprietorCard = ({ name, address, category, number }) => {
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch({ type: "CLEAR_RELATED_PROPERTIES_AND_PROPRIETOR_NAME" });
    dispatch(fetchRelatedProperties(name));
    dispatch({ type: "SET_ACTIVE", payload: "Ownership Search" });
  };

  return (
    <div className="proprietor-card">
      <h4>Proprietor {number}</h4>
      <div className="property-details-info">
        <div className="property-details-info__title">Proprietor Name:</div>
        <div className="property-details-info__value">{name}</div>
      </div>
      <div className="property-details-info">
        <div className="property-details-info__title">Proprietor Address:</div>
        <div className="property-details-info__value">{address}</div>
      </div>
      <div className="property-details-info">
        <div className="property-details-info__title">Proprietor Category:</div>
        <div className="property-details-info__value">{category}</div>
      </div>
      <div className="property-details-info__button">
        <Button
          buttonClass={"button-new blue full-width"}
          type={"button"}
          buttonAction={handleSearch}
        >
          Check for other properties
        </Button>
      </div>
    </div>
  );
};

export default ProprietorCard;
