import { WiBarometer } from "react-icons/wi";
import { FaTemperatureHalf, FaWind } from "react-icons/fa6";
import { GiHeavyRain } from "react-icons/gi";
import { useEffect } from "react";
export const Settings = ({ units, setUnits }) => {

    return (
        <weather-settings>
            <div>
                <div>
                    <div style={{ color: "orangered" }}><FaTemperatureHalf /></div>
                    Temperature:
                </div>
                <select value={units.temperature} onChange={(e) => setUnits({ ...units, temperature: e.target.value })}>
                    <option value="°C">Celsius</option>
                    <option value="°F">Fahrenheit</option>
                    <option value="K">Kelvin</option>
                </select>
            </div>
            <div>
                <div>
                    <div style={{ color: "cornflowerblue" }}><GiHeavyRain /></div>
                    Precipitation:
                </div>
                <select value={units.precipitation} onChange={(e) => setUnits({ ...units, precipitation: e.target.value })}>
                    <option value="mm">mm</option>
                    <option value="in">inch</option>
                </select>
            </div>
            <div>
                <div>
                    <div style={{ color: "turquoise" }}><FaWind /></div>
                    Wind Speed:
                </div>
                <select value={units.wind} onChange={(e) => setUnits({ ...units, wind: e.target.value })}>
                    <option value="km/h">km/h</option>
                    <option value="mph">mph</option>
                    <option value="m/s">m/s</option>
                    <option value="ft/s">ft/s</option>
                    <option value="knots">knots</option>
                </select>
            </div>
            <div>
                <div>
                    <div style={{ color: "silver" }}><WiBarometer /></div>
                    Pressure:
                </div>
                <select value={units.pressure} onChange={(e) => setUnits({ ...units, pressure: e.target.value })}>
                    <option value="hpa">hectoPascal</option>
                    <option value="psi">PSI</option>
                    <option value="inHg">inHg</option>
                    <option value="mmHg">mmHg</option>
                    <option value="atm">Atmosphere</option>
                </select>
            </div>
        </weather-settings>);
}