//Sets up the Desktop Background and the Task Handler container

import { useContext } from "react";
import { AppContext } from "../AppManager/Context/context.jsx";
import { AppHandler } from "../AppManager/AppHandler.jsx";
import { AppIcon } from "../AppManager/Components/AppIcon.jsx";
import { ContextMenuContext } from "../ContextMenuManager/context.jsx";
import AppData from "../AppManager/Data/AppData.json";
import "./styles.css";


export function Desktop() {
  const appContext = useContext(AppContext);
  const contextMenu = useContext(ContextMenuContext);
  const handleContextMenu = (e) => {
    e.preventDefault();
    if (e.target.localName === "desk-top") {
      contextMenu.setOpen();
      contextMenu.setPosition(e.clientX, e.clientY);
      contextMenu.setContent({
        "Personalize": { action: () => { appContext.setOpen("Definitions") } }
      })
    }
  }
  return (
    <desk-top
      onContextMenu={(e) => handleContextMenu(e)}
      onDragEnter={(e) => e.preventDefault()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => e.preventDefault()}
    >
      <AppHandler />
    </desk-top>
  );
}
