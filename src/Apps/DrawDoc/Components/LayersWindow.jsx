import { useState, useEffect, useContext, createRef } from "react";
import { Context } from "../Context.jsx";
import { RiEyeCloseFill, RiEyeFill, RiEditLine, RiCloseLargeFill } from "react-icons/ri";

export default function LayersWindow(props) {

    const context = useContext(Context);
    const canvasMainRef = context.canvasMainRef;
    const history = context.history;
    const canvasLayersRef = context.canvasLayersRef;
    const currLayer = context.currLayer;
    const setCurrLayer = context.setCurrLayer;
    const layers = context.layers;
    const setLayers = context.setLayers;

    const [mainCanvasPreview, setMainCanvasPreview] = useState(null);
    const [layersCanvasPreviews, setLayersCanvasPreviews] = useState([]);

    const createNewLayer = () => {
        const newLayer = {
            canvas: createRef(),
            name: `Layer ${layers.length}`,
            visible: true
        }
        setLayers([...layers, newLayer]);
    }

    const getImageFromCanvasRef = (canvas, notMain) => {
        const ctx = notMain ?
            canvas.getContext('2d', { alpha: true }) :
            canvas.getContext('2d', { alpha: false });
        return ctx.canvas.toDataURL("image/png")
    }

    const LayerBox = (props) => {
        return (<>
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
        </>);
    }

    useEffect(() => {
        canvasMainRef && setMainCanvasPreview(getImageFromCanvasRef(canvasMainRef.current, false))
        layers.length > 0 && setLayersCanvasPreviews(layers.map((layer, index) => getImageFromCanvasRef(layer.canvas.current, true)));
        console.log(layersCanvasPreviews.length);
    }, [history, layers])

    return (
        <div id="drawDocLayersWindow">
            {mainCanvasPreview &&
                <div className="drawDocLayersWindowLayer">
                    <LayerBox name="Main" src={mainCanvasPreview} isMain={true} />
                </div>
            }
            {layersCanvasPreviews.length > 0 &&
                layersCanvasPreviews.map((layerPreview, index) => {
                   return (<div
                        className="drawDocLayersWindowLayer"
                        key={index}
                    >
                        <LayerBox
                            name={layers[index].name}
                            src={layerPreview}
                            isMain={false}
                        />
                    </div>)
                })
            }
            <button onClick={() => { createNewLayer() }}>
                New Layer
            </button>
        </div>);
};