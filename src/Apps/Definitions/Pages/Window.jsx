//Allows to change the style of individual tasks windows

import { useState, useEffect } from "react";
import { FcGlobe } from "react-icons/fc";
import {
  FaRegWindowMinimize,
  FaWindowRestore,
  FaWindowMaximize,
} from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

import ColorPicker from "../../../System/GlobalComponents/ColorPicker/ColorPicker.jsx";


export const WindowPreview = () => {
  return (
    <>
      <app-window
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          width: "80%",
          height: "120px",
          background: "var(--WindowBkgrInactive)",
          borderColor: "var(--WindowBorderColorInactive)"
        }}
        className="app appInactive"
      >
        <app-top-bar
          style={{
            color: "var(--WindowFontColorInactive)",
            background: "var(--WindowTopBarBkgrInactive)"
          }}>
          <FcGlobe />
          <h1>Inactive</h1>
          <button>
            <FaRegWindowMinimize className="appTopBarButton" />
          </button>
          <button>
            <FaWindowMaximize className="appTopBarButton" />
          </button>
          <button>
            <AiOutlineClose className="appTopBarButton appClose" />
          </button>
        </app-top-bar>
      </app-window>
      <app-window
        style={{
          position: "absolute",
          top: "50px",
          left: "60px",
          width: "80%",
          height: "120px",
          background: "var(--WindowBkgr)"
        }}
        className="app"
      >
        <app-top-bar
          style={{
            color: "var(--WindowFontColor)",
            background: "var(--WindowTopBarBkgr)"
          }}>
          <FcGlobe />
          <h1>Active</h1>
          <button>
            <FaRegWindowMinimize />
          </button>
          <button>
            <FaWindowMaximize />
          </button>
          <button className="buttonActiveRed">
            <AiOutlineClose />
          </button>
        </app-top-bar>
      </app-window>
      <app-dialog
        style={{
          position: "absolute",
          top: "100px",
          left: "320px",
        }}
      >
        <app-dialog-top-bar>
          Dialog
        </app-dialog-top-bar>
        <app-dialog-info>
          Information
        </app-dialog-info>
        <app-dialog-actions>
          <button>Ok</button>
          <button>Cancel</button>
          <button className="buttonActiveRed">Close</button>
        </app-dialog-actions>
      </app-dialog>
    </>
  );
};

