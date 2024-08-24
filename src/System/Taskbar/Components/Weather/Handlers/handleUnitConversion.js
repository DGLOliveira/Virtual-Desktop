import {unitConverter} from "./UnitConverter.js";

export const handleUnitConversion = (weatherData, setWeatherData, units) => {

    let newWeatherData = weatherData;
    let new_hourly_surface_pressure = [];
    if (units.temperature !== weatherData.hourly_units.temperature_2m) {
    let new_daily_temperature_2m_max = [];
    let new_daily_temperature_2m_min = [];
    let new_daily_apparent_temperature_max = [];
    let new_daily_apparent_temperature_min = [];
    let new_hourly_temperature_2m = [];
    let new_hourly_apparent_temperature = [];
      for (let i = 0; i < weatherData.hourly.time.length; i++) {
        new_hourly_temperature_2m.push(unitConverter("Temperature", weatherData.hourly_units.temperature_2m, units.temperature, weatherData.hourly.temperature_2m[i]));
        new_hourly_apparent_temperature.push(unitConverter("Temperature", weatherData.hourly_units.apparent_temperature, units.temperature, weatherData.hourly.apparent_temperature[i]));
      }
      newWeatherData.hourly.temperature_2m = new_hourly_temperature_2m;
      newWeatherData.hourly.apparent_temperature = new_hourly_apparent_temperature;
      newWeatherData.hourly_units.temperature_2m = units.temperature;
      newWeatherData.hourly_units.apparent_temperature = units.temperature;
      for (let i = 0; i < weatherData.daily.time.length; i++) {
        new_daily_temperature_2m_max.push(unitConverter("Temperature", weatherData.daily_units.temperature_2m_max, units.temperature, weatherData.daily.temperature_2m_max[i]));
        new_daily_temperature_2m_min.push(unitConverter("Temperature", weatherData.daily_units.temperature_2m_min, units.temperature, weatherData.daily.temperature_2m_min[i]));
        new_daily_apparent_temperature_max.push(unitConverter("Temperature", weatherData.daily_units.apparent_temperature_max, units.temperature, weatherData.daily.apparent_temperature_max[i]));
        new_daily_apparent_temperature_min.push(unitConverter("Temperature", weatherData.daily_units.apparent_temperature_min, units.temperature, weatherData.daily.apparent_temperature_min[i]));
      }
      newWeatherData.daily.temperature_2m_max = new_daily_temperature_2m_max;
      newWeatherData.daily.temperature_2m_min = new_daily_temperature_2m_min;
      newWeatherData.daily.apparent_temperature_max = new_daily_apparent_temperature_max;
      newWeatherData.daily.apparent_temperature_min = new_daily_apparent_temperature_min;
      newWeatherData.daily_units.temperature_2m_max = units.temperature;
      newWeatherData.daily_units.temperature_2m_min = units.temperature;
      newWeatherData.daily_units.apparent_temperature_max = units.temperature;
      newWeatherData.daily_units.apparent_temperature_min = units.temperature;
    }
    if (units.precipitation !== weatherData.hourly_units.precipitation) {
    let new_daily_precipitation_sum = [];
    let new_daily_rain_sum = [];
    let new_daily_showers_sum = [];
    let new_daily_snowfall_sum = [];
    let new_hourly_precipitation_sum = [];
    let new_hourly_rain = [];
    let new_hourly_showers = [];
    let new_hourly_snowfall = [];
      for (let i = 0; i < weatherData.hourly.time.length; i++) {
        new_hourly_precipitation_sum.push(unitConverter("Precipitation", weatherData.hourly_units.precipitation, units.precipitation, weatherData.hourly.precipitation[i]));
        new_hourly_rain.push(unitConverter("Precipitation", weatherData.hourly_units.precipitation, units.precipitation, weatherData.hourly.rain[i]));
        new_hourly_showers.push(unitConverter("Precipitation", weatherData.hourly_units.precipitation, units.precipitation, weatherData.hourly.showers[i]));
        new_hourly_snowfall.push(unitConverter("Precipitation", weatherData.hourly_units.precipitation, units.precipitation, weatherData.hourly.snowfall[i]));
      }
      newWeatherData.hourly.precipitation = new_hourly_precipitation_sum;
      newWeatherData.hourly.rain = new_hourly_rain;
      newWeatherData.hourly.showers = new_hourly_showers;
      newWeatherData.hourly.snowfall = new_hourly_snowfall;
      newWeatherData.hourly_units.precipitation = units.precipitation;
      newWeatherData.hourly_units.rain = units.precipitation;
      newWeatherData.hourly_units.showers = units.precipitation;
      newWeatherData.hourly_units.snowfall = units.precipitation;
      for (let i = 0; i < weatherData.daily.time.length; i++) {
        new_daily_precipitation_sum.push(unitConverter("Precipitation", weatherData.daily_units.precipitation_sum, units.precipitation, weatherData.daily.precipitation_sum[i]));
        new_daily_rain_sum.push(unitConverter("Precipitation", weatherData.daily_units.rain_sum, units.precipitation, weatherData.daily.rain_sum[i]));
        new_daily_showers_sum.push(unitConverter("Precipitation", weatherData.daily_units.showers_sum, units.precipitation, weatherData.daily.showers_sum[i]));
        new_daily_snowfall_sum.push(unitConverter("Precipitation", weatherData.daily_units.snowfall_sum, units.precipitation, weatherData.daily.snowfall_sum[i]));
      }
      newWeatherData.daily.precipitation_sum = new_daily_precipitation_sum;
      newWeatherData.daily.rain_sum = new_daily_rain_sum;
      newWeatherData.daily.showers_sum = new_daily_showers_sum;
      newWeatherData.daily.snowfall_sum = new_daily_snowfall_sum;
      newWeatherData.daily_units.precipitation_sum = units.precipitation;
      newWeatherData.daily_units.rain_sum = units.precipitation;
      newWeatherData.daily_units.showers_sum = units.precipitation;
      newWeatherData.daily_units.snowfall_sum = units.precipitation;
    }
    if (units.wind !== weatherData.hourly_units.wind_speed_10m) {
    let new_daily_windspeed_10m_max = [];
    let new_daily_windgusts_10m_max = [];
    let new_hourly_windspeed_10m = [];
    let new_hourly_wind_gusts_10m = [];
      for (let i = 0; i < weatherData.hourly.time.length; i++) {
        new_hourly_windspeed_10m.push(unitConverter("Wind", weatherData.hourly_units.windspeed_10m, units.wind, weatherData.hourly.windspeed_10m[i]));
        new_hourly_wind_gusts_10m.push(unitConverter("Wind", weatherData.hourly_units.wind_gusts_10m, units.wind, weatherData.hourly.wind_gusts_10m[i]));
      }
      newWeatherData.hourly.windspeed_10m = new_hourly_windspeed_10m;
      newWeatherData.hourly.wind_gusts_10m = new_hourly_wind_gusts_10m;
      newWeatherData.hourly_units.windspeed_10m = units.wind;
      newWeatherData.hourly_units.wind_gusts_10m = units.wind;

      for (let i = 0; i < weatherData.daily.time.length; i++) {
        new_daily_windspeed_10m_max.push(unitConverter("Wind", weatherData.daily_units.windspeed_10m_max, units.wind, weatherData.daily.windspeed_10m_max[i]));
        new_daily_windgusts_10m_max.push(unitConverter("Wind", weatherData.daily_units.windgusts_10m_max, units.wind, weatherData.daily.windgusts_10m_max[i]));
      }
      newWeatherData.daily.windspeed_10m_max = new_daily_windspeed_10m_max;
      newWeatherData.daily.windgusts_10m_max = new_daily_windgusts_10m_max;
      newWeatherData.daily_units.windspeed_10m_max = units.wind;
      newWeatherData.daily_units.windgusts_10m_max = units.wind;
    }
    setWeatherData(newWeatherData);
}