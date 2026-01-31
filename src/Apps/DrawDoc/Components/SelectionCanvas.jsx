import { useState, useEffect, useContext } from "react";
import { Context } from "../Context.jsx";

export default function SelectionCanvas() {
    const context = useContext(Context);
    const cursor = context.cursor;
    const setCursor = context.setCursor;
    const zoom = context.zoom;
    const tool = context.tool;
    const subtool = context.subTool;
    const setSubTool = context.setSubTool;
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

    const [resizeDelta, setResizeDelta] = useState([0, 0, true])
    const [dragDelta, setDragDelta] = useState([0, 0, 0, 0])
    const [rotateStartPos, setRotateStartPos] = useState([0, 0, 0])

    //Note: Firefox returns zero values during a drag event, therefore, 
    // in order to avoid incorrect values, values of zero are ignored
    const getCursorFromEvent = (e) => {
        let cursorX, cursorY, flag = false;
        if (e.button === 0) {
            if (e.clientX !== 0 && e.clientY !== 0) {
                cursorX = e.clientX;
                cursorY = e.clientY;
                flag = true;
            }
        } else {
            if (e.touches[0].clientX !== 0 && e.touches[0].clientY !== 0) {
                cursorX = e.touches[0].clientX;
                cursorY = e.touches[0].clientY;
                flag = true;
            }
        }
        if (!flag) {
            return [0, 0, false]
        } else {
            return [cursorX, cursorY, true]
        }
    }

    const handleResizeStart = (e, direction) => {
        e.stopPropagation();
        setCursor({ ...cursor, selecting: true });
        const cursorPos = getCursorFromEvent(e);
        let newDeltaX = 0;
        let newDeltaY = 0;
        if (cursorPos[2] === false) return
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

    function handleResizeCommon(e, cursorPos, direction) {
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
        return [newStartX, newStartY, newEndX, newEndY]
    }

    const handleResize = (e, direction) => {
        e.preventDefault();
        e.stopPropagation();
        const cursorPos = getCursorFromEvent(e);
        if (cursorPos[2] === false) return
        const resizeResult = handleResizeCommon(e, cursorPos, direction);
        setCursor({ ...cursor, start: { x: resizeResult[0], y: resizeResult[1] }, end: { x: resizeResult[2], y: resizeResult[3] } })
    }

    const handleResizeEnd = (e, direction) => {
        e.preventDefault();
        e.stopPropagation();
        const cursorPos = getCursorFromEvent(e);
        if (cursorPos[2] === false) return
        const resizeResult = handleResizeCommon(e, cursorPos, direction);
        setCursor({ ...cursor, start: { x: resizeResult[0], y: resizeResult[1] }, end: { x: resizeResult[2], y: resizeResult[3] }, selecting: false })
    }

    const handleDragStart = (e) => {
        e.stopPropagation();
        setCursor({ ...cursor, selecting: true });
        const cursorPos = getCursorFromEvent(e);
        if (cursorPos[2] === false) return
        if(e.target.id !== "drawDocSelectionBox" && e.target.id !== "drawDocSelectionEllipse" && e.target.id !== "drawDocSelectionCircle") return
        let startDeltaX = 0, startDeltaY = 0, endDeltaX = 0, endDeltaY = 0;
        startDeltaX = cursorPos[0] - cursor.start.x;
        startDeltaY = cursorPos[1] - cursor.start.y;
        endDeltaX = cursorPos[0] - cursor.end.x;
        endDeltaY = cursorPos[1] - cursor.end.y;
        setDragDelta([startDeltaX, startDeltaY, endDeltaX, endDeltaY]);
    }

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const cursorPos = getCursorFromEvent(e);
        if (cursorPos[2] === false) return
        if(e.target.id !== "drawDocSelectionBox" && e.target.id !== "drawDocSelectionEllipse" && e.target.id !== "drawDocSelectionCircle") return
        setCursor({
            ...cursor,
            start: { x: cursorPos[0] - dragDelta[0], y: cursorPos[1] - dragDelta[1] },
            end: { x: cursorPos[0] - dragDelta[2], y: cursorPos[1] - dragDelta[3] }
        })
    }

    const handleDragEnd = (e) =>{
        e.preventDefault();
        e.stopPropagation();
        const cursorPos = getCursorFromEvent(e);
        if (cursorPos[2] === false) return
        if(e.target.id !== "drawDocSelectionBox" && e.target.id !== "drawDocSelectionEllipse" && e.target.id !== "drawDocSelectionCircle") return
        setCursor({
            ...cursor,
            start: { x: cursorPos[0] - dragDelta[0], y: cursorPos[1] - dragDelta[1] },
            end: { x: cursorPos[0] - dragDelta[2], y: cursorPos[1] - dragDelta[3] },
            selecting: false
        })
    }

    const handleCircleRotateStart = (e) => {
        setCursor({ ...cursor, selecting: true });
        const cursorPos = getCursorFromEvent(e);
        const boundary = document.getElementById("previewCanvas").getBoundingClientRect();
        if (cursorPos[2] === false) return
        setRotateStartPos([cursorPos[0] , cursorPos[1] , subtool.angle, boundary.left ,boundary.top]);
    }

    const handleCircleRotate = (e) => {
        e.preventDefault();
        const cursorPos = getCursorFromEvent(e);
        //TODO: cursor position must be adjusted to indicate its relative position instead of absolute
        if (cursorPos[2] === false) return
        let top = Number(selectionCircle.top.slice(0,-2));
        let left = Number(selectionCircle.left.slice(0,-2));
        let diameter = Number(selectionCircle.diameter.slice(0,-2));
        let centerX = left + (diameter / 2) + rotateStartPos[3];
        let centerY = top + (diameter / 2) + rotateStartPos[4];
        let horizontal = centerX > cursorPos[0] ? centerX - cursorPos[0] : cursorPos[0] - centerX;
        let vertical = centerY > cursorPos[1] ? centerY - cursorPos[1] : cursorPos[1] - centerY;
        let hypothenuse = Math.sqrt(Math.pow(horizontal, 2) + Math.pow(vertical, 2));
        let currAngleRad = Math.acos((Math.pow(horizontal, 2) + Math.pow(hypothenuse, 2) - Math.pow(vertical, 2)) / (2 * horizontal * hypothenuse))
        let currAngleDeg = currAngleRad / (Math.PI / 180)
        let angle = 0;
        if (cursorPos[0] > centerX && cursorPos[1] < centerY) angle = 90 - currAngleDeg
        else if (cursorPos[0] > centerX && cursorPos[1] > centerY) angle = 90 + currAngleDeg
        else if (cursorPos[0] < centerX && cursorPos[1] > centerY) angle = 180 + 90 - currAngleDeg
        else if (cursorPos[0] < centerX && cursorPos[1] < centerY) angle = 270 + currAngleDeg
        setSubTool({...subtool, angle: angle})
    }

    const handleCircleRotateEnd = (e) => {
        handleCircleRotate(e);
        setCursor({ ...cursor, selecting: false });
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
        } else if(tool === "Text") {
            setSelectionBox({ ...selectionBox, display: "block" })
            setSelectionCircle({ ...selectionCircle, display: "none" })
            setSelectionEllipse({ ...selectionEllipse, display: "none" })
        }else {
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
                draggable
                onDragStart={(e) => { if (!cursor.down) handleDragStart(e) }}
                onDrag={(e) => { if (!cursor.down) handleDrag(e) }}
                onDragEnd={(e) => { if (!cursor.down) handleDragEnd(e) }}
            >
                <div
                    id="drawDocSelectionBoxNW"
                    draggable
                    onDragStart={(e) => { if (!cursor.down) handleResizeStart(e, "NW") }}
                    onDrag={(e) => { if (!cursor.down) handleResize(e, "NW") }}
                    onDragEnd={(e) => { if (!cursor.down) handleResizeEnd(e, "NW") }}
                />
                <div
                    id="drawDocSelectionBoxN"
                    draggable
                    onDragStart={(e) => { if (!cursor.down) handleResizeStart(e, "N") }}
                    onDrag={(e) => { if (!cursor.down) handleResize(e, "N") }}
                    onDragEnd={(e) => { if (!cursor.down) handleResizeEnd(e, "N") }}
                />
                <div
                    id="drawDocSelectionBoxNE"
                    draggable
                    onDragStart={(e) => { if (!cursor.down) handleResizeStart(e, "NE") }}
                    onDrag={(e) => { if (!cursor.down) handleResize(e, "NE") }}
                    onDragEnd={(e) => { if (!cursor.down) handleResizeEnd(e, "NE") }}
                />
                <div
                    id="drawDocSelectionBoxE"
                    draggable
                    onDragStart={(e) => { if (!cursor.down) handleResizeStart(e, "E") }}
                    onDrag={(e) => { if (!cursor.down) handleResize(e, "E") }}
                    onDragEnd={(e) => { if (!cursor.down) handleResizeEnd(e, "E") }}
                />
                <div
                    id="drawDocSelectionBoxSE"
                    draggable
                    onDragStart={(e) => { if (!cursor.down) handleResizeStart(e, "SE") }}
                    onDrag={(e) => { if (!cursor.down) handleResize(e, "SE") }}
                    onDragEnd={(e) => { if (!cursor.down) handleResizeEnd(e, "SE") }}
                />
                <div
                    id="drawDocSelectionBoxS"
                    draggable
                    onDragStart={(e) => { if (!cursor.down) handleResizeStart(e, "S") }}
                    onDrag={(e) => { if (!cursor.down) handleResize(e, "S") }}
                    onDragEnd={(e) => { if (!cursor.down) handleResizeEnd(e, "S") }}
                />
                <div
                    id="drawDocSelectionBoxSW"
                    draggable
                    onDragStart={(e) => { if (!cursor.down) handleResizeStart(e, "SW") }}
                    onDrag={(e) => { if (!cursor.down) handleResize(e, "SW") }}
                    onDragEnd={(e) => { if (!cursor.down) handleResizeEnd(e, "SW") }}
                />
                <div
                    id="drawDocSelectionBoxW"
                    draggable
                    onDragStart={(e) => { if (!cursor.down) handleResizeStart(e, "W") }}
                    onDrag={(e) => { if (!cursor.down) handleResize(e, "W") }}
                    onDragEnd={(e) => { if (!cursor.down) handleResizeEnd(e, "W") }}
                />
            </div>
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
                draggable
                onDragStart={(e) => { if (!cursor.down) handleDragStart(e) }}
                onDrag={(e) => { if (!cursor.down) handleDrag(e) }}
                onDragEnd={(e) => { if (!cursor.down) handleDragEnd(e) }}
            >
            </div>
            <div
                id="drawDocSelectionCircle"
                style={{
                    display: selectionCircle.display,
                    top: selectionCircle.top,
                    left: selectionCircle.left,
                    width: selectionCircle.diameter,
                    height: selectionCircle.diameter,
                    rotate: subtool.angle + "deg"
                }}
                draggable
                onDragStart={(e) => { if (!cursor.down) handleDragStart(e) }}
                onDrag={(e) => { if (!cursor.down) handleDrag(e) }}
                onDragEnd={(e) => { if (!cursor.down) handleDragEnd(e) }}
            >
                <div
                    id="drawDocSelectionCirclePoint"
                    draggable
                    onDragStart={(e) => { if (!cursor.down) handleCircleRotateStart(e) }}
                    onDrag={(e) => { if (!cursor.down) handleCircleRotate(e) }}
                    onDragEnd={(e) => { if (!cursor.down) handleCircleRotateEnd(e) }}
                />
            </div>
                {tool === "Text" && 
                <textarea id="drawDocSelectionBoxText"
                style={{
                    display: selectionBox.display,
                    top: selectionBox.top,
                    left: selectionBox.left,
                    width: selectionBox.width,
                    height: selectionBox.height,
                    caretColor: context.text.color,
                    fontSize: context.size * context.zoom + "px",
                    fontFamily: context.text.fontFamily
                }}
                value={context.text.text}
                onChange={(e)=>context.setText({...context.text, text: e.target.value})}
                 />
                }
        </>
    )
}