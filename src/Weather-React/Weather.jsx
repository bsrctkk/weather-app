import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import axios from 'axios';

const Weather = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const searchWeather = async () => {
    if (location) {
      try {
        const API_KEY = 'bad7b5b148e214c4d68cba1f9e0c9fe7';
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
        );
        setWeatherData(response.data);
      } catch (error) {
        setWeatherData(null);
      }
    }
  };

  useEffect(() => {
    searchWeather();
  }, [location]);

  return (
    <div className="weather">
      <div className="search">
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Şehir Adı"/>
        <button onClick={searchWeather}><FiSearch /></button>
      </div>
      {weatherData && (
        <div className="weather">
          <h2>{weatherData.name}</h2>
          <p>Sıcaklık: {weatherData.main.temp}°C</p>
          <p>Nem: {weatherData.main.humidity}%</p>
          <p>Hava Koşulları: {weatherData.weather[0].main}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;