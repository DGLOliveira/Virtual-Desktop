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

    const getCorrectedPosition = (x, y) => {
        let canvas = canvasPreviewRef.current;
        let ctx = canvas.getContext('2d', { alpha: true });
        let boundary = canvas.getBoundingClientRect();
        const scaleX = (ctx.canvas.width / boundary.width);
        const scaleY = (ctx.canvas.height / boundary.height);
        const newX = (x - boundary.left) * scaleX;
        const newY = (y - boundary.top) * scaleY;
        return { x: newX, y: newY };
    };

    const handleCursor = (e) => {
        const pos = getCorrectedPosition(e.clientX, e.clientY);
        if (e.button === 0) {
            switch (e.type) {
                case "mousedown":
                    if (cursor.down) {
                        setCursor({
                            ...cursor,
                            current: { x: pos.x, y: pos.y },
                            end: { x: pos.x, y: pos.y },
                        });
                    } else {
                        setCursor({
                            ...cursor,
                            down: true,
                            start: { x: pos.x, y: pos.y },
                        });
                    }
                    break;
                case "mouseup":
                    setCursor({
                        ...cursor,
                        end: { x: pos.x, y: pos.y },
                        down: false
                    });
                    break;
                case "mousemove":
                     if (!cursor.down) {
                        setCursor({
                            ...cursor,
                            current: { x: pos.x, y: pos.y }
                        });
                    } else {
                        setCursor({
                            ...cursor,
                            current: { x: pos.x, y: pos.y },
                            end: { x: pos.x, y: pos.y },
                        })
                    }
                    break;
                case "mouseleave":
                    setCursor({
                        ...cursor,
                        current: { x: pos.x, y: pos.y },
                    });
                    break;
                case "mouseenter":
                    if (e.buttons !== 0) {
                        setCursor({
                            ...cursor,
                            down: true,
                            current: { x: pos.x, y: pos.y },
                            end: { x: pos.x, y: pos.y },
                        });
                    }
                    else {
                        setCursor({
                            ...cursor,
                            down: false,
                            current: { x: pos.x, y: pos.y },
                        })
                    }
                    break;
                default:
                    break;
            }
        }
    };

    const handleTouch = (e) => {
        e.preventDefault();
        const pos = getCorrectedPosition(e.touches[0].clientX, e.touches[0].clientY);
        if (e.touches.length === 1) {
            switch (e.type) {
                case "touchstart":
                    if (cursor.down) {
                        setCursor({
                            ...cursor,
                            current: { x: pos.x, y: pos.y },
                            end: { x: pos.x, y: pos.y },
                        });
                    } else {
                        setCursor({
                            ...cursor,
                            down: true,
                            start: { x: pos.x, y: pos.y }
                        });
                    }
                    break;
                case "touchend":
                    setCursor({
                        ...cursor,
                        end: { x: pos.x, y: pos.y },
                        down: false
                    });
                    break;
                case "touchmove":
                    if (!cursor.down) {
                        setCursor({
                            ...cursor,
                            current: { x: pos.x, y: pos.y }
                        });
                    }
                    else {
                        setCursor({
                            ...cursor,
                            current: { x: pos.x, y: pos.y },
                            end: { x: pos.x, y: pos.y },
                        })
                    }
                    break;
                default:
                    break;
            };
        } else {
            setCursor({
                ...cursor,
                current: { x: 0, y: 0 },
                end: { x: pos.x, y: pos.y },
                down: false
            });
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
            height={context.dimentions.height}
            width={context.dimentions.width}
            onMouseDown={(e) => { if (!cursor.selecting) handleCursor(e) }}
            onMouseUp={(e) => { if (!cursor.selecting) handleCursor(e) }}
            onMouseMove={(e) => { if (!cursor.selecting) handleCursor(e) }}
            onMouseLeave={(e) => { if (!cursor.selecting) handleCursor(e) }}
            onMouseEnter={(e) => { if (!cursor.selecting) handleCursor(e) }}
            onTouchStart={(e) => { if (!cursor.selecting) handleTouch(e) }}
            onTouchEnd={(e) => { if (!cursor.selecting) handleTouch(e) }}
            onTouchMove={(e) => { if (!cursor.selecting) handleTouch(e) }}
            onTouchCancel={(e) => { if (!cursor.selecting) handleTouch(e) }}
            onContextMenu={(e) => { if (!cursor.selecting) handleContextMenu(e) }}
        />
    );
};