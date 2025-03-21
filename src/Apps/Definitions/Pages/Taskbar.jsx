import { useState, useEffect } from "react";

import ColorPicker from "../../../System/GlobalComponents/ColorPicker/ColorPicker.jsx";

import { FaGear } from "react-icons/fa6";
import { MdOutlineRestartAlt } from "react-icons/md";
import { RiShutDownLine } from "react-icons/ri";
import { FcGlobe, FcInfo, FcSettings } from "react-icons/fc";
import { WiCloudy } from "react-icons/wi";

export const TaskbarPreview = () => {
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
        <start-button
        >
          <button>
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            className="hex hex1"
            style={{
              mixBlendMode: "screen",
              fill: "#FF0000",
              transform: "translate(45%, 23%) scale(1.5)",
            }}
            d="M41.0481 108.077L105 71.1547L168.952 108.077V181.923L105 218.845L41.0481 181.923V108.077Z"
            stroke="#808080"
            strokeWidth="8"
          />
          <path
            className="hex hex2"
            style={{
              mixBlendMode: "screen",
              fill: "#00FF00",
              transform: "translate(-45%, 23%) scale(1.5)",
            }}
            d="M231.048 108.077L295 71.1547L358.952 108.077V181.923L295 218.845L231.048 181.923V108.077Z"
            stroke="#808080"
            strokeWidth="8"
          />
          <path
            className="hex hex3"
            style={{
              mixBlendMode: "screen",
              fill: "#0000FF",
              transform: "translate(0, -45%) scale(1.5)"
            }}
            d="M136.048 273.077L200 236.155L263.952 273.077V346.923L200 383.845L136.048 346.923V273.077Z"
            stroke="#808080"
            strokeWidth="8"
          />
          <path className="axis" d="M200 200L200 60" stroke="#808080" strokeWidth="8" />
          <path className="axis" d="M200 200L78.7564 270" stroke="#808080" strokeWidth="8" />
          <path className="axis" d="M200 200L321.244 270" stroke="#808080" strokeWidth="8" />
        </svg>
          </button>
          <start-list class={"expandHeight expandWidth"} style={{ left: 0, transition: "0s" }}>
            <ul>
              <li>
                <button>
                  <FcGlobe />
                  {" "}Program 1
                </button>
              </li>
              <li>
                <button>
                  <FcInfo />
                  {" "}Program 2
                </button>
              </li>
              <li>
                <button>
                  <FcSettings />
                  {" "}Program 3
                </button>
              </li>
            </ul>
            <div style={{ transition: "0s" }}>
              <button>
                <FaGear />
                Settings
              </button>
              <button>
                <MdOutlineRestartAlt />
                Refresh
              </button>
              <button className="buttonActiveRed">
                <RiShutDownLine />
                Close
              </button>
            </div>
          </start-list>
        </start-button>
        <live-apps>
          <button>
            <FcGlobe />
          </button>
        </live-apps>
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
export const Taskbar = () => {
  var root = document.querySelector(":root");

  const [taskbarHeight, setTaskbarHeight] = useState(
    getComputedStyle(root).getPropertyValue("--TaskbarHeight").slice(0, -2),
  );
  useEffect(() => {
    root.style.setProperty("--TaskbarHeight", taskbarHeight + "px");
  }, [taskbarHeight]);
    //----------------------------------------------------------------------------//
  const [taskbarBkgr, setTaskbarBkgr] = useState(
    getComputedStyle(root).getPropertyValue("--TaskbarBkgr"),
  );
  useEffect(() => {
    root.style.setProperty("--TaskbarBkgr", taskbarBkgr);
  }, [taskbarBkgr]);
  //----------------------------------------------------------------------------//
  const [taskbarIconSize, setTaskbarIconSize] = useState(
    getComputedStyle(root).getPropertyValue("--TaskbarIconSize").slice(0, -2),
  );
  useEffect(() => {
    root.style.setProperty("--TaskbarIconSize", taskbarIconSize + "px");
  }, [taskbarIconSize]);
  //----------------------------------------------------------------------------//
  const [taskbarFontSize, setTaskbarFontSize] = useState(
    getComputedStyle(root).getPropertyValue("--TaskbarFontSize").slice(0, -2),
  );
  useEffect(() => {
    root.style.setProperty("--TaskbarFontSize", taskbarFontSize + "px");
  }, [taskbarFontSize]);
  //----------------------------------------------------------------------------//
  const [taskbarFontColor, setTaskbarFontColor] = useState(
    getComputedStyle(root).getPropertyValue("--TaskbarFontColor"),
  );
  useEffect(() => {
    root.style.setProperty("--TaskbarFontColor", taskbarFontColor);
  }, [taskbarFontColor]);
  //----------------------------------------------------------------------------//
  const [startIconColor, setStartIconColor] = useState(
    getComputedStyle(root).getPropertyValue("--StartIconColor"),
  );
  useEffect(() => {
    root.style.setProperty("--StartIconColor", startIconColor);
  }, [startIconColor]);
  //----------------------------------------------------------------------------//
  const [startMenuBkgr, setStartMenuBkgr] = useState(
    getComputedStyle(root).getPropertyValue("--StartMenuBkgr"),
  );
  useEffect(() => {
    root.style.setProperty("--StartMenuBkgr", startMenuBkgr);
  },[startMenuBkgr]);
  //----------------------------------------------------------------------------//
  const [startMenuFontColor, setStartMenuFontColor] = useState(
    getComputedStyle(root).getPropertyValue("--StartMenuFontColor"),
  );
  useEffect(() => {
    root.style.setProperty("--StartMenuFontColor", startMenuFontColor);
  },[startMenuFontColor]);
  //----------------------------------------------------------------------------//
  const [weatherColor, setWeatherColor] = useState(
    getComputedStyle(root).getPropertyValue("--TaskbarWeatherColor"),
  );
  useEffect(() => {
    root.style.setProperty("--TaskbarWeatherColor", weatherColor);
  },[weatherColor]);
  //----------------------------------------------------------------------------//
  const [weatherBkgr, setWeatherBkgr] = useState(
    getComputedStyle(root).getPropertyValue("--WeatherBkgr"),
  );
  useEffect(() => {
    root.style.setProperty("--WeatherBkgr", weatherBkgr);
  },[weatherBkgr]);
  //----------------------------------------------------------------------------//
  const [weatherFontColor, setWeatherFontColor] = useState(
    getComputedStyle(root).getPropertyValue("--WeatherFontColor"),
  );
  useEffect(() => {
    root.style.setProperty("--WeatherFontColor", weatherFontColor);
  },[weatherFontColor]);
  //----------------------------------------------------------------------------//
  const [clockColor, setClockColor] = useState(
    getComputedStyle(root).getPropertyValue("--TaskbarClockColor"),
  );
  useEffect(() => {
    root.style.setProperty("--TaskbarClockColor", clockColor);
  },[clockColor]);
  //----------------------------------------------------------------------------//
  const [clockBkgr, setClockBkgr] = useState(
    getComputedStyle(root).getPropertyValue("--ClockBkgr"),
  );
  useEffect(() => {
    root.style.setProperty("--ClockBkgr", clockBkgr);
  },[clockBkgr]);
  //----------------------------------------------------------------------------//
  const [clockFontColor, setClockFontColor] = useState(
    getComputedStyle(root).getPropertyValue("--ClockFontColor"),
  );
  useEffect(() => {
    root.style.setProperty("--ClockFontColor", clockFontColor);
  },[clockFontColor]);

  return (
    <>
      <fieldset>
        <legend>Taskbar</legend>
        <div>
          <label>Height:</label>
          <input
            type="range"
            min={20}
            max={60}
            step="1"
            value={taskbarHeight}
            onChange={(e) => setTaskbarHeight(e.target.value)}
          />
        </div>
        <div>
          <label>Icon Size:</label>
          <input
            type="range"
            min={10}
            max={60}
            step="1"
            value={taskbarIconSize}
            onChange={(e) => setTaskbarIconSize(e.target.value)}
          />
        </div>
        <div>
          <label>Font Size:</label>
          <input
            type="range"
            min={10}
            max={26}
            step="1"
            value={taskbarFontSize}
            onChange={(e) => setTaskbarFontSize(e.target.value)}
          />
        </div>
        <div>
          <label>Background:</label>
          <ColorPicker
            color={taskbarBkgr}
            setColor={setTaskbarBkgr}
            useAlpha={true}
          />
        </div>
      </fieldset>
      <fieldset>
        <legend>Start Menu</legend>
        <div>
          <label>Font Color:</label>
          <ColorPicker
            color={startMenuFontColor}
            setColor={setStartMenuFontColor}
            useAlpha={false}
          />
        </div>
        <div>
          <label>Background:</label>
          <ColorPicker
            color={startMenuBkgr}
            setColor={setStartMenuBkgr}
            useAlpha={true}
          />
        </div>
      </fieldset>
      <fieldset>
        <legend>Extras</legend>
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
      </fieldset>
    </>
  );
};
