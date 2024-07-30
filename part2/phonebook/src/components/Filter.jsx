/* eslint-disable react/prop-types */
const Filter = ({
  inputPlaceholder,
  filterValue,
  filterChange,
  filterSuggestions,
}) => {
  return (
    <div>
      <input
        placeholder={inputPlaceholder}
        value={filterValue}
        onChange={filterChange}
        aria-label={inputPlaceholder}
      />
      {filterSuggestions.length > 0 && (
        <div className="autocomplete-dropdown">
          {filterSuggestions.map((suggestion) => (
            <div key={suggestion.id} className="suggestion-item">
              {suggestion.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Filter;
