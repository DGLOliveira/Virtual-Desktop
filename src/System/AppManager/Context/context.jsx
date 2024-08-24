import React, { useState, createContext } from "react";

import { setOpenHandler } from "./Handlers/setOpenHandler.js";
import { setCloseHandler } from "./Handlers/setCloseHandler.js";
import { setActionHandler } from "./Handlers/setActionHandler.js";
import { setSelectedHandler } from "./Handlers/setSelectedHandler.js";
import { setPositionHandler } from "./Handlers/setPositionHandler.js";
import { setPositionDefaultHandler } from "./Handlers/setPositionDefaultHandler.js";
import { setSizeHandler } from "./Handlers/setSizeHandler.js";
import { setSizeDefaultHandler } from "./Handlers/setSizeDefaultHandler.js";
import { switchMinimizedHandler } from "./Handlers/switchMinimizedHandler.js";
import { switchMaximizedHandler } from "./Handlers/switchMaximizedHandler.js";

export const AppContext = createContext({
  apps: {},
  setOpen: () => {},
  setClose: () => {},
  setAction: () => {},
  setSelected: () => {},
  setPosition: () => {},
  setDefaultPosition: () => {},
  setSize: () => {},
  setDefaultSize: () => {},
  switchMinimized: () => {},
  switchMaximized: () => {},
});

export function AppProvider({ children }) {
  // Context for all apps
  const [appStatus, setAppStatus] = useState({});
  //set a given app to be a live task and to the front of the view as the currently selected task witht he highest z-index, reordering the z-index of other live tasks
  const setOpen=(name) => {

  if (!appStatus.hasOwnProperty(name)) {
    setOpenHandler(name, appStatus, setAppStatus);
  } else{
    setSelectedHandler(name, appStatus, setAppStatus);
  }
  }
  //terminates a given app live task, and unselects it, reordering the z-index of other live tasks
  const setClose=(name) => {
    setCloseHandler(name, appStatus, setAppStatus);
  }
  //sets the current action of a given live task
  const setAction=(name, action) => {
    setActionHandler(name, appStatus, setAppStatus, action);
  }
  //sets a given live task to be the currently selected task with the highest z-index, reordering the z-index of other live tasks
  const setSelected=(name) => {
    setSelectedHandler(name, appStatus, setAppStatus);
  }
  //sets the current top and left position of a given live task, to be used when a live task is dragged
  const setPosition = (name, left, top) => {
    setPositionHandler(name, appStatus, setAppStatus, left, top);
  }
  //sets the default top and left position of a given app, to be used when a task is maximized or restored
  const setDefaultPosition = (name, left, top) => {
    setPositionDefaultHandler(name, appStatus, setAppStatus, left, top);
  }
  //sets the current width and height of a given live task, to be used when a live task is maximized, restored or resized
  const setSize = (name, width, height) => {
    setSizeHandler(name, appStatus, setAppStatus, width, height);
  }
  //sets the default width and height of a given app, to be used when a task is maximized or restored
  const setDefaultSize = (name, width, height) => {
    setSizeDefaultHandler(name, appStatus, setAppStatus, width, height);
  }
  // switches the maximized state of a given app and sets to selected if not, storing the current position and size as default upon maximization, and using the default position and size upon restoration
  const switchMaximized = (name) => {
    switchMaximizedHandler(name, appStatus, setAppStatus);
  }
  // switches the minimized state of a given app, removing selection when minimized and selecting it when not, to be used when a task is minimized or not, hiding it from view or restoring it and making it the selected app
  const switchMinimized = (name) => {
    switchMinimizedHandler(name, appStatus, setAppStatus);
  }

  const contextValue = {
    apps: appStatus,
    setOpen,
    setClose,
    setAction,
    setSelected,
    setPosition,
    setDefaultPosition,
    setSize,
    setDefaultSize,
    switchMinimized,
    switchMaximized,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

export default AppProvider;
