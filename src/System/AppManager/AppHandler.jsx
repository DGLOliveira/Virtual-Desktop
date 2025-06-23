//For each App that is currently open, this component generates a window for it.
/*For mobile devices, this can also acts as a display for all the open apps at the same time
 as a substitute for the taskbar live apps component, as well as the close function for each app*/

 import { useContext } from "react";
import { AppContext } from "./Context/context.jsx";
import { DeviceContext } from "../DeviceManager/context.jsx";
import { AppBody } from "./Components/AppBody.jsx";
import "./Styles/Window.css";

export function AppHandler() {
  const appContext = useContext(AppContext);
  const deviceContext = useContext(DeviceContext);

  const handleClick = (e, name) =>{
    if(deviceContext.virtualOSState.display === "liveApps"){
      e.stopPropagation();
      deviceContext.setVirtualOSState({...deviceContext.virtualOSState, display: "none"});
    }
    appContext.setSelected(name);
  }

  return (
    <windows-container
      style={{
        background: deviceContext.virtualOSState.display == "liveApps" ? "hsla(0, 0%, 0%, 0.5)" : "transparent",
        boxShadow: deviceContext.virtualOSState.display == "liveApps" ? "0 0 200px 0 hsla(0, 0%, 0%, 1) inset" : "none",
      }}
    >
      {Object.keys(appContext.apps).sort((a, b) => appContext.apps[b].Location.zIndex - appContext.apps[a].Location.zIndex).map((name) =>
      (
        <app-window
          style={{
            position: deviceContext.virtualOSState.display == "liveApps" ? "relative" : "absolute",
            zIndex: appContext.apps[name].Location.zIndex,
            top: deviceContext.deviceType !== "Desktop"
              ? "0"
              : appContext.apps[name].Location.Current.top,
            left: deviceContext.deviceType !== "Desktop"
              ? "0"
              : appContext.apps[name].Location.Current.left,
            width: deviceContext.deviceType !== "Desktop"
              ? "100%"
              : appContext.apps[name].Size.Current.width,
            height: deviceContext.deviceType !== "Desktop"
              ? "100%"
              : appContext.apps[name].Size.Current.height,
            backgroundColor: appContext.apps[name].State.isSelected
              ? "var(--WindowBkgrColor)"
              : "var(--WindowBkgrColorInactive)",
            color: appContext.apps[name].State.isSelected
              ? "var(--WindowFontColor)"
              : "var(--WindowFontColorInactive)",
            borderWidth: deviceContext.deviceType !== "Desktop"
              ? "0"
              : "var(--WindowBorderWidth)",
            borderColor: appContext.apps[name].State.isSelected
              ? "var(--WindowBorderColor)"
              : "var(--WindowBorderColorInactive)",
            borderRadius: (deviceContext.deviceType !== "Desktop"
              || appContext.apps[name].State.isMaximized)
              ? "0"
              : "var(--WindowBorderRadius)",
            visibility: deviceContext.virtualOSState.display == "liveApps" ? 
            "visible" :  
            (appContext.apps[name].State.isMinimized ? "hidden" : "visible"),
            scale: deviceContext.virtualOSState.display == "liveApps" ? "0.8" : "1",
          }}
          key={name + "AppHandler"}
          onClick={(e) => handleClick(e, name)}
          onContextMenu={(e) => e.preventDefault()}
          onDrop={(e) => e.preventDefault()}
        >
          <AppBody
            appName={name}
            isSelected={appContext.apps[name].State.isSelected}
            setClose={appContext.setClose}
          />
        </app-window>
      )
      )}
    </windows-container>
  );
}