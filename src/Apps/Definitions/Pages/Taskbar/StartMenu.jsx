import { useState, useEffect, useContext, useCallback, lazy, Suspense } from "react";
import { ThemeContext } from "../../../../System/ThemeManager/context.jsx";
import DefaultLogo from "../../../../System/Taskbar/Components/Start/DefaultLogo.jsx";

import ColorPicker from "../../../../System/GlobalComponents/ColorPicker/ColorPicker.jsx";

import { FaGear } from "react-icons/fa6";
import { MdOutlineRestartAlt } from "react-icons/md";
import { RiShutDownLine } from "react-icons/ri";
import { FcGlobe, FcInfo, FcSettings } from "react-icons/fc";

export const StartMenuPreview = () => {
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
          <start-list class={"startListOpen"} style={{ left: 0 }}>
            <div>
              <button>
                <FaGear />
                <span>Settings</span>
              </button>
              <button>
                <MdOutlineRestartAlt />
                <span>Refresh</span>
              </button>
              <button>
                <RiShutDownLine />
                <span>Close</span>
              </button>
            </div>
            <ul>
              <li>
                <button>
                  <FcGlobe />
                  <span>Program 1</span>
                </button>
              </li>
              <li>
                <button>
                  <FcInfo />
                  <span>Program 2</span>
                </button>
              </li>
              <li>
                <button>
                  <FcSettings />
                  <span>Program 3</span>
                </button>
              </li>
            </ul>
          </start-list>
          <button>
            <Suspense fallback={<DefaultLogo />}>
              <Logo isOpen={true} />
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

export const StartMenu = () => {

  var root = document.querySelector(":root");
  const theme = useContext(ThemeContext);

  const [startMenuBkgr, setStartMenuBkgr] = useState(
    getComputedStyle(root).getPropertyValue("--StartMenuBkgrColor"),
  );
  useEffect(() => {
    root.style.setProperty("--StartMenuBkgrColor", startMenuBkgr);
  }, [startMenuBkgr]);
  //----------------------------------------------------------------------------//
  const [startMenuFlexDirection, setStartMenuFlexDirection] = useState(
    getComputedStyle(root).getPropertyValue("--StartMenuFlexDirection"),
  );
  useEffect(() => {
    root.style.setProperty("--StartMenuFlexDirection", startMenuFlexDirection);
  }, [startMenuFlexDirection]);
  //----------------------------------------------------------------------------//
  const [startMenuPadding, setStartMenuPadding] = useState(
    getComputedStyle(root).getPropertyValue("--StartMenuPadding").slice(0, -2),
  );
  useEffect(() => {
    root.style.setProperty("--StartMenuPadding", startMenuPadding + "px");
  }, [startMenuPadding]);
  //----------------------------------------------------------------------------//
  const [startMenuBorderColor, setStartMenuBorderColor] = useState(
    getComputedStyle(root).getPropertyValue("--StartMenuBorderColor"),
  );
  useEffect(() => {
    root.style.setProperty("--StartMenuBorderColor", startMenuBorderColor);
  }, [startMenuBorderColor]);
  //----------------------------------------------------------------------------//
  const [startMenuBorderWidth, setStartMenuBorderWidth] = useState(
    getComputedStyle(root).getPropertyValue("--StartMenuBorderWidth").slice(0, -2),
  );
  useEffect(() => {
    root.style.setProperty("--StartMenuBorderWidth", startMenuBorderWidth + "px");
  }, [startMenuBorderWidth]);
  //----------------------------------------------------------------------------//
  const [startMenuBorderRadius, setStartMenuBorderRadius] = useState(
    getComputedStyle(root).getPropertyValue("--StartMenuBorderRadius").slice(0, -2),
  );
  useEffect(() => {
    root.style.setProperty("--StartMenuBorderRadius", startMenuBorderRadius + "px");
  }, [startMenuBorderRadius]);
  //----------------------------------------------------------------------------//
  const [startMenuBorderType, setStartMenuBorderType] = useState(
    getComputedStyle(root).getPropertyValue("--StartMenuBorderType"),
  );
  useEffect(() => {
    root.style.setProperty("--StartMenuBorderType", startMenuBorderType);
  }, [startMenuBorderType]);
  //----------------------------------------------------------------------------//
  //----------------------------------------------------------------------------//
  //----------------------------------------------------------------------------//
  //----------------------------------------------------------------------------//
  //----------------------------------------------------------------------------//
  const [startMenuPrimaryBkgr, setStartMenuPrimaryBkgr] = useState(
    getComputedStyle(root).getPropertyValue("--StartMenuPrimaryBkgr"),
  );
  useEffect(() => {
    root.style.setProperty("--StartMenuPrimaryBkgr", startMenuPrimaryBkgr);
  }, [startMenuPrimaryBkgr]);
  //----------------------------------------------------------------------------//
  const [startMenuPrimaryBkgrHover, setStartMenuPrimaryBkgrHover] = useState(
    getComputedStyle(root).getPropertyValue("--StartMenuPrimaryBkgrHover"),
  );
  useEffect(() => {
    root.style.setProperty("--StartMenuPrimaryBkgrHover", startMenuPrimaryBkgrHover);
  }, [startMenuPrimaryBkgrHover]);
  //----------------------------------------------------------------------------//
  const [startMenuPrimaryBkgrActive, setStartMenuPrimaryBkgrActive] = useState(
    getComputedStyle(root).getPropertyValue("--StartMenuPrimaryBkgrActive"),
  );
  useEffect(() => {
    root.style.setProperty("--StartMenuPrimaryBkgrActive", startMenuPrimaryBkgrActive);
  }, [startMenuPrimaryBkgrActive]);
  //----------------------------------------------------------------------------//
  const [startMenuPrimaryFontColor, setStartMenuPrimaryFontColor] = useState(
    getComputedStyle(root).getPropertyValue("--StartMenuPrimaryFontColor"),
  );
  useEffect(() => {
    root.style.setProperty("--StartMenuPrimaryFontColor", startMenuPrimaryFontColor);
  }, [startMenuPrimaryFontColor]);
  //----------------------------------------------------------------------------//
  const [startMenuPrimaryFontColorHover, setStartMenuPrimaryFontColorHover] = useState(
    getComputedStyle(root).getPropertyValue("--StartMenuPrimaryFontColorHover"),
  );
  useEffect(() => {
    root.style.setProperty("--StartMenuPrimaryFontColorHover", startMenuPrimaryFontColorHover);
  }, [startMenuPrimaryFontColorHover]);
  //----------------------------------------------------------------------------//
  const [startMenuPrimaryFontColorActive, setStartMenuPrimaryFontColorActive] = useState(
    getComputedStyle(root).getPropertyValue("--StartMenuPrimaryFontColorActive"),
  );
  useEffect(() => {
    root.style.setProperty("--StartMenuPrimaryFontColorActive", startMenuPrimaryFontColorActive);
  }, [startMenuPrimaryFontColorActive]);
  //----------------------------------------------------------------------------//
  const [startMenuPrimaryFontSize, setStartMenuPrimaryFontSize] = useState(
    getComputedStyle(root).getPropertyValue("--StartMenuPrimaryFontSize").slice(0, -2),
  );
  useEffect(() => {
    root.style.setProperty("--StartMenuPrimaryFontSize", startMenuPrimaryFontSize + "px");
  }, [startMenuPrimaryFontSize]);
  //----------------------------------------------------------------------------//
  const [startMenuPrimaryIconSize, setStartMenuPrimaryIconSize] = useState(
    getComputedStyle(root).getPropertyValue("--StartMenuPrimaryIconSize").slice(0, -2),
  );
  useEffect(() => {
    root.style.setProperty("--StartMenuPrimaryIconSize", startMenuPrimaryIconSize + "px");
  }, [startMenuPrimaryIconSize]);
  //----------------------------------------------------------------------------//
  const [startMenuPrimaryMargin, setStartMenuPrimaryMargin] = useState(
    getComputedStyle(root).getPropertyValue("--StartMenuPrimaryMargin").slice(0, -2),
  );
  useEffect(() => {
    root.style.setProperty("--StartMenuPrimaryMargin", startMenuPrimaryMargin + "px");
  }, [startMenuPrimaryMargin]);
  //----------------------------------------------------------------------------//
  const [startMenuPrimaryPadding, setStartMenuPrimaryPadding] = useState(
    getComputedStyle(root).getPropertyValue("--StartMenuPrimaryPadding").slice(0, -2),
  );
  useEffect(() => {
    root.style.setProperty("--StartMenuPrimaryPadding", startMenuPrimaryPadding + "px");
  }, [startMenuPrimaryPadding]);
  //----------------------------------------------------------------------------//
  const [startMenuPrimaryBorderColor, setStartMenuPrimaryBorderColor] = useState(
    getComputedStyle(root).getPropertyValue("--StartMenuPrimaryBorderColor"),
  );
  useEffect(() => {
    root.style.setProperty("--StartMenuPrimaryBorderColor", startMenuPrimaryBorderColor);
  }, [startMenuPrimaryBorderColor]);
  //----------------------------------------------------------------------------//
  const [startMenuPrimaryBorderWidth, setStartMenuPrimaryBorderWidth] = useState(
    getComputedStyle(root).getPropertyValue("--StartMenuPrimaryBorderWidth").slice(0, -2),
  );
  useEffect(() => {
    root.style.setProperty("--StartMenuPrimaryBorderWidth", startMenuPrimaryBorderWidth + "px");
  }, [startMenuPrimaryBorderWidth]);
  //----------------------------------------------------------------------------//
  const [startMenuPrimaryBorderRadius, setStartMenuPrimaryBorderRadius] = useState(
    getComputedStyle(root).getPropertyValue("--StartMenuPrimaryBorderRadius").slice(0, -2),
  );
  useEffect(() => {
    root.style.setProperty("--StartMenuPrimaryBorderRadius", startMenuPrimaryBorderRadius + "px");
  }, [startMenuPrimaryBorderRadius]);
  //----------------------------------------------------------------------------//
  const [startMenuPrimaryBorderType, setStartMenuPrimaryBorderType] = useState(
    getComputedStyle(root).getPropertyValue("--StartMenuPrimaryBorderType"),
  );
  useEffect(() => {
    root.style.setProperty("--StartMenuPrimaryBorderType", startMenuPrimaryBorderType);
  }, [startMenuPrimaryBorderType]);
  //----------------------------------------------------------------------------//
  //----------------------------------------------------------------------------//
  //----------------------------------------------------------------------------//
  //----------------------------------------------------------------------------//
  //----------------------------------------------------------------------------//
  const [startMenuSecondaryBkgr, setStartMenuSecondaryBkgr] = useState(
    getComputedStyle(root).getPropertyValue("--StartMenuSecondaryBkgr"),
  );
  useEffect(() => {
    root.style.setProperty("--StartMenuSecondaryBkgr", startMenuSecondaryBkgr);
  }, [startMenuSecondaryBkgr]);
  //----------------------------------------------------------------------------//
  const [startMenuSecondaryBkgrHover, setStartMenuSecondaryBkgrHover] = useState(
    getComputedStyle(root).getPropertyValue("--StartMenuSecondaryBkgrHover"),
  );
  useEffect(() => {
    root.style.setProperty("--StartMenuSecondaryBkgrHover", startMenuSecondaryBkgrHover);
  }, [startMenuSecondaryBkgrHover]);
  //----------------------------------------------------------------------------//
  const [startMenuSecondaryBkgrActive, setStartMenuSecondaryBkgrActive] = useState(
    getComputedStyle(root).getPropertyValue("--StartMenuSecondaryBkgrActive"),
  );
  useEffect(() => {
    root.style.setProperty("--StartMenuSecondaryBkgrActive", startMenuSecondaryBkgrActive);
  }, [startMenuSecondaryBkgrActive]);
  //----------------------------------------------------------------------------//
  const [startMenuSecondaryFontVisibility, setStartMenuSecondaryFontVisibility] = useState(
    getComputedStyle(root).getPropertyValue("--StartMenuSecondaryFontVisibility"),
  );
  useEffect(() => {
    root.style.setProperty("--StartMenuSecondaryFontVisibility", startMenuSecondaryFontVisibility);
  }, [startMenuSecondaryFontVisibility]);
  //----------------------------------------------------------------------------//
  const [startMenuSecondaryFontColor, setStartMenuSecondaryFontColor] = useState(
    getComputedStyle(root).getPropertyValue("--StartMenuSecondaryFontColor"),
  );
  useEffect(() => {
    root.style.setProperty("--StartMenuFontSecondaryColor", startMenuSecondaryFontColor);
  }, [startMenuSecondaryFontColor]);
  //----------------------------------------------------------------------------//
  const [startMenuSecondaryFontColorHover, setStartMenuSecondaryFontColorHover] = useState(
    getComputedStyle(root).getPropertyValue("--StartMenuSecondaryFontColorHover"),
  );
  useEffect(() => {
    root.style.setProperty("--StartMenuFontSecondaryColorHover", startMenuSecondaryFontColorHover);
  }, [startMenuSecondaryFontColorHover]);
  //----------------------------------------------------------------------------//
  const [startMenuSecondaryFontColorActive, setStartMenuSecondaryFontColorActive] = useState(
    getComputedStyle(root).getPropertyValue("--StartMenuSecondaryFontColorActive"),
  );
  useEffect(() => {
    root.style.setProperty("--StartMenuFontSecondaryColorActive", startMenuSecondaryFontColorActive);
  }, [startMenuSecondaryFontColorActive]);
  //----------------------------------------------------------------------------//
  const [startMenuSecondaryFontSize, setStartMenuSecondaryFontSize] = useState(
    getComputedStyle(root).getPropertyValue("--StartMenuSecondaryFontSize").slice(0, -2),
  );
  useEffect(() => {
    root.style.setProperty("--StartMenuSecondaryFontSize", startMenuSecondaryFontSize + "px");
  }, [startMenuSecondaryFontSize]);
  //----------------------------------------------------------------------------//
  const [startMenuSecondaryIconSize, setStartMenuSecondaryIconSize] = useState(
    getComputedStyle(root).getPropertyValue("--StartMenuSecondaryIconSize").slice(0, -2),
  );
  useEffect(() => {
    root.style.setProperty("--StartMenuSecondaryIconSize", startMenuSecondaryIconSize + "px");
  }, [startMenuSecondaryIconSize]);
  //----------------------------------------------------------------------------//
  const [startMenuSecondaryMargin, setStartMenuSecondaryMargin] = useState(
    getComputedStyle(root).getPropertyValue("--StartMenuSecondaryMargin").slice(0, -2),
  );
  useEffect(() => {
    root.style.setProperty("--StartMenuSecondaryMargin", startMenuSecondaryMargin + "px");
  }, [startMenuSecondaryMargin]);
  //----------------------------------------------------------------------------//
  const [startMenuSecondaryPadding, setStartMenuSecondaryPadding] = useState(
    getComputedStyle(root).getPropertyValue("--StartMenuSecondaryPadding").slice(0, -2),
  );
  useEffect(() => {
    root.style.setProperty("--StartMenuSecondaryPadding", startMenuSecondaryPadding + "px");
  }, [startMenuSecondaryPadding]);
  //----------------------------------------------------------------------------//
  const [startMenuSecondaryBorderColor, setStartMenuSecondaryBorderColor] = useState(
    getComputedStyle(root).getPropertyValue("--StartMenuSecondaryBorderColor"),
  );
  useEffect(() => {
    root.style.setProperty("--StartMenuSecondaryBorderColor", startMenuSecondaryBorderColor);
  }, [startMenuSecondaryBorderColor]);
  //----------------------------------------------------------------------------//
  const [startMenuSecondaryBorderWidth, setStartMenuSecondaryBorderWidth] = useState(
    getComputedStyle(root).getPropertyValue("--StartMenuSecondaryBorderWidth").slice(0, -2),
  );
  useEffect(() => {
    root.style.setProperty("--StartMenuSecondaryBorderWidth", startMenuSecondaryBorderWidth + "px");
  }, [startMenuSecondaryBorderWidth]);
  //----------------------------------------------------------------------------//
  const [startMenuSecondaryBorderRadius, setStartMenuSecondaryBorderRadius] = useState(
    getComputedStyle(root).getPropertyValue("--StartMenuSecondaryBorderRadius").slice(0, -2),
  );
  useEffect(() => {
    root.style.setProperty("--StartMenuSecondaryBorderRadius", startMenuSecondaryBorderRadius + "px");
  }, [startMenuSecondaryBorderRadius]);
  //----------------------------------------------------------------------------//
  const [startMenuSecondaryBorderType, setStartMenuSecondaryBorderType] = useState(
    getComputedStyle(root).getPropertyValue("--StartMenuSecondaryBorderType"),
  );
  useEffect(() => {
    root.style.setProperty("--StartMenuSecondaryBorderType", startMenuSecondaryBorderType);
  }, [startMenuSecondaryBorderType]);

  return (
    <>
      <fieldset>
        <legend>Start Menu</legend>
        <div>
          <label>Background Color</label>
          <ColorPicker
            color={startMenuBkgr}
            setColor={setStartMenuBkgr}
            useAlpha={true}
          />
        </div>
        <div>
          <label>Background FX:</label>
          <select
            value={theme.startMenuBackgroundFX}
            onChange={(e) => theme.setStartMenuBackgroundFX(e.target.value)}
          >{
              theme.backgroundFXList.map((fx) => (
                <option key={fx} value={fx}>{fx}</option>
              ))}
          </select>
        </div>
        <div>
          <label>Lists Direction</label>
          <select
            value={startMenuFlexDirection}
            onChange={(e) => setStartMenuFlexDirection(e.target.value)}
          >
            <option value="row">Row</option>
            <option value="row-reverse">Row Reverse</option>
            <option value="column">Column</option>
            <option value="column-reverse">Column Reverse</option>
          </select>
        </div>
        <div>
          <label>Padding</label>
          <input
            type="range"
            min="0"
            max="10"
            value={startMenuPadding}
            onChange={(e) => setStartMenuPadding(e.target.value)} />
        </div>
        <div>
          <label>Border Color</label>
          <ColorPicker
            color={startMenuBorderColor}
            setColor={setStartMenuBorderColor}
            useAlpha={true}
          />
        </div>
        <div>
          <label>Border Width</label>
          <input
            type="range"
            min="0"
            max="10"
            value={startMenuBorderWidth}
            onChange={(e) => setStartMenuBorderWidth(e.target.value)} />
        </div>
        <div>
          <label>Border Radius</label>
          <input
            type="range"
            min="0"
            max="10"
            value={startMenuBorderRadius}
            onChange={(e) => setStartMenuBorderRadius(e.target.value)} />
        </div>
        <div>
          <label>Border Type</label>
          <select
            value={startMenuBorderType}
            onChange={(e) => setStartMenuBorderType(e.target.value)}
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
        <legend>App List</legend>
        <fieldset>
          <legend>Background</legend>
          <div>
            <label>Background</label>
            <ColorPicker
              color={startMenuPrimaryBkgr}
              setColor={setStartMenuPrimaryBkgr}
              useAlpha={true}
            />
          </div>
          <div>
            <label>Hover</label>
            <ColorPicker
              color={startMenuPrimaryBkgrHover}
              setColor={setStartMenuPrimaryBkgrHover}
              useAlpha={true}
            />
          </div>
          <div>
            <label>Active</label>
            <ColorPicker
              color={startMenuPrimaryBkgrActive}
              setColor={setStartMenuPrimaryBkgrActive}
              useAlpha={true}
            />
          </div>
        </fieldset>
        <fieldset>
          <legend>Font</legend>
          <div>
            <label>Color</label>
            <ColorPicker
              color={startMenuPrimaryFontColor}
              setColor={setStartMenuPrimaryFontColor}
              useAlpha={false}
            />
          </div>
          <div>
            <label>Color Hover</label>
            <ColorPicker
              color={startMenuPrimaryFontColorHover}
              setColor={setStartMenuPrimaryFontColorHover}
              useAlpha={false}
            />
          </div>
          <div>
            <label>Color Active</label>
            <ColorPicker
              color={startMenuPrimaryFontColorActive}
              setColor={setStartMenuPrimaryFontColorActive}
              useAlpha={false}
            />
          </div>
          <div>
            <label>Font Size</label>
            <input
              type="range"
              min="0"
              max="32"
              value={startMenuPrimaryFontSize}
              onChange={(e) => setStartMenuPrimaryFontSize(e.target.value)} />
          </div>
          <div>
            <label>Icon Size</label>
            <input
              type="range"
              min="0"
              max="32"
              value={startMenuPrimaryIconSize}
              onChange={(e) => setStartMenuPrimaryIconSize(e.target.value)} />
          </div>
        </fieldset>
        <fieldset>
          <legend>Dimentions</legend>
          <div>
            <label>Padding</label>
            <input
              type="range"
              min="0"
              max="10"
              value={startMenuPrimaryPadding}
              onChange={(e) => setStartMenuPrimaryPadding(e.target.value)} />
          </div>
          <div>
            <label>Margin</label>
            <input
              type="range"
              min="0"
              max="10"
              value={startMenuPrimaryMargin}
              onChange={(e) => setStartMenuPrimaryMargin(e.target.value)} />
          </div>
        </fieldset>
        <fieldset>
          <legend>Border</legend>
          <div>
            <label>Color</label>
            <ColorPicker
              color={startMenuPrimaryBorderColor}
              setColor={setStartMenuPrimaryBorderColor}
              useAlpha={true}
            />
          </div>
          <div>
            <label>Width</label>
            <input
              type="range"
              min="0"
              max="10"
              value={startMenuPrimaryBorderWidth}
              onChange={(e) => setStartMenuPrimaryBorderWidth(e.target.value)} />
          </div>
          <div>
            <label>Radius</label>
            <input
              type="range"
              min="0"
              max="10"
              value={startMenuPrimaryBorderRadius}
              onChange={(e) => setStartMenuPrimaryBorderRadius(e.target.value)} />
          </div>
          <div>
            <label>Type</label>
            <select
              value={startMenuPrimaryBorderType}
              onChange={(e) => setStartMenuPrimaryBorderType(e.target.value)}
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
          <legend>System List</legend>
          <fieldset>
            <legend>Background</legend>
            <div>
              <label>Background</label>
              <ColorPicker
                color={startMenuSecondaryBkgr}
                setColor={setStartMenuSecondaryBkgr}
                useAlpha={true}
              />
            </div>
            <div>
              <label>Hover</label>
              <ColorPicker
                color={startMenuSecondaryBkgrHover}
                setColor={setStartMenuSecondaryBkgrHover}
                useAlpha={true}
              />
            </div>
            <div>
              <label>Active</label>
              <ColorPicker
                color={startMenuSecondaryBkgrActive}
                setColor={setStartMenuSecondaryBkgrActive}
                useAlpha={true}
              />
            </div>
          </fieldset>
          <fieldset>
            <legend>Font</legend>
            <div>
              <label>Visibility</label>
              <select
                value={startMenuSecondaryFontVisibility}
                onChange={(e) => setStartMenuSecondaryFontVisibility(e.target.value)}
              >
                <option value="visible">visible</option>
                <option value="none">hidden</option>
              </select>
            </div>
            <div>
              <label>Color</label>
              <ColorPicker
                color={startMenuSecondaryFontColor}
                setColor={setStartMenuSecondaryFontColor}
                useAlpha={false}
              />
            </div>
            <div>
              <label>Color Hover</label>
              <ColorPicker
                color={startMenuSecondaryFontColorHover}
                setColor={setStartMenuSecondaryFontColorHover}
                useAlpha={false}
              />
            </div>
            <div>
              <label>Color Active</label>
              <ColorPicker
                color={startMenuSecondaryFontColorActive}
                setColor={setStartMenuSecondaryFontColorActive}
                useAlpha={false}
              />
            </div>
            <div>
              <label>Font Size</label>
              <input
                type="range"
                min="0"
                max="32"
                value={startMenuSecondaryFontSize}
                onChange={(e) => setStartMenuSecondaryFontSize(e.target.value)} />
            </div>
            <div>
              <label>Icon Size</label>
              <input
                type="range"
                min="0"
                max="32"
                value={startMenuSecondaryIconSize}
                onChange={(e) => setStartMenuSecondaryIconSize(e.target.value)} />
            </div>
          </fieldset>
          <fieldset>
            <legend>Dimentions</legend>
            <div>
              <label>Padding</label>
              <input
                type="range"
                min="0"
                max="10"
                value={startMenuSecondaryPadding}
                onChange={(e) => setStartMenuSecondaryPadding(e.target.value)} />
            </div>
            <div>
              <label>Margin</label>
              <input
                type="range"
                min="0"
                max="10"
                value={startMenuSecondaryMargin}
                onChange={(e) => setStartMenuSecondaryMargin(e.target.value)} />
            </div>
          </fieldset>
          <fieldset>
            <legend>Border</legend>
            <div>
              <label>Color</label>
              <ColorPicker
                color={startMenuSecondaryBorderColor}
                setColor={setStartMenuSecondaryBorderColor}
                useAlpha={true}
              />
            </div>
            <div>
              <label>Width</label>
              <input
                type="range"
                min="0"
                max="10"
                value={startMenuSecondaryBorderWidth}
                onChange={(e) => setStartMenuSecondaryBorderWidth(e.target.value)} />
            </div>
            <div>
              <label>Radius</label>
              <input
                type="range"
                min="0"
                max="10"
                value={startMenuSecondaryBorderRadius}
                onChange={(e) => setStartMenuSecondaryBorderRadius(e.target.value)} />
            </div>
            <div>
              <label>Type</label>
              <select
                value={startMenuSecondaryBorderType}
                onChange={(e) => setStartMenuSecondaryBorderType(e.target.value)}
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
      </fieldset>
    </>
  )
};