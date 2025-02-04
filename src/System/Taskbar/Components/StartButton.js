import { useContext, useEffect, useState } from "react";

import { FileContext } from "../../../System/FileManager/context.jsx";
import { AppContext } from "../../AppManager/Context/context.jsx";
import { AppIcon } from "../../AppManager/Components/AppIcon.jsx";

import { FaReact } from "react-icons/fa";
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
    if (event.key === "Escape") {
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
                {" "}
                {name}
              </button>
            </li>
          ))}
        </ul>
      </start-list>
      <button
        className={isOpen ? "startisOpen" : null}
        onClick={() => setIsOpen(!isOpen)}
        title="Start (Alt + ❖)"
        aria-label="Start Button">
        <svg className='buttonAnimated' width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            className="hex hex1"
            style={{
              mixBlendMode: "screen",
              fill: isOpen ? "#FF0000" : "",
              transform: isOpen ? "translate(45%, 23%) scale(1.5)" : "",
              transition: "fill 0.5s ease-in-out, transform 0.5s ease-in-out"
            }}
            d="M41.0481 108.077L105 71.1547L168.952 108.077V181.923L105 218.845L41.0481 181.923V108.077Z"
            stroke="#808080"
            stroke-width="8"
          />
          <path
            className="hex hex2"
            style={{
              mixBlendMode: "screen",
              fill: isOpen ? "#00FF00" : "",
              transform: isOpen ? "translate(-45%, 23%) scale(1.5)" : "",
              transition: "fill 0.5s ease-in-out, transform 0.5s ease-in-out"
            }}
            d="M231.048 108.077L295 71.1547L358.952 108.077V181.923L295 218.845L231.048 181.923V108.077Z"
            stroke="#808080"
            stroke-width="8"
          />
          <path
            className="hex hex3"
            style={{
              mixBlendMode: "screen",
              fill: isOpen ? "#0000FF" : "",
              transform: isOpen ? "translate(0, -45%) scale(1.5)" : "",
              transition: "fill 0.5s ease-in-out, transform 0.5s ease-in-out"
            }}
            d="M136.048 273.077L200 236.155L263.952 273.077V346.923L200 383.845L136.048 346.923V273.077Z"
            stroke="#808080"
            stroke-width="8"
          />
          <path className="axis" d="M200 200L200 60" stroke="#808080" stroke-width="8" />
          <path className="axis" d="M200 200L78.7564 270" stroke="#808080" stroke-width="8" />
          <path className="axis" d="M200 200L321.244 270" stroke="#808080" stroke-width="8" />
        </svg>
      </button>
    </start-button>
  )
}