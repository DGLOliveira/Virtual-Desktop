// Definitions allows for user personalization of the app aspect and style. See individual Fragments for reference.

import { useState, useEffect, useContext, Fragment } from "react";
import { Global } from "./Pages/Global.jsx";
import { DesktopPreview, Desktop } from "./Pages/Desktop.jsx";
import { WindowPreview, Window } from "./Pages/Windows/Window.jsx";
import { MenuPreview, Menu } from "./Pages/Windows/Menu.jsx";
import { AppPreview, App } from "./Pages/Windows/App.jsx";
import { DialogPreview, Dialog } from "./Pages/Windows/Dialog.jsx";
import { TaskBarPreview, TaskBar } from "./Pages/Taskbar/TaskBar.jsx";
import { MainButtonsPreview, MainButtons } from "./Pages/Taskbar/MainButtons.jsx";
import { StartMenuPreview, StartMenu } from "./Pages/Taskbar/StartMenu.jsx";
import { AppListPreview, AppList } from "./Pages/Taskbar/AppList.jsx";
import { LiveAppsPreview, LiveApps } from "./Pages/Taskbar/LiveApps.jsx";
import { TrayPreview, Tray } from "./Pages/Taskbar/Tray.jsx";
import { TrayCollapsedPreview, TrayCollapsed } from "./Pages/Taskbar/TrayCollapsed.jsx";
import { TrayExpandedPreview, TrayExpanded } from "./Pages/Taskbar/TrayExpanded.jsx";
import { TrayWindowPreview, TrayWindow } from "./Pages/Taskbar/Window.jsx";
import { ContextMenuPreview, ContextMenu } from "./Pages/ContextMenu.jsx";
import Scenario from "../../System/Desktop/Scenario.jsx";
import { BackgroundContext } from "../../System/Desktop/BackgroundContext.js";
import { DeviceContext } from "../../System/DeviceManager/context.jsx";
import "./style.css";

export default function Definitions() {
  const [subMenu, setSubMenu] = useState("none");
  const [defPage, setDefPage] = useState("Global");
  const background = useContext(BackgroundContext);
  const device = useContext(DeviceContext);
  const [menuList, setMenuList] = useState([
    "Global",
    "Desktop",
    ["Taskbar",["Taskbar", "Start", "Start Menu", "Live Apps", "Apps List"]],
    ["Window",["Window", "Menu", "App", "Dialog"]],
    ["Tray",["Tray", "Tray Window", "Tray Collapsed", "Tray Expanded"]],
    "Context Menu",
  ]);

useEffect(()=>{
  switch(device.deviceType){
    case "Desktop":
      setMenuList([
        "Global",
        "Desktop",
        ["Taskbar",["Taskbar", "Main Buttons", "Start Menu", "Live Apps"]],
        ["Window",["Window", "Menu", "App", "Dialog"]],
        ["Tray",["Tray", "Tray Window"]],
        "Context Menu",
    ])
    break;
    case "Mobile":
      setMenuList([
        "Global",
        "Desktop",
        ["Taskbar",["Taskbar", "Main Buttons", "Apps List"]],
        ["Window",[ "App", "Menu", "Dialog"]],
        ["Tray",["Tray Collapsed", "Tray Expanded", "Tray Window"]],
        "Context Menu",
    ])
    break;
  }
},[device.deviceType])

  return (
    <settings-container>
      <nav>
        {menuList.map((menu, index) => {
          if (typeof menu !== "string") {
            return (
              <Fragment key={index}>
                <div
                  className={subMenu === menu[0] ? "defMenuButton defMenuButtonON" : "defMenuButton"}
                  onClick={() => {setDefPage(menu[1][0]);setSubMenu(menu[0])}}
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
          {defPage === "Main Buttons" ? <MainButtonsPreview /> : <></>}
          {defPage === "Start Menu" ? <StartMenuPreview /> : <></>}
          {defPage === "Apps List" ? <AppListPreview /> : <></>}
          {defPage === "Live Apps" ? <LiveAppsPreview /> : <></>}
          {defPage === "Tray" ? <TrayPreview /> : <></>}
          {defPage === "Tray Window" ? <TrayWindowPreview /> : <></>}
          {defPage === "Tray Collapsed" ? <TrayCollapsedPreview /> : <></>}
          {defPage === "Tray Expanded" ? <TrayExpandedPreview /> : <></>}
          {defPage === "Window" ? <WindowPreview /> : <></>}
          {defPage === "Menu" ? <MenuPreview /> : <></>}
          {defPage === "App" ? <AppPreview /> : <></>}
          {defPage === "Dialog" ? <DialogPreview /> : <></>}
          {defPage === "Context Menu" ? <ContextMenuPreview /> : <></>}
        </div>
        {defPage === "Global" ? <Global /> : <></>}
        {defPage === "Desktop" ? <Desktop /> : <></>}
        {defPage === "Taskbar" ? <TaskBar /> : <></>}
        {defPage === "Main Buttons" ? <MainButtons /> : <></>}
        {defPage === "Start Menu" ? <StartMenu /> : <></>}
        {defPage === "Apps List" ? <AppList /> : <></>}
        {defPage === "Live Apps" ? <LiveApps /> : <></>}
        {defPage === "Tray" ? <Tray /> : <></>}
        {defPage === "Tray Window" ? <TrayWindow /> : <></>}
        {defPage === "Tray Collapsed" ? <TrayCollapsed /> : <></>}
        {defPage === "Tray Expanded" ? <TrayExpanded /> : <></>}
        {defPage === "Window" ? <Window /> : <></>}
        {defPage === "App" ? <App /> : <></>}
        {defPage === "Menu" ? <Menu /> : <></>}
        {defPage === "Dialog" ? <Dialog /> : <></>}
        {defPage === "Context Menu" ? <ContextMenu /> : <></>}
      </form>
    </settings-container>
  );
};
