import { useContext } from "react";
import { ThemeContext } from "../../../ThemeManager/context.jsx";
import { ContextMenuContext } from "../../../ContextMenuManager/context.jsx";
import { AppContext } from "../../../AppManager/Context/context.jsx";
import { AppIcon } from "../../../AppManager/Components/AppIcon.jsx";
import "./styles.css";

export const LiveApps = () => {
    const appContext = useContext(AppContext);
    const contextMenu = useContext(ContextMenuContext);
    const themeContext = useContext(ThemeContext);

    const handleClick = (name) => { 
      if(!appContext.apps[name].State.isMinimized && !appContext.apps[name].State.isSelected) {
        appContext.setSelected(name);
      }else{
        appContext.switchMinimized(name);
      }
    };
    const handleContextMenu = (e, appName) => {
        e.preventDefault();
        contextMenu.setOpen();
        contextMenu.setPosition(e.clientX, e.clientY);
        contextMenu.setContent({
            "Minimize": {action: () => { appContext.switchMinimized(appName) }},
            "Maximize": {action: () => { appContext.switchMaximized(appName) }},
            "Close": {action: () => { appContext.setClose(appName) }}
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
    return (
        <live-apps>
          {Object.keys(appContext.apps).map((name, index, arr) =>
            (
              <button
                onClick={() => handleClick(name)}
                onContextMenu={(e) => handleContextMenu(e, name)}
                className={LiveAppsClass(appContext.apps[name].State.isSelected)}
                key={name + "liveAppsButton"}
                aria-label={"Live App" + {name}}
              >
                <AppIcon appName={name} />
                <span>{name}</span>
                {themeContext.liveAppsTheme === "Aqua" && <AppIcon appName={name} />}
              </button>
            )
          )}
        </live-apps>
    );
}