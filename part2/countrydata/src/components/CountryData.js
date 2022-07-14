import React from "react";

const CountryData = ({ countries, query, onClick, setCapital, weather }) => {

  const match = countries.filter((country) => {
    const lowerCase = country.name.toLowerCase();
    return lowerCase.includes(query);
  });

  if (!query) {
    return <p>search for a country</p>;
  }

  if (match.length === 0) {
    return <p>No match found!</p>;
  }

  if (match.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (match.length > 1 && match.length <= 10) {
    return (
      <div>
        {match.map((country) => {
          return (
            <p key={country.name}>
              {" "}
              {country.name}
              <Button onClick={() => onClick(country)} text="show" />
            </p>
          );
        })}
      </div>
    );
  }

  if (match.length === 1) {
    setCapital(match[0].capital);
    return (
      <div>
        <h3>{match[0].name}</h3>
        <p> Capital: {match[0].capital} </p>
        <p> Area: {match[0].area} </p>

        <h5>Languages: </h5>
        <ul>
          {match[0].languages.map((lang) => {
            return <List key={lang.name} text={lang.name} />;
          })}
        </ul>

        <div>
          <img
            src={match[0].flag}
            style={{ width: "30%" }}
            alt="country flag"
          />
        </div>

        <h3> Weather in {match[0].name} </h3>
        <p>Temperature: {weather.current.temp_c} Celcius </p>
        <p>Wind: {weather.current.wind_mph} mph </p>
        
      </div>
    );
  }
};

const Button = ({ text, onClick }) => (
  <button onClick={onClick}> {text} </button>
);

const List = ({ text }) => <li> {text} </li>;

export { CountryData, List };
