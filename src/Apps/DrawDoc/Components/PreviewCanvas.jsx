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
        let canvas = canvasPreviewRef.current;
        let ctx = canvas.getContext('2d', { alpha: true });
        let boundary = canvas.getBoundingClientRect();
        const height = ctx.canvas.height;
        const width = ctx.canvas.width;
        const scaleX = width / boundary.width;
        const scaleY = height / boundary.height;
        const trueX = (e.clientX - boundary.left) * scaleX;
        const trueY = (e.clientY - boundary.top) * scaleY;
        if (e.button === 0) {
            switch (e.type) {
                case "mousedown":
                    if (cursor.down) {
                        setCursor({
                            ...cursor,
                            current: { x: trueX, y: trueY },
                            end: { x: trueX, y: trueY },
                        });
                    } else {
                        setCursor({
                            ...cursor,
                            down: true,
                            start: { x: trueX, y: trueY },
                        });
                    }
                    break;
                case "mouseup":
                    setCursor({
                        ...cursor,
                        end: { x: trueX, y: trueY },
                        down: false
                    });
                    break;
                case "mousemove":
                    if (!cursor.down) {
                        setCursor({
                            ...cursor,
                            current: { x: trueX, y: trueY }
                        });
                    }
                    else {
                        setCursor({
                            ...cursor,
                            current: { x: trueX, y: trueY },
                            end: { x: trueX, y: trueY },
                        })
                    }
                    break;
                case "mouseleave":
                    setCursor({
                        ...cursor,
                        current: { x: trueX, y: trueY },
                    });
                    break;
                case "mouseenter":
                    if (e.buttons !== 0) {
                        setCursor({
                            ...cursor,
                            down: true,
                            current: { x: trueX, y: trueY },
                            end: { x: trueX, y: trueY },
                        });
                    }
                    else {
                        setCursor({
                            ...cursor,
                            down: false,
                            current: { x: trueX, y: trueY },
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
        let canvas = canvasPreviewRef.current;
        let ctx = canvas.getContext('2d', { alpha: true });
        let boundary = canvas.getBoundingClientRect();
        const height = ctx.canvas.height;
        const width = ctx.canvas.width;
        const scaleX = width / boundary.width;
        const scaleY = height / boundary.height;
        const trueX = (e.touches[0].clientX - boundary.left) * scaleX;
        const trueY = (e.touches[0].clientY - boundary.top) * scaleY;
        if (e.touches.length === 1) {
            switch (e.type) {
                case "touchstart":
                    if (cursor.down) {
                        setCursor({
                            ...cursor,
                            current: { x: trueX, y: trueY },
                            end: { x: trueX, y: trueY },
                        });
                    } else {
                        setCursor({
                            ...cursor,
                            down: true,
                            start: { x: trueX, y: trueY }
                        });
                    }
                    break;
                case "touchend":
                    setCursor({
                        ...cursor,
                        end: { x: trueX, y: trueY },
                        down: false
                    });
                    break;
                case "touchmove":
                    if (!cursor.down) {
                        setCursor({
                            ...cursor,
                            current: { x: trueX, y: trueY }
                        });
                    }
                    else {
                        setCursor({
                            ...cursor,
                            current: { x: trueX, y: trueY },
                            end: { x: trueX, y: trueY },
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
                end: { x: trueX, y: trueY },
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
            onMouseDown={(e) => {if(!cursor.selecting)handleCursor(e)}}
            onMouseUp={(e) => {if(!cursor.selecting)handleCursor(e)}}
            onMouseMove={(e) => {if(!cursor.selecting)handleCursor(e)}}
            onMouseLeave={(e) => {if(!cursor.selecting)handleCursor(e)}}
            onMouseEnter={(e) => {if(!cursor.selecting)handleCursor(e)}}
            onTouchStart={(e) => {if(!cursor.selecting)handleTouch(e)}}
            onTouchEnd={(e) => {if(!cursor.selecting)handleTouch(e)}}
            onTouchMove={(e) => {if(!cursor.selecting)handleTouch(e)}}
            onTouchCancel={(e) => {if(!cursor.selecting)handleTouch(e)}}
            onContextMenu={(e) => {if(!cursor.selecting)handleTouch(e)}}
        />
    );
};