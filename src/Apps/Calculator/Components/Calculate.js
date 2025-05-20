import { CheckValue } from "./CheckValue.js";

export const Calculate = (array, flag) => {
  const findDecimals = (arr) => {
    let decArr = [];
    arr.forEach((value, index) => {
      if (value === ".") {
        decArr = [...decArr, index];
      }
    });
    return decArr;
  };

  const getConstant = (value) => {
    if (value === "𝑒") {
      return Math.E;
    } else if (value === "π") {
      return Math.PI;
    }
  };

  const findParenthesisIndex = (arr) => {
    let startParArr = [];
    let endParArr = [];
    arr.forEach((value, index) => {
      if (value === "(") {
        startParArr = [...startParArr, index];
      } else if (value === ")") {
        endParArr = [...endParArr, index];
      }
    });
    return { start: startParArr, end: endParArr };
  };
  const findValidParenthesis = (parIndex) => {
    let start = 0;
    let end = 0;
    let dist = parIndex.end[0] - parIndex.start[0];
    parIndex.start.forEach((valueStart, i) => {
      parIndex.end.forEach((valueEnd, j) => {
        let newDist = parIndex.end[j] - parIndex.start[i];
        if (dist > newDist && newDist > 0) {
          start = i;
          end = j;
          dist = newDist;
        }
      });
    });
    if (dist < 1 || !CheckValue("Number", dist)) {
      return false;
    } else {
      return { start, end, dist };
    }
  };

  const findExpIndex = (arr) => {
    let expIndex = [];
    arr.forEach((value, index) => {
      if (CheckValue("Expression", value)) {
        expIndex = [...expIndex, index];
      }
    });
    return expIndex;
  };
  const getExpression = (exp, a, b) => {
    let ans;
    switch (exp) {
      case "²":
        return Math.pow(a, 2);
      case "³":
        return Math.pow(a, 3);
      case "^":
        ans = Math.pow(a, b);
        if (!CheckValue("Number", ans)) {
          return "Unreal Answer";
        }
        return ans;
      case "√²":
        if (a < 0) {
          return "Unreal Answer";
        }
        return Math.sqrt(a);
      case "√³":
        return Math.cbrt(a);
      case "log₂":
        return Math.log2(a);
      case "log₁₀":
        return Math.log10(a);
      case "logₑ":
        return Math.log(a);
      case "!":
        ans = a;
        for (let i = a - 1; i > 0; i--) {
          ans = ans * i;
        }
        return ans;
      case "sin":
        return Math.sin(a);
      case "cos":
        return Math.cos(a);
      case "tan":
        return Math.tan(a);
      case "sinh":
        return Math.sinh(a);
      case "cosh":
        return Math.cosh(a);
      case "tanh":
        return Math.tanh(a);
      case "sin⁻¹":
        if (a < -1 || a > 1) {
          return "Out of Range";
        }
        return Math.asin(a);
      case "cos⁻¹":
        if (a < -1 || a > 1) {
          return "Out of Range";
        }
        return Math.acos(a);
      case "tan⁻¹":
        return Math.atan(a);
      case "sinh⁻¹":
        return Math.asinh(a);
      case "cosh⁻¹":
        if (a < 1) {
          return "Out of Range";
        }
        return Math.acosh(a);
      case "tanh⁻¹":
        if (a < -1 || a > 1) {
          return "Out of Range";
        }
        return Math.atanh(a);
      case "°":
        return a * (Math.PI / 180);
      case "rad":
        return a / (Math.PI / 180);
    }
  };

  const findArithIndex = (arr, sign, sign2) => {
    let indexArr = [];
    arr.forEach((value, index) => {
      if (value === sign || value === sign2) {
        indexArr = [...indexArr, index];
      }
    });
    return indexArr;
  };

  const calculate = (array, flag) => {
    //flag indicates calculation order according to PEMDAS/BOMDAS, to account for recursive calls and avoid needless repetition

    let arr = structuredClone(array);
    let currCalc = "";
    let shift = 0;
    let error = false;

    if (flag === "") {
      //Handle Decimals
      let decIndex = findDecimals(arr);
      decIndex.forEach((value) => {
        if (
          CheckValue("Number", arr[value - shift - 1]) &&
          CheckValue("Number", arr[value - shift + 1]) &&
          Math.round(arr[value - shift - 1]) === arr[value - shift - 1]
        ) {
          arr[value - shift - 1] = Number(
            arr[value - shift - 1] + "." + arr[value - shift + 1],
          );
          arr.splice(value - shift, 2);
          shift += 2;
        } else {
          error = "Syntax Error";
        }
      });
      shift = 0;
      //Handle omitted Multiplications
      array.forEach((value, index) => {
        if (
          ((CheckValue("Number", arr[index + shift - 1]) ||
            arr[index + shift - 1] === ")") &&
            (CheckValue("LeftSideExpression",arr[index + shift]) ||
                CheckValue("Constant", arr[index + shift]) ||
                arr[index + shift] === "(")
            ) ||
          (CheckValue("Constant", arr[index + shift - 1]) &&
            (CheckValue("Constant",arr[index + shift]) ||
                CheckValue("LeftSideExpression", arr[index + shift]) ||
                CheckValue("Number", arr[index + shift]) ||
                arr[index + shift] === "(")
            ))
         {
          arr = [
            ...arr.slice(0, index + shift),
            "×",
            ...arr.slice(index + shift, arr.length),
          ];
          shift++;
        }
      });
      shift = 0;
      //Handle Constants
      arr.forEach((value, index) => {
        if (CheckValue("Constant", value)) {
          arr[index] = getConstant(value);
        }
      });
      flag = "parenthesis";
    }
    //Handle calculations within Parenthesis
    if (flag === "parenthesis" && !error) {
      let parIndex = findParenthesisIndex(arr);
      let parPair = findValidParenthesis(parIndex);
      let loopLimiter = 10;
      //Calculate value within shortest parenthesis, repeat untill no valid pair is found
      while (parPair !== false && !error && loopLimiter > 0) {
        currCalc = calculate(
          arr.slice(
            parIndex.start[parPair.start] + 1,
            parIndex.end[parPair.end],
          ),
          "exponents",
        );
        if (!CheckValue("Error", currCalc)) {
          error = CheckValue("Error", currCalc);
        }
        arr[parIndex.start[parPair.start]] = currCalc;

        //Remove remaining values from calculation
        arr.splice([parIndex.start[parPair.start] + 1], parPair.dist - 1);
        parIndex.start.splice([parPair.start], 1);
        parIndex.end.splice([parPair.end], 1);

        //Shift parenthesis Indexes to account for shorter calculation array
        for (let i = parPair.start; i < parIndex.start.length; i++) {
          parIndex.start[i] = parIndex.start[i] - parPair.dist + 1;
        }
        for (let i = parPair.end; i < parIndex.end.length; i++) {
          parIndex.end[i] = parIndex.end[i] - parPair.dist + 1;
        }
        parPair = findValidParenthesis(parIndex);
        loopLimiter--;
      }
      //Clean up pairless parenthesis
      for (let i = 0; i < arr.length; i++) {
        while (arr[i] === "(" || arr[i] === ")") {
          arr.splice([i], 1);
        }
      }
      flag = "exponents";
    }
    //Handle exponential and unitary calculations
    if (flag === "exponents" && !error) {
      let expIndex = findExpIndex(arr);
      expIndex.forEach((value) => {
        if (CheckValue("RightSideExpression", arr[value - shift])) {
          currCalc = getExpression(arr[value - shift], arr[value - shift - 1]);
          arr[value - shift - 1] = currCalc;
          arr.splice([value - shift], 1);
          shift++;
        } else if (arr[value - shift] === "^") {
          currCalc = getExpression(
            arr[value - shift],
            arr[value - shift - 1],
            arr[value - shift + 1],
          );
          arr[value - shift - 1] = currCalc;
          arr.splice([value - shift], 2);
          shift += 2;
        } else {
          currCalc = getExpression(arr[value - shift], arr[value - shift + 1]);
          arr[value - shift] = currCalc;
          arr.splice([value - shift + 1], 1);
          shift++;
          if (CheckValue("Error", currCalc)) {
            error = CheckValue("Error", currCalc);
          }
        }
      });
      shift = 0;
      flag = "multidiv";
    }
    //Handle Multiplications and Divisions
    if (flag === "multidiv" && !error) {
      let multidivArr = findArithIndex(arr, "×", "÷");
      multidivArr.forEach((value) => {
        if (arr[value - shift] === "×") {
          currCalc = arr[value - shift - 1] * arr[value - shift + 1];
        } else {
          currCalc = arr[value - shift - 1] / arr[value - shift + 1];
        }
        if (CheckValue("Error", currCalc)) {
          error = CheckValue("Error", currCalc);
        }
        if (!CheckValue("Number", currCalc)) {
          error = "Syntax Error";
        }
        arr[value - shift - 1] = currCalc;
        arr.splice([value - shift], 2);
        shift += 2;
      });
      shift = 0;
      flag = "sumsub";
    }
    //Handle Sums and Substractions
    if (flag === "sumsub" && !error) {
      let sumsubArr = findArithIndex(arr, "+", "-");
      sumsubArr.forEach((value) => {
        if (value - shift === 0) {
          if (!CheckValue("Number", arr[value - shift + 1])) {
            error = "Syntax Error";
          } else {
            if (arr[value - shift] === "-") {
              currCalc = -arr[value - shift + 1];
            } else {
              currCalc = arr[value - shift + 1];
            }
            arr[value - shift] = currCalc;
            arr.splice(value - shift + 1, 1);
            shift++;
          }
        } else {
          if (!CheckValue("Number", arr[value - shift + 1])) {
            error = "Syntax Error";
          } else {
            if (arr[value - shift] === "-") {
              currCalc = arr[value - shift - 1] - arr[value - shift + 1];
            } else {
              currCalc = arr[value - shift - 1] + arr[value - shift + 1];
            }
            arr[value - shift - 1] = currCalc;
            arr.splice([value - shift], 2);
            shift += 2;
          }
        }
      });
    }
    if (error) {
      return error;
    }
    if (arr.length === 0) {
      return 0;
    }
    return Number(arr[0].toPrecision(15));
  };
  return calculate(array, flag);
};
