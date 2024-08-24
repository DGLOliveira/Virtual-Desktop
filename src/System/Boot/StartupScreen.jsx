import { useState, useEffect, useRef } from "react";

export default function StartupScreen() {

    const canvasRef = useRef(null);
    const frequency = 120;
    const frameRate = 1000 / frequency;
    const [framecount, setFramecount] = useState(0);
    let clientHeight = window.innerHeight;
    let clientWidth = window.innerWidth;
    let minWindowDimention=0;
    if(clientHeight<clientWidth){
        minWindowDimention=clientHeight/2.5;
    }else{
        minWindowDimention=clientWidth/2.5;
    }

    const drawClear = (canvas, ctx) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const drawOrbit = (ctx, count) => {
        ctx.strokeStyle = "dodgerblue";
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.ellipse(
            minWindowDimention / 2,
            minWindowDimention / 2,
            (minWindowDimention/2-5),
            (minWindowDimention/2-5) * Math.abs(Math.cos( Math.PI/3 + framecount/60)),
            Math.PI/3 *count + framecount/30,
            0,
            2 * Math.PI
        );
        ctx.stroke();
    };

    const drawNucleus = (ctx) => {
        ctx.fillStyle = "dodgerblue";
        ctx.beginPath();
        ctx.arc(
            minWindowDimention / 2,
            minWindowDimention / 2,
            minWindowDimention / 25 + minWindowDimention / 50 * Math.abs(Math.cos(framecount * Math.PI / 60)),
            0,
            2 * Math.PI
        );
        ctx.fill();
    };

    useEffect(() => {
        let animationFrameId;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', { alpha: true });
        drawClear(canvas, ctx);
        drawOrbit(ctx, 0);
        drawOrbit(ctx, 1);
        drawOrbit(ctx, 2);
        drawNucleus(ctx);
        setTimeout(() => {
            setFramecount(framecount + 1);
        }, [frameRate]);
        const render = () => {
            animationFrameId = window.requestAnimationFrame(render);
        };
        render();
        return () => {
            window.cancelAnimationFrame(animationFrameId);
        };
    }, [framecount]);
    return (
        <div style={{position:"absolute",top:"0",left:"0",width:"100%",height:"100%", background:"black", cursor: "wait"}}>
        <div style={{position:"absolute", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", top:"50%",left:"50%",transform:"translate(-50%,-50%)", color:"white", fontFamily:"monospace"}}>
            <canvas style={{background:"radial-gradient(rgba(30, 143, 255, 0.4), rgba(30, 143, 255, 0.3),rgba(30, 143, 255, 0.2),rgba(30, 143, 255, 0.1),transparent, transparent)"}} ref={canvasRef} width={minWindowDimention} height={minWindowDimention} />
            <h1>{"Loading"}</h1>
            <p>Please Wait</p>
        </div>
        </div>
    );
}