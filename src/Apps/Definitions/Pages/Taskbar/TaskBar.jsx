import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../../../System/ThemeManager/context.jsx";

import ColorPicker from "../../../../System/GlobalComponents/ColorPicker/ColorPicker.jsx";

import { FcGlobe } from "react-icons/fc";

export const TaskBarPreview = () => {
    const themeContext = useContext(ThemeContext);
    const startButtonClass = () => {
      let ans = "";
      switch (themeContext.startButtonTheme) {
        case "Classic":
          ans= "startButtonClassic";
          break;
        case "Aero":
          ans= "startButtonAero";
          break;
        case "Aqua":
          ans= "startButtonAqua";
          break;
        case "Default":
        default:
          ans= "startButtonFluent";
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
                fill: startButtonClass() === "startButtonAqua" ? "url(#startButtonAquaRed)" : ""
            }}
            d="M41.0481 108.077L105 71.1547L168.952 108.077V181.923L105 218.845L41.0481 181.923V108.077Z"
            stroke="#808080"
            strokeWidth="8"
          />
          <path
            className="hex hex2"
            style={{ 
                fill: startButtonClass() === "startButtonAqua" ? "url(#startButtonAquaGreen)" : ""
            }}
            d="M231.048 108.077L295 71.1547L358.952 108.077V181.923L295 218.845L231.048 181.923V108.077Z"
            stroke="#808080"
            strokeWidth="8"
          />
          <path
            className="hex hex3"
            style={{ 
                fill: startButtonClass() === "startButtonAqua" ? "url(#startButtonAquaBlue)" : ""
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
        </start-button>
        <live-apps>
          <button>
            <FcGlobe />
          </button>
        </live-apps>
      </div>
    </>
  );
};

export const TaskBar = () => {

    var root = document.querySelector(":root");
    const theme = useContext(ThemeContext);

    const [taskbarHeight, setTaskbarHeight] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarHeight").slice(0, -2),
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarHeight", taskbarHeight + "px");
    }, [taskbarHeight]);
    //----------------------------------------------------------------------------//
    const [taskbarIconSize, setTaskbarIconSize] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarIconSize").slice(0, -2),
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarIconSize", taskbarIconSize + "px");
    }, [taskbarIconSize]);
    //----------------------------------------------------------------------------//
    const [taskbarBkgr, setTaskbarBkgr] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarBkgr"),
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarBkgr", taskbarBkgr);
    }, [taskbarBkgr]);
    //----------------------------------------------------------------------------//
    const [taskbarFontSize, setTaskbarFontSize] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarFontSize").slice(0, -2),
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarFontSize", taskbarFontSize + "px");
    }, [taskbarFontSize]);
    //----------------------------------------------------------------------------//
    /*const [taskbarFontColor, setTaskbarFontColor] = useState(
        getComputedStyle(root).getPropertyValue("--TaskbarFontColor"),
    );
    useEffect(() => {
        root.style.setProperty("--TaskbarFontColor", taskbarFontColor);
    }, [taskbarFontColor]);*/
    //----------------------------------------------------------------------------//

    return (
        <>
            <fieldset>
                <legend>Dimentions:</legend>
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
            </fieldset>
            <fieldset>
                <legend>Background:</legend>
                <div>
                    <label>Color:</label>
                    <ColorPicker
                        color={taskbarBkgr}
                        setColor={setTaskbarBkgr}
                        useAlpha={true}
                    />
                </div>
                <div>
                    <label>Background FX:</label>
                    <select
                        value={theme.taskbarBackgroundFX}
                        onChange={(e) => theme.setTaskbarBackgroundFX(e.target.value)}
                    >{
                            theme.backgroundFXList.map((fx) => (
                                <option key={fx} value={fx}>{fx}</option>
                            ))}
                    </select>
                </div>
            </fieldset>
        </>
    )
}