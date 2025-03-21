import { useState, useEffect, useContext } from "react";

import { ThemeContext } from "../../../../System/ThemeManager/context.jsx";
import ColorPicker from "../../../../System/GlobalComponents/ColorPicker/ColorPicker.jsx";

export const DialogPreview = () => {
  const themeContext = useContext(ThemeContext);
  const [buttonClassNeutral, setButtonClassNeutral] = useState("appDialogButtonFluent");
  const [buttonClassSuggested, setButtonClassSuggested] = useState("appDialogButtonFluent");
  const [buttonClassClose, setButtonClassClose] = useState("appDialogButtonFluent buttonActiveRed");
  useEffect(() => {
    switch (themeContext.dialogButtonTheme) {
      case "Aero":
        setButtonClassNeutral("appDialogButtonAero");
        setButtonClassSuggested("appDialogButtonAero");
        setButtonClassClose("appDialogButtonAero");
        break;
      case "Aqua":
        setButtonClassNeutral("appDialogButtonAqua appDialogButtonAquaNeutral");
        setButtonClassSuggested("appDialogButtonAqua appDialogButtonAquaBlue");
        setButtonClassClose("appDialogButtonAqua appDialogButtonAquaRed");
        break;
      case "Classic":
        setButtonClassNeutral("appDialogButtonClassic");
        setButtonClassSuggested("appDialogButtonClassic");
        setButtonClassClose("appDialogButtonClassic");
        break;
      default:
        setButtonClassNeutral("appDialogButtonFluent");
        setButtonClassSuggested("appDialogButtonFluent");
        setButtonClassClose("appDialogButtonFluent buttonActiveRed");
        break;
    }
  }, [themeContext.dialogButtonTheme]);

  const setButtonClass = (name) => {
    switch (name) {
      case "Close":
        return buttonClassClose;
      case "Save":
      case "Ok":
        return buttonClassSuggested;
      default:
        return buttonClassNeutral;
    }
  }

  const DialogButtonsBar = () => 
    <app-dialog-actions>
      <button className={setButtonClass("Ok")}>Ok</button>
      <button className={setButtonClass("Cancel")}>Cancel</button>
      <button className={setButtonClass("Close")}>Close</button>
    </app-dialog-actions>
  ;

  return (
    <>
      <app-dialog
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <app-dialog-top-bar>
          Dialog
        </app-dialog-top-bar>
        <app-dialog-info
          style={{
            marginBottom: themeContext.dialogButtonsLocation === "in window" ? "0px" : "var(--DialogPadding)"
           }}
        >
          <p>Information</p>
        {themeContext.dialogButtonsLocation === "in info container" && <DialogButtonsBar />}
        </app-dialog-info>
        {themeContext.dialogButtonsLocation === "in window" && <DialogButtonsBar />}
      </app-dialog>
    </>
  );
};

