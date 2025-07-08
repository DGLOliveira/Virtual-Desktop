import { useContext, useEffect, useState, useCallback, lazy, Suspense } from "react";
import { DeviceContext } from "../../../DeviceManager/context.jsx";
import { ThemeContext } from "../../../ThemeManager/context.jsx";
import { StartList } from "./StartList.js";
import { StartListMobile } from "./StartListMobile.jsx";
import DefaultLogo from "./DefaultLogo.jsx";
import "./startButton.css";

export const StartButton = () => {
  const themeContext = useContext(ThemeContext);
  const deviceContext = useContext(DeviceContext);
  const [isOpen, setIsOpen] = useState(false);

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