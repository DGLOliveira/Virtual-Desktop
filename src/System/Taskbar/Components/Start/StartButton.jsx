import { useContext, useEffect, useState, useCallback, lazy, Suspense } from "react";
import { DeviceContext } from "../../../DeviceManager/context.jsx";
import { ThemeContext } from "../../../ThemeManager/context.jsx";
import { StartList } from "./StartList.js";
import { StartListMobile } from "./StartListMobile.jsx";
import "./startButton.css";

export const StartButton = () => {
  const themeContext = useContext(ThemeContext);
  const deviceContext = useContext(DeviceContext);
  const [isOpen, setIsOpen] = useState(false);

  const DefaultLogo = ({ isOpen }) => {
    return (
      <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          className="hex hex1"
          style={{
            mixBlendMode: "screen",
            fill: isOpen ? "#FF0000" : "",
            transform: isOpen ? "translate(45%, 23%) scale(1.5)" : "",
            transition: "fill 0.3s ease-in-out, transform 0.3s ease-in-out"
          }}
          d="M41.0481 108.077L105 71.1547L168.952 108.077V181.923L105 218.845L41.0481 181.923V108.077Z"
          stroke="#808080"
          strokeWidth="8"
        />
        <path
          className="hex hex2"
          style={{
            mixBlendMode: "screen",
            fill: isOpen ? "#00FF00" : "",
            transform: isOpen ? "translate(-45%, 23%) scale(1.5)" : "",
            transition: "fill 0.3s ease-in-out, transform 0.3s ease-in-out"
          }}
          d="M231.048 108.077L295 71.1547L358.952 108.077V181.923L295 218.845L231.048 181.923V108.077Z"
          stroke="#808080"
          strokeWidth="8"
        />
        <path
          className="hex hex3"
          style={{
            mixBlendMode: "screen",
            fill: isOpen ? "#0000FF" : "",
            transform: isOpen ? "translate(0, -45%) scale(1.5)" : "",
            transition: "fill 0.3s ease-in-out, transform 0.3s ease-in-out"
          }}
          d="M136.048 273.077L200 236.155L263.952 273.077V346.923L200 383.845L136.048 346.923V273.077Z"
          stroke="#808080"
          strokeWidth="8"
        />
        <path className="axis" d="M200 200L200 60" stroke="#808080" strokeWidth="8" />
        <path className="axis" d="M200 200L78.7564 270" stroke="#808080" strokeWidth="8" />
        <path className="axis" d="M200 200L321.244 270" stroke="#808080" strokeWidth="8" />
      </svg>
    );
  }

  const Logo = useCallback((
    lazy(() => import(`../../../ThemeManager/${themeContext.StartButtonPath}`).catch(
      (error) => {
        let errorMessage = "Failed to load Start Button Logo";
        console.error(errorMessage);
        return { default: DefaultLogo }
      }
    ))
  ), [themeContext.StartButtonPath]);


  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)
    && deviceContext.deviceType === "Desktop") {
      setIsOpen(false);
    }
  }

  const handleClick = () => {
    setIsOpen(!isOpen);
    deviceContext.setVirtualOSState({ ...deviceContext.virtualOSState, display: isOpen ? "none" : "startList" });

  };

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

  useEffect(()=>{
    if(deviceContext.virtualOSState.display !== "startList"){
      setIsOpen(false);
    }
  },[deviceContext.virtualOSState.display])

  return (
    <start-button
      style={{
        width: deviceContext.deviceType === "Desktop" ? "auto" : "100%"
      }}
      onBlur={(e) => handleBlur(e)
      }>
      {deviceContext.deviceType === "Desktop"
        ? <StartList isOpen={isOpen} />
        : <StartListMobile isOpen={isOpen} setIsOpen={setIsOpen} />
      }
      <button
        onClick={handleClick}
        style={{
          width: deviceContext.deviceType === "Desktop" ? "auto" : "100%"
        }}
        title="Start (Alt + ❖)"
        aria-label="Start Button">
        <Suspense fallback={<></>}>
          <Logo isOpen={isOpen} />
        </Suspense>
        <span>Start</span>
      </button>
    </start-button>
  )
}