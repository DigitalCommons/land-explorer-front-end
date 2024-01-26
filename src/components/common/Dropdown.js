import React, { useState, useEffect } from "react";

const Dropdown = ({ options, onSelect, customClass, defaultLabel }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  // useEffect(() => {
  //   if (selectedOption !== options[0]) {
  //     setSelectedOption(options[0]);
  //   }
  // }, [options]);

  return (
    <div className={`dropdown ${customClass ? customClass : ""}`}>
      <div
        className="dropdown__selected-option"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption ? selectedOption.label : defaultLabel}
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
        <div className="dropdown__options__container">
          {options.map((option, index) => (
            <div className={`dropdown__option`} key={option.value} onClick={() => handleOptionClick(option)}>
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
