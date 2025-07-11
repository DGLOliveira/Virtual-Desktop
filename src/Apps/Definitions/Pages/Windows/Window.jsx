import { useState, useEffect, useContext, useCallback, lazy, Suspense } from "react";
import { FcGlobe } from "react-icons/fc";
import TopBarButtonsDefault from "../../../../System/AppManager/Components/AppTopBarButtonsDefault.jsx";

import { ThemeContext } from "../../../../System/ThemeManager/context.jsx";
import ColorPicker from "../../../../System/GlobalComponents/ColorPicker/ColorPicker.jsx";

export const WindowPreview = () => {
  const themeContext = useContext(ThemeContext);

  const TopBarButtons = useCallback((
    lazy(() => import(`../../../../System/ThemeManager/${themeContext.TopBarButtonsPath}`).catch(
      (error) => {
        console.error("Failed to import thematic top bar buttons");
        return {
          default: TopBarButtonsDefault
        }
      }))
  ), [themeContext.TopBarButtonsPath]);

  const topBarButtonTitles = {
    minimize: "Minimize (Alt + ⇩)",
    maximize: "Maximize (Alt + ⇧)",
    restore: "Restore (Alt + ⇩)",
    close: "Close (Ctrl + Shift + F4)"
  };

  const showButtons = {
    minimize: true,
    maximize: true,
    close: true
  };

  return (
    <>
      <app-window
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          width: "80%",
          height: "120px",
          color: "var(--WindowFontColorInactive)",
          backgroundColor: "var(--WindowBkgrColorInactive)",
          borderWidth: "var(--WindowBorderWidth)",
          borderColor: "var(--WindowBorderColorInactive)",
          borderRadius: "var(--WindowBorderRadius)",
          borderColor: "var(--WindowBorderColorInactive)"
        }}
      >
        <app-top-bar
          style={{
            color: "var(--WindowTopBarFontColorInactive)",
            backgroundColor: "var(--WindowTopBarBkgrColorInactive)"
          }}>
          <FcGlobe />
          <h1>Inactive</h1>
          <Suspense fallback={null}>
            <TopBarButtons
              title={topBarButtonTitles}
              click={() => { }}
              isMaximized={false}
              showButtons={showButtons}
            />
          </Suspense>
        </app-top-bar>
        <app-container
          style={{
            color: "var(--AppFontColorInactive)",
            backgroundColor: "var(--AppBkgrColorInactive)",
            borderColor: "var(--AppBorderColorInactive)"
          }}></app-container>
      </app-window>
      <app-window
        style={{
          position: "absolute",
          top: "50px",
          left: "60px",
          width: "80%",
          height: "120px",
          color: "var(--WindowFontColor)",
          backgroundColor: "var(--WindowBkgrColor)",
          borderWidth: "var(--WindowBorderWidth)",
          borderColor: "var(--WindowBorderColor)",
          borderRadius: "var(--WindowBorderRadius)",
          borderColor: "var(--WindowBorderColor)"
        }}
      >
        <app-top-bar
          style={{
            color: "var(--WindowTopBarFontColor)",
            backgroundColor: "var(--WindowTopBarBkgrColor)"
          }}>
          <FcGlobe />
          <h1>Active</h1>
          <Suspense fallback={null}>
            <TopBarButtons
              title={topBarButtonTitles}
              click={() => { }}
              isMaximized={false}
              showButtons={showButtons}
            />
          </Suspense>
        </app-top-bar>
        <app-container
          style={{
            color: "var(--AppFontColor)",
            backgroundColor: "var(--AppBkgrColor)",
            borderColor: "var(--AppBorderColor)"
          }}></app-container>
      </app-window>
    </>
  );
};

