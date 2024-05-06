import React, { useState, useEffect } from "react";
import './weatherApp.css'
import searchIcon from '../Assets/search.png';
import humidityIcon from '../Assets/humidity.png';
import windIcon from '../Assets/wind.png';

const api_key= "483b542a45a55fc791c733112a0b1e87";

const WeatherApp = () => {
    const [weatherIcon, setWeatherIcon] = useState(null);
    const [weatherData, setWeatherData] = useState({});
    const [city, setCity] = useState("Ambivali");

    useEffect(() => {
        search();
    }, []);

    const search = async () => {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`;

        try {
            let response = await fetch(url);
            let data = await response.json();
            setWeatherData(data);
            if (data.weather && data.weather.length > 0) {
                setWeatherIcon(`http://openweathermap.org/img/w/${data.weather[data.weather.length - 1].icon}.png`);
            }
        } catch (error) {
            console.log("Error fetching weather data:", error);
        }
    }

    return (
        <div className="Container">
            <div className="Top-bar">
                <input type="text" className="cityinput" placeholder="Search" onChange={(e)=>{setCity(e.target.value)}} />
                <div className="search-icon">
                    <button onClick={search}>
                        <img src={searchIcon} alt="" />
                    </button>
                </div>
            </div>

            <div className="weather-image">
                {weatherIcon && <img src={weatherIcon} alt="Weather Icon" />}
            </div>

            <div>
                <div className="weather-temp">{weatherData.main && weatherData.main.temp}°c</div>
                <div className="weather-location">{weatherData.name}</div>
                <div className="weather-condition">{weatherData.weather && weatherData.weather[0].description}</div>

                <div className="data-container">
                    <div className="element">
                        <img src={humidityIcon} alt="" className="icon" />
                        <div className="data">
                            <div className="humidity-percent">{weatherData.main && weatherData.main.humidity}%</div>
                            <div className="text">Humidity</div>
                        </div>
                    </div>

                    <div className="element">
                        <img src={windIcon} alt="" className="icon" />
                        <div className="data">
                            <div className="wind-speed">{weatherData.wind && weatherData.wind.speed} km/h</div>
                            <div className="text">Wind speed</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherApp;
