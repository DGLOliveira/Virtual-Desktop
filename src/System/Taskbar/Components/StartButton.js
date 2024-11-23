import { useContext, useEffect, useState } from "react";

import {FileContext} from "../../../System/FileManager/context.jsx";
import { AppContext } from "../../AppManager/Context/context.jsx";
import { AppIcon } from "../../AppManager/Components/AppIcon.jsx";

import { FaReact  } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { MdOutlineRestartAlt } from "react-icons/md";
import { RiShutDownLine } from "react-icons/ri";

export const StartButton = () => {
  const fileContext = useContext(FileContext);
  const appContext = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsOpen(false);
    }
  }
  const handleEventListener = (event) => {
    if (event.altKey && event.key === "Meta") {
      setIsOpen(!isOpen);
    }
    if(event.key === "Escape") {
      setIsOpen(false);
    }
  }
  useEffect(() => {
    addEventListener("keydown", handleEventListener);
    return () => removeEventListener("keydown", handleEventListener);
  }, [handleEventListener])

  return (
    <start-button
      onBlur={(e) => handleBlur(e)}>
      <start-list class={isOpen ? "expandHeight expandWidth" : "collapseHeight collapseWidth"}>
        <div>
          <button
            onClick={() => appContext.setOpen("Definitions")}
            title="Restart (F5)"
            aria-label="Restart Button"
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
            className="buttonActiveRed"
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
            name!== "Definitions" &&
            <li key={name + "startListedApp"} >
              <button 
              onClick={() => appContext.setOpen(name)}
              aria-label={"Open " + name + " App"}
              >
                <AppIcon appName={name} />
                {" "}
                {name}
              </button>
            </li>
          ))}
        </ul>
      </start-list>
      <button
        className={isOpen ? "startButtonActive" : null}
        onClick={() => setIsOpen(!isOpen)}
        title="Start (Alt + ❖)"
        aria-label="Start Button"  >
        <FaReact />
      </button>
    </start-button>
  )
}