export const Window = () => {
  var root = document.querySelector(":root");
  const [fontSize, setFontSize] = useState(
    getComputedStyle(root).getPropertyValue("--WindowTopBarFontSize").slice(0, -2),
  );
  const [fontColor, setFontColor] = useState(
    getComputedStyle(root).getPropertyValue("--WindowFontColor"),
  );
  const [bkgColor, setBkgColor] = useState(
    getComputedStyle(root).getPropertyValue("--WindowBkgr"),
  );
  const [topbarBkgColor, setTopbarBkgColor] = useState(
    getComputedStyle(root).getPropertyValue("--WindowTopBarBkgr"),
  );
  const [topBarHeight, setTopBarHeight] = useState(
    getComputedStyle(root).getPropertyValue("--WindowTopBarHeight").slice(0, -2),
  );
  const [topBarIconSize, setTopBarIconSize] = useState(
    getComputedStyle(root).getPropertyValue("--WindowTopBarIconSize").slice(0, -2),
  );
  const [borderWidth, setBorderWidth] = useState(
    getComputedStyle(root).getPropertyValue("--WindowBorderWidth").slice(0, -2),
  );
  const [borderRadius, setBorderRadius] = useState(
    getComputedStyle(root).getPropertyValue("--WindowBorderRadius").slice(0, -2),
  );
  const [borderType, setBorderType] = useState(
    getComputedStyle(root).getPropertyValue("--WindowBorderType"),
  );
  const [borderColor, setBorderColor] = useState(
    getComputedStyle(root).getPropertyValue("--WindowBorderColor"),
  );
  const [shadowXOffset, setShadowXOffset] = useState(
    getComputedStyle(root).getPropertyValue("--WindowShadowXOffset").slice(0, -2),
  );
  const [shadowYOffset, setShadowYOffset] = useState(
    getComputedStyle(root).getPropertyValue("--WindowShadowYOffset").slice(0, -2),
  );
  const [shadowBlur, setShadowBlur] = useState(
    getComputedStyle(root).getPropertyValue("--WindowShadowBlur").slice(0, -2),
  );
  const [shadowSpread, setShadowSpread] = useState(
    getComputedStyle(root).getPropertyValue("--WindowShadowSpread").slice(0, -2),
  );
  const [shadowColor, setShadowColor] = useState(
    getComputedStyle(root).getPropertyValue("--WindowShadowColor"),
  );
  const [inactiveBorderColor, setInactiveBorderColor] = useState(
    getComputedStyle(root).getPropertyValue("--WindowBorderColorInactive"),
  );
  const [inactiveTopBarBkgColor, setInactiveTopBarBkgColor] = useState(
    getComputedStyle(root).getPropertyValue("--WindowTopBarBkgrInactive"),
  );
  const [inactiveFontColor, setInactiveFontColor] = useState(
    getComputedStyle(root).getPropertyValue("--WindowFontColorInactive"),
  );
  const [inactiveBkgColor, setInactiveBkgColor] = useState(
    getComputedStyle(root).getPropertyValue("--WindowBkgrInactive"),
  );
  const [dialogBkgr, setDialogBkgr] = useState(
    getComputedStyle(root).getPropertyValue("--DialogBkgr"),
  );
  const [dialogBorderColor, setDialogBorderColor] = useState(
    getComputedStyle(root).getPropertyValue("--DialogBorderColor"),
  );
  const [dialogBorderWidth, setDialogBorderWidth] = useState(
    getComputedStyle(root).getPropertyValue("--DialogBorderWidth").slice(0, -2),
  );
  const [dialogBorderRadius, setDialogBorderRadius] = useState(
    getComputedStyle(root).getPropertyValue("--DialogBorderRadius").slice(0, -2),
  );
  const [dialogBorderType, setDialogBorderType] = useState(
    getComputedStyle(root).getPropertyValue("--DialogBorderType"),
  );
  const [dialogInfoFontColor, setDialogInfoFontColor] = useState(
    getComputedStyle(root).getPropertyValue("--DialogInfoFontColor"),
  );
  const [dialogInfoFontSize, setDialogInfoFontSize] = useState(
    getComputedStyle(root).getPropertyValue("--DialogInfoFontSize").slice(0, -2),
  );
  const [dialogTopBarBkgr, setDialogTopBarBkgr] = useState(
    getComputedStyle(root).getPropertyValue("--DialogTopBarBkgr"),
  );
  const [dialogTopBarFontSize, setDialogTopBarFontSize] = useState(
    getComputedStyle(root).getPropertyValue("--DialogTopBarFontSize").slice(0, -2),
  );
  const [dialogTopBarFontColor, setDialogTopBarFontColor] = useState(
    getComputedStyle(root).getPropertyValue("--DialogTopBarFontColor"),
  );
  const [dialogButtonBkgr, setDialogButtonBkgr] = useState(
    getComputedStyle(root).getPropertyValue("--DialogButtonBkgr"),
  );
  const [dialogButtonFontColor, setDialogButtonFontColor] = useState(
    getComputedStyle(root).getPropertyValue("--DialogButtonFontColor"),
  );
  const [dialogButtonFontSize, setDialogButtonFontSize] = useState(
    getComputedStyle(root).getPropertyValue("--DialogButtonFontSize").slice(0, -2),
  );
  const [dialogButtonBorderColor, setDialogButtonBorderColor] = useState(
    getComputedStyle(root).getPropertyValue("--DialogButtonBorderColor"),
  );
  const [dialogButtonBorderWidth, setDialogButtonBorderWidth] = useState(
    getComputedStyle(root).getPropertyValue("--DialogButtonBorderWidth").slice(0, -2),
  );
  const [dialogButtonBorderRadius, setDialogButtonBorderRadius] = useState(
    getComputedStyle(root).getPropertyValue("--DialogButtonBorderRadius").slice(0, -2),
  );
  const [dialogButtonBorderType, setDialogButtonBorderType] = useState(
    getComputedStyle(root).getPropertyValue("--DialogButtonBorderType"),
  )
  useEffect(() => {
    root.style.setProperty("--WindowTopBarFontSize", fontSize + "px");
    root.style.setProperty("--WindowFontColor", fontColor);
    root.style.setProperty("--WindowBkgr", bkgColor);
    root.style.setProperty("--WindowTopBarBkgr", topbarBkgColor);
    root.style.setProperty("--WindowTopBarHeight", topBarHeight + "px");
    root.style.setProperty(
      "--WindowTopBarBkgrInactive",
      inactiveTopBarBkgColor,
    );
    root.style.setProperty("--WindowTopBarIconSize", topBarIconSize + "px");
    root.style.setProperty("--WindowBorderWidth", borderWidth + "px");
    root.style.setProperty("--WindowBorderRadius", borderRadius + "px");
    root.style.setProperty("--WindowBorderType", borderType);
    root.style.setProperty("--WindowBorderColor", borderColor);
    root.style.setProperty("--WindowBorderColorInactive", inactiveBorderColor);
    root.style.setProperty("--WindowFontColorInactive", inactiveFontColor);
    root.style.setProperty("--WindowBkgrInactive", inactiveBkgColor);
    root.style.setProperty("--DialogBkgr", dialogBkgr);
    root.style.setProperty("--DialogBorderColor", dialogBorderColor);
    root.style.setProperty("--DialogBorderWidth", dialogBorderWidth + "px");
    root.style.setProperty("--DialogBorderRadius", dialogBorderRadius + "px");
    root.style.setProperty("--DialogBorderType", dialogBorderType);
    root.style.setProperty("--DialogInfoFontColor", dialogInfoFontColor);
    root.style.setProperty("--DialogInfoFontSize", dialogInfoFontSize + "px");
    root.style.setProperty("--DialogTopBarBkgr", dialogTopBarBkgr);
    root.style.setProperty("--DialogTopBarFontSize", dialogTopBarFontSize + "px");
    root.style.setProperty("--DialogTopBarFontColor", dialogTopBarFontColor);
    root.style.setProperty("--DialogButtonBkgr", dialogButtonBkgr);
    root.style.setProperty("--DialogButtonFontColor", dialogButtonFontColor);
    root.style.setProperty("--DialogButtonFontSize", dialogButtonFontSize + "px");
    root.style.setProperty("--DialogButtonBorderColor", dialogButtonBorderColor);
    root.style.setProperty("--DialogButtonBorderWidth", dialogButtonBorderWidth + "px");
    root.style.setProperty("--DialogButtonBorderRadius", dialogButtonBorderRadius + "px");
    root.style.setProperty("--DialogButtonBorderType", dialogButtonBorderType);
    root.style.setProperty("--WindowShadowXOffset", shadowXOffset + "px");
    root.style.setProperty("--WindowShadowYOffset", shadowYOffset + "px");
    root.style.setProperty("--WindowShadowBlur", shadowBlur + "px");
    root.style.setProperty("--WindowShadowColor", shadowColor);
    root.style.setProperty("--WindowShadowSpread", shadowSpread + "px");
  }, [
    fontSize,
    fontColor,
    bkgColor,
    topbarBkgColor,
    topBarHeight,
    topBarIconSize,
    borderColor,
    borderWidth,
    borderRadius,
    borderType,
    shadowXOffset,
    shadowYOffset,
    shadowBlur,
    shadowSpread,
    shadowColor,
    inactiveTopBarBkgColor,
    inactiveFontColor,
    inactiveBkgColor,
    inactiveBorderColor,
    dialogBkgr,
    dialogBorderColor,
    dialogBorderWidth,
    dialogBorderRadius,
    dialogBorderType,
    dialogInfoFontColor,
    dialogInfoFontSize,
    dialogTopBarBkgr,
    dialogTopBarFontSize,
    dialogTopBarFontColor,
    dialogButtonBkgr,
    dialogButtonFontColor,
    dialogButtonFontSize,
    dialogButtonBorderColor,
    dialogButtonBorderWidth,
    dialogButtonBorderRadius,
    dialogButtonBorderType,
  ]);
  return (
    <>
      <fieldset>
        <legend>Window</legend>
        <fieldset>
          <legend>Top Bar Dimentions</legend>
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
            <label>Border Radius:</label>
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
            <label>Background Color: </label>
            <ColorPicker
              color={bkgColor}
              setColor={setBkgColor}
              useAlpha={false}
            />
          </div>
          <div>
            <label>Top Bar Background Color: </label>
            <ColorPicker
              color={topbarBkgColor}
              setColor={setTopbarBkgColor}
              useAlpha={false}
            />
          </div>
          <div>
            <label>Top Bar Font Color: </label>
            <ColorPicker
              color={fontColor}
              setColor={setFontColor}
              useAlpha={false}
            />
          </div>
          <div>
            <label>Border Color: </label>
            <ColorPicker
              color={borderColor}
              setColor={setBorderColor}
              useAlpha={false}
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
              useAlpha={false}
            />
          </div>
          <div>
            <label>Top Bar Font Color: </label>
            <ColorPicker
              color={inactiveFontColor}
              setColor={setInactiveFontColor}
              useAlpha={false}
            />
          </div>
          <div>
            <label>Background Color: </label>
            <ColorPicker
              color={inactiveBkgColor}
              setColor={setInactiveBkgColor}
              useAlpha={false}
            />
          </div>
          <div>
            <label>Border Color: </label>
            <ColorPicker
              color={inactiveBorderColor}
              setColor={setInactiveBorderColor}
              useAlpha={false}
            />
          </div>
        </fieldset>
      </fieldset>
      <fieldset>
        <legend>Dialog Window</legend>
        <div>
          <label>Background Color: </label>
          <ColorPicker
            color={dialogBkgr}
            setColor={setDialogBkgr}
            useAlpha={false}
          />
        </div>
        <fieldset>
          <legend>Border</legend>
          <div>
            <label>Color: </label>
            <ColorPicker
              color={dialogBorderColor}
              setColor={setDialogBorderColor}
              useAlpha={false}
            />
          </div>
          <div>
            <label>Thickness: </label>
            <input
              type="range"
              min={1}
              max={10}
              step="1"
              value={dialogBorderWidth}
              onChange={(e) => setDialogBorderWidth(e.target.value)}
            />
          </div>
          <div>
            <label>Corner Curvature: </label>
            <input
              type="range"
              min={1}
              max={10}
              step="1"
              value={dialogBorderRadius}
              onChange={(e) => setDialogBorderRadius(e.target.value)}
            />
          </div>
          <div>
            <label>Type: </label>
            <select
              value={dialogBorderType}
              onChange={(e) => setDialogBorderType(e.target.value)}
            >
              <option value="solid">Solid</option>
              <option value="dashed">Dashed</option>
              <option value="dotted">Dotted</option>
              <option value="double">Double</option>
              <option value="groove">Groove</option>
              <option value="ridge">Ridge</option>
              <option value="inset">Inset</option>
              <option value="outset">Outset</option>
            </select>
          </div>
        </fieldset>
        <fieldset>
          <legend>Top Bar</legend>
          <div>
            <label>Background:</label>
            <ColorPicker
              color={dialogTopBarBkgr}
              setColor={setDialogTopBarBkgr}
              useAlpha={false}
            />
          </div>
          <div>
            <label>Font Color:</label>
            <ColorPicker
              color={dialogTopBarFontColor}
              setColor={setDialogTopBarFontColor}
              useAlpha={false}
            />
          </div>
          <div>
            <label>Font Size:</label>
            <input
              type="range"
              min={12}
              max={60}
              step="1"
              value={dialogTopBarFontSize}
              onChange={(e) => setDialogTopBarFontSize(e.target.value)}
            />
          </div>
        </fieldset>
        <fieldset>
          <legend>Text</legend>
          <div>
            <label>Font Size: </label>
            <input
              type="range"
              min={12}
              max={60}
              step="1"
              value={dialogInfoFontSize}
              onChange={(e) => setDialogInfoFontSize(e.target.value)}
            />
          </div>
          <div>
            <label>Font Color:</label>
            <ColorPicker
              color={dialogInfoFontColor}
              setColor={setDialogInfoFontColor}
              useAlpha={false}
            />
          </div>
        </fieldset>
        <fieldset>
          <legend>Button</legend>
          <div>
            <label>Background:</label>
            <ColorPicker
              color={dialogButtonBkgr}
              setColor={setDialogButtonBkgr}
              useAlpha={false}
            />
          </div>
          <div>
            <label>Font Color:</label>
            <ColorPicker
              color={dialogButtonFontColor}
              setColor={setDialogButtonFontColor}
              useAlpha={false}
            />
          </div>
          <div>
            <label>Font Size:</label>
            <input
              type="range"
              min={12}
              max={60}
              step="1"
              value={dialogButtonFontSize}
              onChange={(e) => setDialogButtonFontSize(e.target.value)}
            />
          </div>
          <div>
            <label>Border Color:</label>
            <ColorPicker
              color={dialogButtonBorderColor}
              setColor={setDialogButtonBorderColor}
              useAlpha={false}
            />
          </div>
          <div>
            <label>Border Width:</label>
            <input
              type="range"
              min={1}
              max={10}
              step="1"
              value={dialogButtonBorderWidth}
              onChange={(e) => setDialogButtonBorderWidth(e.target.value)}
            />
          </div>
          <div>
            <label>Border Radius:</label>
            <input
              type="range"
              min={1}
              max={10}
              step="1"
              value={dialogButtonBorderRadius}
              onChange={(e) => setDialogButtonBorderRadius(e.target.value)}
            />
          </div>
          <div>
            <label>Border Style:</label>
            <select
              value={dialogButtonBorderType}
              onChange={(e) => setDialogButtonBorderType(e.target.value)}
            >
              <option value="solid">Solid</option>
              <option value="dashed">Dashed</option>
              <option value="dotted">Dotted</option>
              <option value="double">Double</option>
              <option value="groove">Groove</option>
              <option value="ridge">Ridge</option>
              <option value="inset">Inset</option>
              <option value="outset">Outset</option>
            </select>
          </div>
        </fieldset>
      </fieldset >
    </>
  );
};
