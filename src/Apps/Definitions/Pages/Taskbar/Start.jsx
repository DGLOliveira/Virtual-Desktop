import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../../../System/ThemeManager/context.jsx";

import ColorPicker from "../../../../System/GlobalComponents/ColorPicker/ColorPicker.jsx";

import { FaGear } from "react-icons/fa6";
import { MdOutlineRestartAlt } from "react-icons/md";
import { RiShutDownLine } from "react-icons/ri";
import { FcGlobe, FcInfo, FcSettings } from "react-icons/fc";

export const StartPreview = () => {
  const [open, setOpen] = useState(false);
  const themeContext = useContext(ThemeContext);
  const startButtonClass = (open) => {
    let ans = "";
    switch (themeContext.startButtonTheme) {
      case "Classic":
        ans = "startButtonClassic";
        break;
      case "Aero":
        ans = "startButtonAero";
        break;
      case "Aqua":
        ans = "startButtonAqua";
        break;
      case "Default":
      default:
        ans = "startButtonFluent";
        break;
    }
    if (open) { ans += " " + ans + "Active" };
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
          backgroundColor: "var(--TaskbarBkgr)",
          backgroundImage: "var(--TaskbarBkgrImage)",
          backgroundPosition: "var(--TaskbarBkgrPosition)",
          backgroundSize: "var(--TaskbarBkgrSize)",
          backgroundRepeat: "var(--TaskbarBkgrRepeat)",
          backdropFilter: "var(--TaskbarBackdropFilter)",
          zIndex: 1,
        }}
      >
        <start-button
        >
          <button className={startButtonClass(open)} onClick={() => setOpen(!open)}>
            <svg style={{isolation: "isolate"}} width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="startButtonAquaRed" gradientTransform="rotate(90)">
                  <stop offset="20%" stopColor="#FF9999" />
                  <stop offset="50%" stopColor="#FF0000" />
                  <stop offset="80%" stopColor="#9F0000" />
                </linearGradient>
                <linearGradient id="startButtonAquaGreen" gradientTransform="rotate(90)">
                  <stop offset="20%" stopColor="#99FF99" />
                  <stop offset="50%" stopColor="#00FF00" />
                  <stop offset="80%" stopColor="#009F00" />
                </linearGradient>
                <linearGradient id="startButtonAquaBlue" gradientTransform="rotate(90)">
                  <stop offset="20%" stopColor="#9999FF" />
                  <stop offset="50%" stopColor="#0000FF" />
                  <stop offset="80%" stopColor="#00009F" />
                </linearGradient>
              </defs>
              <path
                className="hex hex1"
                style={{
                  mixBlendMode: "screen",
                  fill: startButtonClass(false) === "startButtonAqua" ? "url(#startButtonAquaRed)" : open ? "#FF0000" : "",
                  transform: open ? "translate(45%, 23%) scale(1.5)" : "",
                  transition: "fill 0.5s ease-in-out, transform 0.5s ease-in-out"
                }}
                d="M41.0481 108.077L105 71.1547L168.952 108.077V181.923L105 218.845L41.0481 181.923V108.077Z"
                stroke="#808080"
                strokeWidth="8"
              />
              <path
                className="hex hex2"
                style={{
                  mixBlendMode: "screen",
                  fill: startButtonClass(false) === "startButtonAqua" ? "url(#startButtonAquaGreen)" : open ? "#00FF00" : "",
                  transform: open ? "translate(-45%, 23%) scale(1.5)" : "",
                  transition: "fill 0.5s ease-in-out, transform 0.5s ease-in-out"
                }}
                d="M231.048 108.077L295 71.1547L358.952 108.077V181.923L295 218.845L231.048 181.923V108.077Z"
                stroke="#808080"
                strokeWidth="8"
              />
              <path
                className="hex hex3"
                style={{
                  mixBlendMode: "screen",
                  fill: startButtonClass(false) === "startButtonAqua" ? "url(#startButtonAquaBlue)" : open ? "#0000FF" : "",
                  transform: open ? "translate(0, -45%) scale(1.5)" : "",
                  transition: "fill 0.5s ease-in-out, transform 0.5s ease-in-out"
                }}
                d="M136.048 273.077L200 236.155L263.952 273.077V346.923L200 383.845L136.048 346.923V273.077Z"
                stroke="#808080"
                strokeWidth="8"
              />
              <path className="axis" d="M200 200L200 60" stroke="#808080" strokeWidth="8" />
              <path className="axis" d="M200 200L78.7564 270" stroke="#808080" strokeWidth="8" />
              <path className="axis" d="M200 200L321.244 270" stroke="#808080" strokeWidth="8" />
            </svg>
            <span>Start</span>
          </button>
        </start-button>
        <vertical-rect />
        <live-apps></live-apps>
      </div>
    </>
  );
};

