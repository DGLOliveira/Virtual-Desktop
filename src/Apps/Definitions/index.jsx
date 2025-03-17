// Definitions allows for user personalization of the app aspect and style. See individual components for reference.

import { useState, useContext } from "react";
import { Global } from "./Pages/Global.jsx";
import { DesktopPreview, Desktop } from "./Pages/Desktop.jsx";
import { WindowPreview, Window } from "./Pages/Windows/Window.jsx";
import { DialogPreview, Dialog } from "./Pages/Windows/Dialog.jsx";
import { TaskbarPreview, Taskbar } from "./Pages/Taskbar.jsx";
import { ContextMenuPreview, ContextMenu } from "./Pages/ContextMenu.jsx";
import Scenario from "../../System/Desktop/Scenario.jsx";
import { BackgroundContext } from "../../System/Desktop/BackgroundContext.js";
import "./style.css";

export default function Definitions() {
  const [subMenu, setSubMenu] = useState("none");
  const [defPage, setDefPage] = useState("Global");
  const background = useContext(BackgroundContext);
  return (
    <settings-container>
      <nav>
        <div
          onClick={() => {setDefPage("Global"); setSubMenu("none")}}
          className={defPage === "Global" ? "defMenuButtonON" : ""}
        >
          Global
        </div>
        <div
          onClick={() => {setDefPage("Desktop"); setSubMenu("none")}}
          className={defPage === "Desktop" ? "defMenuButtonON" : ""}
        >
          Desktop
        </div>
        <div
          onClick={() => {setDefPage("Start"); setSubMenu("none")}}
          className={defPage === "Start" ? "defMenuButtonON" : ""}
        >
          Taskbar
        </div>
        <div
          onClick={() => {setDefPage("Window"); setSubMenu("Window")}}
          className={subMenu === "Window" ? "defMenuButtonON" : ""}
        >
          Windows
        </div>
        {subMenu === "Window" &&
          <>
          <div
            onClick={() => setDefPage("Window")}
            className={defPage === "Window" ? "defMenuButtonON" : ""}
          >
            {">"}Window
          </div>
            <div
              onClick={() => setDefPage("Dialog")}
              className={defPage === "Dialog" ? "defMenuButtonON" : ""}
            >
              {">"}Dialog
            </div>
          </>
          }
        <div
          onClick={() => setDefPage("ContextMenu")}
          className={defPage === "ContextMenu" ? "defMenuButtonON" : ""}
        >
          Context Menu
        </div>
      </nav>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="defPreview">
          {background.state.active==="scenario" ? <Scenario /> : <></>}
          {defPage === "Desktop" ? <DesktopPreview /> : <></>}
          {defPage === "Start" ? <TaskbarPreview /> : <></>}
          {defPage === "Window" ? <WindowPreview /> : <></>}
          {defPage === "Dialog" ? <DialogPreview /> : <></>}
          {defPage === "ContextMenu" ? <ContextMenuPreview /> : <></>}
        </div>
        {defPage === "Global" ? <Global /> : <></>}
        {defPage === "Desktop" ? <Desktop /> : <></>}
        {defPage === "Start" ? <Taskbar /> : <></>}
        {defPage === "Window" ? <Window /> : <></>}
        {defPage === "Dialog" ? <Dialog /> : <></>}
        {defPage === "ContextMenu" ? <ContextMenu /> : <></>}
        <br/>
        <br/>
        <br/>
        <br/>
      </form>
    </settings-container>
  );
};
