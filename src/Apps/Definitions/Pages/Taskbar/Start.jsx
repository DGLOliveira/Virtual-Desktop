import { useState, useEffect, useContext, useCallback, lazy, Suspense } from "react";
import { ThemeContext } from "../../../../System/ThemeManager/context.jsx";
import DefaultLogo from "../../../../System/Taskbar/Components/Start/DefaultLogo.jsx";

import ColorPicker from "../../../../System/GlobalComponents/ColorPicker/ColorPicker.jsx";

export const StartPreview = () => {
  const [open, setOpen] = useState(false);
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
        <start-button
        >
          <button onClick={() => setOpen(!open)}>
            <Suspense fallback={<DefaultLogo />}>
              <Logo isOpen={open} />
            </Suspense>
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