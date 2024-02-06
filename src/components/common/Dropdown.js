import React, { useState, useRef, useEffect } from "react";
import useClickOutside from "../../hooks/useClickOutside";

const Dropdown = ({ options, onSelect, customClass, defaultLabel }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  useClickOutside(dropdownRef, () => setIsOpen(!isOpen));

  return (
    <div className={`dropdown ${customClass ? customClass : ""}`}>
      <div
        className="dropdown__selected-option"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption.iconClass && (
          <i
            className={`dropdown__option__icon ${selectedOption.iconClass}`}
          ></i>
        )}
        {defaultLabel ? (
          <div className="dropdown__option__label">{defaultLabel}</div>
        ) : (
          <div className="dropdown__option__label">{selectedOption.label}</div>
        )}
        <div className="dropdown__selected-option__arrow">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14.828 8.414">
            <path
              data-name="Icon feather-chevron-down"
              d="m1.414 1.414 6 6 6-6"
              fill="none"
              stroke="#707070"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            />
          </svg>
        </div>
      </div>
      {isOpen && (
        <div className="dropdown__options__container" ref={dropdownRef}>
          {options.map((option, i) => (
            <div
              className={`dropdown__option`}
              key={option.value}
              onClick={() => handleOptionClick(option)}
            >
              {option.iconClass && (
                <i className={`dropdown__option__icon ${option.iconClass}`}></i>
              )}
              <div className="dropdown_option__label">{option.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
