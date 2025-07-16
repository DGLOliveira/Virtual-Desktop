import { useState, useContext, useCallback, lazy, Suspense, Fragment, useEffect } from "react";
import { DeviceContext } from "../../../DeviceManager/context.jsx";
import { ThemeContext } from "../../../ThemeManager/context.jsx";
import { ContextMenuContext } from "../../../ContextMenuManager/context.jsx";
import { AppContext } from "../../../AppManager/Context/context.jsx";
import { AppIcon } from "../../../AppManager/Components/AppIcon.jsx";
import DefaultButton from "./DefaultButton.jsx";
import DefaultIcon from "./DefaultIcon.jsx";
import "./styles.css";

export const LiveApps = () => {
  const appContext = useContext(AppContext);
  const deviceContext = useContext(DeviceContext);
  const contextMenu = useContext(ContextMenuContext);
  const themeContext = useContext(ThemeContext);

  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleTaskbarClick = (name) => {
    if (!appContext.apps[name].State.isMinimized && !appContext.apps[name].State.isSelected) {
      appContext.setSelected(name);
    } else {
      appContext.switchMinimized(name);
    }
  };

  const handleContextMenu = (e, appName) => {
    e.preventDefault();
    contextMenu.setOpen();
    contextMenu.setPosition(e.clientX, e.clientY);
    contextMenu.setContent({
      "Minimize": { action: () => { appContext.switchMinimized(appName) } },
      "Maximize": { action: () => { appContext.switchMaximized(appName) } },
      "Close": { action: () => { appContext.setClose(appName) } }
    })
  };

  const handleMobileButton = () =>
    deviceContext.setVirtualOSState({
      ...deviceContext.virtualOSState,
      display: deviceContext.virtualOSState.display === "liveApps" ? "none" : "liveApps"
    });

  const Button = useCallback((
    lazy(() => import(`../../../ThemeManager/${themeContext.LiveAppButtonPath}`).catch(
      (_error) => {
        console.error("Failed to import thematic Live App buttons");
        return {
          default: DefaultButton
        }
      }))
  ), [themeContext.LiveAppButtonPath]);

  useEffect(() => {
    let flag = false;
    switch (themeContext.mode) {
      case "Light":
        flag = false;
        break;
      case "Dark":
        flag = true;
        break;
      case "System":
        flag = themeContext.systemDarkMode;
    }
    setIsDarkMode(flag);
  }, [themeContext.mode, themeContext.systemDarkMode]);

  return (
    <>
      {deviceContext.deviceType === "Desktop" &&
        <live-apps>
          {Object.keys(appContext.apps).map((name, index, arr) =>
          (<Fragment key={index}>
            <Suspense fallback={null}>
              <Button
                name={name}
                click={() => handleTaskbarClick(name)}
                context={(e) => handleContextMenu(e, name)}
                AppIcon={AppIcon}
                isSelected={appContext.apps[name].State.isSelected}
              />
            </Suspense>
          </Fragment>)
          )}
        </live-apps>}
      {(deviceContext.deviceType === "Tablet" ||
        deviceContext.deviceType === "Mobile" ||
        deviceContext.deviceType === "TV") &&
        <live-apps-button>
          <button onClick={handleMobileButton} style={{ width: "100%" }}>
            <DefaultIcon
              isActive={deviceContext.virtualOSState.display === "liveApps"}
              darkMode={isDarkMode}
            />
          </button>
        </live-apps-button>}
    </>
  );
}