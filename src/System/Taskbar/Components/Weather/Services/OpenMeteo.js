import axios from "axios";

export function OpenMeteo(location, setWeatherData) {
  let url = `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.long}&hourly=temperature_2m,apparent_temperature,relativehumidity_2m,windspeed_10m,winddirection_10m,wind_gusts_10m,cloudcover,surface_pressure,rain,showers,snowfall,precipitation,precipitation_probability,visibility,uv_index,weathercode&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,rain_sum,showers_sum,snowfall_sum,precipitation_sum,precipitation_hours,precipitation_probability_mean,windspeed_10m_max,windgusts_10m_max,wind_direction_10m_dominant,uv_index_clear_sky_max,weather_code&timezone=auto`;
  if (location.alt !== null) {
    url = `https://api.open-meteo.com/v1/forecast?elevation=${location.alt}&latitude=${location.lat}&longitude=${location.long}&hourly=temperature_2m,apparent_temperature,relativehumidity_2m,windspeed_10m,winddirection_10m,wind_gusts_10m,cloudcover,surface_pressure,rain,showers,snowfall,precipitation,precipitation_probability,visibility,uv_index,weathercode&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,rain_sum,showers_sum,snowfall_sum,precipitation_sum,precipitation_hours,precipitation_probability_mean,windspeed_10m_max,windgusts_10m_max,wind_direction_10m_dominant,uv_index_clear_sky_max,weather_code&timezone=auto`;
  }

  axios
    .get(url)
    .then((response) => {
      setWeatherData(response.data);
    })
    .catch((error) => {
      setWeatherData(null);
      console.log(error);
    });
}
