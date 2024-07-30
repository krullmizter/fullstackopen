const CountryList = ({ countries, onCountryClick }) => {
  return (
    <ul className="countries-list-wrapper">
      {countries.map((country) => (
        <li key={country.cca3}>
          <span>{country.name.common}</span>
          <button onClick={() => onCountryClick(country)}>Show</button>
        </li>
      ))}
    </ul>
  );
};

export default CountryList;