export const Start = () => {

  var root = document.querySelector(":root");
  const theme = useContext(ThemeContext);

  const [startButtonBkgr, setStartButtonBkgr] = useState(
    getComputedStyle(root).getPropertyValue("--StartButtonBkgr"),
  );
  useEffect(() => {
    root.style.setProperty("--StartButtonBkgr", startButtonBkgr);
  }, [startButtonBkgr]);
  //----------------------------------------------------------------------------//
  const [startButtonBkgrHover, setStartButtonBkgrHover] = useState(
    getComputedStyle(root).getPropertyValue("--StartButtonBkgrHover"),
  );
  useEffect(() => {
    root.style.setProperty("--StartButtonBkgrHover", startButtonBkgrHover);
  }, [startButtonBkgrHover]);
  //----------------------------------------------------------------------------//
  const [startButtonBkgrActive, setStartButtonBkgrActive] = useState(
    getComputedStyle(root).getPropertyValue("--StartButtonBkgrActive"),
  );
  useEffect(() => {
    root.style.setProperty("--StartButtonBkgrActive", startButtonBkgrActive);
  }, [startButtonBkgrActive]);
  //----------------------------------------------------------------------------//
  const [startButtonIconSize, setStartButtonIconSize] = useState(
    getComputedStyle(root).getPropertyValue("--StartButtonIconSize").slice(0, -2),
  );
  useEffect(() => {
    root.style.setProperty("--StartButtonIconSize", startButtonIconSize + "px");
  }, [startButtonIconSize]);
  //----------------------------------------------------------------------------//
  const [startButtonHeight, setStartButtonHeight] = useState(
    getComputedStyle(root).getPropertyValue("--StartButtonHeight").slice(0, -2),
  );
  useEffect(() => {
    root.style.setProperty("--StartButtonHeight", startButtonHeight + "px");
  }, [startButtonHeight]);
  //----------------------------------------------------------------------------//
  const [startButtonMargin, setStartButtonMargin] = useState(
    getComputedStyle(root).getPropertyValue("--StartButtonMargin").slice(0, -2),
  );
  useEffect(() => {
    root.style.setProperty("--StartButtonMargin", startButtonMargin + "px");
  }, [startButtonMargin]);
  //----------------------------------------------------------------------------//
  const [startButtonPadding, setStartButtonPadding] = useState(
    getComputedStyle(root).getPropertyValue("--StartButtonPadding").slice(0, -2),
  );
  useEffect(() => {
    root.style.setProperty("--StartButtonPadding", startButtonPadding + "px");
  }, [startButtonPadding]);
  //----------------------------------------------------------------------------//
  const [startButtonBorderWidth, setStartButtonBorderWidth] = useState(
    getComputedStyle(root).getPropertyValue("--StartButtonBorderWidth").slice(0, -2),
  );
  useEffect(() => {
    root.style.setProperty("--StartButtonBorderWidth", startButtonBorderWidth + "px");
  }, [startButtonBorderWidth]);
  //----------------------------------------------------------------------------//
  const [startButtonBorderColor, setStartButtonBorderColor] = useState(
    getComputedStyle(root).getPropertyValue("--StartButtonBorderColor"),
  );
  useEffect(() => {
    root.style.setProperty("--StartButtonBorderColor", startButtonBorderColor);
  }, [startButtonBorderColor]);
  //----------------------------------------------------------------------------//
  const [startButtonBorderType, setStartButtonBorderType] = useState(
    getComputedStyle(root).getPropertyValue("--StartButtonBorderType"),
  );
  useEffect(() => {
    root.style.setProperty("--StartButtonBorderType", startButtonBorderType);
  }, [startButtonBorderType]);
  //----------------------------------------------------------------------------//
  const [startButtonBorderRadius, setStartButtonBorderRadius] = useState(
    getComputedStyle(root).getPropertyValue("--StartButtonBorderRadius").slice(0, -2),
  );
  useEffect(() => {
    root.style.setProperty("--StartButtonBorderRadius", startButtonBorderRadius + "px");
  }, [startButtonBorderRadius]);
  //----------------------------------------------------------------------------//
  const [startButtonFontVisibility, setStartButtonFontVisibility] = useState(
    getComputedStyle(root).getPropertyValue("--StartButtonFontVisibility"),
  );
  useEffect(() => {
    root.style.setProperty("--StartButtonFontVisibility", startButtonFontVisibility);
  }, [startButtonFontVisibility]);
  //----------------------------------------------------------------------------//
  const [startButtonFontColor, setStartButtonFontColor] = useState(
    getComputedStyle(root).getPropertyValue("--StartButtonFontColor"),
  );
  useEffect(() => {
    root.style.setProperty("--StartButtonFontColor", startButtonFontColor);
  }, [startButtonFontColor]);
  //----------------------------------------------------------------------------//
  const [startButtonFontSize, setStartButtonFontSize] = useState(
    getComputedStyle(root).getPropertyValue("--StartButtonFontSize").slice(0, -2),
  );
  useEffect(() => {
    root.style.setProperty("--StartButtonFontSize", startButtonFontSize + "px");
  }, [startButtonFontSize]);
  //----------------------------------------------------------------------------//

  return (
    <>
    <fieldset>
      <legend>Dimentions:</legend>
      <div>
        <label>Height:</label>
        <input
          type="range"
          min="12"
          max="46"
          value={startButtonHeight}
          onChange={(e) => setStartButtonHeight(e.target.value)}
        />
      </div>
        <div>
          <label>Margin:</label>
          <input
            type="range"
            min={0}
            max={10}
            step="1"
            value={startButtonMargin}
            onChange={(e) => setStartButtonMargin(e.target.value)}
          />
        </div>
        <div>
          <label>Padding:</label>
          <input
            type="range"
            min={0}
            max={20}
            step="1"
            value={startButtonPadding}
            onChange={(e) => setStartButtonPadding(e.target.value)}
          />
        </div>
    </fieldset>
      <fieldset>
        <legend>Icon</legend>
        <div>
          <label>Icon Theme:</label>
          <select
            value={theme.startButtonTheme}
            onChange={(e) => { theme.setStartButtonTheme(e.target.value) }}
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
          <label>Size:</label>
          <input
            type="range"
            min="12"
            max="46"
            value={startButtonIconSize}
            onChange={(e) => setStartButtonIconSize(e.target.value)}
          />
        </div>
      </fieldset>
      <fieldset>
        <legend>Background</legend>
        <div>
          <label>Base:</label>
          <ColorPicker
            color={startButtonBkgr}
            setColor={setStartButtonBkgr}
            useAlpha={true}
          />
        </div>
        <div>
          <label>Hover:</label>
          <ColorPicker
            color={startButtonBkgrHover}
            setColor={setStartButtonBkgrHover}
            useAlpha={true}
          />
        </div>
        <div>
          <label>Active:</label>
          <ColorPicker
            color={startButtonBkgrActive}
            setColor={setStartButtonBkgrActive}
            useAlpha={true}
          />
        </div>
      </fieldset>
      <fieldset>
        <legend>Text</legend>
        <div>
          <label>Visibility</label>
          <select
            value={startButtonFontVisibility}
            onChange={(e) => setStartButtonFontVisibility(e.target.value)}
          >
            <option value="visible">Visible</option>
            <option value="none">Hidden</option>
          </select>
        </div>
        <div>
          <label>Color:</label>
          <ColorPicker
            color={startButtonFontColor}
            setColor={setStartButtonFontColor}
            useAlpha={false}
          />
        </div>
        <div>
          <label>Size:</label>
          <input
            type="range"
            min={12}
            max={46}
            step="1"
            value={startButtonFontSize}
            onChange={(e) => setStartButtonFontSize(e.target.value)}
          />
        </div>
      </fieldset>
      <fieldset>
        <legend>Border</legend>
        <div>
          <label>Color:</label>
          <ColorPicker
            color={startButtonBorderColor}
            setColor={setStartButtonBorderColor}
            useAlpha={true}
          />
        </div>
        <div>
          <label>Width:</label>
          <input
            type="range"
            min={0}
            max={5}
            step="1"
            value={startButtonBorderWidth}
            onChange={(e) => setStartButtonBorderWidth(e.target.value)}
          />
        </div>
        <div>
          <label>Corner Curvature:</label>
          <input
            type="range"
            min={0}
            max={60}
            step="1"
            value={startButtonBorderRadius}
            onChange={(e) => setStartButtonBorderRadius(e.target.value)}
          />
        </div>
        <div>
          <label>Border Type:</label>
          <select
            value={startButtonBorderType}
            onChange={(e) => setStartButtonBorderType(e.target.value)}
          >
            <option value="solid">solid</option>
            <option value="double">double</option>
            <option value="dashed">dashed</option>
            <option value="dotted">dotted</option>
            <option value="groove">groove</option>
            <option value="ridge">ridge</option>
            <option value="inset">inset</option>
            <option value="outset">outset</option>
          </select>
        </div>
      </fieldset>
    </>
  )
}