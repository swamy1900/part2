import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const Country = props => {
  const country = props.country;

  return (
    <>
      <h1>{country.name}</h1>
      <div>capital: {country.capital}</div>
      <div>population: {country.population}</div>
      <h3>languages</h3>
      <ul>
        {country.languages.map(language => (
          <li key={language.name}>{language.name}</li>
        ))}
      </ul>
      <br />
      <img src={country.flag} width='200px' alt={`${country.name}s flag`}/>
      <Weather capital={country.capital} />
    </>
  );
};

const Weather = ({ capital }) => {
  const [current, setCurrent] = useState({});
  const [location, setLocation] = useState({});

  useEffect(() => {
    axios
      .get(
        `https://api.apixu.com/v1/current.json?key=b01b920a22d14edd82c113541191506&q=${capital}`
      )
      .then(response => {
        console.log('WEATHER fulfilled');
        console.log(response.data);

        setCurrent(response.data.current);
        setLocation(response.data.location);
      });
  }, [capital]);

  return !location.name ? (
    <div>getting the weather...</div>
  ) : (
    <>
      <h3>
        weather in {location.name}, {location.country}
      </h3>
      <div>temperature {current.temp_c}°C</div>
      <img src={current.condition.icon} alt={current.condition} />
      <div>
        wind {current.wind_kph}kph, direction {current.wind_dir}
      </div>
    </>
  );
};

const CountryRow = ({ country, handleShow }) => (
  <div>
    <span>{country.name}</span>
    <button onClick={() => handleShow(country)}>show</button>
  </div>
);

const App = () => {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      console.log('promise fulfilled');
      console.log(response.data);
      setCountries(response.data);
    });
  }, []);

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  if (
    (filteredCountries.length > 10 || filteredCountries.length === 1) &&
    selected
  )
    setSelected(null);

  const handleShow = country => {
    setSelected(country);
  };

  const output =
    filteredCountries.length > 10 ? (
      <div>too many countries</div>
    ) : filteredCountries.length === 1 ? (
      <Country country={filteredCountries[0]} />
    ) : (
      filteredCountries.map(country => (
        <CountryRow
          key={country.name}
          country={country}
          handleShow={handleShow}
        />
      ))
    );

  const handleSearchChange = event => {
    setSearch(event.target.value);
  };
  return (
    <>
      <label>find countries</label>
      <input value={search} onChange={handleSearchChange} />
      {output ? output : ''}
      {selected ? <Country country={selected} /> : ''}
    </>
  );
};

export default App;