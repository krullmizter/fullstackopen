import React, { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (name.trim().length < 3) {
      setCountry(null);
      return;
    }

    const fetchCountry = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log("Fetching data for:", name);
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${name}`
        );
        console.log("API response:", response.data);
        if (response.data.length === 0) {
          setCountry({ found: false });
        } else {
          setCountry({ found: true, data: response.data[0] });
        }
      } catch (error) {
        console.error("API error:", error);
        setCountry({ found: false });
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [name]);

  return { country, loading, error };
};

const Country = ({ country }) => {
  if (!country) {
    return null;
  }

  if (country.found === false) {
    return <div>Not found...</div>;
  }

  if (country.loading) {
    return <div>Loading...</div>;
  }

  if (country.error) {
    return <div>Error fetching country data!</div>;
  }

  return (
    <div>
      <h3>{country.data.name.common}</h3>
      <div>Capital City: {country.data.capital[0]}</div>
      <div>Population: {country.data.population}</div>
      <br />
      <img
        src={country.data.flags.png}
        height="100"
        alt={`The flag of ${country.data.name.common}`}
      />
    </div>
  );
};

// Main application component
const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const debouncedName = useDebounce(name, 500);
  const { country, loading, error } = useCountry(debouncedName);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} placeholder="Enter a country name" />
        <button type="submit">Search</button>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div>Error occurred: {error.message}</div>}
      <Country country={country} />
    </div>
  );
};

export default App;
