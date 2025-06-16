import { useState, useContext } from "react";
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

  const handleClick = (name) => {
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
  const LiveAppsClass = (isSelected) => {
    let ans = "";
    switch (themeContext.liveAppsTheme) {
      case "Classic":
        ans = "liveAppsClassic";
        break;
      case "Aero":
        ans = "liveAppsAero";
        break;
      case "Aqua":
        ans = "liveAppsAqua";
        break;
      case "Fluent":
      default:
        ans = "liveAppsFluent";
        break;
    }
    if (isSelected) {
      ans += " " + ans + "Active";
    }
    return ans;
  }
  return (<>

    {deviceContext.deviceType === "Desktop" &&
      <live-apps>
        {Object.keys(appContext.apps).map((name, index, arr) =>
        (
          <button
            onClick={() => handleClick(name)}
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
      </live-apps-button>}
  </>
  );
}