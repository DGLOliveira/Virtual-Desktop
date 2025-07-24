export default function CheckValue(type, input) {
  const isNumber = (value) => {
    return !isNaN(Number(value));
  };

  const isError = (value) => {
    if (
      value === "Syntax Error" ||
      value === "Unreal Answer" ||
      value === "Out of Range"
    ) {
      return value;
    }
    return false;
  };

  const constants = ["𝑒", "π"];
  const isConstant = (val) => {
    let flag = false;
    constants.forEach((value) => {
      if (value === val) {
        flag = true;
      }
    });
    return flag;
  };

  const exponents = [
    "^",
    "²",
    "³",
    "√²",
    "√³",
    "log₂",
    "log₁₀",
    "logₑ",
    "!",
    "sin",
    "cos",
    "tan",
    "sinh",
    "cosh",
    "tanh",
    "sin⁻¹",
    "cos⁻¹",
    "tan⁻¹",
    "sinh⁻¹",
    "cosh⁻¹",
    "tanh⁻¹",
    "°",
    "rad",
  ];
  const isExpression = (val) => {
    let flag = false;
    exponents.forEach((value) => {
      if (value === val) {
        flag = true;
      }
    });
    return flag;
  };
  const isLeftSideExpression = (val) => {
    return (
      isExpression(val) &&
      val !== "!" &&
      val !== "^" &&
      val !== "²" &&
      val !== "³" &&
      val !== "°"
    );
  };
  const isRightSideExpression = (val) => {
    return val === "!" || val === "²" || val === "³" || val === "°";
  };
  const isArithmetic = (value) => {
    let flag = false;
    if (value === "×" || value === "÷" || value === "+" || value === "-") {
      flag = true;
    }
    return flag;
  };

  switch (type) {
    case "Error":
      return isError(input);
    case "Number":
      return isNumber(input);
    case "Constant":
      return isConstant(input);
    case "Expression":
      return isExpression(input);
    case "LeftSideExpression":
      return isLeftSideExpression(input);
    case "RightSideExpression":
      return isRightSideExpression(input);
    case "Arithmetic":
      return isArithmetic(input);
    default:
      return false;
  }
};
