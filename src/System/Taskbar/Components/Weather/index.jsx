import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { GeoLocation } from "./Services/GeoLocation.js";
import { OpenMeteo } from "./Services/OpenMeteo.js";

import { WeatherCode } from "./Components/WeatherCode.jsx";

import { WiUmbrella, WiBarometer } from "react-icons/wi";
import { FaArrowDown, FaArrowLeft, FaArrowRight, FaUmbrella } from "react-icons/fa";
import { FaLocationDot, FaTemperatureHalf, FaWind, FaDroplet, FaCloud, FaSun, FaGear } from "react-icons/fa6";
import { GiHeavyRain } from "react-icons/gi";

import { Settings } from "./Pages/Settings.jsx";
import { Location } from "./Pages/Location.jsx";
import { Summary } from "./Pages/Summary.jsx";
import { Temperature } from "./Pages/Temperature.jsx";
import { Precipitation } from "./Pages/Precipitation.jsx";
import { WindMax } from "./Pages/WindMax.jsx";
import { Humidity } from "./Pages/Humidity.jsx";
import { Pressure } from "./Pages/Pressure.jsx";
import { CloudCover } from "./Pages/CloudCover.jsx";
import { UltraViolet } from "./Pages/UltraViolet.jsx";

import { handleUnitConversion } from "./Handlers/handleUnitConversion.js";

import "./styles.css";

