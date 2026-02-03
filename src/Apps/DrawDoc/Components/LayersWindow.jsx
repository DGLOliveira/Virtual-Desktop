import { useState, useEffect, useContext, createRef } from "react";
import { Context } from "../Context.jsx";
import { RiEyeCloseFill, RiEyeFill, RiEditLine, RiCloseLargeFill } from "react-icons/ri";

export default function LayersWindow(props) {

    const context = useContext(Context);
    const history = context.history;
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
        setCurrLayer(layers.length);
    }

    const getImageFromCanvasRef = (canvas, notMain) => {
        const ctx = notMain ?
            canvas.getContext('2d', { alpha: true }) :
            canvas.getContext('2d', { alpha: false });
        return ctx.canvas.toDataURL("image/png")
    }

    const LayerBox = (props) => {
        return (<>
            <img
                src={props.src}
                className="drawDocCheckersBackground"
                onClick={() => setCurrLayer(props.index)}
            />
            <div>
                <span
                    style={{ textDecoration: props.index === currLayer ? "underline" : "none" }}>
                    {props.name}
                </span>
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
        layers.length > 0 && setLayersCanvasPreviews(layers.map((layer, index) => getImageFromCanvasRef(layer.canvas.current, true)));
    }, [history, layers])

    return (
        <div id="drawDocLayersWindow">
            {layersCanvasPreviews.map((layerPreview, index) => {
                return (<div
                    className="drawDocLayersWindowLayer"
                    key={index}
                >
                    <LayerBox
                        index={index}
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