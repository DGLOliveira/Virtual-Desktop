import { useContext, useEffect, useState } from "react";

import { FileContext } from "../../../FileManager/context.jsx";
import { AppContext } from "../../../AppManager/Context/context.jsx";
import { ThemeContext } from "../../../ThemeManager/context.jsx";
import { AppIcon } from "../../../AppManager/Components/AppIcon.jsx";

import "./startList.css";

import { FaGear } from "react-icons/fa6";
import { MdOutlineRestartAlt } from "react-icons/md";
import { RiShutDownLine } from "react-icons/ri";

export const StartList = ({isOpen}) => {
    
  const fileContext = useContext(FileContext);
  const appContext = useContext(AppContext);
  const themeContext = useContext(ThemeContext);

  return(
    <start-list 
      class={isOpen ? "startListOpen" : ""}
    >
    <div>
      <button
        onClick={() => appContext.setOpen("Definitions")}
        title="Definitions"
        aria-label="Definitions Button"
      >
        <FaGear />
        Settings
      </button>
      <button
        onClick={() => window.location.reload()}
        title="Restart (F5)"
        aria-label="Restart Button"
      >
        <MdOutlineRestartAlt />
        Refresh
      </button>
      <button
        className="isOpenRed"
        onClick={() => window.close()}
        title="Close (Alt + F4)"
        aria-label="Close Button"
      >
        <RiShutDownLine />
        Close
      </button>
    </div>
    <ul>
      {Object.keys(fileContext.taskbar).map((name, index) => (
        name !== "Definitions" &&
        <li key={name + "startListedApp"} >
          <button
            onClick={() => appContext.setOpen(name)}
            aria-label={"Open " + name + " App"}
          >
            <AppIcon appName={name} />
            <span>{name}</span>
          </button>
        </li>
      ))}
    </ul>
  </start-list>
  );
}  