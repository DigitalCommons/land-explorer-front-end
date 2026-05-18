import { useState, useRef } from "react";
import useClickOutside from "../../hooks/useClickOutside";

export type DropdownOption<T = number | string> = {
  value: T;
  label: string;
  iconClass?: string;
};

type Props<T = string | number> = {
  options: DropdownOption<T>[];
  onSelect: (option: DropdownOption<T>) => void;
  customClass?: string;
  defaultLabel?: string;
  defaultIcon?: string;
};

const Dropdown = <T = string | number>({
  options,
  onSelect,
  customClass,
  defaultLabel,
  defaultIcon,
}: Props<T>) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: DropdownOption<T>) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  useClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div
      className={`dropdown ${customClass ? customClass : ""}`}
      ref={dropdownRef}
    >
      <div
        className="dropdown__selected-option"
        onClick={() => setIsOpen(!isOpen)}
      >
        {defaultIcon ? (
          <i className={`dropdown__selected-option__icon ${defaultIcon}`}></i>
        ) : (
          <i
            className={`dropdown__selected-option__icon ${selectedOption.iconClass}`}
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
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
      {isOpen && (
        <div className="dropdown__options__container">
          {options.map((option) => (
            <div
              className={`dropdown__option`}
              key={String(option.value)}
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
