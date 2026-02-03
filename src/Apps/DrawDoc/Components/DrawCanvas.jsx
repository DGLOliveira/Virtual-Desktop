import { useContext, useEffect } from "react";
import { Context } from "../Context.jsx";
import { handleAction } from "../Handlers/handleAction.jsx";
export const DrawCanvas = ({ action, setAction, appMenu, setAppMenu, appDialog, setAppDialog, contextMenu, canClose, setCanClose, title, setTitle }) => {

  const context = useContext(Context);
  const canvasMainRef = context.canvasMainRef;
  const canvasLayersRef = context.canvasLayersRef;
  const tool = context.tool;
  const subTool = context.subTool;
  const curveControls = context.curveControls;
  const setCurveControls = context.setCurveControls;
  const size = context.size;
  const selectedColor = context.color.selected;
  const color1 = context.color[1];
  const setColor1 = (v) => context.setColor({ ...context.color, 1: v, selected: v });
  const color2 = context.color[2];
  const setColor2 = (v) => context.setColor({ ...context.color, 2: v, selected: v });
  const text = context.text;
  const setText = context.setText;
  const clipboard = context.clipboard;
  const setClipboard = context.setClipboard;
  const params = {
    tool,
    subTool,
    curveControls,
    setCurveControls,
    size,
    selectedColor,
    color1,
    setColor1,
    color2,
    setColor2,
    text,
    setText,
    clipboard,
    setClipboard,
  };

  useEffect(() => {
    let canvas = canvasMainRef.current;
    let ctx = canvas.getContext("2d", {
      willReadFrequently: true,
    });
    handleAction(canvas, ctx, params, action, setAction, context, appMenu, setAppMenu, appDialog, setAppDialog, contextMenu, canClose, setCanClose, title, setTitle);
  }, [context.cursor, action]);
  useEffect(() => {
    let offsetX = (context.dimentions.width / 2 - context.zoom * context.dimentions.width / 2) * -1 / context.zoom;
    let offsetY = (context.dimentions.height / 2 - context.zoom * context.dimentions.height / 2) * -1 / context.zoom;
    document.getElementById("drawDocCheckersBackground").style.transform = `scale(${context.zoom}) translate(${offsetX}px,${offsetY}px)`;
    document.getElementById("previewCanvas").style.transform = `scale(${context.zoom}) translate(${offsetX}px,${offsetY}px)`;
    document.getElementById("drawCanvas").style.transform = `scale(${context.zoom}) translate(${offsetX}px,${offsetY}px)`;
    const layers = document.getElementsByClassName("drawCanvasLayer");
    if (layers.length > 0) {
      for (let i = 0; i < layers.length; i++) {
        layers[i].style.transform = `scale(${context.zoom}) translate(${offsetX}px,${offsetY}px)`;
      }
    }
  }, [context.zoom]);

  return (
    <>
      <img
        id="drawDocCheckersBackground"
        className="drawDocCheckersBackground"
        height={context.dimentions.height} width={context.dimentions.width}
      />
      <canvas
        ref={canvasMainRef}
        id="drawCanvas"
        height={context.dimentions.height} width={context.dimentions.width}
      />
      {Array.isArray(canvasLayersRef) && canvasLayersRef.map((canvasLayerRef, index) => {
        return (
          <canvas
            key={index}
            ref={canvasLayerRef}
            className="drawCanvasLayer"
            height={context.dimentions.height} width={context.dimentions.width}
          />
        );
      })}
    </>
  );
};