import { useRef, useEffect } from "react";
import { CheckValue } from "./CheckValue.js";
import { Calculate } from "./Calculate.js";

export const Graphic = (graph) => {
  let data = graph.graph;
  const canvasRef = useRef(null);
  const rows = 100;
  const cols = 1000;
  const findX = (calc) => {
    let xIndex = [];
    calc.forEach((value, index) => {
      if (value === "𝑥") {
        xIndex = [...xIndex, index];
      }
    });
    return xIndex;
  };
  const handleOmittedXMiltiplications = (calc) => {
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
  const getXincrement = ()=>{
    let incrementX = 0;
    if(data.window.x[0]<=0 && data.window.x[1]>=0){
      incrementX =
      (Math.abs(data.window.x[1]) + Math.abs(data.window.x[0])) / cols;
    }else if(data.window.x[0]>=0 && data.window.x[1]>0){
      incrementX =
      (Math.abs(data.window.x[1]) - Math.abs(data.window.x[0])) / cols;
    }else{
      incrementX =
      -(Math.abs(data.window.x[1]) - Math.abs(data.window.x[0])) / cols;
    }
    return incrementX
  };
  const getYincrement = ()=>{
    let incrementY=0;
    if (data.window.y[0] <= 0 && data.window.y[1] >= 0) {
      incrementY =
        (Math.abs(data.window.y[1]) + Math.abs(data.window.y[0])) / rows;
    } else if (data.window.y[0] >= 0 && data.window.y[1] > 0) {
      incrementY =
        (Math.abs(data.window.y[1]) - Math.abs(data.window.y[0])) / rows;
    }else{
      incrementY =
        -(Math.abs(data.window.y[1]) - Math.abs(data.window.y[0])) / rows;
    }
    return incrementY
};
  const getZeroOffset = ()=>{
    let zeroOffset=0;
    if (data.window.y[0] <= 0 && data.window.y[1] >= 0) {
      zeroOffset =
        (data.window.y[1] * rows) /
        (Math.abs(data.window.y[0]) + Math.abs(data.window.y[1]));
    } else if (data.window.y[0] >= 0 && data.window.y[1] > 0) {
      zeroOffset =
      (data.window.y[1] * rows) /(Math.abs(data.window.y[1]) - Math.abs(data.window.y[0])) ;
    }else{
      zeroOffset =
      -(data.window.y[1] * rows) /(Math.abs(data.window.y[1]) - Math.abs(data.window.y[0])) ;
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
          calc = handleOmittedXMiltiplications(calc);
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

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let pixelWidth = (context.canvas.width / cols) * 2;
    let pixelHeight = context.canvas.height / rows / 2;
    let animationFrameId;
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

  return <canvas height="100" width="1000" ref={canvasRef} />;
};
