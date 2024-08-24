/*Javascript Calculator without using eval() function, for cybersecurity and good practice.*/

import { useState, useEffect, useRef, useContext } from "react";
import { CheckValue } from "./Components/CheckValue.js";
import { Calculate } from "./Components/Calculate.js";
import { Graphic } from "./Components/Graphic.js";
import { handleAction } from "./Handlers/handleAction.js";
import { handleTopMenu } from "./Handlers/handleTopMenu.js";
import "./style.css";

export default function Calculator ({isSelected, action, setAction, appMenu, setAppMenu, appDialog, setAppDialog}) {
  const functionFRef = useRef(null);
  const functionGRef = useRef(null);
  const functionHRef = useRef(null);
  const minWindowXRef = useRef(null);
  const maxWindowXRef = useRef(null);
  const minWindowYRef = useRef(null);
  const maxWindowYRef = useRef(null);
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

  const setCalculation = (sign) => {
    let carry = 0;
    if (sign === "C") {
      setDisplayState({
        ...displayState,
        display: "0",
        minorDisplay: "",
        calc: [],
      });
    } else if (sign === "=") {
      if (displayState.calc.length !== 0) {
        if (calculatorState.type === "Basic") {
          carry = Calculate(displayState.calc, "multidiv");
        } else {
          carry = Calculate(displayState.calc, "");
        }
        setDisplayState({
          display: carry,
          minorDisplay: displayState.display + sign + carry,
          calc: [],
          answer: carry,
        });
      }
    } else if (sign === "Ans") {
      if (displayState.calc.length !== 0) {
        setDisplayState({
          ...displayState,
          display: displayState.display + String(displayState.answer),
          calc: [...displayState.calc, displayState.answer],
        });
      } else {
        setDisplayState({
          ...displayState,
          display: String(displayState.answer),
          calc: [displayState.answer],
        });
      }
    } else if (sign === "←") {
      if (displayState.calc.length >= 1) {
        displayState.display = displayState.display.slice(0, -1);
        if (
          CheckValue(
            "Number",
            displayState.calc[displayState.calc.length - 1],
          ) &&
          displayState.calc[displayState.calc.length - 1] >= 10
        ) {
          carry = Math.trunc(
            displayState.calc[displayState.calc.length - 1] / 10,
          );
          displayState.calc[displayState.calc.length - 1] = carry;
        } else if (displayState.calc[displayState.calc.length - 1].length > 1) {
          displayState.display = displayState.display.slice(
            0,
            -displayState.calc[displayState.calc.length - 1].length + 1,
          );
          displayState.calc.pop();
        } else {
          displayState.calc.pop();
        }
        setDisplayState({ ...displayState });
      } else {
        setDisplayState({
          ...displayState,
          calc: [],
          display: "0",
        });
      }
    } else {
      if (displayState.calc.length === 0) {
        setDisplayState({ ...displayState, display: sign, calc: [sign] });
      } else if (
        CheckValue("Number", sign) &&
        displayState.calc[displayState.calc.length - 1] === "."
      ) {
        setDisplayState({
          ...displayState,
          display: displayState.display + String(sign),
          calc: [...displayState.calc, String(sign)],
        });
      } else if (
        CheckValue("Number", sign) &&
        displayState.calc[displayState.calc.length - 2] === "."
      ) {
        displayState.calc[displayState.calc.length - 1] =
          String(displayState.calc[displayState.calc.length - 1]) +
          String(sign);
        setDisplayState({
          ...displayState,
          display: displayState.display + String(sign),
          calc: [...displayState.calc],
        });
      } else if (
        CheckValue("Number", sign) &&
        CheckValue("Number", displayState.calc[displayState.calc.length - 1])
      ) {
        carry = displayState.calc[displayState.calc.length - 1] * 10 + sign;
        displayState.calc.pop();
        setDisplayState({
          ...displayState,
          display: displayState.display + String(sign),
          calc: [...displayState.calc, carry],
        });
      } else {
        setDisplayState({
          display: displayState.display + String(sign),
          calc: [...displayState.calc, sign],
        });
      }
    }
  };
  const setFunction = (input) => {
    let carry = 0;
    let key = graph.active;
    if (input === "=") {
      graph.draw = !graph.draw;
    } else if (input === "C") {
      graph[key].display = "";
      graph[key].calc = [];
    } else if (input === "←") {
      if (graph[key].calc.length >= 1) {
        graph[key].display = graph[key].display.slice(0, -1);
        if (
          CheckValue("Number", graph[key].calc[graph[key].calc.length - 1]) &&
          graph[key].calc[graph[key].calc.length - 1] >= 10
        ) {
          carry = Math.trunc(graph[key].calc[graph[key].calc.length - 1] / 10);
          graph[key].calc[graph[key].calc.length - 1] = carry;
        } else if (graph[key].calc[graph[key].calc.length - 1] === "𝑥") {
          //Special character "𝑥" is converted to "\uD835" instead of erased by string.splice(0,-1)
          //This section deals specifically with that nonsense by repeating the splice(0,-1)
          graph[key].display = graph[key].display.slice(0, -1);
          graph[key].calc.pop();
        } else if (graph[key].calc[graph[key].calc.length - 1].length > 1) {
          graph[key].display = graph[key].display.slice(
            0,
            -graph[key].calc[graph[key].calc.length - 1].length + 1,
          );
          graph[key].calc.pop();
        } else {
          graph[key].calc.pop();
        }
      } else {
        graph[key].display = "";
        graph[key].calc = [];
      }
    } else {
      if (
        CheckValue("Number", input) &&
        graph[key].calc[graph[key].calc.length - 1] === "."
      ) {
        graph[key].display = graph[key].display + String(input);
        graph[key].calc = [...graph[key].calc, String(input)];
      } else if (
        CheckValue("Number", input) &&
        graph[key].calc[graph[key].calc.length - 2] === "."
      ) {
        graph[key].calc[graph[key].calc.length - 1] =
          String(graph[key].calc[graph[key].calc.length - 1]) + String(input);
        graph[key].display = graph[key].display + String(input);
      } else if (
        CheckValue("Number", input) &&
        CheckValue("Number", graph[key].calc[graph[key].calc.length - 1])
      ) {
        carry = graph[key].calc[graph[key].calc.length - 1] * 10 + input;
        graph[key].calc.pop();
        graph[key].display = graph[key].display + input;
        graph[key].calc = [...graph[key].calc, carry];
      } else {
        graph[key].display = graph[key].display + input;
        graph[key].calc = [...graph[key].calc, input];
      }
    }
    setGraph({ ...graph });
  };
  const setWindow = (input) => {
    let key = 0;
    if (graph.window.active === "maxx" || graph.window.active === "maxy") {
      key = 1;
    }
    let target = graph.window[graph.window.active.slice(3, 4)];
    if (CheckValue("Number", input)) {
      if (CheckValue("Number", target[key])) {
        if (Math.floor(target[key]) === target[key]) {
          if (graph.window.decimal) {
            target[key] = target[key] + input / 10;
          } else {
            target[key] = target[key] * 10 + input;
          }
        } else {
          let numberDecimals = Number(
            String(
              Number(
                Math.abs(target[key] - Math.trunc(target[key])).toFixed(15),
              ),
            ).length - 1,
          );
          if (numberDecimals <= 14) {
            target[key] = target[key] + input / Math.pow(10, carry);
          }
        }
        graph.window.decimal = false;
      } else if (target[key] === 0) {
        target[key] = input;
      } else {
        target[key] = target[key] + input;
      }
    } else if (input === ".") {
      graph.window.decimal = !graph.window.decimal;
    } else if (input === "-") {
      target[key] = -target[key];
    } else if (input === "C") {
      target[key] = 0;
    } else if (input === "←") {
      if (String(target[key]).length > 1) {
        let carry = Number(String(target[key]).slice(0, -1));
        if (CheckValue("Number", carry)) {
          target[key] = carry;
        } else {
          target[key] = 0;
        }
      } else {
        target[key] = 0;
      }
    } else if (input === "=") {
      graph.draw = !graph.draw;
    }
    setGraph({ ...graph });
  };
  const handleInput = (input) => {
    if (calculatorState.type !== "Graphic") {
      setCalculation(input);
    } else {
      if (!calculatorState.window) {
        setFunction(input);
      } else {
        setWindow(input);
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
  const args={
    calculatorState:calculatorState,
     setCalculatorState:setCalculatorState,
    }
useEffect(() => {
  handleAction(action, setAction, args);
},[action]);
useEffect(()=>{
  handleTopMenu(appMenu,setAppMenu, args);
},[calculatorState])
  return (
    <app-container id="calculatorContainer">
      {calculatorState.type !== "Graphic" ? (
        <div id="calculatorDisplayContainer">
          <div id="calculatorMinorDisplay">{displayState.minorDisplay}</div>
          <div id="calculatorDisplay">{displayState.display}</div>
        </div>
      ) : (
        <div id="calculatorGraphicContainer">
          <div id="calculatorGraphic">
            <Graphic graph={graph} />
          </div>
          <div className="calculatorGraphicParam">
            {!calculatorState.window ? (
              <>
                <div
                  ref={functionFRef}
                  className={
                    graph.active === "F"
                      ? "calculatorGraphicFunction calculatorGraphicFunctionActive"
                      : "calculatorGraphicFunction"
                  }
                  onClick={(e) => (
                    setGraph({ ...graph, active: "F" }),
                    functionFRef.current.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    })
                  )}
                >
                  ƒ(𝑥)={graph.F.display}
                </div>
                <div
                  ref={functionGRef}
                  className={
                    graph.active === "G"
                      ? "calculatorGraphicFunction calculatorGraphicFunctionActive"
                      : "calculatorGraphicFunction"
                  }
                  onClick={(e) => (
                    setGraph({ ...graph, active: "G" }),
                    functionGRef.current.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    })
                  )}
                >
                  𝑔(𝑥)={graph.G.display}
                </div>
                <div
                  ref={functionHRef}
                  className={
                    graph.active === "H"
                      ? "calculatorGraphicFunction calculatorGraphicFunctionActive"
                      : "calculatorGraphicFunction"
                  }
                  onClick={(e) => (
                    setGraph({ ...graph, active: "H" }),
                    functionHRef.current.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    })
                  )}
                >
                  𝒉(𝑥)={graph.H.display}
                </div>
              </>
            ) : (
              <>
                <div
                  ref={minWindowXRef}
                  className={
                    graph.window.active === "minx"
                      ? "calculatorGraphicFunction calculatorGraphicFunctionActive"
                      : "calculatorGraphicFunction"
                  }
                  onClick={(e) => (
                    setGraph({
                      ...graph,
                      window: { ...graph.window, active: "minx" },
                    }),
                    minWindowXRef.current.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    })
                  )}
                >
                  Min X: {graph.window.x[0]}
                </div>
                <div
                  ref={maxWindowXRef}
                  className={
                    graph.window.active === "maxx"
                      ? "calculatorGraphicFunction calculatorGraphicFunctionActive"
                      : "calculatorGraphicFunction"
                  }
                  onClick={(e) => (
                    setGraph({
                      ...graph,
                      window: { ...graph.window, active: "maxx" },
                    }),
                    maxWindowXRef.current.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    })
                  )}
                >
                  Max X: {graph.window.x[1]}
                </div>
                <div
                  ref={minWindowYRef}
                  className={
                    graph.window.active === "miny"
                      ? "calculatorGraphicFunction calculatorGraphicFunctionActive"
                      : "calculatorGraphicFunction"
                  }
                  onClick={(e) => (
                    setGraph({
                      ...graph,
                      window: { ...graph.window, active: "miny" },
                    }),
                    minWindowYRef.current.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    })
                  )}
                >
                  Min Y: {graph.window.y[0]}
                </div>
                <div
                  ref={maxWindowYRef}
                  className={
                    graph.window.active === "maxy"
                      ? "calculatorGraphicFunction calculatorGraphicFunctionActive"
                      : "calculatorGraphicFunction"
                  }
                  onClick={(e) => (
                    setGraph({
                      ...graph,
                      window: { ...graph.window, active: "maxy" },
                    }),
                    maxWindowYRef.current.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    })
                  )}
                >
                  Max Y: {graph.window.y[1]}
                </div>
              </>
            )}
          </div>
        </div>
      )}
      <div
        id="calculatorKeyboard"
        className={
          calculatorState.type == "Graphic"
            ? "calculatorKeyboardGraphic"
            : "calculatorKeyboardDigital"
        }
      >
        <div id="calculatorFunctions">
          {calculatorState.type !== "Basic" ? (
            <>
              <div
                className={
                  calculatorState.alt
                    ? "calculatorButton calculatorTypeButtonSelected"
                    : "calculatorButton"
                }
                onClick={() =>setCalculatorState({...calculatorState,alt: !calculatorState.alt,})}
              >
                Alt
              </div>
              <div
                className={calculatorState.trig ? "calculatorButton calculatorTypeButtonSelected": "calculatorButton"}
                onClick={() =>setCalculatorState({...calculatorState,trig: !calculatorState.trig,})}
              >
                Trig
              </div>
            </>
          ) : (
            <></>
          )}
          {calculatorState.type !== "Graphic" ? (
            <div style={{ background: "royalblue" }} className="calculatorButton" onClick={() => handleInput("Ans")}>Ans</div>
          ) : (
            <div style={{ background: "royalblue" }} className="calculatorButton" onClick={() => handleInput("𝑥")}>𝑥</div>
          )}
          <div style={{ background: "red" }} className="calculatorButton" onClick={() => handleInput("C")}>C</div>
          <div style={{ background: "darkorange" }} className="calculatorButton" onClick={() => handleInput("←")}>←</div>
          {calculatorState.type !== "Graphic" ? (
            <div style={{ background: "green" }} className="calculatorButton" onClick={() => handleInput("=")}>=</div>
          ) : (
            <>
              <div style={{ background: "green" }} className="calculatorButton" onClick={() => handleInput("=")}>Draw</div>
              <div
                className={
                  calculatorState.window
                    ? "calculatorButton"
                    : "calculatorButton calculatorButtonSmall"
                }
                onClick={() =>
                  setCalculatorState({
                    ...calculatorState,
                    window: !calculatorState.window,
                  })
                }
              >
                {!calculatorState.window ? "Window" : "ƒ(𝑥)"}
              </div>
            </>
          )}
        </div>
        <div id="calculatorKeyboardRow">
          <div
            id="calculatorNumpad"
            className={
              calculatorState.type === "Basic"
                ? "calculatorNumpadBasic"
                : "calculatorNumpadScientific"
            }
          >
            <div className="calculatorNumpadRow">
              <div className="calculatorButton" onClick={() => handleInput(7)}>7</div>
              <div className="calculatorButton" onClick={() => handleInput(8)}>8</div>
              <div className="calculatorButton" onClick={() => handleInput(9)}>9</div>
            </div>
            <div className="calculatorNumpadRow">
              <div className="calculatorButton" onClick={() => handleInput(4)}>4</div>
              <div className="calculatorButton" onClick={() => handleInput(5)}>5</div>
              <div className="calculatorButton" onClick={() => handleInput(6)}>6</div>
            </div>
            <div className="calculatorNumpadRow">
              <div className="calculatorButton" onClick={() => handleInput(1)}>1</div>
              <div className="calculatorButton" onClick={() => handleInput(2)}>2</div>
              <div className="calculatorButton" onClick={() => handleInput(3)}>3</div>
            </div>
            <div className="calculatorNumpadRow">
              <div className="calculatorButton" onClick={() => handleInput(0)} style={{ flexGrow: "2" }}>0</div>
              <div className="calculatorButton" onClick={() => handleInput(".")} style={{ flexGrow: "1" }}>.</div>
            </div>
          </div>
          <div
            id="calculatorExpressions"
            className={
              calculatorState.type === "Basic"
                ? "calculatorExpressionsBasic"
                : "calculatorExpressionsScientific"
            }
          >
            <div className="calculatorExpressionsColumn">
              <div className="calculatorButton" onClick={() => handleInput("+")}>+</div>
              <div className="calculatorButton" onClick={() => handleInput("-")}>-</div>
              <div className="calculatorButton" onClick={() => handleInput("×")}>×</div>
              <div className="calculatorButton" onClick={() => handleInput("÷")}>÷</div>
            </div>
            {calculatorState.type !== "Basic" ? (
              <>
                <div className="calculatorExpressionsColumn">
                  {!calculatorState.alt ? (
                    <div className="calculatorButton" onClick={() => handleInput("²")}>𝑥²</div>
                  ) : (
                    <div className="calculatorButton" onClick={() => handleInput("³")}>𝑥³</div>
                  )}
                  {!calculatorState.alt ? (
                    <div className="calculatorButton" onClick={() => handleInput("√²")}>√²</div>
                  ) : (
                    <div className="calculatorButton" onClick={() => handleInput("√³")}>√³</div>
                  )}
                  <div className="calculatorButton" onClick={() => handleInput("^")}>
                    <div>
                      𝑦<sup>𝑥</sup>
                    </div>
                  </div>
                  {!calculatorState.alt ? (
                    <div className="calculatorButton" onClick={() => handleInput("log₁₀")}>
                      <div>
                        log<sub>₁₀</sub>
                      </div>
                    </div>
                  ) : (
                    <div className="calculatorButton" onClick={() => handleInput("logₑ")}>
                      <div>
                        log<sub>ₑ</sub>
                      </div>
                    </div>
                  )}
                </div>
                <div className="calculatorExpressionsColumn">
                  {!calculatorState.alt ? (
                    !calculatorState.trig ? (
                      <>
                        <div className="calculatorButton" onClick={() => handleInput("sin")}>sin</div>
                        <div className="calculatorButton" onClick={() => handleInput("cos")}>cos</div>
                        <div className="calculatorButton" onClick={() =>  handleInput("tan")}>tan</div>
                      </>
                    ) : (
                      <>
                        <div className="calculatorButton" onClick={() => handleInput("sinh")}>sinh</div>
                        <div className="calculatorButton" onClick={() => handleInput("cosh")}>cosh</div>
                        <div className="calculatorButton" onClick={() => handleInput("tanh")}>tanh</div>
                      </>
                    )
                  ) : !calculatorState.trig ? (
                    <>
                      <div className="calculatorButton calculatorButtonSmall" onClick={() => handleInput("sin⁻¹")}>sin⁻¹</div>
                      <div className="calculatorButton calculatorButtonSmall" onClick={() => handleInput("cos⁻¹")}>cos⁻¹</div>
                      <div className="calculatorButton calculatorButtonSmall" onClick={() => handleInput("tan⁻¹")}>tan⁻¹</div>
                    </>
                  ) : (
                    <>
                      <div className="calculatorButton calculatorButtonSmall" onClick={() => handleInput("sinh⁻¹")}>sinh⁻¹</div>
                      <div className="calculatorButton calculatorButtonSmall" onClick={() => handleInput("cosh⁻¹")}>cosh⁻¹</div>
                      <div className="calculatorButton calculatorButtonSmall" onClick={() => handleInput("tanh⁻¹")}>tanh⁻¹</div>
                    </>
                  )}
                  {!calculatorState.alt ? (
                    <div className="calculatorButton" onClick={() => handleInput("°")}>°</div>
                  ) : (
                    <div className="calculatorButton" onClick={() => handleInput("rad")}>rad</div>
                  )}
                </div>
                <div className="calculatorExpressionsColumn">
                  {calculatorState.alt ? (
                    <div className="calculatorButton" onClick={() => handleInput(")")}>)</div>
                  ) : (
                    <div className="calculatorButton" onClick={() => handleInput("(")}>(</div>
                  )}
                  <div className="calculatorButton" onClick={() => handleInput("!")}>𝑥!</div>
                  <div className="calculatorButton" onClick={() => handleInput("π")}>π</div>
                  <div className="calculatorButton" onClick={() => handleInput("𝑒")}>𝑒</div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </app-container>
  );
};
