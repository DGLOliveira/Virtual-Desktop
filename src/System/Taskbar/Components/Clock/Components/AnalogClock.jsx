// Depreceated in favor of SVGClock
// Canvas is more resource intensive than SVG + CSS

import { useState, useEffect, useRef } from "react";

export default function AnalogClock({ time }) {
    const analogClockRef = useRef(null);

    const clearCanvas = (ctx, width, height) => {
        ctx.clearRect(0, 0, width, height);
    };
    const drawFrame = (ctx, width, height) => {
        ctx.strokeStyle = "#000000";
        ctx.fillStyle = "#AAAAAA";
        ctx.beginPath();
        ctx.arc(
            width / 2,
            height / 2,
            width / 2 - 5,
            0,
            2 * Math.PI
        );
        ctx.stroke();
        ctx.fill();
    };
    const drawCenter = (ctx, width, height) => {
        ctx.strokeStyle = "#000000";
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.arc(
            width / 2,
            height / 2,
            3,
            0,
            2 * Math.PI
        );
        ctx.stroke();
        ctx.fill();
        
    }
    const drawHand = (ctx, width, height, angle, length, thickness) => {
        ctx.lineWidth=thickness;
        ctx.strokeStyle = "#000000";
        ctx.beginPath();
        ctx.moveTo(width / 2, height / 2);
        ctx.lineTo(
            width / 2 + Math.cos(angle-Math.PI/2) * length,
            height / 2 + Math.sin(angle-Math.PI/2) * length
        );
        ctx.stroke();
    };
    const drawIndicators = (ctx, width, height) => {
        ctx.strokeStyle = "#000000";
        for (let i = 0; i < 12; i++) {
            let startX = width / 2 + Math.cos(i * 2 * Math.PI / 12 - Math.PI / 2) * (width / 2 - 10);
            let startY = height / 2 + Math.sin(i * 2 * Math.PI / 12 - Math.PI / 2) * (width / 2 - 10);
            let endX = width / 2 + Math.cos(i * 2 * Math.PI / 12 - Math.PI / 2) * (width / 2 - 5);
            let endY = height / 2 + Math.sin(i * 2 * Math.PI / 12 - Math.PI / 2) * (width / 2 - 5);
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
        }
    }

    useEffect(() => {
        const canvas = analogClockRef.current;
        const context = canvas.getContext("2d");
        const width = context.canvas.width;
        const height = context.canvas.height;
        let animationFrameId;
        clearCanvas(context, width, height);
        drawFrame(context, width, height);
        drawCenter(context, width, height);
        if (time.hours !== undefined) {
            let newhours = time.hours > 12 ? time.hours - 12 : time.hours;
            let hourAngle = (newhours / 12) * 2 * Math.PI;
            drawHand(context, width, height, hourAngle, width/4, 4);
        }
        if (time.minutes !== undefined) {
            let minuteAngle = (time.minutes / 60) * 2 * Math.PI;
            drawHand(context, width, height, minuteAngle, width/3, 3);
        }
        if (time.seconds !== undefined) {
            let secondAngle = (time.seconds / 60) * 2 * Math.PI;
            drawHand(context, width, height, secondAngle, width/2-10, 2);
        }
        drawIndicators(context, width, height);
        const render = () => {
            animationFrameId = window.requestAnimationFrame(render);
        };
        render();
        return () => {
            window.cancelAnimationFrame(animationFrameId);
        };
    }, [time]);
    return (
        <canvas ref={analogClockRef} width="100" height="100" />
    );
} 