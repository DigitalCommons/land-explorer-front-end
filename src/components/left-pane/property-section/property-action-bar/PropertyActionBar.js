import React, { useState } from "react";
import ToggleSwitch from "../../../common/ToggleSwitch";

const PropertyActionBar = ({ initialSaved = false, onToggle }) => {
  const [isSaved, setIsSaved] = useState(initialSaved);

  const handleToggle = () => {
    setIsSaved((prev) => {
      const next = !prev;
      onToggle && onToggle(next); // future: dispatch save/remove here
      return next;
    });
  };

  return (
    <div className="property-action-bar">
      {/* Visit button only shows when saved */}
      {isSaved && (
        <button
          className="button-text property-action-bar__visit-button"
          type="button"
          onClick={(e) => e.preventDefault()}
        >
          <i className="property-action-bar__visit-button__icon"></i>
          <span>Visit</span>
        </button>
      )}

      <div className="property-action-bar__save-toggle">
        <span className="property-action-bar__save-label">Save</span>
        <ToggleSwitch
          on={isSaved}
          toggle={handleToggle}
          tooltip={isSaved ? "Unsave property" : "Save property"}
        />
      </div>
    </div>
  );
};

export default PropertyActionBar;
