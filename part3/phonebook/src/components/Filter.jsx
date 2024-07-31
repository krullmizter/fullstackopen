import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const Filter = ({
  inputPlaceholder,
  filterValue,
  filterChange,
  filterSuggestions = [],
}) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const filterInputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterInputRef.current &&
        !filterInputRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsDropdownVisible(filterSuggestions.length > 0);
  }, [filterSuggestions]);

  const handleClear = () => {
    filterChange({ target: { value: "" } });
  };

  return (
    <div className="input-container">
      <label htmlFor="filter-input">
        Name
        <br />
        <div className="filter-container">
          <input
            id="filter-input"
            ref={filterInputRef}
            placeholder={inputPlaceholder}
            value={filterValue}
            onChange={filterChange}
            aria-label={inputPlaceholder}
            aria-autocomplete="list"
            role="combobox"
            aria-expanded={isDropdownVisible}
            type="search"
            onFocus={() => setIsDropdownVisible(true)}
          />
          {filterValue && (
            <button className="clear-button" onClick={handleClear}>
              &times;
            </button>
          )}
          {isDropdownVisible && (
            <ul ref={dropdownRef} className="dropdown">
              {filterSuggestions.map((suggestion, index) => (
                <li key={index} className="dropdown-item">
                  {suggestion.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </label>
    </div>
  );
};

Filter.propTypes = {
  inputPlaceholder: PropTypes.string.isRequired,
  filterValue: PropTypes.string.isRequired,
  filterChange: PropTypes.func.isRequired,
  filterSuggestions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Filter;
