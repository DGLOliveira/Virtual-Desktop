import { useContext } from "react";
import { ContextMenuContext } from "../../ContextMenuManager/context.jsx";
import { AppContext } from "../../AppManager/Context/context.jsx";
import { AppIcon } from "../../AppManager/Components/AppIcon.jsx";

export const LiveApps = () => {
    const appContext = useContext(AppContext);
    const contextMenu = useContext(ContextMenuContext);
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
    return (
        <live-apps>
          {Object.keys(appContext.apps).map((name, index, arr) =>
            (
              <button
                onClick={() => handleClick(name)}
                onContextMenu={(e) => handleContextMenu(e, name)}
                key={name + "liveAppsButton"}
                aria-label={"Live App" + {name}}
              >
                <AppIcon appName={name} />
              </button>
            )
          )}
        </live-apps>
    );
}