export const Weather = ({ contextMenu, setShowWeather }) => {
  const detailsRef = useRef(null);
  const [showDetails, setShowDetails] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState({
    lat: 0,
    long: 0,
    alt: 0,
    location: { name: "", country: "", country_code: "" },
    source: "empty",
    status: "empty",
  });
  const [widgetState, setWidgetState] = useState("none");
  const [currentHour, setCurrentHour] = useState(null);
  const [hourlyData, setHourlyData] = useState(null);
  const [dailyData, setDailyData] = useState(null);
  const [units, setUnits] = useState({
    temperature: "°C",
    precipitation: "mm",
    wind: "km/h",
    pressure: "hPa",
  });
  const [latestDataIndex, setLatestDataIndex] = useState(null);
  const [currentWeatherPage, setCurrentWeatherPage] = useState(0);
  const weatherPages = [
    {
      name: "Location",
      component: <Location
        location={location}
        setLocation={setLocation}
        widgetState={widgetState}
        setWidgetState={setWidgetState}
      />,
      icon: <FaLocationDot />,
      color: "silver",
    },
    {
      name: "Settings",
      component: <Settings units={units} setUnits={setUnits} />,
      icon: <FaGear />,
      color: "silver",
    },
    {
      name: "Daily Summary",
      component: <Summary weatherData={weatherData} currentHour={currentHour} />,
      icon: <FaUmbrella />,
      color: "white",
    },
    {
      name: "Temperature",
      component: <Temperature weatherData={weatherData} currentHour={currentHour} />,
      icon: <FaTemperatureHalf />,
      color: "orangered"
    },
    {
      name: "Humidity",
      component: <Humidity weatherData={weatherData} currentHour={currentHour} />,
      icon: <FaDroplet />,
      color: "cornflowerblue"
    },
    {
      name: "Pressure",
      component: <Pressure weatherData={weatherData} currentHour={currentHour} />,
      icon: <WiBarometer />,
      color: "lightskyblue"
    },
    {
      name: "Precipitation",
      component: <Precipitation weatherData={weatherData} currentHour={currentHour} />,
      icon: <GiHeavyRain />,
      color: "dodgerblue"
    },
    {
      name: "Wind Max",
      component: <WindMax weatherData={weatherData} currentHour={currentHour} />,
      icon: <FaWind />,
      color: "turquoise"
    },
    {
      name: "Cloud Cover",
      component: <CloudCover weatherData={weatherData} currentHour={currentHour} />,
      icon: <FaCloud />,
      color: "silver"
    },
    {
      name: "Ultra Violet",
      component: <UltraViolet weatherData={weatherData} currentHour={currentHour} />,
      icon: <FaSun />,
      color: "violet"
    },
  ];

  const handleContextMenu = (e) => {
    e.preventDefault();
    let content = {
      "Settings": {
        action: () => {
          setShowDetails(true);
          setCurrentWeatherPage(1);
        }
      },
      "Location": {
        action: () => {
          setShowDetails(true);
          setCurrentWeatherPage(0);
        }
      },
      "LineBreak": {},
      "Hide": { action: () => { setShowWeather(false) }, checkbox: true },
    };
    contextMenu.setOpen();
    contextMenu.setPosition(e.clientX, e.clientY);
    contextMenu.setContent(content);

  }
  const changeWeatherPage = (delta) => {
    if (weatherData !== null) {
      if (currentWeatherPage + delta < 2) {
        setCurrentWeatherPage(Object.keys(weatherPages).length - 1);
      } else if (currentWeatherPage + delta >= Object.keys(weatherPages).length) {
        setCurrentWeatherPage(2);
      } else {
        setCurrentWeatherPage(currentWeatherPage + delta);
      }
    }
  };
  useEffect(() => {
    if (showDetails) {
      detailsRef.current.focus();
    }
  }, [showDetails]);
  useEffect(() => {
    if (location.source === "GPS") {
      GeoLocation(location, setLocation);
    }
  }, [widgetState]);
  //Get Weather Data from OpenWeather API
  useEffect(() => {
    if (location.status === "Success") {
      setWidgetState("Comunicating");
      OpenMeteo(location, setWeatherData);
    }
  }, [location]);
  //Get current hour
  useEffect(() => {
    let date = new Date();
    let remainingMinutes = 60 - date.getMinutes();
    setCurrentHour(date.getHours());
    setTimeout(() => {
      setCurrentHour(date.getHours());
    }, { milliseconds: remainingMinutes * 60 * 1000 })
  }, [weatherData, currentHour]);
  //Process Weather Data
  useEffect(() => {
    if (weatherData !== null) {
      setWidgetState("Sorting Data");

      //Convert snowfall from cm to mm 
      let newWeatherData = weatherData;
      for (let i = 0; i < weatherData.hourly.time.length; i++) {
        newWeatherData.hourly.snowfall[i] *= 10;
      }
      newWeatherData.hourly_units.snowfall = units.precipitation;
      for (let i = 0; i < weatherData.daily.time.length; i++) {
        newWeatherData.daily.snowfall_sum[i] *= 10;
      }
      newWeatherData.daily_units.snowfall_sum = units.precipitation;
      setWeatherData(newWeatherData);
      setLatestDataIndex(
        weatherData.hourly.time.findIndex(
          (hour) => parseInt(hour.substring(11, 13)) === currentHour,
        ),
      );
      setHourlyData(weatherData["hourly"]);
      setDailyData(weatherData["daily"]);
    }
  }, [currentHour, weatherData]);
  //Convert Units
  useEffect(() => {
    if (weatherData !== null) {
      handleUnitConversion(weatherData, setWeatherData, units);
    }
  }, [weatherData, units]);
  //Display/Update Weather Data
  useEffect(() => {
    if (dailyData !== null && hourlyData !== null, latestDataIndex !== null) {
      setWidgetState("Done");
    }
  }, [dailyData, hourlyData, latestDataIndex]);

  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setShowDetails(false);
    }
  };

  return (
    <>
      <button
        id="WeatherButton"
        onClick={() => setShowDetails(!showDetails)}
        onContextMenu={(e) => handleContextMenu(e)}
        style={{ display: "flex", flexDirection: "row" }}
      >
        {weatherData === null ? <WiUmbrella /> : <>
          {WeatherCode(weatherData.hourly.weathercode[currentHour]).icon}
          {weatherData.hourly.temperature_2m[currentHour]}
          {weatherData.hourly_units.temperature_2m}
        </>
        }
      </button>
      {showDetails && createPortal(
        <taskbar-window
          ref={detailsRef}
          onBlur={(e) => handleBlur(e)}
          tabIndex="0">
          <taskbar-window-header>
            <weather-header-now>
              {weatherData === null ?
                <weather-header-unknown>
                  <WiUmbrella />
                  {" Weather"}
                </weather-header-unknown> :
                <>
                  <flex-column-start>
                    <weather-header-summary>
                      <div style={{ fontSize: "45px", height: "45px" }}>
                        {WeatherCode(weatherData.hourly.weathercode[currentHour]).icon}
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "bold", width: "100%" }}>
                        {WeatherCode(weatherData.hourly.weathercode[currentHour]).description}
                      </div>
                    </weather-header-summary>
                    <weather-param >
                      <weather-param-icon title="Cloud Cover" aria-label="Cloud Cover" style={{ color: "silver" }}>
                        <FaCloud />
                      </weather-param-icon>
                      <div title="Cloud Cover" aria-label="Cloud Cover" style={{ textAlign: "left" }}>
                        {`Cloud Cover: ${weatherData.hourly.cloudcover[currentHour]}${weatherData.hourly_units.cloudcover}`}
                      </div>
                    </weather-param>
                    <weather-param >
                      <weather-param-icon title="UV Index" aria-label="UV Index" style={{ color: "violet" }}>
                        <FaSun />
                      </weather-param-icon>
                      <div title="UV Index" aria-label="UV Index" style={{ textAlign: "left" }}>
                        {`UV Index: ${weatherData.hourly.uv_index[currentHour]}${weatherData.hourly_units.uv_index}`}
                      </div>
                    </weather-param>
                  </flex-column-start>
                  <flex-column-start>
                    <weather-param>
                      <weather-param-icon title="Temperature" aria-label="Temperature" style={{ color: "orangered" }}>
                        <FaTemperatureHalf />
                      </weather-param-icon>
                      <flex-column-start>
                        <div title="Real Temperature" aria-label="Real Temperature" style={{ textAlign: "left" }}>
                          {`Real: ${weatherData.hourly.temperature_2m[currentHour]}${weatherData.hourly_units.temperature_2m}`}
                        </div>
                        <div title="Feel Temperature" aria-label="Feel Temperature" style={{ textAlign: "left" }}>
                          {`Feel: ${weatherData.hourly.apparent_temperature[currentHour]}${weatherData.hourly_units.apparent_temperature}`}
                        </div>
                      </flex-column-start>
                    </weather-param>
                    <weather-param >
                      <weather-param-icon title="Relatice Humidity" aria-label="Relatice Humidity" style={{ color: "cornflowerblue" }}>
                        <FaDroplet />
                      </weather-param-icon>
                      <div title="Relatice Humidity" aria-label="Relatice Humidity" style={{ textAlign: "left" }}>
                        {`Humidity: ${weatherData.hourly.relativehumidity_2m[currentHour]}${weatherData.hourly_units.relativehumidity_2m}`}
                      </div>
                    </weather-param>
                    <weather-param >
                      <weather-param-icon title="Wind" aria-label="Wind" style={{ color: "turquoise" }}>
                        <FaWind />
                      </weather-param-icon>
                      <flex-column-start>
                        <div title="Wind Speed" aria-label="Wind Speed" style={{ textAlign: "left" }}>
                          {`Speed: ${weatherData.hourly.windspeed_10m[currentHour]} ${weatherData.hourly_units.windspeed_10m}`}
                        </div>
                        <div title="Wind Gust" aria-label=" Wind Gust" style={{ textAlign: "left" }}>
                          {`Gust: ${weatherData.hourly.wind_gusts_10m[currentHour]} ${weatherData.hourly_units.wind_gusts_10m}`}
                        </div>
                      </flex-column-start>
                    </weather-param>
                    <weather-param >
                      <weather-param-icon title="Wind Direction Arrow" aria-label="Wind Direction Arrow" style={{ color: "silver", rotate: `${weatherData.hourly.winddirection_10m[currentHour]}deg` }}>
                        <FaArrowDown />
                      </weather-param-icon>
                      <div title="Wind Direction" aria-label="Wind Direction" style={{ textAlign: "left" }}>
                        {`Direction: ${weatherData.hourly.winddirection_10m[currentHour]}${weatherData.hourly_units.winddirection_10m}`}
                      </div>
                    </weather-param>
                  </flex-column-start>
                </>
              }
            </weather-header-now>
          </taskbar-window-header>
          <taskbar-window-nav>
            <button onClick={() => { currentWeatherPage === 1 ? setCurrentWeatherPage(2) : setCurrentWeatherPage(1) }} className={currentWeatherPage === 1 ? "buttonActive" : ""}>
              <FaGear />
            </button>
            <button onClick={() => { currentWeatherPage === 0 ? setCurrentWeatherPage(2) : setCurrentWeatherPage(0) }} className={currentWeatherPage === 0 ? "buttonActive" : ""}>
              <FaLocationDot />
            </button>
            <button onClick={() => changeWeatherPage(-1)} disabled={weatherData === null || currentWeatherPage < 2}>
              <FaArrowLeft />
            </button>
            <button onClick={() => changeWeatherPage(1)} disabled={weatherData === null || currentWeatherPage < 2}>
              <FaArrowRight />
            </button>
            <div style={{ paddingRight: "5px", color: weatherPages[currentWeatherPage].color }}>
              {weatherPages[currentWeatherPage].icon}
            </div>
            <div>
              {` ${weatherPages[currentWeatherPage].name}`}
            </div>
          </taskbar-window-nav>
          <taskbar-window-body>
            <weather-page>
              {weatherPages[currentWeatherPage].component}
            </weather-page>
          </taskbar-window-body>
          <taskbar-window-footer>
            <a href="https://open-meteo.com/" target="_blank">
              Data by Open-Meteo ©
            </a>
          </taskbar-window-footer>
        </taskbar-window>
        , document.getElementById("root"))}
    </>
  )
}