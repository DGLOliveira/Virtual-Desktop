import { useState, useEffect, useContext, useCallback, lazy, Suspense } from "react";
import { ThemeContext } from "../../../../System/ThemeManager/context.jsx";
import DefaultLogo from "../../../../System/Taskbar/Components/Start/DefaultLogo.jsx";

import ColorPicker from "../../../../System/GlobalComponents/ColorPicker/ColorPicker.jsx";

import { FcGlobe } from "react-icons/fc";

export const TaskBarPreview = () => {
  const themeContext = useContext(ThemeContext);
  const Logo = useCallback((
    lazy(() => import(`../../../../System/ThemeManager/${themeContext.StartButtonPath}`).catch(
      (error) => {
        let errorMessage = "Failed to load Start Button Logo";
        console.error(errorMessage);
        return { default: DefaultLogo }
      }
    ))
  ), [themeContext.StartButtonPath]);

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
        <start-button>
          <button>
            <Suspense fallback={<DefaultLogo />}>
              <Logo isOpen={false} />
            </Suspense>
            <span>Start</span>
          </button>
        </start-button>
        <vertical-rect />
        <live-apps>
          <button >
            <FcGlobe />
            <span>App</span>
            {themeContext.liveAppsTheme === "Aqua" && <FcGlobe />}
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
  const [taskbarVerticalBorderColor, setTaskbarVerticalBorderColor] = useState(
    getComputedStyle(root).getPropertyValue("--TaskbarVerticalBorderColor"),
  );
  useEffect(() => {
    root.style.setProperty("--TaskbarVerticalBorderColor", taskbarVerticalBorderColor);
  }, [taskbarVerticalBorderColor]);
  //----------------------------------------------------------------------------//
  const [taskbarVerticalBorderWidth, setTaskbarVerticalBorderWidth] = useState(
    getComputedStyle(root).getPropertyValue("--TaskbarVerticalBorderWidth").slice(0, -2),
  );
  useEffect(() => {
    root.style.setProperty("--TaskbarVerticalBorderWidth", taskbarVerticalBorderWidth + "px");
  }, [taskbarVerticalBorderWidth]);
  //----------------------------------------------------------------------------//
  const [taskbarVerticalBorderType, setTaskbarVerticalBorderType] = useState(
    getComputedStyle(root).getPropertyValue("--TaskbarVerticalBorderType")
  )
  useEffect(() => {
    root.style.setProperty("--TaskbarVerticalBorderType", taskbarVerticalBorderType);
  }, [taskbarVerticalBorderType]);
  //----------------------------------------------------------------------------//
  const [taskbarHorizontalBorderColor, setTaskbarHorizontalBorderColor] = useState(
    getComputedStyle(root).getPropertyValue("--TaskbarHorizontalBorderColor"),
  );
  useEffect(() => {
    root.style.setProperty("--TaskbarHorizontalBorderColor", taskbarHorizontalBorderColor);
  }, [taskbarHorizontalBorderColor]);
  //----------------------------------------------------------------------------//
  const [taskbarHorizontalBorderWidth, setTaskbarHorizontalBorderWidth] = useState(
    getComputedStyle(root).getPropertyValue("--TaskbarHorizontalBorderWidth").slice(0, -2),
  );
  useEffect(() => {
    root.style.setProperty("--TaskbarHorizontalBorderWidth", taskbarHorizontalBorderWidth + "px");
  }, [taskbarHorizontalBorderWidth]);
  //----------------------------------------------------------------------------//
  const [taskbarHorizontalBorderType, setTaskbarHorizontalBorderType] = useState(
    getComputedStyle(root).getPropertyValue("--TaskbarHorizontalBorderType")
  )
  useEffect(() => {
    root.style.setProperty("--TaskbarHorizontalBorderType", taskbarHorizontalBorderType);
  }, [taskbarHorizontalBorderType]);

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
      <fieldset>
        <legend>Borders</legend>
        <fieldset>
          <legend>Horizontal</legend>
          <div>
            <label>Color:</label>
            <ColorPicker
              color={taskbarHorizontalBorderColor}
              setColor={setTaskbarHorizontalBorderColor}
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
              value={taskbarHorizontalBorderWidth}
              onChange={(e) => setTaskbarHorizontalBorderWidth(e.target.value)}
            />
          </div>
          <div>
            <label>Border Type:</label>
            <select
              value={taskbarHorizontalBorderType}
              onChange={(e) => setTaskbarHorizontalBorderType(e.target.value)}
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
        <fieldset>
          <legend>Vertical</legend>
          <div>
            <label>Color:</label>
            <ColorPicker
              color={taskbarVerticalBorderColor}
              setColor={setTaskbarVerticalBorderColor}
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
              value={taskbarVerticalBorderWidth}
              onChange={(e) => setTaskbarVerticalBorderWidth(e.target.value)}
            />
          </div>
          <div>
            <label>Border Type:</label>
            <select
              value={taskbarVerticalBorderType}
              onChange={(e) => setTaskbarVerticalBorderType(e.target.value)}
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
      </fieldset>
    </>
  )
}