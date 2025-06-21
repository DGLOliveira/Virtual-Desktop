import { useState, useContext, useCallback, lazy, Suspense, Fragment } from "react";
import { createPortal } from "react-dom";
import { DeviceContext } from "../../../DeviceManager/context.jsx";
import { ThemeContext } from "../../../ThemeManager/context.jsx";
import { ContextMenuContext } from "../../../ContextMenuManager/context.jsx";
import { AppContext } from "../../../AppManager/Context/context.jsx";
import { AppIcon } from "../../../AppManager/Components/AppIcon.jsx";
import "./styles.css";

export const LiveApps = () => {
  const appContext = useContext(AppContext);
  const deviceContext = useContext(DeviceContext);
  const contextMenu = useContext(ContextMenuContext);
  const themeContext = useContext(ThemeContext);
  const [open, setOpen] = useState(false);

  const handleTaskbarClick = (name) => {
    if (!appContext.apps[name].State.isMinimized && !appContext.apps[name].State.isSelected) {
      appContext.setSelected(name);
    } else {
      appContext.switchMinimized(name);
    }
  };

  const handlePreviewClick = (name) => {
    appContext.setSelected(name);
    if (appContext.apps[name].State.isMinimized) {
      appContext.switchMinimized(name)
    };
    setOpen(false);
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

  const DefaultButton = ({ name, click, context, AppIcon, isSelected }) => {
    return (
      <button
        onClick={click}
        onContextMenu={(e) => { context(e) }}
        aria-label={"Live App" + name }
      >
        <AppIcon appName={name} />
        <span>{name}</span>
      </button>
    );
  };

  const Button = useCallback((
    lazy(() => import(`../../../ThemeManager/${themeContext.LiveAppButtonPath}`).catch(
      (_error) => {
        console.error("Failed to import thematic Live App buttons");
        return {
          default: DefaultButton
        }
      }))
  ), [themeContext.LiveAppButtonPath]);


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
          <button onClick={() => setOpen(!open)}>
            <div>
              <live-apps-button-circle class={open ? "live-apps-button-circle-red" : "live-apps-button-circle-off"} />
              <live-apps-button-circle class={open ? "live-apps-button-circle-green" : "live-apps-button-circle-off"} />
            </div>
            <div>
              <live-apps-button-circle class={open ? "live-apps-button-circle-blue" : "live-apps-button-circle-off"} />
              <live-apps-button-circle class={open ? "live-apps-button-circle-white" : "live-apps-button-circle-off"} />
            </div>
          </button>
          {open && createPortal(
            <live-apps-menu style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", left: "0", top: "0", width: "100%", height: "100%", background: "hsla(0, 0%, 0%, 1)", zIndex: "999" }}>
              {Object.keys(appContext.apps).map((name, index, arr) =>
              (
                <button
                  onClick={() => handlePreviewClick(name)}
                  onContextMenu={(e) => handleContextMenu(e, name)}
                  className={LiveAppsClass(appContext.apps[name].State.isSelected)}
                  key={name + "liveAppsButton"}
                  aria-label={"Live App" + { name }}
                >
                  <AppIcon appName={name} />
                  <span>{name}</span>
                  {themeContext.liveAppsTheme === "Aqua" && <AppIcon appName={name} />}
                </button>
              )
              )}
            </live-apps-menu>,
            document.getElementsByTagName("desk-top")[0]
          )}
        </live-apps-button>}
    </>
  );
}