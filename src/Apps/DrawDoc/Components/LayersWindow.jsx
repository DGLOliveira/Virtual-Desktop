import { useState, useEffect, useContext } from "react";
import { Context } from "../Context.jsx";
import { RiEyeCloseFill, RiEyeFill, RiEditLine, RiCloseLargeFill } from "react-icons/ri";

export default function LayersWindow(props) {

    const context = useContext(Context);
    const canvasMainRef = context.canvasMainRef;
    const history = context.history;
    const canvasLayersRef = context.canvasLayersRef;
    const currLayer = context.currLayer;
    const setCurrLayer = context.setCurrLayer;

    const [mainCanvasPreview, setMainCanvasPreview] = useState(null);
    const [layersCanvasPreviews, setLayersCanvasPreviews] = useState(null);

    const getImageFromCanvasRef = (canvas, notMain) => {
        const ctx = notMain ?
            canvas.getContext('2d', { alpha: true }) :
            canvas.getContext('2d', { alpha: false });
        return ctx.canvas.toDataURL("image/png")
    }

    const LayerBox = (props) => {
        return (<div className="drawDocLayersWindowLayer">
            <img src={props.src} className="drawDocCheckersBackground" />
            <div>
                <span>{props.name}</span>
                <div>
                    <button>
                        <RiEditLine />
                    </button>
                    <button>
                        <RiEyeFill />
                    </button>
                    <button disabled={props.isMain}>
                        <RiCloseLargeFill />
                    </button>
                </div>
            </div>
        </div>);
    }

    useEffect(() => {
        canvasMainRef && setMainCanvasPreview(getImageFromCanvasRef(canvasMainRef.current, false))
    }, [history])



    return (
        <div id="drawDocLayersWindow">
            {mainCanvasPreview &&
                <LayerBox name="Main" src={mainCanvasPreview} isMain={true} />
            }
            {layersCanvasPreviews &&
                layersCanvasPreviews.map((layer, index) => (
                    <LayerBox key={index} name={`Layer ${index}`} src={layersCanvasPreviews[index]} isMain={false} />
                ))
            }
            <button>
                New Layer
            </button>
        </div>);
};