export const Window = () => {
  const themeContext = useContext(ThemeContext);
  var root = document.querySelector(":root");

  const [windowFontColor, setWindowFontColor] = useState(
    getComputedStyle(root).getPropertyValue("--WindowFontColor"),
  );
  useEffect(() => {
    root.style.setProperty("--WindowFontColor", windowFontColor);
  }, [windowFontColor]);
  //----------------------------------------------------------------------------//
  const [windowFontColorInactive, setWindowFontColorInactive] = useState(
    getComputedStyle(root).getPropertyValue("--WindowFontColorInactive"),
  );
  useEffect(() => {
    root.style.setProperty("--WindowFontColorInactive", windowFontColorInactive);
  }, [windowFontColorInactive]);
  //----------------------------------------------------------------------------//
  const [fontSize, setFontSize] = useState(
    getComputedStyle(root).getPropertyValue("--WindowTopBarFontSize").slice(0, -2),
  );
  useEffect(() => {
    root.style.setProperty("--WindowTopBarFontSize", fontSize + "px");
  }, [fontSize]);
  //----------------------------------------------------------------------------//
  const [topbarTitleAlign, setTopbarTitleAlign] = useState(
    getComputedStyle(root).getPropertyValue("--WindowTopBarFontAlign"),
  );
  useEffect(() => {
    root.style.setProperty("--WindowTopBarFontAlign", topbarTitleAlign);
  }, [topbarTitleAlign]);
  //----------------------------------------------------------------------------//
  const [topbarFontColor, setTopbarFontColor] = useState(
    getComputedStyle(root).getPropertyValue("--WindowTopBarFontColor"),
  );
  useEffect(() => {
    root.style.setProperty("--WindowTopBarFontColor", topbarFontColor);
  }, [topbarFontColor]);
  //----------------------------------------------------------------------------//
  const [bkgColor, setBkgColor] = useState(
    getComputedStyle(root).getPropertyValue("--WindowBkgrColor"),
  );
  useEffect(() => {
    root.style.setProperty("--WindowBkgrColor", bkgColor);
  }, [bkgColor]);
  //----------------------------------------------------------------------------//
  const [windowPadding, setWindowPadding] = useState(
    getComputedStyle(root).getPropertyValue("--WindowPadding").slice(0, -2),
  );
  useEffect(() => {
    root.style.setProperty("--WindowPadding", windowPadding + "px");
  }, [windowPadding]);
  //----------------------------------------------------------------------------//
  const [topbarFlexDirection, setTopbarFlexDirection] = useState(
    getComputedStyle(root).getPropertyValue("--WindowTopBarFlexDirection"),
  );
  useEffect(() => {
    root.style.setProperty("--WindowTopBarFlexDirection", topbarFlexDirection);
  }, [topbarFlexDirection]);
  //----------------------------------------------------------------------------//
  const [topbarBkgColor, setTopbarBkgColor] = useState(
    getComputedStyle(root).getPropertyValue("--WindowTopBarBkgrColor"),
  );
  useEffect(() => {
    root.style.setProperty("--WindowTopBarBkgrColor", topbarBkgColor);
  }, [topbarBkgColor]);
  //----------------------------------------------------------------------------//
  const [topBarHeight, setTopBarHeight] = useState(
    getComputedStyle(root).getPropertyValue("--WindowTopBarHeight").slice(0, -2),
  );
  useEffect(() => {
    root.style.setProperty("--WindowTopBarHeight", topBarHeight + "px");
  }, [topBarHeight]);
  //----------------------------------------------------------------------------//
  const [topBarIconSize, setTopBarIconSize] = useState(
    getComputedStyle(root).getPropertyValue("--WindowTopBarIconSize").slice(0, -2),
  );
  useEffect(() => {
    root.style.setProperty("--WindowTopBarIconSize", topBarIconSize + "px");
  }, [topBarIconSize]);
  //----------------------------------------------------------------------------//
  const [borderWidth, setBorderWidth] = useState(
    getComputedStyle(root).getPropertyValue("--WindowBorderWidth").slice(0, -2),
  );
  useEffect(() => {
    root.style.setProperty("--WindowBorderWidth", borderWidth + "px");
  }, [borderWidth]);
  //----------------------------------------------------------------------------//
  const [borderRadius, setBorderRadius] = useState(
    getComputedStyle(root).getPropertyValue("--WindowBorderRadius").slice(0, -2),
  );
  useEffect(() => {
    root.style.setProperty("--WindowBorderRadius", borderRadius + "px");
  }, [borderRadius]);
  //----------------------------------------------------------------------------//
  const [borderType, setBorderType] = useState(
    getComputedStyle(root).getPropertyValue("--WindowBorderType"),
  );
  useEffect(() => {
    root.style.setProperty("--WindowBorderType", borderType);
  }, [borderType]);
  //----------------------------------------------------------------------------//
  const [borderColor, setBorderColor] = useState(
    getComputedStyle(root).getPropertyValue("--WindowBorderColor"),
  );
  useEffect(() => {
    root.style.setProperty("--WindowBorderColor", borderColor);
  }, [borderColor]);
  //----------------------------------------------------------------------------//
  const [shadowXOffset, setShadowXOffset] = useState(
    getComputedStyle(root).getPropertyValue("--WindowShadowXOffset").slice(0, -2),
  );
  useEffect(() => {
    root.style.setProperty("--WindowShadowXOffset", shadowXOffset + "px");
  }, [shadowXOffset]);
  //----------------------------------------------------------------------------//
  const [shadowYOffset, setShadowYOffset] = useState(
    getComputedStyle(root).getPropertyValue("--WindowShadowYOffset").slice(0, -2),
  );
  useEffect(() => {
    root.style.setProperty("--WindowShadowYOffset", shadowYOffset + "px");
  }, [shadowYOffset]);
  //----------------------------------------------------------------------------//
  const [shadowBlur, setShadowBlur] = useState(
    getComputedStyle(root).getPropertyValue("--WindowShadowBlur").slice(0, -2),
  );
  useEffect(() => {
    root.style.setProperty("--WindowShadowBlur", shadowBlur + "px");
  }, [shadowBlur]);
  //----------------------------------------------------------------------------//
  const [shadowSpread, setShadowSpread] = useState(
    getComputedStyle(root).getPropertyValue("--WindowShadowSpread").slice(0, -2),
  );
  useEffect(() => {
    root.style.setProperty("--WindowShadowSpread", shadowSpread + "px");
  }, [shadowSpread]);
  //----------------------------------------------------------------------------//
  const [shadowColor, setShadowColor] = useState(
    getComputedStyle(root).getPropertyValue("--WindowShadowColor"),
  );
  useEffect(() => {
    root.style.setProperty("--WindowShadowColor", shadowColor);
  }, [shadowColor]);
  //----------------------------------------------------------------------------//
  const [inactiveBorderColor, setInactiveBorderColor] = useState(
    getComputedStyle(root).getPropertyValue("--WindowBorderColorInactive"),
  );
  useEffect(() => {
    root.style.setProperty("--WindowBorderColorInactive", inactiveBorderColor);
  }, [inactiveBorderColor]);
  //----------------------------------------------------------------------------//
  const [inactiveTopBarBkgColor, setInactiveTopBarBkgColor] = useState(
    getComputedStyle(root).getPropertyValue("--WindowTopBarBkgrColorInactive"),
  );
  useEffect(() => {
    root.style.setProperty("--WindowTopBarBkgrColorInactive", inactiveTopBarBkgColor);
  }, [inactiveTopBarBkgColor]);
  //----------------------------------------------------------------------------//
  const [topbarFontColorInactive, setTopbarFontColorInactive] = useState(
    getComputedStyle(root).getPropertyValue("--WindowTopBarFontColorInactive"),
  );
  useEffect(() => {
    root.style.setProperty("--WindowTopBarFontColorInactive", topbarFontColorInactive);
  }, [topbarFontColorInactive]);
  //----------------------------------------------------------------------------//
  const [inactiveBkgColor, setInactiveBkgColor] = useState(
    getComputedStyle(root).getPropertyValue("--WindowBkgrColorInactive"),
  );
  useEffect(() => {
    root.style.setProperty("--WindowBkgrColorInactive", inactiveBkgColor);
  }, [inactiveBkgColor]);

  return (
    <>
      <fieldset>
        <legend>Window</legend>
        <div>
          <label>Background Effect:</label>
          <select
            value={themeContext.windowBackgroundFX}
            onChange={(e) => themeContext.setWindowBackgroundFX(e.target.value)}
          >
            {themeContext.backgroundFXList.map((backgroundFX) => (
              <option key={backgroundFX} value={backgroundFX}>
                {backgroundFX}
              </option>
            ))}
          </select>
        </div>
        <fieldset>
          <legend>Top Bar</legend>
          <div>
            <label>Icon Theme:</label>
            <select
              value={themeContext.topBarIconTheme}
              onChange={(e) => themeContext.setTopBarIconTheme(e.target.value)}
            >
              {themeContext.topBarIconThemeList.map((iconTheme) => (
                <option key={iconTheme} value={iconTheme}>
                  {iconTheme}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Direction:</label>
            <select
              value={topbarFlexDirection}
              onChange={(e) => setTopbarFlexDirection(e.target.value)}
            >
              <option value="row">Close on the Right</option>
              <option value="row-reverse">Close on the Left</option>
            </select>
          </div>
          <div>
            <label>Align Title</label>
            <select
              value={topbarTitleAlign}
              onChange={(e) => setTopbarTitleAlign(e.target.value)}
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </div>
          <div>
            <label>Height:</label>
            <input
              type="range"
              min={20}
              max={64}
              step="1"
              value={topBarHeight}
              onChange={(e) => setTopBarHeight(e.target.value)}
            />
          </div>
          <div>
            <label>Icon Size:</label>
            <input
              type="range"
              min={16}
              max={60}
              step="1"
              value={topBarIconSize}
              onChange={(e) => setTopBarIconSize(e.target.value)}
            />
          </div>
          <div>
            <label>Font Size:</label>
            <input
              type="range"
              min={12}
              max={60}
              step="1"
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
            />
          </div>
        </fieldset>
        <fieldset>
          <legend>Border</legend>
          <div>
            <label>Border Thickness:</label>
            <input
              type="range"
              min={0}
              max={10}
              step="1"
              value={borderWidth}
              onChange={(e) => setBorderWidth(e.target.value)}
            />
          </div>
          <div>
            <label>Corner Curvature:</label>
            <input
              type="range"
              min={0}
              max={20}
              step="1"
              value={borderRadius}
              onChange={(e) => setBorderRadius(e.target.value)}
            />
          </div>
          <div>
            <label>Border Type:</label>
            <select
              value={borderType}
              onChange={(e) => setBorderType(e.target.value)}
            >
              <option value="solid">solid</option>
              <option value="dashed">dashed</option>
              <option value="dotted">dotted</option>
              <option value="double">double</option>
              <option value="groove">groove</option>
              <option value="ridge">ridge</option>
              <option value="inset">inset</option>
              <option value="outset">outset</option>
            </select>
          </div>
          <div>
            <label>Padding:</label>
            <input
              type="range"
              min={0}
              max={10}
              step="1"
              value={windowPadding}
              onChange={(e) => setWindowPadding(e.target.value)}
            />
          </div>
        </fieldset>
        <fieldset>
          <legend>Shadow</legend>
          <div>
            <label>Y-Offset</label>
            <input
              type="number"
              min={-50}
              max={50}
              step="1"
              value={shadowYOffset}
              onChange={(e) => setShadowYOffset(e.target.value)}
            />
          </div>
          <div>
            <label>X-Offset</label>
            <input
              type="number"
              min={-50}
              max={50}
              step="1"
              value={shadowXOffset}
              onChange={(e) => setShadowXOffset(e.target.value)}
            />
          </div>
          <div>
            <label>Spread</label>
            <input
              type="number"
              min={0}
              max={50}
              step="1"
              value={shadowSpread}
              onChange={(e) => setShadowSpread(e.target.value)}
            />
          </div>
          <div>
            <label>Blur</label>
            <input
              type="number"
              min={0}
              max={50}
              step="1"
              value={shadowBlur}
              onChange={(e) => setShadowBlur(e.target.value)}
            />
          </div>
          <div>
            <label>Color</label>
            <ColorPicker
              color={shadowColor}
              setColor={setShadowColor}
              useAlpha={true}
            />
          </div>
        </fieldset>
        <fieldset>
          <legend>Active Window</legend>
          <div>
            <label>Top Bar Background Color: </label>
            <ColorPicker
              color={topbarBkgColor}
              setColor={setTopbarBkgColor}
              useAlpha={true}
            />
          </div>
          <div>
            <label>Top Bar Font Color: </label>
            <ColorPicker
              color={topbarFontColor}
              setColor={setTopbarFontColor}
              useAlpha={false}
            />
          </div>
          <div>
            <label>Background Color: </label>
            <ColorPicker
              color={bkgColor}
              setColor={setBkgColor}
              useAlpha={true}
            />
          </div>
          <div>
            <label>Font Color: </label>
            <ColorPicker
              color={windowFontColor}
              setColor={setWindowFontColor}
              useAlpha={false}
            />
          </div>
          <div>
            <label>Border Color: </label>
            <ColorPicker
              color={borderColor}
              setColor={setBorderColor}
              useAlpha={true}
            />
          </div>
        </fieldset>
        <fieldset>
          <legend>Inactive Window</legend>

          <div>
            <label>Top Bar Background Color: </label>
            <ColorPicker
              color={inactiveTopBarBkgColor}
              setColor={setInactiveTopBarBkgColor}
              useAlpha={true}
            />
          </div>
          <div>
            <label>Top Bar Font Color: </label>
            <ColorPicker
              color={topbarFontColorInactive}
              setColor={setTopbarFontColorInactive}
              useAlpha={false}
            />
          </div>
          <div>
            <label>Background Color: </label>
            <ColorPicker
              color={inactiveBkgColor}
              setColor={setInactiveBkgColor}
              useAlpha={true}
            />
          </div>
          <div>
            <label>Font Color: </label>
            <ColorPicker
              color={windowFontColorInactive}
              setColor={setWindowFontColorInactive}
              useAlpha={false}
            />
          </div>
          <div>
            <label>Border Color: </label>
            <ColorPicker
              color={inactiveBorderColor}
              setColor={setInactiveBorderColor}
              useAlpha={true}
            />
          </div>
        </fieldset>
      </fieldset>
    </>
  );
};
