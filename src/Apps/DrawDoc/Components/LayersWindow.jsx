import { useState, useEffect, useContext } from "react";
import { Context } from "../Context.jsx";
import { RiEyeCloseFill, RiEyeFill, RiEditLine } from "react-icons/ri";
import { FaTrashCan } from "react-icons/fa6";

export default function LayersWindow(props) {

    const context = useContext(Context);
    const history = context.history;
    const currLayer = context.currLayer;
    const setCurrLayer = context.setCurrLayer;
    const layers = context.layers;
    const setLayers = context.setLayers;
    const lastLayer = context.lastLayer;
    const setLastLayer = context.setLastLayer;

    const [layersCanvasPreviews, setLayersCanvasPreviews] = useState([]);

    const createNewLayer = () => {
        const newLayer = {
            id: `drawDocLayer${lastLayer + 1}`,
            name: `Layer ${lastLayer + 1}`,
            visible: true
        }
        setLayers([...layers, newLayer]);
        setCurrLayer(layers.length);
        setLastLayer(lastLayer + 1);
    }

    const getImageFromCanvasRef = (id, notMain) => {
        const canvas = document.getElementById(id);
        const ctx = notMain ?
            canvas.getContext('2d', { alpha: true }) :
            canvas.getContext('2d', { alpha: false });
        return ctx.canvas.toDataURL("image/png")
    }

    const toggleVisibility = (index) => {
        const newLayers = [...layers];
        newLayers[index].visible = !newLayers[index].visible;
        setLayers(newLayers);
    }

    const deleteLayer = (index) => {
        setLayers(layers.filter((_layer, i) => i !== index));
        if (index === currLayer || currLayer > layers.length - 2) {
            setCurrLayer(0);
        }
    }

    useEffect(() => {
        console.log(layers);
        layers.length > 0 && setLayersCanvasPreviews(layers.map((layer, index) => getImageFromCanvasRef(layer.id, true)));
    }, [history, layers]);

    return (
        <div id="drawDocLayersWindow">
            {layers.map((layer, index) => {
                return (<div
                    className="drawDocLayersWindowLayer"
                    key={index}
                >
                    <img
                        src={layersCanvasPreviews[index] ? layersCanvasPreviews[index] : ""}
                        className="drawDocCheckersBackground"
                        onClick={() => setCurrLayer(index)}
                    />
                    <div>
                        <span
                            style={{
                                textDecoration: index === currLayer ? "underline" : "none"
                            }}
                        >
                            {layer.name}
                        </span>
                        <div>
                            <button>
                                <RiEditLine />
                            </button>
                            <button onClick={() => toggleVisibility(index)}>
                                {layer.visible ? <RiEyeFill /> : <RiEyeCloseFill />}
                            </button>
                            <button
                                onClick={() => deleteLayer(index)}
                                disabled={index === 0}
                            >
                                <FaTrashCan />
                            </button>
                        </div>
                    </div>
                </div>)
            })
            }
            <button onClick={() => { createNewLayer() }}>
                New Layer
            </button>
        </div>);
};