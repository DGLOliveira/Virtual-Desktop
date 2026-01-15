import Calculate from "./Calculate.js";
import CheckValue from "./CheckValue.js";

export default function InputCalc(sign, displayState, setDisplayState, calculatorState) {
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
      if(displayState.answer !== "" && CheckValue("Number", displayState.answer)){
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