import { useContext, useEffect, useState, useCallback, lazy, Suspense } from "react";
import { ThemeContext } from "../../../ThemeManager/context.jsx";
import { StartList } from "./StartList.js";
import "./startButton.css";

export const StartButton = () => {
  const themeContext = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);

  const Logo = useCallback((
      lazy(() => import(`../../../ThemeManager/${themeContext.StartButtonPath}`).catch(
        (error) => {
          let errorMessage = "Failed to load Start Button Logo";
          console.error(error);
          return { default: () => <></> }
        }
      ))
    ), [themeContext.StartButtonPath]);


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
        <StartList isOpen={isOpen} />
      <button
        onClick={() => setIsOpen(!isOpen)}
        title="Start (Alt + ❖)"
        aria-label="Start Button">
          <Suspense fallback={<></>}>
            <Logo isOpen={isOpen}/>
          </Suspense>
        <span>Start</span>
      </button>
    </start-button>
  )
}