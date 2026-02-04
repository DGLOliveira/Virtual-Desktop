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
    const [renameLayerIndex, setRenameLayerIndex] = useState(-1);


    const getImageFromCanvasRef = (id, notMain) => {
        const canvas = document.getElementById(id);
        const ctx = notMain ?
            canvas.getContext('2d', { alpha: true }) :
            canvas.getContext('2d', { alpha: false });
        return ctx.canvas.toDataURL("image/png")
    }

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
    
    const renameLayer = (e, index) => {
        const newLayers = [...layers];
        newLayers[index].name = e.target.value;
        setLayers(newLayers);
    }

    useEffect(() => {
        if (renameLayerIndex !== -1) {
            const target = document.getElementById(`drawDocLayerNameInput${renameLayerIndex}`);
            target.focus();
            target.select();
            target.addEventListener('blur', () => setRenameLayerIndex(-1));
            target.addEventListener("keydown", (e) => {
                e.key === "Enter" && setRenameLayerIndex(-1);
            });
            return () => {
                target.removeEventListener('blur', () => setRenameLayerIndex(-1))
                target.removeEventListener("keydown", (e) => {
                    e.key === "Enter" && setRenameLayerIndex(-1);
                });
            };
        }
    }, [renameLayerIndex])

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
                                textDecoration: index === currLayer ? "underline" : "none",
                                display: index === renameLayerIndex ? "none" : "inline-block"
                            }}
                        >
                            {layer.name}
                        </span>
                        <input
                            style={{ display: index === renameLayerIndex ? "inline-block" : "none" }}
                            id={`drawDocLayerNameInput${index}`}
                            type="text"
                            value={layer.name}
                            onChange={(e) => {
                                renameLayer(e, index);
                            }}
                        />
                        <div>
                            <button
                                onClick={() => setRenameLayerIndex(index)}
                                title="Rename Layer"
                                aria-label="Rename Layer"
                                disabled={index === 0}
                            >
                                <RiEditLine />
                            </button>
                            <button
                                onClick={() => toggleVisibility(index)}
                                title="Toggle Visibility"
                                aria-label="Toggle Visibility"
                            >
                                {layer.visible ? <RiEyeFill /> : <RiEyeCloseFill />}
                            </button>
                            <button
                                onClick={() => deleteLayer(index)}
                                disabled={index === 0}
                                title="Delete Layer"
                                aria-label="Delete Layer"
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