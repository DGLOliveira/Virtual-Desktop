/*Interprets WMO weather code and returns equivalent icon, 
text description and possible dangerous weather */
import {
  WiDaySunny,
  WiCloudy,
  WiFog,
  WiSprinkle,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";

export const WeatherCode = (weatherCode) => {
  let icon, description;
  let warning = {
    state: false,
    showers: false,
    rain: false,
    snow: false,
    thunder: false,
    hail: false,
  };
  switch (weatherCode) {
    case 0:
      icon = <WiDaySunny />;
      description = "Clear Sky";
      break;
    case 1:
      icon = <WiDaySunny />;
      description = "Mostly clear";
      break;
    case 2:
      icon = <WiCloudy />;
      description = "Partially cloudy";
      break;
    case 3:
      icon = <WiCloudy />;
      description = "Overcast";
      break;
    case 45:
    case 60:
      icon = <WiFog />;
      description = "Foggy";
      break;
    case 51:
      icon = <WiSprinkle />;
      description = "Light Drizzle";
      break;
    case 53:
      icon = <WiSprinkle />;
      description = "Moderate Drizzle";
      break;
    case 55:
      icon = <WiSprinkle />;
      description = "Dense Drizzle";
      break;
    case 56:
      icon = <WiSprinkle />;
      description = "Light Freezing Drizzle";
      break;
    case 57:
      icon = <WiSprinkle />;
      description = "Dense Freezing Drizzle";
      break;
    case 61:
      icon = <WiRain />;
      description = "Light Rain";
      break;
    case 63:
      icon = <WiRain />;
      description = "Moderate Rain";
      break;
    case 65:
      icon = <WiRain />;
      description = "Heavy Rain";
      warning = { ...warning, state: true, rain: true };
      break;
    case 66:
      icon = <WiRain />;
      description = "Light Freezing Rain";
      break;
    case 67:
      icon = <WiRain />;
      description = "Heavy Freezing Rain";
      warning = { ...warning, state: true, rain: true };
      break;
    case 71:
      icon = <WiSnow />;
      description = "Light Snow";
      break;
    case 73:
      icon = <WiSnow />;
      description = "Moderate Snow";
      break;
    case 75:
      icon = <WiSnow />;
      description = "Heavy Snow";
      warning = { ...warning, state: true, snow: true };
      break;
    case 77:
      icon = <WiSnow />;
      description = "Snow Grains";
      break;
    case 80:
      icon = <WiRain />;
      description = "Light Showers";
      break;
    case 81:
      icon = <WiRain />;
      description = "Moderate Showers";
      break;
    case 82:
      icon = <WiRain />;
      description = "Violent Showers";
      warning = { ...warning, state: true, showers: true };
      break;
    case 85:
      icon = <WiSnow />;
      description = "Light Snow Showers";
      break;
    case 86:
      icon = <WiSnow />;
      description = "Heavy Snow Showers";
      warning = { ...warning, state: true, snow: true, showers: true };
      break;
    case 95:
      icon = <WiThunderstorm />;
      description = "Thunderstorm";
      warning = { ...warning, state: true, thunder: true };
      break;
    case 96:
      icon = <WiThunderstorm />;
      description = "Thunderstorm with light Hail";
      warning = { ...warning, state: true, thunder: true, hail: true };
      break;
    case 99:
      icon = <WiThunderstorm />;
      description = "Thunderstorm with heavy Hail";
      warning = { ...warning, state: true, thunder: true, hail: true };
      break;
    default:
      icon = <WiCloudy />;
      description = "Unknown";
      break;
  }
  return({
    icon,
    description,
    warning,
  });
};
