import { useState, useEffect, useContext } from "react";
import { Context } from "../Context.jsx";
export default function LayersWindow(props) {

    const context = useContext(Context);
    const canvasMainRef = context.canvasMainRef;
    const history = context.history;
    const canvasLayersRef = context.canvasLayersRef;
    const currLayer = context.currLayer;
    const setCurrLayer = context.setCurrLayer;

    const [mainCanvasPreview, setMainCanvasPreview] = useState(null);
    const [layersCanvasPreviews, setLayersCanvasPreviews] = useState(null);

    const getImageFromCanvasRef = (canvas, notMain) =>{
        const ctx = notMain ? 
            canvas.getContext('2d', { alpha: true }) : 
            canvas.getContext('2d', { alpha: false });
        return ctx.canvas.toDataURL("image/png")
    }

    useEffect(()=>{
        canvasMainRef && setMainCanvasPreview(getImageFromCanvasRef(canvasMainRef.current, false))
    }, [history])



    return (<div
        id="drawDocLayersWindow">
            <div id="drawDocLayersWindowTop">Layers</div>
            <div id="drawDocLayersWindowContainer">
                {mainCanvasPreview &&
                <div className="drawDocLayersWindowLayer">
                    <img src={mainCanvasPreview} />
                    Base
                </div>}
            </div>
    </div>);
};