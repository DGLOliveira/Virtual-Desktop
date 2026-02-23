import { useRef, useEffect } from "react";

export const SubToolIcon = ({ subtool, isSelected }) => {
    let canvasSubToolRef = useRef(null);

    const drawCircleIcon = (context, width, height) => {
        context.beginPath();
        context.arc(
            width / 2,
            height / 2,
            (height / 2) - 2,
            0,
            Math.PI * 2,
        );
        if (subtool.fill) {
            context.fill();
        }
        context.stroke();
        context.closePath();
    };
    const drawEllipseIcon = (context, width, height) => {
        context.scale(1,0.5);
        context.beginPath();
        context.beginPath();
        context.arc(
            width / 2,
            height,
            (height / 2) - 2,
            0,
            Math.PI * 2,
        );
        if (subtool.fill) {
            context.fill();
        }
        context.stroke();
        context.closePath();
        context.scale(1,2);
    }
    const drawRectangleIcon = (context, width, height) => {
        if (subtool.fill) {
            context.fillRect(0, height / 4, width, height / 2);
        }
        context.strokeRect(0, height / 4, width, height / 2);

    };

    const drawSquagleIcon = (context, width, height) => {
        context.beginPath();
        context.roundRect(0, height / 4, width, height / 2, 10);
        context.stroke();
        if (subtool.fill) {
            context.fill();
        }
    };

    const drawPolygonIcon = (context, width, height) => {
        context.beginPath();
        //context.moveTo(width/2, 0);
        for (let i = 0; i < subtool.sides; i++) {
            context.lineTo(
                width / 2 + (width / 2 - 3) * Math.cos((2 * Math.PI * i / subtool.sides) - Math.PI / 2),
                height / 2 + (height / 2 - 3) * Math.sin((2 * Math.PI * i / subtool.sides) - Math.PI / 2)
            );
        };
        context.closePath();
        context.stroke();
        if (subtool.fill) {
            context.fill();
        }
    }
    const drawLineIcon = (context, width, height) => {
        context.beginPath();
        context.moveTo(width / 4, 2);
        context.lineTo(3 * width / 4, height - 2);
        context.closePath();
        context.stroke();
    }
    const drawCurveIcon = (context, width, height) => {
        context.beginPath();
        context.moveTo(width / 6, 2);
        context.bezierCurveTo(5 * width / 6, height / 5, width / 6, 4 * height / 5 - 2, 5 * width / 6, height - 2);
        context.stroke();
    }
    const drawArrowIcon = (context, width, height) => {
        context.beginPath();
        context.moveTo(2, height / 3);
        context.lineTo(width / 2, height / 3);
        context.lineTo(width / 2, 2);
        context.lineTo(width - 2, height / 2);
        context.lineTo(width / 2, height - 2);
        context.lineTo(width / 2, 2 * height / 3);
        context.lineTo(2, 2 * height / 3);
        context.closePath();
        context.stroke();
        if (subtool.fill) {
            context.fill();
        }
    }
    const drawStarIcon = (context, width, height) => {
        context.beginPath();
        context.moveTo(width / 2, 3);
        for (let i = 0; i < subtool.sides * 2; i++) {
            if (i % 2 === 0) {
                context.lineTo(
                    width / 2 + (width / 2 - 3) * Math.cos((2 * Math.PI * i / (subtool.sides * 2)) - Math.PI / 2),
                    height / 2 + (height / 2 - 3) * Math.sin((2 * Math.PI * i / (subtool.sides * 2)) - Math.PI / 2)
                );
            } else {
                context.lineTo(
                    width / 2 + (width / 4 - 3) * Math.cos((2 * Math.PI * i / (subtool.sides * 2)) - Math.PI / 2),
                    height / 2 + (height / 4 - 3) * Math.sin((2 * Math.PI * i / (subtool.sides * 2)) - Math.PI / 2)
                );
            }
        };
        context.closePath();
        context.stroke();
        if (subtool.fill) {
            context.fill();
        }
    }
    const drawHeartIcon = (context, width, height) => {
        context.beginPath();
        context.moveTo(width / 2, height-3);
        //context.lineTo(width / 4, 2*height/3);
        context.arc(width/4+1, height/3, width/4-1, 3*Math.PI/4, 0, false);
        context.arc(3*width/4-1, height/3, width/4-1, Math.PI, Math.PI/4, false);
        context.closePath();
        context.stroke();
        if (subtool.fill) {
            context.fill();
        }

    }

    const functionList = {
        drawCircleIcon,
        drawEllipseIcon,
        drawRectangleIcon,
        drawSquagleIcon,
        drawPolygonIcon,
        drawLineIcon,
        drawCurveIcon,
        drawStarIcon,
        drawArrowIcon,
        drawHeartIcon
    };

    useEffect(() => {
        const canvas = canvasSubToolRef.current;
        const context = canvas.getContext("2d");
        const height = context.canvas.height;
        const width = context.canvas.width;
        context.clearRect(0, 0, width, height);
        context.fillStyle = getComputedStyle(document.getElementById("drawDocToolBar")).color;
        context.strokeStyle = getComputedStyle(document.getElementById("drawDocToolBar")).color;
        context.lineWidth = 2;
        functionList["draw"+subtool.shape+"Icon"](context, width, height);
    }, [subtool, isSelected]);


    return <canvas ref={canvasSubToolRef} id="shapeCanvas" width="25" height="25"  title="Custom Shape"/>
}