import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../../../System/ThemeManager/context.jsx";

import ColorPicker from "../../../../System/GlobalComponents/ColorPicker/ColorPicker.jsx";

import { FaGear } from "react-icons/fa6";
import { MdOutlineRestartAlt } from "react-icons/md";
import { RiShutDownLine } from "react-icons/ri";
import { FcGlobe, FcInfo, FcSettings } from "react-icons/fc";

export const StartPreview = () => {
    const themeContext = useContext(ThemeContext);
    const startButtonClass = () => {
      let ans = "";
      switch (themeContext.startButtonTheme) {
        case "Classic":
          ans= "startButtonClassic startButtonClassicActive";
          break;
        case "Aero":
          ans= "startButtonAero startButtonAeroActive";
          break;
        case "Aqua":
          ans= "startButtonAqua startButtonAquaActive";
          break;
        case "Default":
        default:
          ans= "startButtonFluent startButtonFluentActive";
          break;
      }
      return ans;
    }
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
          <button className={startButtonClass()}>
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="startButtonAquaRed" gradientTransform="rotate(90)">
              <stop offset="20%" stop-color="#FF9999" />
              <stop offset="50%" stop-color="#FF0000" />
              <stop offset="80%" stop-color="#9F0000" />
            </linearGradient>
            <linearGradient id="startButtonAquaGreen" gradientTransform="rotate(90)">
              <stop offset="20%" stop-color="#99FF99" />
              <stop offset="50%" stop-color="#00FF00" />
              <stop offset="80%" stop-color="#009F00" />
            </linearGradient>
            <linearGradient id="startButtonAquaBlue" gradientTransform="rotate(90)">
              <stop offset="20%" stop-color="#9999FF" />
              <stop offset="50%" stop-color="#0000FF" />
              <stop offset="80%" stop-color="#00009F" />
            </linearGradient>
          </defs>
          <path
            className="hex hex1"
            style={{
              mixBlendMode: "screen",
              fill: startButtonClass() === "startButtonAqua startButtonAquaActive" ? "url(#startButtonAquaRed)" : "#FF0000",
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
              fill:  startButtonClass() === "startButtonAqua startButtonAquaActive" ? "url(#startButtonAquaGreen)" : "#00FF00",
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
              fill:  startButtonClass() === "startButtonAqua startButtonAquaActive" ? "url(#startButtonAquaBlue)" : "#0000FF",
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
        <live-apps></live-apps>
      </div>
    </>
  );
};

export const Start = () => {

    var root = document.querySelector(":root");
    const theme = useContext(ThemeContext);

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
    }, [startMenuBkgr]);
    //----------------------------------------------------------------------------//
    const [startMenuFontColor, setStartMenuFontColor] = useState(
        getComputedStyle(root).getPropertyValue("--StartMenuFontColor"),
    );
    useEffect(() => {
        root.style.setProperty("--StartMenuFontColor", startMenuFontColor);
    }, [startMenuFontColor]);
    //----------------------------------------------------------------------------//

    return (
        <>
            <fieldset>
                <legend>Start Button</legend>
                <div>
                    <label>Button Theme:</label>
                    <select
                        value={theme.startButtonTheme}
                        onChange={(e) => {theme.setStartButtonTheme(e.target.value)}}
                    >
                        {theme.startButtonThemeList.map((theme) => {
                            return (
                                <option key={theme} value={theme}>
                                    {theme}
                                </option>
                            );
                        })}
                    </select>
                </div>
                <div>
                    <label>Color:</label>
                    <ColorPicker
                        color={startIconColor}
                        setColor={setStartIconColor}
                        useAlpha={false}
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
        </>
    )
}