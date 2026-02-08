import { useRef, useEffect, useContext } from "react";
import { Context } from "../Context.jsx";
import { handleDraw } from "../Handlers/handleDraw.js";

export default function PreviewCanvas() {

    const context = useContext(Context);
    const canvasPreviewRef = useRef(null);
    const cursor = context.cursor;
    const tool = context.tool;
    const subTool = context.subTool;
    const curveControls = context.curveControls;
    const setCurveControls = context.setCurveControls;
    const size = context.size;
    const selectedColor = context.color.selected;
    const color1 = context.color[1];
    const setColor1 = (v) => context.setColor({ ...context.color, 1: v });
    const color2 = context.color[2];
    const setColor2 = (v) => context.setColor({ ...context.color, 2: v });
    const text = context.text;
    const setText = context.setText;
    const clipboard = context.clipboard;
    const setClipboard = context.setClipboard;
    const curLayer = context.currLayer;
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
        handleDraw(canvasPreviewRef.current, cursor, params, true);
    }, [cursor, params]);

    return (
        <canvas
            ref={canvasPreviewRef}
            style={{ 
                color: params.selectedColor,
                zIndex: curLayer
            }}
            id="previewCanvas"
            height={context.dimentions.height}
            width={context.dimentions.width}
        />
    );
};