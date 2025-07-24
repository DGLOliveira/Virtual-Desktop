/*Javascript Calculator without using eval() function, for cybersecurity and good practice.*/

import { useState, useEffect } from "react";
import { handleAction } from "./Handlers/handleAction.js";
import { handleTopMenu } from "./Handlers/handleTopMenu.js";
import CheckValue from "./Handlers/CheckValue.js";
import InputCalc from "./Handlers/InputCalc.js";
import InputFunct from "./Handlers/InputFunct.js";
import InputGraphWindow from "./Handlers/InputGraphWindow.js";
import Display from "./Components/Display.jsx";
import Keypad from "./Components/Keypad.jsx";
import "./style.css";

export default function Calculator(props) {

  const isSelected = props.isSelected;
  const action = props.action;
  const setAction = props.setAction;
  const appMenu = props.appMenu;
  const setAppMenu = props.setAppMenu;

  const [calculatorState, setCalculatorState] = useState({
    type: "Scientific",
    alt: false,
    trig: false,
    window: false,
  });
  const [displayState, setDisplayState] = useState({
    display: "0",
    minorDisplay: "",
    calc: [],
    answer: "",
  });
  const [graph, setGraph] = useState({
    active: "F",
    window: { x: [-10, 10], y: [-10, 10], active: "minx", decimal: false },
    draw: false,
    F: { display: "", calc: [], color: "#00FFFF" },
    G: { display: "", calc: [], color: "#FF00FF" },
    H: { display: "", calc: [], color: "#FFFF00" },
  });

  const handleInput = (input) => {
    if (calculatorState.type !== "Graphic") {
      InputCalc(input, displayState, setDisplayState, calculatorState);
    } else {
      if (!calculatorState.window) {
        InputFunct(input, graph, setGraph);
      } else {
        InputGraphWindow(input, graph, setGraph);
      }
    }
  };

  const handleKeyDown = (e) => {
    let input = e.key;
    if (isSelected) {
      if (CheckValue("Number", input)) {
        handleInput(Number(input));
      } else if (input === "+" || input === "-" || input === "^") {
        handleInput(input);
      } else if (
        calculatorState.type !== "Basic" &&
        (input === "(" || input === ")" || input === "!" || input == "^")
      ) {
        handleInput(input);
      } else if (input === "Enter" || input === "=" || input === "Draw") {
        handleInput("=");
      } else if (input === "*") {
        handleInput("×");
      } else if (input === "/") {
        handleInput("÷");
      } else if (input === ".") {
        handleInput(".");
      } else if (input === "c" || input === "C") {
        handleInput("C");
      } else if (input === "Backspace") {
        handleInput("←");
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const args = {
    calculatorState: calculatorState,
    setCalculatorState: setCalculatorState,
  }

  useEffect(() => {
    handleAction(action, setAction, args);
  }, [action]);

  useEffect(() => {
    handleTopMenu(appMenu, setAppMenu, args);
  }, [calculatorState]);

  return (
    <div id="calculatorContainer">
      <Display
        displayState={displayState}
        calculatorState={calculatorState}
        graph={graph}
        setGraph={setGraph}
      />
      <Keypad
        handleInput={handleInput}
        calculatorState={calculatorState}
      />
    </div>
  );
};
