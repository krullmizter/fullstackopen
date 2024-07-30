import { useState, useEffect } from "react";
import axios from "axios";
import CountryList from "./components/CountryList";
import CountryDetails from "./components/CountryDetails";

const useCountries = (query) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (query) {
      setLoading(true);
      setError("");
      const fetchCountries = async () => {
        try {
          const res = await axios.get(
            `https://restcountries.com/v3.1/name/${query}`
          );
          setCountries(res.data);
        } catch (err) {
          setError("Error fetching country data. Please try again.");
          console.error(err);
          setCountries([]);
        } finally {
          setLoading(false);
        }
      };

      const debounceFetch = setTimeout(() => {
        fetchCountries();
      }, 300);

      return () => clearTimeout(debounceFetch);
    } else {
      setCountries([]);
    }
  }, [query]);

  return { countries, loading, error };
};

const useWeather = (selectedCountry) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (selectedCountry) {
      setLoading(true);
      setError("");
      const fetchWeather = async () => {
        try {
          const capital = selectedCountry.capital[0];
          const apiKey = import.meta.env.VITE_OPEN_WEATHER;
          const res = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${apiKey}&units=metric`
          );
          setWeather(res.data);
        } catch (err) {
          setError("Error fetching weather data. Please try again.");
          console.error(err);
          setWeather(null);
        } finally {
          setLoading(false);
        }
      };

      fetchWeather();
    }
  }, [selectedCountry]);

  return { weather, loading, error };
};

function App() {
  const [query, setQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  const {
    countries,
    loading: loadingCountries,
    error: errorCountries,
  } = useCountries(query);
  const {
    weather,
    loading: loadingWeather,
    error: errorWeather,
  } = useWeather(selectedCountry);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
  };

  const handleClearSearch = () => {
    setQuery("");
    setSelectedCountry(null);
  };

  return (
    <main>
      <section>
        <h1>Country Information</h1>
        <p>Start by typing the name of a country</p>
        <input
          type="text"
          placeholder="Finland..."
          value={query}
          onChange={handleSearchChange}
        />
        {query && (
          <button className="clear-search" onClick={handleClearSearch}>
            Clear
          </button>
        )}
      </section>

      {query && (
        <section>
          {loadingCountries && <p>Loading countries...</p>}
          {errorCountries && <p className="error">{errorCountries}</p>}
          {query.length === 1 && (
            <p className="error">
              Please enter more than one character to search.
            </p>
          )}
          {countries.length > 1 &&
            countries.length <= 10 &&
            !selectedCountry && (
              <CountryList
                countries={countries}
                onCountryClick={handleCountryClick}
              />
            )}

          {(countries.length === 1 || selectedCountry) && (
            <>
              {loadingWeather && <p>Loading weather...</p>}
              {errorWeather && <p className="error">{errorWeather}</p>}
              {countries.length === 1 &&
                !selectedCountry &&
                !loadingWeather && (
                  <CountryDetails country={countries[0]} weather={weather} />
                )}
              {selectedCountry && !loadingWeather && (
                <CountryDetails country={selectedCountry} weather={weather} />
              )}
            </>
          )}
        </section>
      )}
    </main>
  );
}

export default App;
