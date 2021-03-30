import React, { useState } from "react";
import "./index.css";
//346018866232ca62f599706c964875bd

const api = {
  key: "346018866232ca62f599706c964875bd",
  base: "https://api.openweathermap.org/data/2.5/",
};
function App() {
  const hours = new Date().getHours();
  const isDaytime = hours > 6 && hours < 20;

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState("");

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&appid=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const toFahrenheit = (k) => {
    return ((k - 273.15) * 9) / 5 + 32;
  };
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${month} ${date}, ${year}`.toLowerCase();
  };

  const cuteText = () => {
    return isDaytime
      ? "lets make today a great day. 😊"
      : "work hard, sleep harder. goodnight! 😴";
  };

  return (
    <div className={!isDaytime ? "App" : "App daytime"}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="search"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name.toLowerCase()}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(toFahrenheit(weather.main.temp))}°F
              </div>
              <div className="weather">
                {weather.weather[0].main.toLowerCase()}
              </div>
            </div>
            <div className="cute-text">{cuteText()}</div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
