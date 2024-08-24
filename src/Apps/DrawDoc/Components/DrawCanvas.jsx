import { useRef, useContext, useEffect } from "react";
import { Context } from "../Context.jsx";
import { handleAction } from "../Handlers/handleAction.jsx";
export const DrawCanvas = ({ action, setAction, appMenu, setAppMenu, appDialog, setAppDialog, contextMenu, canClose, setCanClose }) => {
  const canvasMainRef = useRef(null);
  const context = useContext(Context);
    const tool = context.tool;
    const subTool = context.subTool;
    const curveControls = context.curveControls;
    const setCurveControls = context.setCurveControls;
    const size = context.size;
    const selectedColor = context.color.selected;
    const color1 = context.color[1];
    const setColor1 = (v) => context.setColor({...context.color, 1: v, selected: v});
    const color2 = context.color[2];
    const setColor2 = (v) => context.setColor({...context.color, 2: v, selected: v});
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
    handleAction(canvas, ctx, params, action, setAction, context, appMenu, setAppMenu, appDialog, setAppDialog, contextMenu, canClose, setCanClose );
  }, [context.cursor, action]);
  useEffect(() => {
    let offsetX = (context.dimention.width / 2 - context.zoom * context.dimention.width / 2) * -1 / context.zoom;
    let offsetY = (context.dimention.height / 2 - context.zoom * context.dimention.height / 2) * -1 / context.zoom;
    document.getElementById("previewCanvas").style.transform = `scale(${context.zoom}) translate(${offsetX}px,${offsetY}px)`;
    document.getElementById("drawCanvas").style.transform = `scale(${context.zoom}) translate(${offsetX}px,${offsetY}px)`;

  }, [context.zoom]);

  return (
    <canvas
      ref={canvasMainRef}
      id="drawCanvas"
      height={context.dimention.height} width={context.dimention.width}
    />
  );
};