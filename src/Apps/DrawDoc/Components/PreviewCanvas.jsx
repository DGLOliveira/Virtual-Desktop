import { useRef, useEffect, useContext } from "react";
import { Context } from "../Context.jsx";
import { handleDraw } from "../Handlers/handleDraw.js";

export const PreviewCanvas = ({ setAction, contextMenu }) => {
    const context = useContext(Context);
    const canvasPreviewRef = useRef(null);
    const cursor = context.cursor;
    const setCursor = context.setCursor;
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
    const handleCursor = (e) => {
        if (e.button === 0) {
            switch (e.type) {
                case "mousedown":
                    if (cursor.down) {
                        setCursor({
                            ...cursor,
                            current: { x: e.clientX, y: e.clientY },
                            end: { x: e.clientX, y: e.clientY },
                        });
                    } else {
                        setCursor({
                            ...cursor,
                            down: true,
                            start: { x: e.clientX, y: e.clientY }
                        });
                    }
                    break;
                case "mouseup":
                    setCursor({
                        ...cursor,
                        end: { x: e.clientX, y: e.clientY },
                        down: false
                    });
                    break;
                case "mousemove":
                    if (!cursor.down) {
                        setCursor({
                            ...cursor,
                            current: { x: e.clientX, y: e.clientY }
                        });
                    }
                    else {
                        setCursor({
                            ...cursor,
                            current: { x: e.clientX, y: e.clientY },
                            end: { x: e.clientX, y: e.clientY },
                        })
                    }
                    break;
                case "mouseleave":
                    setCursor({
                        ...cursor,
                        current: { x: 0, y: 0 }
                    });
                    break;
                case "mouseenter":
                    if (e.buttons !== 0) {
                        setCursor({
                            ...cursor,
                            down: true,
                            current: { x: e.clientX, y: e.clientY },
                            end: { x: e.clientX, y: e.clientY },
                        });
                    }
                    else {
                        setCursor({
                            ...cursor,
                            down: false,
                            current: { x: e.clientX, y: e.clientY },
                        })
                    }
                    break;
                default:
                    break;
            }
        }
    };

    const handleTouch = (e) => {
        if (e.touches.length === 1) {
            switch (e.type) {
                case "touchstart":
                    if (cursor.down) {
                        setCursor({
                            ...cursor,
                            current: { x: e.touches[0].clientX, y: e.touches[0].clientY },
                            end: { x: e.touches[0].clientX, y: e.touches[0].clientY },
                        });
                    } else {
                        setCursor({
                            ...cursor,
                            down: true,
                            start: { x: e.touches[0].clientX, y: e.touches[0].clientY }
                        });
                    }
                    break;
                case "touchleave":
                    setCursor({
                        ...cursor,
                        current: { x: 0, y: 0 }
                    });
                    break;
                case "touchend":
                    setCursor({
                        ...cursor,
                        end: { x: e.touches[0].clientX, y: e.touches[0].clientY },
                        down: false
                    });
                    break;
                case "touchmove":
                    if (!cursor.down) {
                        setCursor({
                            ...cursor,
                            current: { x: e.touches[0].clientX, y: e.touches[0].clientY }
                        });
                    }
                    else {
                        setCursor({
                            ...cursor,
                            current: { x: e.touches[0].clientX, y: e.touches[0].clientY },
                            end: { x: e.touches[0].clientX, y: e.touches[0].clientY },
                        })
                    }
                    break;
                default:
                    break;
            };
        }
    };

    useEffect(() => {
        handleDraw(canvasPreviewRef.current, cursor, params, true);
    }, [cursor, params]);

    const handleContextMenu = (event) => {
        event.preventDefault();
        let content = {
            "Undo": { action: () => setAction("Undo"), disabled: !context.history.canUndo },
            "Redo": { action: () => setAction("Redo"), disabled: !context.history.canRedo },
            "LineBreak": {},
            "Zoom In": { action: () => setAction("Zoom In"), disabled: context.zoom === 4 },
            "Zoom Out": { action: () => setAction("Zoom Out"), disabled: context.zoom === 0.25 },
            "Zoom Reset": { action: () => setAction("Zoom Reset"), disabled: context.zoom === 1 },
        };
        contextMenu.setOpen();
        contextMenu.setPosition(event.clientX, event.clientY);
        contextMenu.setContent(content);
    };
    return (
        <canvas
            ref={canvasPreviewRef}
            style={{ color: params.selectedColor }}
            className={("cursor" + params.tool)}
            id="previewCanvas"
            height={context.dimention.height}
            width={context.dimention.width}
            onMouseDown={(e) => handleCursor(e)}
            onMouseUp={(e) => handleCursor(e)}
            onMouseMove={(e) => handleCursor(e)}
            onMouseLeave={(e) => handleCursor(e)}
            onMouseEnter={(e) => handleCursor(e)}
            onTouchStart={(e) => handleTouch(e)}
            onTouchEnd={(e) => handleTouch(e)}
            onTouchMove={(e) => handleTouch(e)}
            onTouchLeave={(e) => handleTouch(e)}
            onTouchEnter={(e) => handleTouch(e)}
            onContextMenu={(e) => handleContextMenu(e)}
        />
    );
};