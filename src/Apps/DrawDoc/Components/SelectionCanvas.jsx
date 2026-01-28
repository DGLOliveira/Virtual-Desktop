import { useState, useEffect, useContext } from "react";
import { Context } from "../Context.jsx";

export default function SelectionCanvas() {
    const context = useContext(Context);
    const cursor = context.cursor;
    const setCursor = context.setCursor;
    const zoom = context.zoom;
    const tool = context.tool;
    const subtool = context.subTool;
    const clipboard = context.clipboard;

    const [selectionBox, setSelectionBox] = useState({
        display: "none",
        left: 0 + "px",
        top: 0 + "px",
        height: 0 + "px",
        width: 0 + "px",
        canUsePointer: true
    })

    const [selectionCircle, setSelectionCircle] = useState({
        display: "none",
        left: 0 + "px",
        top: 0 + "px",
        diameter: 0 + "px"
    })

    const [selectionEllipse, setSelectionEllipse] = useState({
        display: "none",
        left: 0 + "px",
        top: 0 + "px",
        width: 0 + "px",
        height: 0 + "px"
    })

    const [resizeDelta, setResizeDelta] = useState([0, 0])

    const getCursorFromEvent = (e) => {
        let cursorX, cursorY;
        if (e.button === 0) {
            cursorX = e.clientX;
            cursorY = e.clientY;
        } else {
            cursorX = e.touches[0].clientX;
            cursorY = e.touches[0].clientY;
        }
        console.log(["cursorPos", cursorX, cursorY])
        return [cursorX, cursorY]
    }

    const handleResizeStart = (e, direction) => {
        const cursorPos = getCursorFromEvent(e);
        let newDeltaX = 0;
        let newDeltaY = 0;
        if (direction.indexOf("N") !== -1) {
            newDeltaY = cursorPos[1] - Math.min(cursor.start.y, cursor.end.y);
        } else if (direction.indexOf("S") !== -1) {
            newDeltaY = cursorPos[1] - Math.max(cursor.start.y, cursor.end.y);
        }
        if (direction.indexOf("W") !== -1) {
            newDeltaX = cursorPos[0] - Math.min(cursor.start.x, cursor.end.x);
        } else if (direction.indexOf("E") !== -1) {
            newDeltaX = cursorPos[0] - Math.max(cursor.start.x, cursor.end.x);
        }
        setResizeDelta([newDeltaX, newDeltaY]);
    }

    const handleResize = (e, direction) => {
        e.preventDefault();
        const cursorPos = getCursorFromEvent(e);
        // check for inverted axis
        let invertX = false, invertY = false;
        if (cursor.start.x > cursor.end.x) invertX = true;
        if (cursor.start.y > cursor.end.y) invertY = true;
        // calculate difference between cursor and selectionBox
        let newStartX = cursor.start.x, newStartY = cursor.start.y, newEndX = cursor.end.x, newEndY = cursor.end.y;
        if (direction.indexOf("N") !== -1) {
            invertY ? newEndY = cursorPos[1] - resizeDelta[1] : newStartY = cursorPos[1] - resizeDelta[1]
        } else if (direction.indexOf("S") !== -1) {
            invertY ? newStartY = cursorPos[1] - resizeDelta[1] : newEndY = cursorPos[1] - resizeDelta[1]
        }
        if (direction.indexOf("E") !== -1) {
            invertX ? newStartX = cursorPos[0] - resizeDelta[0] : newEndX = cursorPos[0] - resizeDelta[0]
        } else if (direction.indexOf("W") !== -1) {
            invertX ? newEndX = cursorPos[0] - resizeDelta[0] : newStartX = cursorPos[0] - resizeDelta[0]
        }
        setCursor({ ...cursor, start: { x: newStartX, y: newStartY }, end: { x: newEndX, y: newEndY } })

    }

    const handleResizeEnd = (e, direction) => {
        handleResize(e, direction);
    }

    //Handles when each selection div should be displayed
    useEffect(() => {
        if (tool === "Shape" && subtool.shape !== "Line" && subtool.shape !== "Curve") {
            setSelectionBox({ ...selectionBox, display: "block" })
            if (tool === "Shape") {
                setSelectionCircle({ ...selectionCircle, display: "block" })
                if (subtool.stretch === true) {
                    setSelectionEllipse({ ...selectionEllipse, display: "block" })
                } else {
                    setSelectionEllipse({ ...selectionEllipse, display: "none" })
                }
            } else {
                setSelectionCircle({ ...selectionCircle, display: "none" })
                setSelectionEllipse({ ...selectionEllipse, display: "none" })
            }
        } else if (tool === "Select") {
            setSelectionCircle({ ...selectionCircle, display: "none" })
            setSelectionEllipse({ ...selectionEllipse, display: "none" })
            if (clipboard.state === "none") {
                setSelectionBox({ ...selectionBox, display: "block" })
            } else {
                setSelectionBox({ ...selectionBox, display: "none" })
            }
        } else {
            setSelectionBox({ ...selectionBox, display: "none" })
            setSelectionCircle({ ...selectionCircle, display: "none" })
            setSelectionEllipse({ ...selectionEllipse, display: "none" })
        }
    }, [tool, subtool, clipboard]);

    //Handles position and sizing calculations for each selection div
    useEffect(() => {
        let left = Math.min(cursor.start.x, cursor.end.x);
        let right = Math.max(cursor.start.x, cursor.end.x);
        let top = Math.min(cursor.start.y, cursor.end.y);
        let bottom = Math.max(cursor.start.y, cursor.end.y);
        let height = bottom - top;
        let width = right - left;
        setSelectionBox({
            ...selectionBox,
            left: Math.floor(left * zoom) + "px",
            top: Math.floor(top * zoom) + "px",
            width: Math.floor(width * zoom) + "px",
            height: Math.floor(height * zoom) + "px"
        })
        let centerLeft = left + Math.floor(width / 2);
        let centerTop = top + Math.floor(height / 2);
        let diameter = Math.min(width, height);
        setSelectionCircle({
            ...selectionCircle,
            left: Math.floor((centerLeft - (diameter / 2)) * zoom) + "px",
            top: Math.floor((centerTop - (diameter / 2)) * zoom) + "px",
            diameter: Math.floor(diameter * zoom) + "px"
        })
        setSelectionEllipse({
            ...selectionEllipse,
            left: Math.floor(left * zoom) + "px",
            top: Math.floor(top * zoom) + "px",
            width: Math.floor(width * zoom) + "px",
            height: Math.floor(height * zoom) + "px"
        })
    }, [cursor, zoom]);

    return (
        <>
            <div
                id="drawDocSelectionBox"
                style={{
                    display: selectionBox.display,
                    top: selectionBox.top,
                    left: selectionBox.left,
                    width: selectionBox.width,
                    height: selectionBox.height,
                    pointerEvents: cursor.down ? "none" : "auto"
                }}
            >
                <div
                    id="drawDocSelectionBoxNW"
                    onDragStart={(e) => {if(!cursor.down)handleResizeStart(e, "NW")}}
                    onDrag={(e) => {if(!cursor.down)handleResize(e, "NW")}}
                    onDragEnd={(e) => {if(!cursor.down)handleResizeEnd(e, "NW")}}
                />
                <div
                    id="drawDocSelectionBoxN"
                    onDragStart={(e) => {if(!cursor.down)handleResizeStart(e, "N")}}
                    onDrag={(e) => {if(!cursor.down)handleResize(e, "N")}}
                    onDragEnd={(e) => {if(!cursor.down)handleResizeEnd(e, "N")}}
                />
                <div
                    id="drawDocSelectionBoxNE"
                    onDragStart={(e) => {if(!cursor.down)handleResizeStart(e, "NE")}}
                    onDrag={(e) => {if(!cursor.down)handleResize(e, "NE")}}
                    onDragEnd={(e) => {if(!cursor.down)handleResizeEnd(e, "NE")}}
                />
                <div
                    id="drawDocSelectionBoxE"
                    onDragStart={(e) => {if(!cursor.down)handleResizeStart(e, "E")}}
                    onDrag={(e) => {if(!cursor.down)handleResize(e, "E")}}
                    onDragEnd={(e) => {if(!cursor.down)handleResizeEnd(e, "E")}}
                />
                <div
                    id="drawDocSelectionBoxSE"
                    onDragStart={(e) => {if(!cursor.down)handleResizeStart(e, "SE")}}
                    onDrag={(e) => {if(!cursor.down)handleResize(e, "SE")}}
                    onDragEnd={(e) => {if(!cursor.down)handleResizeEnd(e, "SE")}}
                />
                <div
                    id="drawDocSelectionBoxS"
                    onDragStart={(e) => {if(!cursor.down)handleResizeStart(e, "S")}}
                    onDrag={(e) => {if(!cursor.down)handleResize(e, "S")}}
                    onDragEnd={(e) => {if(!cursor.down)handleResizeEnd(e, "S")}}
                />
                <div
                    id="drawDocSelectionBoxSW"
                    onDragStart={(e) => {if(!cursor.down)handleResizeStart(e, "SW")}}
                    onDrag={(e) => {if(!cursor.down)handleResize(e, "SW")}}
                    onDragEnd={(e) => {if(!cursor.down)handleResizeEnd(e, "SW")}}
                />
                <div
                    id="drawDocSelectionBoxW"
                    onDragStart={(e) => {if(!cursor.down)handleResizeStart(e, "W")}}
                    onDrag={(e) => {if(!cursor.down)handleResize(e, "W")}}
                    onDragEnd={(e) => {if(!cursor.down)handleResizeEnd(e, "W")}}
                />
            </div>
            <div
                id="drawDocSelectionCircle"
                style={{
                    display: selectionCircle.display,
                    top: selectionCircle.top,
                    left: selectionCircle.left,
                    width: selectionCircle.diameter,
                    height: selectionCircle.diameter
                }}
            />
            <div
                id="drawDocSelectionEllipse"
                style={{
                    display: selectionEllipse.display,
                    top: selectionEllipse.top,
                    left: selectionEllipse.left,
                    width: selectionEllipse.width,
                    height: selectionEllipse.height,
                    rotate: subtool.angle + "deg"
                }}
            >
            </div>
        </>
    )
}