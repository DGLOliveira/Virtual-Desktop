import { useState, useEffect } from "react";
import { WeatherCode } from "../Components/WeatherCode";
import { FaTemperatureHalf, FaWind, FaSun } from "react-icons/fa6";
import { FaArrowDown } from "react-icons/fa";
import { GiHeavyRain } from "react-icons/gi";
export const Summary = ({ weatherData, currentHour }) => {
    const [weatherCodeArray, setWeatherCodeArray] = useState([]);
    if (weatherData === null) return (<></>);
    else {
        useEffect(() => {
            let newWeatherCodeArray = [];
            for (let i = 0; i < 7; i++) {
                newWeatherCodeArray.push(WeatherCode(weatherData.daily.weather_code[i]));
            }
            setWeatherCodeArray(newWeatherCodeArray);
        }, [weatherData]);
        
        return (
            <>
                <weather-page-summary>
                    {weatherCodeArray.map((result, index) =>
                        <weather-page-summary-card key={index}>
                                <time dateTime={weatherData.daily.time[index]}>
                                    {weatherData.daily.time[index]}
                                    </time>
                            <weather-page-summary-card-summary>
                                <weather-param-icon title="Weather Icon" aria-label="Weather Icon">
                                    {result.icon}
                                </weather-param-icon>
                                <div title="Weather Description" aria-label="Weather Description">
                                    {result.description}
                                </div>
                            </weather-page-summary-card-summary>
                            <weather-param>
                                <weather-param-icon title="Temperature" aria-label="Temperature" style={{ color: "orangered" }}>
                                    <FaTemperatureHalf />
                                </weather-param-icon>
                                <flex-column-start>
                                    <div title="Max Temperature" aria-label="Max Temperature" style={{ textAlign:"left" }}>
                                        {`Max: ${weatherData.daily.temperature_2m_max[index]}${weatherData.daily_units.temperature_2m_max}`}
                                    </div>
                                    <div title="Min Temperature" aria-label="Min Temperature" style={{ textAlign:"left" }}>
                                        {`Min: ${weatherData.daily.temperature_2m_min[index]}${weatherData.daily_units.temperature_2m_min}`}
                                    </div>
                                </flex-column-start>
                            </weather-param>
                            <weather-param>
                                <weather-param-icon title="Wind" aria-label="Wind">
                                    <div style={{ color: "turquoise" }}>
                                        <FaWind />
                                    </div>
                                    <div style={{ rotate: `${weatherData.daily.wind_direction_10m_dominant[index]}deg` }}>
                                        <FaArrowDown />
                                    </div>
                                </weather-param-icon>
                                <flex-column-start>
                                    <div title="Max Wind Speed" aria-label="Max Wind Speed" style={{ textAlign:"left" }}>
                                        {`Speed: ${weatherData.daily.windspeed_10m_max[index]} ${weatherData.daily_units.windspeed_10m_max}`}
                                    </div>
                                    <div title="Max Wind Gust" aria-label="Max Wind Gust" style={{ textAlign:"left" }}>
                                        {`Gust: ${weatherData.daily.windgusts_10m_max[index]} ${weatherData.daily_units.windgusts_10m_max}`}
                                    </div>
                                    <div title="Wind Direction" aria-label="Wind Direction" style={{ textAlign:"left" }}>
                                        {`Direction: ${weatherData.daily.wind_direction_10m_dominant[index]}${weatherData.daily_units.wind_direction_10m_dominant}`}
                                    </div>
                                </flex-column-start>
                            </weather-param>
                            <weather-param>
                                <weather-param-icon title="Precipitation" aria-label="Precipitation" style={{ color: "deepskyblue" }}>
                                    <GiHeavyRain />
                                </weather-param-icon>
                                <flex-column-start>
                                    <div title="Precipitation Total" aria-label="Precipitation Total" style={{ textAlign:"left" }}>
                                        {`Total: ${weatherData.daily.precipitation_sum[index]}${weatherData.daily_units.precipitation_sum}`}
                                    </div>
                                    <div title="Precipitation Probability" aria-label="Precipitation Probability" style={{ textAlign:"left" }}>
                                        {`Probability: ${weatherData.daily.precipitation_probability_mean[index]}${weatherData.daily_units.precipitation_probability_mean}`}
                                    </div>
                                </flex-column-start>
                            </weather-param>
                            <weather-param >
                                <weather-param-icon title="UV Index" aria-label="UV Index" style={{ color: "violet" }}>
                                    <FaSun />
                                </weather-param-icon>
                                <div title="UV Index" aria-label="UV Index" style={{ textAlign:"left" }}>
                                    {`UV Index: ${weatherData.daily.uv_index_clear_sky_max[index]}`}
                                </div>
                            </weather-param>
                        </weather-page-summary-card>
                    )}
                </weather-page-summary>
            </>
        );
    }
}