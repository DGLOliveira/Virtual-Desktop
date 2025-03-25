// Definitions allows for user personalization of the app aspect and style. See individual components for reference.

import { useState, useContext } from "react";
import { Global } from "./Pages/Global.jsx";
import { DesktopPreview, Desktop } from "./Pages/Desktop.jsx";
import { WindowPreview, Window } from "./Pages/Windows/Window.jsx";
import { MenuPreview, Menu } from "./Pages/Windows/Menu.jsx";
import { AppPreview, App } from "./Pages/Windows/App.jsx";
import { DialogPreview, Dialog } from "./Pages/Windows/Dialog.jsx";
import { TaskBarPreview, TaskBar } from "./Pages/Taskbar/TaskBar.jsx";
import { StartPreview, Start } from "./Pages/Taskbar/Start.jsx";
import { StartMenuPreview, StartMenu } from "./Pages/Taskbar/StartMenu.jsx";
import { TrayPreview, Tray } from "./Pages/Taskbar/Tray.jsx";
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
          onClick={() => { setDefPage("Global"); setSubMenu("none") }}
          className={defPage === "Global" ? "defMenuButtonON" : ""}
        >
          Global
        </div>
        <div
          onClick={() => { setDefPage("Desktop"); setSubMenu("none") }}
          className={defPage === "Desktop" ? "defMenuButtonON" : ""}
        >
          Desktop
        </div>
        <div
          onClick={() => { setDefPage("Taskbar"); setSubMenu("Taskbar") }}
          className={subMenu === "Taskbar" ? "defMenuButtonON" : ""}
        >
          Taskbar
        </div>
        {subMenu === "Taskbar" &&
          <>
            <div
              onClick={() => setDefPage("Taskbar")}
              className={defPage === "Taskbar" ? "defMenuButtonON" : ""}
            >
              {">"}Taskbar
            </div>
            <div
              onClick={() => setDefPage("Start")}
              className={defPage === "Start" ? "defMenuButtonON" : ""}
            >
              {">"}Start
            </div>
            <div
              onClick={() => setDefPage("StartMenu")}
              className={defPage === "StartMenu" ? "defMenuButtonON" : ""}
            >
              {">"}Start Menu
            </div>
            <div
              onClick={() => setDefPage("Tray")}
              className={defPage === "Tray" ? "defMenuButtonON" : ""}
            >
              {">"}Tray
            </div>
          </>
        }
        <div
          onClick={() => { setDefPage("Window"); setSubMenu("Window") }}
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
              onClick={() => setDefPage("Menu")}
              className={defPage === "Menu" ? "defMenuButtonON" : ""}
            >
              {">"}Menu
            </div>
            <div
              onClick={() => setDefPage("App")}
              className={defPage === "App" ? "defMenuButtonON" : ""}
            >
              {">"}App
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
          onClick={() => {setDefPage("ContextMenu"); setSubMenu("none")}}
          className={defPage === "ContextMenu" ? "defMenuButtonON" : ""}
        >
          Context Menu
        </div>
      </nav>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="defPreview">
          {background.state.active === "scenario" ? <Scenario /> : <></>}
          {defPage === "Desktop" ? <DesktopPreview /> : <></>}
          {defPage === "Taskbar" ? <TaskBarPreview /> : <></>}
          {defPage === "Start" ? <StartPreview /> : <></>}
          {defPage === "StartMenu" ? <StartMenuPreview /> : <></>}
          {defPage === "Tray" ? <TrayPreview /> : <></>}
          {defPage === "Window" ? <WindowPreview /> : <></>}
          {defPage === "Menu" ? <MenuPreview /> : <></>}
          {defPage === "App" ? <AppPreview /> : <></>}
          {defPage === "Dialog" ? <DialogPreview /> : <></>}
          {defPage === "ContextMenu" ? <ContextMenuPreview /> : <></>}
        </div>
        {defPage === "Global" ? <Global /> : <></>}
        {defPage === "Desktop" ? <Desktop /> : <></>}
        {defPage === "Taskbar" ? <TaskBar /> : <></>}
        {defPage === "Start" ? <Start /> : <></>}
        {defPage === "StartMenu" ? <StartMenu /> : <></>}
        {defPage === "Tray" ? <Tray /> : <></>}
        {defPage === "Window" ? <Window /> : <></>}
        {defPage === "App" ? <App /> : <></>}
        {defPage === "Menu" ? <Menu /> : <></>}
        {defPage === "Dialog" ? <Dialog /> : <></>}
        {defPage === "ContextMenu" ? <ContextMenu /> : <></>}
        <br />
        <br />
        <br />
        <br />
      </form>
    </settings-container>
  );
};
