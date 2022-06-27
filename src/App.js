import React, { useState, useEffect } from "react";
import "./App.css";

const api = {
  key: "825a8d3971a5ee8cc2c3922f10b49504",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [cityInfo, setCityInfo] = useState("");
  const [capitalInfo, setCapitalInfo] = useState("");
  const [tempInfo, setTempInfo] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("");
  const [weatherDescription, setWeatherDescription] = useState("");
  const [tempMin, setTempMin] = useState("");
  const [tempMax, setTempMax] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!searchCity) return;
      setLoading(true);
      // Process
      try {
        const url = `${api.base}weather?q=${searchCity}&units=metric&APPID=${api.key}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          setCityInfo(`${data.name}`);
          setCapitalInfo(`${data.sys.country}`);
          setTempInfo(`${data.main.temp}`);
          setTempMin(`${data.main.temp_min}`);
          setTempMax(`${data.main.temp_max}`);
          setWeatherInfo(`${data.weather[0].main}`);
          setWeatherDescription(`${data.weather[0].description} `);
          setErrorMessage("");
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
      setLoading(false);
    };
    fetchWeatherData();
  }, [searchCity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchCity(searchInput);
  };

  return (
    <div className="container">
      <form id="input" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for a city..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <p className="error">{errorMessage}</p>
      </form>
      {searchCity ? (
        <>
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <>
              <div id="weather-info">
                <div id="capital">
                  <p className="first-info">
                    <span>{cityInfo}, </span>
                    <span>{capitalInfo}</span>
                  </p>
                  <p className="second-info">
                    {new Date().toLocaleString("vi")}
                  </p>
                </div>
                <div id="weather">
                  <p className="temp-1">{tempInfo}°C</p>
                  <p className="clouds">
                    {weatherInfo}: {weatherDescription}
                  </p>
                  <p className="temp-2">
                    {tempMin}°c / {tempMax}°c
                  </p>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
