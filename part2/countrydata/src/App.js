import { useState, useEffect } from "react";
import axios from "axios";
import { CountryData } from "./components/CountryData";
import Input from "./components/Input";
import ViewData from "./components/ViewData";

const App = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState([]);
  const [weather, setWeather] = useState({});
  const [capital, setCapital] = useState("London"); //London only serves as default

  useEffect(() => {
    axios.get("https://restcountries.com/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${capital}`
      )
      .then((response) => setWeather(response.data));
  }, [capital]);

  const handleQuery = (e) => {
    setQuery(e.target.value);
    setCountry([]);
  };

  const handleClick = (name) => {
    setCountry(name);
    setCapital(name.capital);
  };

  return (
    <div>
      <Input label="find countries:" value={query} onChange={handleQuery} />
      <CountryData
        countries={countries}
        query={query}
        country={country}
        onClick={handleClick}
        setCapital={setCapital}
        weather={weather}
      />
      <ViewData country={country} weather={weather} />
    </div>
  );
};

export default App;
