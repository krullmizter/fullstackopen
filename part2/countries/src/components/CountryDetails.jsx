const CountryDetails = ({ country, weather }) => {
  const { name, capital, area, flags, languages } = country;

  return (
    <div>
      <h2>Statistics of {name.common}</h2>
      <p>
        <strong>Flag</strong>
      </p>
      <img src={flags.png} alt={flags.alt} width="150" />
      <p>
        <strong>Capital:</strong> {capital[0]}
      </p>
      <p>
        <strong>Area:</strong> {area} km²
      </p>
      <p>
        <strong>Official languages:</strong>{" "}
        {Object.values(languages).join(", ")}
      </p>
      {weather && (
        <div>
          <h3>Weather in {capital[0]}</h3>
          <p>
            <strong>Temperature:</strong> {weather.main.temp}°C
          </p>
          <p>
            <strong>Weather:</strong> {weather.weather[0].description}
          </p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
            alt={weather.weather[0].description}
          />
        </div>
      )}
    </div>
  );
};

export default CountryDetails;
