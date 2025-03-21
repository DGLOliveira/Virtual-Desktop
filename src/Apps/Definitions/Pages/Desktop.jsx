//Allows changing desktop shortcuts and background, relying on BackgroundContext

import { useState, useEffect, useContext } from "react";
import { BackgroundContext } from "../../../System/Desktop/BackgroundContext.js";
import { FcGlobe } from "react-icons/fc";

import ColorPicker from "../../../System/GlobalComponents/ColorPicker/ColorPicker.jsx";

export const DesktopPreview = () => {
  return (
    <>
      <div className="desktopShortcut" style={{ zIndex: 1 }}>
        <FcGlobe className="desktopIcon" />
        Shortcut
      </div>
    </>
  );
};

export const Desktop = () => {
  const background = useContext(BackgroundContext);
  const [backgroundMenu, setBackgroundMenu] = useState(background.state.active);
  var root = document.querySelector(":root");

  const [desktopBkgrColor, setDesktopBkgrColor] = useState(
    getComputedStyle(root).getPropertyValue("--DesktopBkgrColor"),
  );
  useEffect(() => {
    root.style.setProperty("--DesktopBkgrColor", desktopBkgrColor);
  },[desktopBkgrColor]);
    //----------------------------------------------------------------------------//
  const [desktopBkgrImage, setDesktopBkgrImage] = useState(
    getComputedStyle(root).getPropertyValue("--DesktopBkgrImage"),
  );
  useEffect(() => {
    root.style.setProperty("--DesktopBkgrImage", desktopBkgrImage);
  },[desktopBkgrImage]);
  //----------------------------------------------------------------------------//
  const [desktopBkgrSize, setDesktopBkgrSize] = useState(
    getComputedStyle(root).getPropertyValue("--DesktopBkgrSize"),
  );
  useEffect(() => {
    root.style.setProperty("--DesktopBkgrSize", desktopBkgrSize);
  },[desktopBkgrSize]);
  //----------------------------------------------------------------------------//
  const [desktopBkgrPosition, setDesktopBkgrPosition] = useState(
    getComputedStyle(root).getPropertyValue("--DesktopBkgrPosition"),
  );
  useEffect(() => {
    root.style.setProperty("--DesktopBkgrPosition", desktopBkgrPosition);
  },[desktopBkgrPosition]);
  //----------------------------------------------------------------------------//
  const [desktopBkgrRepeat, setDesktopBkgrRepeat] = useState(
    getComputedStyle(root).getPropertyValue("--DesktopBkgrRepeat"),
  );
  useEffect(() => {
    root.style.setProperty("--DesktopBkgrRepeat", desktopBkgrRepeat);
  },[desktopBkgrRepeat]);
  //----------------------------------------------------------------------------//
  const [desktopFontSize, setDesktopFontSize] = useState(
    getComputedStyle(root).getPropertyValue("--DesktopFontSize").slice(0, -2),
  );
  useEffect(() => {
    root.style.setProperty("--DesktopFontSize", desktopFontSize + "px");
  },[desktopFontSize]);
  //----------------------------------------------------------------------------//
  const [desktopIconSize, setDesktopIconSize] = useState(
    getComputedStyle(root).getPropertyValue("--DesktopIconSize").slice(0, -2),
  );
  useEffect(() => {
    root.style.setProperty("--DesktopIconSize", desktopIconSize + "px");
  },[desktopIconSize]);
  //----------------------------------------------------------------------------//

  //Upload Image
  const uploadImage = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (readerEvent) => {
      background.setImage(
        readerEvent.target.result,
        background.state.image.position,
        background.state.image.size,
        background.state.image.repeat);
    }
  };

  //Update background context
  useEffect(() => {
    if (background.state.active === "color") {
      if (background.state.color.type === "color") {
        setDesktopBkgrColor(background.state.color.color);
        setDesktopBkgrImage("none");
      } else if (background.state.color.type === "gradient") {
        if (background.state.color.gradient.type === "linear") {
          setDesktopBkgrColor(`linear-gradient(${background.state.color.gradient.degree}deg, ${background.state.color.gradient.color1}, ${background.state.color.gradient.color2})`);
          setDesktopBkgrImage("none");
        } else if (background.state.color.gradient.type === "radial") {
          setDesktopBkgrColor(`radial-gradient(${background.state.color.gradient.color1}, ${background.state.color.gradient.color2})`);
          setDesktopBkgrImage("none");
        }
      }
    } else if (background.state.active === "image") {
      if (background.state.image.url) {
        setDesktopBkgrColor(background.state.color.color);
        setDesktopBkgrImage(`url(${background.state.image.url})`);
        setDesktopBkgrPosition(background.state.image.position);
        setDesktopBkgrSize(background.state.image.size);
        setDesktopBkgrRepeat(background.state.image.repeat);
      }
    }
  }, [background.state]);

  return (
    <>
      <fieldset>
        <legend>Background:
          <div>
            <select value={backgroundMenu} onChange={(e) => setBackgroundMenu(e.target.value)}>
              <option value="color">Color</option>
              <option value="image">Image</option>
              <option value="scenario">3D Scenario</option>
            </select>
          </div></legend>
        {backgroundMenu === "color" ? (
          <>
            <div
              className={
                background.state.active === "color"
                  ? "defMenuButton defMenuButtonON"
                  : "defMenuButton"
              }
              onClick={() => background.setActive("color")}
            >
              Use Simple Color
            </div>
            <label>Set Background Color: </label>
            <ColorPicker
              color={desktopBkgrColor}
              setColor={setDesktopBkgrColor}
              useAlpha={false}
            />
          </>
        ) : (
          <></>
        )}
        {backgroundMenu === "image" ? (
          <>
            <div
              className={
                background.state.active === "image"
                  ? "defMenuButton defMenuButtonON"
                  : "defMenuButton"
              }
              onClick={() => background.setActive("image")}
            >
              Use Image
            </div>
            <label htmlFor="imageUpload">Upload Image: </label>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={(e) => { uploadImage(e.target.files[0]) }} />
            <label htmlFor="imagePosition">Position: </label>
            <select id="imagePosition"
              value={background.state.image.position}
              onChange={(e) => {
                background.setImage(
                  background.state.image.file,
                  e.target.value,
                  background.state.image.size,
                  background.state.image.repeat
                );
                setDesktopBkgrPosition(e.target.value);
              }}>
              <option value="top">Top</option>
              <option value="left top">Top Left</option>
              <option value="right top">Top Right</option>
              <option value="center">Center</option>
              <option value="bottom">Bottom</option>
              <option value="left bottom">Bottom Left</option>
              <option value="right bottom">Bottom Right</option>
              <option value="left">Left</option>
              <option value="right">Right</option>
            </select>
            <label htmlFor="imageSize">Size: </label>
            <select id="imageSize"
              value={background.state.image.size}
              onChange={(e) => {
                background.setImage(
                  background.state.image.file,
                  background.state.image.position,
                  e.target.value,
                  background.state.image.repeat
                );
                setDesktopBkgrSize(e.target.value);
              }}>
              <option value="auto">Auto</option>
              <option value="contain">Contain</option>
              <option value="cover">Cover</option>
              <option value="100vw 100vh">Stretch</option>
            </select>
            <label htmlFor="imageRepeat">Repeat: </label>
            <select id="imageRepeat"
              value={background.state.image.repeat}
              onChange={(e) => {
                background.setImage(
                  background.state.image.file,
                  background.state.image.position,
                  background.state.image.size,
                  e.target.value
                );
                setDesktopBkgrRepeat(e.target.value);
              }}
            >
              <option value="no-repeat">No Repeat</option>
              <option value="repeat">Repeat</option>
              <option value="repeat-x">Repeat X</option>
              <option value="repeat-y">Repeat Y</option>
            </select>
          </>
        ) : (
          <></>
        )}
        {backgroundMenu === "Shader" ? <></> : <></>}
        {backgroundMenu === "scenario" ? (
          <>
            <div
              className={
                background.state.active === "scenario"
                  ? "defMenuButton defMenuButtonON"
                  : "defMenuButton"
              }
              onClick={() => background.setActive("scenario")}
            >
              Use Scenario
            </div>
            <fieldset>
              <legend
              style={{cursor:"pointer"}}
              onClick={() => background.setScenario("sun", "isActive", !background.state["scenario"]["sun"].isActive)}
              > 
                <input
                  type="checkbox"
                  checked={background.state["scenario"]["sun"].isActive}
                  onChange={() => background.setScenario("sun", "isActive", !background.state["scenario"]["sun"].isActive)}
                />
                Sun & Sky
              </legend>
              {background.state["scenario"]["sun"].isActive &&
                <><div>
                  <label>Inclination:</label>
                  <input
                    type="range"
                    min="0.48"
                    max="1"
                    step="0.001"
                    value={background.state["scenario"]["sun"].inclination}
                    onChange={(e) =>
                      background.setScenario("sun", "inclination", e.target.value)
                    }
                  />
                  <input
                    type="number"
                    min="0.48"
                    max="1"
                    step="0.001"
                    value={background.state["scenario"]["sun"].inclination}
                    onChange={(e) =>
                      background.setScenario("sun", "inclination", e.target.value)
                    }
                  />
                </div>
                  <div>
                    <label>Azimuth:</label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={background.state["scenario"]["sun"].azimuth}
                      onChange={(e) =>
                        background.setScenario("sun", "azimuth", e.target.value)
                      }
                    />
                    <input
                      type="number"
                      min="0"
                      max="1"
                      step="0.01"
                      value={background.state["scenario"]["sun"].azimuth}
                      onChange={(e) =>
                        background.setScenario("sun", "azimuth", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label>Turbidity:</label>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.01"
                      value={background.state["scenario"]["sun"].turbidity}
                      onChange={(e) =>
                        background.setScenario("sun", "turbidity", e.target.value)
                      }
                    />
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.01"
                      value={background.state["scenario"]["sun"].turbidity}
                      onChange={(e) =>
                        background.setScenario("sun", "turbidity", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label>Rayleight:</label>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      step="0.01"
                      value={background.state["scenario"]["sun"].rayleight}
                      onChange={(e) =>
                        background.setScenario("sun", "rayleight", e.target.value)
                      }
                    />
                    <input
                      type="number"
                      min="0"
                      max="50"
                      step="0.01"
                      value={background.state["scenario"]["sun"].rayleight}
                      onChange={(e) =>
                        background.setScenario("sun", "rayleight", e.target.value)
                      }
                    />
                  </div>
                </>}
            </fieldset>
            <fieldset>
              <legend>Ambient Light</legend>
              <div>
                <label>Color:</label>
                <ColorPicker
                  color={background.state["scenario"]["ambientLight"].color}
                  setColor={(color) => 
                    background.setScenario("ambientLight", "color", color)}
                  useAlpha={false}
                />
              </div>
              <div>
                <label>Intensity:</label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  value={background.state["scenario"]["ambientLight"].intensity}
                  onChange={(e) =>
                    background.setScenario("ambientLight", "intensity", e.target.value)
                  }
                />
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  value={background.state["scenario"]["ambientLight"].intensity}
                  onChange={(e) =>
                    background.setScenario("ambientLight", "intensity", e.target.value)
                  }
                />
              </div>
            </fieldset>
            <fieldset>
              <legend>Directional Light</legend>
              <div>
                <label>Color:</label>
                    <ColorPicker
                      color={background.state["scenario"]["directionalLight"].color}
                      setColor={(color) => 
                        background.setScenario("directionalLight", "color", color)}
                      useAlpha={false}
                    />
              </div>
              <div>
                <label>Intensity:</label>
                <input
                  type="range"
                  min="0"
                  max="200000000"
                  step="100"
                  value={background.state["scenario"]["directionalLight"].intensity}
                  onChange={(e) => background.setScenario("directionalLight", "intensity", e.target.value)}
                />
                <input
                  type="number"
                  min="0"
                  max="200000000"
                  step="100"
                  value={background.state["scenario"]["directionalLight"].intensity}
                  onChange={(e) => background.setScenario("directionalLight", "intensity", e.target.value)}
                />
              </div>
            </fieldset>
            <fieldset>
              <legend 
              style={{cursor:"pointer"}}
              onClick={() => background.setScenario("stars", "isActive", !background.state["scenario"]["stars"].isActive)}
              >
                <input
                  type="checkbox"
                  checked={background.state["scenario"]["stars"].isActive}
                  onChange={(e) => background.setScenario("stars", "isActive", !background.state["scenario"]["stars"].isActive)}
                />
                Stars
              </legend>
              {background.state["scenario"]["stars"].isActive &&
                <>
                  <div>
                    <label>Star Count:</label>
                    <input
                      type="range"
                      min="0"
                      max="100000"
                      value={background.state["scenario"]["stars"].count}
                      onChange={(e) =>
                        background.setScenario("stars", "count", e.target.value)
                      }
                    />
                  </div>
                </>}
            </fieldset>
            <fieldset>
              <legend 
              style={{cursor:"pointer"}}
              onClick={() => background.setScenario("fog", "isActive", !background.state["scenario"]["fog"].isActive)}>
                <input
                  type="checkbox"
                  checked={background.state["scenario"]["fog"].isActive}
                  onChange={(e) => background.setScenario("fog", "isActive", !background.state["scenario"]["fog"].isActive)}
                />
                Fog
              </legend>
              {background.state["scenario"]["fog"].isActive &&
                <>
                  <div>
                    <label>Color:</label>
                    <ColorPicker
                      color={background.state["scenario"]["fog"].color}
                      setColor={(color) => background.setScenario("fog", "color", color)}
                      useAlpha={false}
                    />
                  </div>
                  <div>
                    <label>Near:</label>
                    <input
                      type="range"
                      min="0"
                      max="1500"
                      step="1"
                      value={background.state["scenario"]["fog"].near}
                      onChange={(e) =>
                        background.setScenario("fog", "near", e.target.value)
                      }
                    />
                    <input
                      type="number"
                      min="0"
                      max="1500"
                      step="1"
                      value={background.state["scenario"]["fog"].near}
                      onChange={(e) =>
                        background.setScenario("fog", "near", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label>Far:</label>
                    <input
                      type="range"
                      min="0"
                      max="1500"
                      step="1"
                      value={background.state["scenario"]["fog"].far}
                      onChange={(e) =>
                        background.setScenario("fog", "far", e.target.value)
                      }
                    />
                    <input
                      type="number"
                      min="0"
                      max="1500"
                      step="1"
                      value={background.state["scenario"]["fog"].far}
                      onChange={(e) =>
                        background.setScenario("fog", "far", e.target.value)
                      }
                    />
                  </div>
                </>}
            </fieldset>
            <fieldset>
              <legend> Terrain </legend>
              <div>
                <label>Sea:</label>
                <input type="checkbox" 
                checked={background.state["scenario"]["ocean"].isActive} 
                onChange={() => background.setScenario("ocean", "isActive", !background.state["scenario"]["ocean"].isActive)}
                />
              </div>
              <div>
                <label>Dunes:</label>
                <input type="checkbox" 
                checked={background.state["scenario"]["desert"].isActive} 
                onChange={() => background.setScenario("desert", "isActive", !background.state["scenario"]["desert"].isActive)}
                />
              </div>
            </fieldset>
          </>
        ) : (
          <></>
        )}
      </fieldset>
      <fieldset>
        <legend>Shortcuts</legend>
        <div>
          <label>Icon Size:</label>
          <input
            type="range"
            min={36}
            max={120}
            step="1"
            value={Number(desktopIconSize)}
            onChange={(e) => setDesktopIconSize(e.target.value)}
          />
        </div>
        <div>
          <label>Font Size:</label>
          <input
            type="range"
            min={12}
            max={32}
            step="1"
            value={Number(desktopFontSize)}
            onChange={(e) => setDesktopFontSize(e.target.value)}
          /></div>
      </fieldset>
    </>
  );
};
