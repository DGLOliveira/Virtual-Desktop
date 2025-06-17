//For each App that is currently open, this component generates a window for it.

import { useContext } from "react";
import { AppContext } from "./Context/context.jsx";
import { DeviceContext } from "../DeviceManager/context.jsx";
import { AppBody } from "./Components/AppBody.jsx";
import "./Styles/Window.css";

export function AppHandler() {
  const appContext = useContext(AppContext);
  const deviceContext = useContext(DeviceContext);

  return (
    <>
      {Object.keys(appContext.apps).map((name) =>
      (
        <app-window
          style={{
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
            visibility: appContext.apps[name].State.isMinimized
              ? "hidden"
              : "visible",
          }}
          key={name + "AppHandler"}
          onClick={() => appContext.setSelected(name)}
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
    </>
  );
}