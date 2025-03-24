import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../../../System/ThemeManager/context.jsx";

import ColorPicker from "../../../../System/GlobalComponents/ColorPicker/ColorPicker.jsx";

import { WiCloudy } from "react-icons/wi";

export const TrayPreview = () => {
    return (
        <>
            <div
                style={{
                    position: "absolute",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    bottom: "0",
                    left: "0",
                    width: "100%",
                    height: "var(--TaskbarHeight)",
                    background: "var(--TaskbarBkgr)",
                    zIndex: 1,
                }}
            >
                <live-apps></live-apps>
                <taskbar-weather>
                    <button>
                        <WiCloudy /> 20°C
                    </button>
                </taskbar-weather>
                <vertical-rect />
                <task-bar-clock>
                    <button>
                        11:59
                        <br />
                        31/12/2000
                    </button>
                </task-bar-clock>
            </div>
        </>
    );
};

export const Tray = () => {
    var root = document.querySelector(":root");
    const theme = useContext(ThemeContext);

    const [weatherColor, setWeatherColor] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarWeatherColor"),
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarWeatherColor", weatherColor);
    }, [weatherColor]);
    //----------------------------------------------------------------------------//
    const [weatherBkgr, setWeatherBkgr] = useState(
        getComputedStyle(root).getPropertyValue("--WeatherBkgr"),
    );
    useEffect(() => {
        root.style.setProperty("--WeatherBkgr", weatherBkgr);
    }, [weatherBkgr]);
    //----------------------------------------------------------------------------//
    const [weatherFontColor, setWeatherFontColor] = useState(
        getComputedStyle(root).getPropertyValue("--WeatherFontColor"),
    );
    useEffect(() => {
        root.style.setProperty("--WeatherFontColor", weatherFontColor);
    }, [weatherFontColor]);
    //----------------------------------------------------------------------------//
    const [clockColor, setClockColor] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarClockColor"),
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarClockColor", clockColor);
    }, [clockColor]);
    //----------------------------------------------------------------------------//
    const [clockBkgr, setClockBkgr] = useState(
        getComputedStyle(root).getPropertyValue("--ClockBkgr"),
    );
    useEffect(() => {
        root.style.setProperty("--ClockBkgr", clockBkgr);
    }, [clockBkgr]);
    //----------------------------------------------------------------------------//
    const [clockFontColor, setClockFontColor] = useState(
        getComputedStyle(root).getPropertyValue("--ClockFontColor"),
    );
    useEffect(() => {
        root.style.setProperty("--ClockFontColor", clockFontColor);
    }, [clockFontColor]);

    return (
        <>
            <fieldset>
                <legend>Weather</legend>
                <div>
                    <label>Tray Color:</label>
                    <ColorPicker
                        color={weatherColor}
                        setColor={setWeatherColor}
                        useAlpha={false}
                    />
                </div>
                <div>
                    <label>Window Background:</label>
                    <ColorPicker
                        color={weatherBkgr}
                        setColor={setWeatherBkgr}
                        useAlpha={true}
                    />
                </div>
                <div>
                    <label>Window Font Color:</label>
                    <ColorPicker
                        color={weatherFontColor}
                        setColor={setWeatherFontColor}
                        useAlpha={false}
                    />
                </div>
            </fieldset>
            <fieldset>
                <legend>Clock</legend>
                <div>
                    <label>Tray Color:</label>
                    <ColorPicker
                        color={clockColor}
                        setColor={setClockColor}
                        useAlpha={false}
                    />
                </div>
                <div>
                    <label>Window Background:</label>
                    <ColorPicker
                        color={clockBkgr}
                        setColor={setClockBkgr}
                        useAlpha={true}
                    />
                </div>
                <div>
                    <label>Window Font Color:</label>
                    <ColorPicker
                        color={clockFontColor}
                        setColor={setClockFontColor}
                        useAlpha={false}
                    />
                </div>
            </fieldset>
        </>
    )
}