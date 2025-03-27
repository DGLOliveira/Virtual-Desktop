import { useContext, useEffect, useState } from "react";

import { FileContext } from "../../../FileManager/context.jsx";
import { AppContext } from "../../../AppManager/Context/context.jsx";
import { ThemeContext } from "../../../ThemeManager/context.jsx";

import { StartList } from "./StartList.js";

import "./startButton.css";

export const StartButton = () => {
  const fileContext = useContext(FileContext);
  const appContext = useContext(AppContext);
  const themeContext = useContext(ThemeContext);
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

  const startButtonClass = (open) => {
    let ans = "";
    switch (themeContext.startButtonTheme) {
      case "Classic":
        ans = "startButtonClassic";
        break;
      case "Aero":
        ans = "startButtonAero";
        break;
      case "Aqua":
        ans = "startButtonAqua";
        break;
      case "Default":
      default:
        ans = "startButtonFluent";
        break;
    }
    if (open) {
      ans += " " + ans + "Active";
    }
    return ans;
  }

  return (
    <start-button
      onBlur={(e) => handleBlur(e)}>
        <StartList isOpen={isOpen} />
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={startButtonClass(isOpen)}
        title="Start (Alt + ❖)"
        aria-label="Start Button">
        <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="startButtonAquaRed" gradientTransform="rotate(90)">
              <stop offset="20%" stopColor="#FF9999" />
              <stop offset="50%" stopColor="#FF0000" />
              <stop offset="80%" stopColor="#9F0000" />
            </linearGradient>
            <linearGradient id="startButtonAquaGreen" gradientTransform="rotate(90)">
              <stop offset="20%" stopColor="#99FF99" />
              <stop offset="50%" stopColor="#00FF00" />
              <stop offset="80%" stopColor="#009F00" />
            </linearGradient>
            <linearGradient id="startButtonAquaBlue" gradientTransform="rotate(90)">
              <stop offset="20%" stopColor="#9999FF" />
              <stop offset="50%" stopColor="#0000FF" />
              <stop offset="80%" stopColor="#00009F" />
            </linearGradient>
          </defs>
          <path
            className="hex hex1"
            style={{
              mixBlendMode: "screen",
              fill: startButtonClass(false) === "startButtonAqua" ? "url(#startButtonAquaRed)" : isOpen ? "#FF0000" : "",
              transform: isOpen ? "translate(45%, 23%) scale(1.5)" : "",
              transition: "fill 0.5s ease-in-out, transform 0.5s ease-in-out"
            }}
            d="M41.0481 108.077L105 71.1547L168.952 108.077V181.923L105 218.845L41.0481 181.923V108.077Z"
            stroke="#808080"
            strokeWidth="8"
          />
          <path
            className="hex hex2"
            style={{
              mixBlendMode: "screen",
              fill: startButtonClass(false) === "startButtonAqua" ? "url(#startButtonAquaGreen)" : isOpen ? "#00FF00" : "",
              transform: isOpen ? "translate(-45%, 23%) scale(1.5)" : "",
              transition: "fill 0.5s ease-in-out, transform 0.5s ease-in-out"
            }}
            d="M231.048 108.077L295 71.1547L358.952 108.077V181.923L295 218.845L231.048 181.923V108.077Z"
            stroke="#808080"
            strokeWidth="8"
          />
          <path
            className="hex hex3"
            style={{
              mixBlendMode: "screen",
              fill: startButtonClass(false) === "startButtonAqua" ? "url(#startButtonAquaBlue)" : isOpen ? "#0000FF" : "",
              transform: isOpen ? "translate(0, -45%) scale(1.5)" : "",
              transition: "fill 0.5s ease-in-out, transform 0.5s ease-in-out"
            }}
            d="M136.048 273.077L200 236.155L263.952 273.077V346.923L200 383.845L136.048 346.923V273.077Z"
            stroke="#808080"
            strokeWidth="8"
          />
          <path className="axis" d="M200 200L200 60" stroke="#808080" strokeWidth="8" />
          <path className="axis" d="M200 200L78.7564 270" stroke="#808080" strokeWidth="8" />
          <path className="axis" d="M200 200L321.244 270" stroke="#808080" strokeWidth="8" />
        </svg>
        <span>Start</span>
      </button>
    </start-button>
  )
}