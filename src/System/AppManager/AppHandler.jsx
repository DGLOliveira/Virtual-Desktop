/*
For each App that is currently open, this component generates a window for it.
*/

import { useContext, useState, Suspense } from "react";
import { AppContext } from "./Context/context.jsx";
import "./styles.css";
import { AppBody } from "./Components/AppBody.jsx";

export function AppHandler() {
  const appContext = useContext(AppContext);

  return (
    <>
      {Object.keys(appContext.apps).map((name) =>
      (
        <app-window
          style={{
            zIndex: appContext.apps[name].Location.zIndex,
            top: appContext.apps[name].Location.Current.top,
            left: appContext.apps[name].Location.Current.left,
            width: appContext.apps[name].Size.Current.width,
            height: appContext.apps[name].Size.Current.height,
            borderColor: appContext.apps[name].State.isSelected
              ? "var(--WindowBorderColor)"
              : "var(--WindowBorderColorInactive)",
            visibility: appContext.apps[name].State.isMinimized
              ? "hidden"
              : "visible",
            resize: appContext.apps[name].State.isMaximized
              ? "none" : "both"
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