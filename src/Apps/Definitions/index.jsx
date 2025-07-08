// Definitions allows for user personalization of the app aspect and style. See individual Fragments for reference.

import { useState, useContext, Fragment } from "react";
import { Global } from "./Pages/Global.jsx";
import { DesktopPreview, Desktop } from "./Pages/Desktop.jsx";
import { WindowPreview, Window } from "./Pages/Windows/Window.jsx";
import { MenuPreview, Menu } from "./Pages/Windows/Menu.jsx";
import { AppPreview, App } from "./Pages/Windows/App.jsx";
import { DialogPreview, Dialog } from "./Pages/Windows/Dialog.jsx";
import { TaskBarPreview, TaskBar } from "./Pages/Taskbar/TaskBar.jsx";
import { StartPreview, Start } from "./Pages/Taskbar/Start.jsx";
import { StartMenuPreview, StartMenu } from "./Pages/Taskbar/StartMenu.jsx";
import { LiveAppsPreview, LiveApps } from "./Pages/Taskbar/LiveApps.jsx";
import { TaskbarMobileBottomPreview, TaskbarMobileBottom } from "./Pages/TaskbarMobile/Bottom.jsx";
import { TrayPreview, Tray } from "./Pages/Taskbar/Tray.jsx";
import { TrayWindowPreview, TrayWindow } from "./Pages/Taskbar/Window.jsx";
import { ContextMenuPreview, ContextMenu } from "./Pages/ContextMenu.jsx";
import Scenario from "../../System/Desktop/Scenario.jsx";
import { BackgroundContext } from "../../System/Desktop/BackgroundContext.js";
import "./style.css";

export default function Definitions() {
  const [subMenu, setSubMenu] = useState("none");
  const [defPage, setDefPage] = useState("Global");
  const background = useContext(BackgroundContext);
  const menuList = [
    "Global",
    "Desktop",
    ["Taskbar",["Taskbar", "Start", "Start Menu", "Live Apps"]],
    ["TaskbarMobile",["Bottom"]],
    ["Window",["Window", "Menu", "App", "Dialog"]],
    ["Tray",["Tray", "Tray Window"]],
    "Context Menu",
  ];
  return (
    <settings-container>
      <nav>
        {menuList.map((menu, index) => {
          if (typeof menu !== "string") {
            return (
              <Fragment key={index}>
                <div
                  className={subMenu === menu[0] ? "defMenuButton defMenuButtonON" : "defMenuButton"}
                  onClick={() => {setDefPage(menu[0]);setSubMenu(menu[0])}}
                >{menu[0]}
                </div>
                <div
                  className={subMenu === menu[0] ? "defSubMenu" : "defSubMenu defSubMenuHidden"}
                >
                  {menu[1].map((submenu, index) => (
                    <div
                      key={index}
                      className={defPage === submenu ? "defMenuButton defMenuButtonON" : "defMenuButton"}
                      onClick={() => setDefPage(submenu)}
                    >
                      {submenu}
                    </div>
                  ))}
                </div>
              </Fragment>
            );
          } else {
            return (
              <div
                key={index}
                className={defPage === menu ? "defMenuButton defMenuButtonON" : "defMenuButton"}
                onClick={() => {setDefPage(menu); setSubMenu("none")}}
              >
                {menu}
              </div>
            );
          }
        })}
      </nav>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="defPreview">
          {background.state.active === "scenario" ? <Scenario /> : <></>}
          {defPage === "Desktop" ? <DesktopPreview /> : <></>}
          {defPage === "Taskbar" ? <TaskBarPreview /> : <></>}
          {defPage === "TaskbarMobile" ? <TaskbarMobileBottomPreview /> : <></>}
          {defPage === "Start" ? <StartPreview /> : <></>}
          {defPage === "Start Menu" ? <StartMenuPreview /> : <></>}
          {defPage === "Live Apps" ? <LiveAppsPreview /> : <></>}
          {defPage === "Tray" ? <TrayPreview /> : <></>}
          {defPage === "Tray Window" ? <TrayWindowPreview /> : <></>}
          {defPage === "Window" ? <WindowPreview /> : <></>}
          {defPage === "Menu" ? <MenuPreview /> : <></>}
          {defPage === "App" ? <AppPreview /> : <></>}
          {defPage === "Dialog" ? <DialogPreview /> : <></>}
          {defPage === "Context Menu" ? <ContextMenuPreview /> : <></>}
        </div>
        {defPage === "Global" ? <Global /> : <></>}
        {defPage === "Desktop" ? <Desktop /> : <></>}
        {defPage === "Taskbar" ? <TaskBar /> : <></>}
        {defPage === "TaskbarMobile" ? <TaskbarMobileBottom /> : <></>}
        {defPage === "Start" ? <Start /> : <></>}
        {defPage === "Start Menu" ? <StartMenu /> : <></>}
        {defPage === "Live Apps" ? <LiveApps /> : <></>}
        {defPage === "Tray" ? <Tray /> : <></>}
        {defPage === "Tray Window" ? <TrayWindow /> : <></>}
        {defPage === "Window" ? <Window /> : <></>}
        {defPage === "App" ? <App /> : <></>}
        {defPage === "Menu" ? <Menu /> : <></>}
        {defPage === "Dialog" ? <Dialog /> : <></>}
        {defPage === "Context Menu" ? <ContextMenu /> : <></>}
      </form>
    </settings-container>
  );
};
