import { useRef, useState, useEffect } from "react";
import { CheckValue } from "./CheckValue.js";
import { Calculate } from "./Calculate.js";

export const Graphic = (graph) => {
  let data = graph.graph;
  const canvasRef = useRef(null);
  const canvasPreviewRef = useRef(null);
  const rows = 1000;
  const cols = 1000;
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [cursorXResult, setCursorXResult] = useState("");
  const [cursorYResults, setCursorYResults] = useState({});
  const findX = (calc) => {
    let xIndex = [];
    calc.forEach((value, index) => {
      if (value === "𝑥") {
        xIndex = [...xIndex, index];
      }
    });
    return xIndex;
  };
  const handleOmittedXMultiplications = (calc) => {
    let xIndex = findX(calc);
    let shift = 0;
    xIndex.forEach((value) => {
      if (
        CheckValue("Number", calc[value + shift - 1]) ||
        CheckValue("Constant", calc[value + shift - 1]) ||
        CheckValue("RightSideExpression", calc[value + shift - 1]) ||
        calc[value + shift - 1] === "𝑥" ||
        calc[value + shift - 1] === ")"
      ) {
        calc = [
          ...calc.slice(0, value + shift),
          "×",
          ...calc.slice(value + shift, calc.length),
        ];
        shift++;
      }
      if (
        CheckValue("Number", calc[value + shift + 1]) ||
        CheckValue("Constant", calc[value + shift + 1]) ||
        CheckValue("LeftSideExpression", calc[value + shift + 1]) ||
        calc[value + shift + 1] === "𝑥" ||
        calc[value + shift + 1] === "("
      ) {
        calc = [
          ...calc.slice(0, value + shift + 1),
          "×",
          ...calc.slice(value + shift + 1, calc.length),
        ];
        shift++;
      }
    });
    return calc;
  };
  const getXincrement = () => {
    let incrementX = 0;
    if (data.window.x[0] <= 0 && data.window.x[1] >= 0) {
      incrementX =
        (Math.abs(data.window.x[1]) + Math.abs(data.window.x[0])) / cols;
    } else if (data.window.x[0] >= 0 && data.window.x[1] > 0) {
      incrementX =
        (Math.abs(data.window.x[1]) - Math.abs(data.window.x[0])) / cols;
    } else {
      incrementX =
        -(Math.abs(data.window.x[1]) - Math.abs(data.window.x[0])) / cols;
    }
    return incrementX
  };
  const getYincrement = () => {
    let incrementY = 0;
    if (data.window.y[0] <= 0 && data.window.y[1] >= 0) {
      incrementY =
        (Math.abs(data.window.y[1]) + Math.abs(data.window.y[0])) / rows;
    } else if (data.window.y[0] >= 0 && data.window.y[1] > 0) {
      incrementY =
        (Math.abs(data.window.y[1]) - Math.abs(data.window.y[0])) / rows;
    } else {
      incrementY =
        -(Math.abs(data.window.y[1]) - Math.abs(data.window.y[0])) / rows;
    }
    return incrementY
  };
  const getZeroOffset = () => {
    let zeroOffset = 0;
    if (data.window.y[0] <= 0 && data.window.y[1] >= 0) {
      zeroOffset =
        (data.window.y[1] * rows) /
        (Math.abs(data.window.y[0]) + Math.abs(data.window.y[1]));
    } else if (data.window.y[0] >= 0 && data.window.y[1] > 0) {
      zeroOffset =
        (data.window.y[1] * rows) / (Math.abs(data.window.y[1]) - Math.abs(data.window.y[0]));
    } else {
      zeroOffset =
        -(data.window.y[1] * rows) / (Math.abs(data.window.y[1]) - Math.abs(data.window.y[0]));
    }
    return zeroOffset;
  };
  const clearGraph = (ctx, canvasWidth, canvasHeight) => {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  };
  const drawXAxis = (
    ctx,
    canvasWidth,
    canvasHeight,
    pixelWidth,
    pixelHeight,
  ) => {
    ctx.fillStyle = "#FFFFFF";
    if (data.window.y[0] < 0 && data.window.y[1] > 0) {
      ctx.fillRect(
        0,
        (Math.abs(data.window.y[1]) * rows) /
        (Math.abs(data.window.y[0]) + data.window.y[1]),
        canvasWidth,
        pixelHeight,
      );
    } else if (data.window.y[0] >= 0) {
      ctx.fillRect(0, canvasHeight - pixelHeight, canvasWidth, pixelHeight);
    } else {
      ctx.fillRect(0, 0, canvasWidth, pixelHeight);
    }
  };
  const drawYAxis = (
    ctx,
    canvasWidth,
    canvasHeight,
    pixelWidth,
    pixelHeight,
  ) => {
    ctx.fillStyle = "#FFFFFF";
    if (data.window.x[0] < 0 && data.window.x[1] > 0) {
      ctx.fillRect(
        (Math.abs(data.window.x[0]) * cols) /
        (Math.abs(data.window.x[0]) + data.window.x[1]),
        0,
        pixelWidth,
        canvasHeight,
      );
    } else if (data.window.x[0] >= 0) {
      ctx.fillRect(0, 0, pixelWidth, canvasHeight);
    } else {
      ctx.fillRect(canvasWidth - pixelWidth, 0, pixelWidth, canvasHeight);
    }
  };
  const drawGraph = (ctx, pixelWidth, pixelHeight) => {
    let incrementX = getXincrement();
    let incrementY = getYincrement();
    let zeroOffset = getZeroOffset();
    Object.keys(data).forEach((key) => {
      if (data[key].calc !== undefined) {
        if (data[key].calc.length > 0) {
          ctx.fillStyle = data[key].color;
          let calc = structuredClone(data[key].calc);
          calc = handleOmittedXMultiplications(calc);
          let ans = 0;
          let x = data.window.x[0];
          let xIndex = findX(calc);
          /*Loop thru all visible x axis values, replaces x with that value, calculates y and draws*/
          for (let i = 0; i < cols; i++) {
            xIndex.forEach((value) => {
              calc[value] = x;
            });
            ans = Calculate(calc, "");
            if (i === 0 && ans === "Syntax Error") {
              break;
            }
            ctx.fillRect(
              i,
              -ans / incrementY + zeroOffset,
              pixelWidth,
              pixelHeight,
            );
            x += incrementX;
          }
        }
      }
    });
  };

//Draw Graphic display
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let pixelWidth = (context.canvas.width / cols) * 2;
    let pixelHeight = context.canvas.height / rows * 10;
    let animationFrameId;
    console.log(data);
    clearGraph(context, context.canvas.width, context.canvas.height);
    drawXAxis(
      context,
      context.canvas.width,
      context.canvas.height,
      pixelWidth,
      pixelHeight,
    );
    drawYAxis(
      context,
      context.canvas.width,
      context.canvas.height,
      pixelWidth,
      pixelHeight,
    );
    if (data.F.calc.length > 0) {
      drawGraph(context, pixelWidth, pixelHeight);
    }
    const render = () => {
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [data.draw]);

  const clearPreview = (ctx, canvas) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  const drawCursorYAxis = (ctx, boundary, pixelWidth, scaleX) => {
    ctx.fillStyle = "#888888";
    ctx.fillRect(
      (cursor.x - boundary.left) * scaleX,
      0,
      pixelWidth,
      ctx.canvas.height,
    );
  };
  const getCursorXValue = (ctx, boundary, scaleX) => {
    let xRow = Math.round(((cursor.x - boundary.left) * scaleX * cols) / ctx.canvas.width);
    let xValue = data.window.x[0] + getXincrement() * xRow;
    return xValue;
  };

  const getCursorDataValues = (ctx, xValue) => {
    let newYresults = {};
    if(data.F.calc.length > 0){
      let ans = getFunctionResult(xValue, data.F.calc);
      newYresults = { ...newYresults, F: ans };
    }
    if(data.G.calc.length > 0){
      let ans = getFunctionResult(xValue, data.G.calc);
      newYresults = { ...newYresults, G: ans };
    }
    if(data.H.calc.length > 0){
      let ans = getFunctionResult(xValue, data.H.calc);
      newYresults = { ...newYresults, H: ans };
    }
    setCursorYResults(newYresults);
  }

  const getFunctionResult = (xValue, func) => {
    let ans = 0;
    let calc = structuredClone(func);
    calc = handleOmittedXMultiplications(calc);
    let xIndex = findX(calc);
    xIndex.forEach((value) => {
      calc[value] = xValue;
    });
    ans = Calculate(calc, "");
    return ans;
  }


  //Draws Mouse hover results
  useEffect(() => {
    const canvas = canvasPreviewRef.current;
    const context = canvas.getContext("2d");
    const boundary = canvas.getBoundingClientRect();
    let pixelWidth = (context.canvas.width / cols) * 2;
    //let pixelHeight = (context.canvas.height / rows) * 10;
    const scaleX = context.canvas.width / boundary.width;
    //const scaleY = context.canvas.height / boundary.height;
    let animationFrameId;
    clearPreview(context, canvas);
    if (cursor.x != 0 && cursor.y != 0) {
      drawCursorYAxis(context, boundary, pixelWidth, scaleX);
      let xValue = getCursorXValue(context, boundary, scaleX);
      setCursorXResult(xValue);
      if(data.F.calc.length > 0 || data.G.calc.length > 0 || data.H.calc.length > 0) {
        getCursorDataValues(context, xValue);
      }
    } else {
      setCursorXResult("");
      setCursorYResults({});
    }
    const render = () => {
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };

  }, [cursor]);

  return <>
    <canvas
      height="1000"
      width="1000"
      ref={canvasRef}
    />
    <canvas
      height="1000"
      width="1000"
      ref={canvasPreviewRef}
      style={{ background: "rgba(0,0,0,0.5)", cursor: "crosshair" }}
      onMouseEnter={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      onMouseLeave={() => setCursor({ x: 0, y: 0 })}
    />
    <div
      style={{ width: "auto", height: "auto", color: "white", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start" }}
    >
      {cursorXResult !== "" && <div>𝑥: {cursorXResult}</div>}
      {cursorYResults.F !== undefined && <div style={{ color: "cyan" }}> ƒ(𝑥): {cursorYResults.F}</div>}
      {cursorYResults.G !== undefined && <div style={{ color: "magenta" }}> 𝑔(𝑥): {cursorYResults.G}</div>}
      {cursorYResults.H !== undefined && <div style={{ color: "yellow" }}> 𝒉(𝑥): {cursorYResults.H}</div>}
    </div>
  </>;
};
