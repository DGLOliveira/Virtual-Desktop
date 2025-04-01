// Renders the taskbar, allowing the user to open, minimize, maximize, and close all available apps, 
// as well as also displays current time and provides a way to close and reload the website
import { useState, useContext, Suspense, lazy } from "react";
import { StartButton } from "./Components/Start/StartButton.js";
import { LiveApps } from "./Components/LiveApps/LiveApps.js";
import { TaskbarClock } from "./Components/Clock/index.jsx";
import { Weather } from "./Components/Weather/index.jsx";
import { ContextMenuContext } from "../ContextMenuManager/context.jsx";
import { AppContext } from "./../AppManager/Context/context.jsx";
import "./styles.css";

export function Taskbar() {
  const [showWeather, setShowWeather] = useState(true);
  const [showClock, setShowClock] = useState(true);
  const contextMenu = useContext(ContextMenuContext);
  const appContext = useContext(AppContext);
  const handleContextMenu = (e) => {
    e.preventDefault();
    let content;
    let flag = false;
    if (e.target.localName === "task-bar" || e.target.localName === "live-apps") {
      flag = true;
      content = {
        "Show Time": { action: () => { setShowClock(!showClock) }, checkbox: showClock },
        "Show Weather": { action: () => { setShowWeather(!showWeather) }, checkbox: showWeather },
        "LineBreak": {},
        "Personalize": { action: () => { appContext.setOpen("Definitions") } },
      };
    }
    if (flag) {
      contextMenu.setOpen();
      contextMenu.setPosition(e.clientX, e.clientY);
      contextMenu.setContent(content);
    }
  }

  return (
    <task-bar
      onContextMenu={(e) => handleContextMenu(e)}
    >
      <StartButton />
      <vertical-rect />
      <LiveApps />
      <vertical-rect />
      <taskbar-tray>
        {showWeather && <Weather contextMenu={contextMenu} setShowWeather={setShowWeather} />}
        {showClock && <TaskbarClock contextMenu={contextMenu} setShowClock={setShowClock} />}
      </taskbar-tray>
    </task-bar>
  );
}