export const Dialog = () => {
  const themeContext = useContext(ThemeContext);
  var root = document.querySelector(":root");
  //----------------------------------------------------------------------------//
  const [dialogBkgrColor, setDialogBkgrColor] = useState(
    getComputedStyle(root).getPropertyValue("--DialogBkgrColor"),
  );
  useEffect(() => {
    root.style.setProperty("--DialogBkgrColor", dialogBkgrColor);
  }, [dialogBkgrColor]);
  //----------------------------------------------------------------------------//
  const [dialogBorderColor, setDialogBorderColor] = useState(
    getComputedStyle(root).getPropertyValue("--DialogBorderColor"),
  );
  useEffect(() => {
    root.style.setProperty("--DialogBorderColor", dialogBorderColor);
  }, [dialogBorderColor]);
  //----------------------------------------------------------------------------//
  const [dialogBorderWidth, setDialogBorderWidth] = useState(
    getComputedStyle(root).getPropertyValue("--DialogBorderWidth").slice(0, -2),
  );
  useEffect(() => {
    root.style.setProperty("--DialogBorderWidth", dialogBorderWidth + "px");
  }, [dialogBorderWidth]);
  //----------------------------------------------------------------------------//
  const [dialogBorderRadius, setDialogBorderRadius] = useState(
    getComputedStyle(root).getPropertyValue("--DialogBorderRadius").slice(0, -2),
  );
  useEffect(() => {
    root.style.setProperty("--DialogBorderRadius", dialogBorderRadius + "px");
  }, [dialogBorderRadius]);
  //----------------------------------------------------------------------------//
  const [dialogBorderType, setDialogBorderType] = useState(
    getComputedStyle(root).getPropertyValue("--DialogBorderType"),
  );
  useEffect(() => {
    root.style.setProperty("--DialogBorderType", dialogBorderType);
  }, [dialogBorderType]);
  //----------------------------------------------------------------------------//
  const [dialogInfoBkgr, setDialogInfoBkgr] = useState(
    getComputedStyle(root).getPropertyValue("--DialogInfoBkgr"),
  );
  useEffect(() => {
    root.style.setProperty("--DialogInfoBkgr", dialogInfoBkgr);
  }, [dialogInfoBkgr]);
  //----------------------------------------------------------------------------//
  const [dialogInfoFontColor, setDialogInfoFontColor] = useState(
    getComputedStyle(root).getPropertyValue("--DialogInfoFontColor"),
  );
  useEffect(() => {
    root.style.setProperty("--DialogInfoFontColor", dialogInfoFontColor);
  }, [dialogInfoFontColor]);
  //----------------------------------------------------------------------------//
  const [dialogInfoFontSize, setDialogInfoFontSize] = useState(
    getComputedStyle(root).getPropertyValue("--DialogInfoFontSize").slice(0, -2),
  );
  useEffect(() => {
    root.style.setProperty("--DialogInfoFontSize", dialogInfoFontSize + "px");
  }, [dialogInfoFontSize]);
  //----------------------------------------------------------------------------//
  const [dialogInfoBorderColor, setDialogInfoBorderColor] = useState(
    getComputedStyle(root).getPropertyValue("--DialogInfoBorderColor"),
  )
  useEffect(() => {
    root.style.setProperty("--DialogInfoBorderColor", dialogInfoBorderColor);
  }, [dialogInfoBorderColor]);
  //----------------------------------------------------------------------------//
  const [dialogInfoBorderWidth, setDialogInfoBorderWidth] = useState(
    getComputedStyle(root).getPropertyValue("--DialogInfoBorderWidth").slice(0, -2),
  );
  useEffect(() => {
    root.style.setProperty("--DialogInfoBorderWidth", dialogInfoBorderWidth + "px");
  }, [dialogInfoBorderWidth]);
  //----------------------------------------------------------------------------//
  const [dialogInfoBorderRadius, setDialogInfoBorderRadius] = useState(
    getComputedStyle(root).getPropertyValue("--DialogInfoBorderRadius").slice(0, -2),
  );
  useEffect(() => {
    root.style.setProperty("--DialogInfoBorderRadius", dialogInfoBorderRadius + "px");
  }, [dialogInfoBorderRadius]);
  //----------------------------------------------------------------------------//
  const [dialogInfoBorderType, setDialogInfoBorderType] = useState(
    getComputedStyle(root).getPropertyValue("--DialogInfoBorderType"),
  );
  useEffect(() => {
    root.style.setProperty("--DialogInfoBorderType", dialogInfoBorderType);
  }, [dialogInfoBorderType]);
  //----------------------------------------------------------------------------//
  const [dialogPadding, setDialogPadding] = useState(
    getComputedStyle(root).getPropertyValue("--DialogPadding").slice(0, -2),
  );
  useEffect(() => {
    root.style.setProperty("--DialogPadding", dialogPadding + "px");
  }, [dialogPadding]);
  //----------------------------------------------------------------------------//
  const [dialogTopBarBkgr, setDialogTopBarBkgr] = useState(
    getComputedStyle(root).getPropertyValue("--DialogTopBarBkgr"),
  );
  useEffect(() => {
    root.style.setProperty("--DialogTopBarBkgr", dialogTopBarBkgr);
  }, [dialogTopBarBkgr]);
  //----------------------------------------------------------------------------//
  const [dialogTopBarFontSize, setDialogTopBarFontSize] = useState(
    getComputedStyle(root).getPropertyValue("--DialogTopBarFontSize").slice(0, -2),
  );
  useEffect(() => {
    root.style.setProperty("--DialogTopBarFontSize", dialogTopBarFontSize + "px");
  }, [dialogTopBarFontSize]);
  //----------------------------------------------------------------------------//
  const [dialogTopBarFontColor, setDialogTopBarFontColor] = useState(
    getComputedStyle(root).getPropertyValue("--DialogTopBarFontColor"),
  );
  useEffect(() => {
    root.style.setProperty("--DialogTopBarFontColor", dialogTopBarFontColor);
  }, [dialogTopBarFontColor]);
  //----------------------------------------------------------------------------//
  const [dialogButtonBarBkgr, setDialogButtonBarBkgr] = useState(
    getComputedStyle(root).getPropertyValue("--DialogButtonBarBkgr"),
  );
  useEffect(() => {
    root.style.setProperty("--DialogButtonBarBkgr", dialogButtonBarBkgr);
  }, [dialogButtonBarBkgr]);
  //----------------------------------------------------------------------------//
  const [dialogButtonBkgr, setDialogButtonBkgr] = useState(
    getComputedStyle(root).getPropertyValue("--DialogButtonBkgr"),
  );
  useEffect(() => {
    root.style.setProperty("--DialogButtonBkgr", dialogButtonBkgr);
  }, [dialogButtonBkgr]);
  //----------------------------------------------------------------------------//
  const [dialogButtonFontColor, setDialogButtonFontColor] = useState(
    getComputedStyle(root).getPropertyValue("--DialogButtonFontColor"),
  );
  useEffect(() => {
    root.style.setProperty("--DialogButtonFontColor", dialogButtonFontColor);
  }, [dialogButtonFontColor]);
  //----------------------------------------------------------------------------//
  const [dialogButtonFontSize, setDialogButtonFontSize] = useState(
    getComputedStyle(root).getPropertyValue("--DialogButtonFontSize").slice(0, -2),
  );
  useEffect(() => {
    root.style.setProperty("--DialogButtonFontSize", dialogButtonFontSize + "px");
  }, [dialogButtonFontSize]);
  //----------------------------------------------------------------------------//
  const [dialogButtonBorderColor, setDialogButtonBorderColor] = useState(
    getComputedStyle(root).getPropertyValue("--DialogButtonBorderColor"),
  );
  useEffect(() => {
    root.style.setProperty("--DialogButtonBorderColor", dialogButtonBorderColor);
  }, [dialogButtonBorderColor]);
  //----------------------------------------------------------------------------//
  const [dialogButtonBorderWidth, setDialogButtonBorderWidth] = useState(
    getComputedStyle(root).getPropertyValue("--DialogButtonBorderWidth").slice(0, -2),
  );
  useEffect(() => {
    root.style.setProperty("--DialogButtonBorderWidth", dialogButtonBorderWidth + "px");
  }, [dialogButtonBorderWidth]);
  //----------------------------------------------------------------------------//
  const [dialogButtonBorderRadius, setDialogButtonBorderRadius] = useState(
    getComputedStyle(root).getPropertyValue("--DialogButtonBorderRadius").slice(0, -2),
  );
  useEffect(() => {
    root.style.setProperty("--DialogButtonBorderRadius", dialogButtonBorderRadius + "px");
  }, [dialogButtonBorderRadius]);
  //----------------------------------------------------------------------------//
  const [dialogButtonBorderType, setDialogButtonBorderType] = useState(
    getComputedStyle(root).getPropertyValue("--DialogButtonBorderType"),
  );
  useEffect(() => {
    root.style.setProperty("--DialogButtonBorderType", dialogButtonBorderType);
  }, [dialogButtonBorderType]);
  //----------------------------------------------------------------------------//

  return (

    <fieldset>
      <legend>Dialog Window</legend>
      <div>
        <label>Background Color: </label>
        <ColorPicker
          color={dialogBkgrColor}
          setColor={setDialogBkgrColor}
          useAlpha={true}
        />
      </div>
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
        <legend>Border</legend>
        <div>
          <label>Color: </label>
          <ColorPicker
            color={dialogBorderColor}
            setColor={setDialogBorderColor}
            useAlpha={true}
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
            max={25}
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
            useAlpha={true}
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
        <legend>Info</legend>
        <div>
          <label>Background:</label>
          <ColorPicker
            color={dialogInfoBkgr}
            setColor={setDialogInfoBkgr}
            useAlpha={true}
          />
        </div>
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
        <fieldset>
          <legend>Border</legend>
          <div>
            <label>Color: </label>
            <ColorPicker
              color={dialogInfoBorderColor}
              setColor={setDialogInfoBorderColor}
              useAlpha={true}
            />
          </div>
          <div>
            <label>Thickness: </label>
            <input
              type="range"
              min={0}
              max={10}
              step="1"
              value={dialogInfoBorderWidth}
              onChange={(e) => setDialogInfoBorderWidth(e.target.value)}
            />
          </div>
          <div>
            <label>Corner Curvature: </label>
            <input
              type="range"
              min={0}
              max={12}
              step="1"
              value={dialogInfoBorderRadius}
              onChange={(e) => setDialogInfoBorderRadius(e.target.value)}
            />
          </div>
          <div>
            <label>Type: </label>
            <select
              value={dialogInfoBorderType}
              onChange={(e) => setDialogInfoBorderType(e.target.value)}
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
          <div>
            <label>Margin Distance</label>
            <input
              type="range"
              min={0}
              max={10}
              step="1"
              value={dialogPadding}
              onChange={(e) => setDialogPadding(e.target.value)}
            />
          </div>
        </fieldset>
      </fieldset>
      <fieldset>
        <legend>Button</legend>
        <div>
          <label>Location: </label>
          <select
            value={themeContext.dialogButtonsLocation}
            onChange={(e) => themeContext.setDialogButtonsLocation(e.target.value)}
          >
            {themeContext.dialogButtonsLocationList.map((buttonLocation) => (
              <option key={buttonLocation} value={buttonLocation}>
                {buttonLocation}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Theme:</label>
          <select
            value={themeContext.dialogButtonTheme}
            onChange={(e) => themeContext.setDialogButtonTheme(e.target.value)}
          >
            {themeContext.dialogButtonThemeList.map((buttonTheme) => (
              <option key={buttonTheme} value={buttonTheme}>
                {buttonTheme}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Bar Background Color:</label>
          <ColorPicker
            color={dialogButtonBarBkgr}
            setColor={setDialogButtonBarBkgr}
            useAlpha={true}
          />
        </div>
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
            max={25}
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
    </fieldset>
  );
}