import React from "react";
import { List } from "./CountryData";

const ViewData = ({ country, weather }) => {
  if (country.name) {
    return (
      <div>
        <h3>{country.name}</h3>
        <p> Capital: {country.capital} </p>
        <p> Area: {country.area} </p>

        <h5> Languages: </h5>
        <ul>
          {country.languages.map((lang) => {
            return <List key={lang.name} text={lang.name} />;
          })}
        </ul>

        <div>
          <img src={country.flag} style={{ width: "30%" }} alt="flag" />
        </div>

        <h3> Weather in {country.name} </h3>
        <p>Temperature: {weather.current.temp_c} Celcius </p>
        <p>Wind: {weather.current.wind_mph} mph </p>
      </div>
    );
  }
  return;
};

export default ViewData;
