import { useState, useEffect, useContext, Fragment } from "react";
import { Context } from "../Context.jsx";
import { RiEyeCloseFill, RiEyeFill, RiEditLine } from "react-icons/ri";
import { FaTrashCan } from "react-icons/fa6";
import { BiUndo, BiRedo } from "react-icons/bi";
import { IoDuplicateSharp } from "react-icons/io5";
import { TiLockOpen, TiLockClosed } from "react-icons/ti";
import { handleTopMenu } from "../Handlers/handleTopMenu.js";

export default function LayersWindow(props) {

    const action = props.action;
    const setAction = props.setAction;
    const contextMenu = props.contextMenu;
    const appMenu = props.appMenu;
    const setAppMenu = props.setAppMenu;

    const context = useContext(Context);
    const history = context.history;
    const setHistory = context.setHistory;
    const currLayer = context.currLayer;
    const setCurrLayer = context.setCurrLayer;
    const layers = context.layers;
    const setLayers = context.setLayers;
    const lastLayer = context.lastLayer;
    const setLastLayer = context.setLastLayer;

    const [layersCanvasPreviews, setLayersCanvasPreviews] = useState([]);
    const [renameLayerIndex, setRenameLayerIndex] = useState(-1);
    const [dragTargetIndex, setDragTargetIndex] = useState(-1);
    const [dropTargetIndex, setDropTargetIndex] = useState(-1);


    const getImageFromCanvasRef = (id, notMain) => {
        const canvas = document.getElementById(id);
        const ctx = notMain ?
            canvas.getContext('2d', { alpha: true }) :
            canvas.getContext('2d', { alpha: false });
        return ctx.canvas.toDataURL("image/png")
    }

    const changeCurrLayer = (index) => {
        setCurrLayer(index);
        let args;
        handleTopMenu(appMenu, setAppMenu, args = { history: { ...layers[index] } }, "history");
    }

    const createNewLayer = () => {
        const newLayer = {
            id: lastLayer + 1,
            name: `Layer ${lastLayer + 1}`,
            visible: true,
            locked: false,
            canUndo: false,
            canRedo: false
        }
        setLayers([...layers, newLayer]);
        setCurrLayer(layers.length);
        setLastLayer(lastLayer + 1);
        setAction("New Layer");
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

    const toggleLock = (index) => {
        const newLayers = [...layers];
        newLayers[index].locked = !newLayers[index].locked;
        setLayers(newLayers);
    }

    const deleteLayer = (index) => {
        setLayers(layers.filter((_layer, i) => i !== index));
        if (index === currLayer || currLayer > layers.length - 2) {
            setCurrLayer(0);
        }
        setAction("Delete Layer");
    }

    const duplicateLayer = (index) => {
        let newId = lastLayer + 1;
        const newLayer = {
            id: newId,
            name: `Dupe ${layers[index].name}`,
            visible: true,
            locked: layers[index].locked,
            canUndo: layers[index].canUndo,
            canRedo: layers[index].canRedo
        }
        setLayers([...layers.slice(0, index + 1), newLayer, ...layers.slice(index + 1)]);
        setCurrLayer(index + 1);
        setLastLayer(lastLayer + 1);
        let newHistory = history
        newHistory[newId] = history[layers[index].id];
        setHistory(newHistory);
        setAction("Duplicate Layer");
    }

    const handleLayerDragOver = (e, index) => {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = "move";
        setDropTargetIndex(index);
    }

    const handleLayerDrop = (e, index) => {
        e.preventDefault();
        e.stopPropagation();
        let newLayers = [];
        const draggedLayer = layers[dragTargetIndex];
        //Base layer is not allowed to be dragged, terminates the drag
        //If the target has been dropped on itself, terminates the drag
        if (dragTargetIndex < 1 || dragTargetIndex === index) {
            setDropTargetIndex(-1);
            setDragTargetIndex(-1);
            return
        }
        //No Layer other than Base is allowed in the start of the Array
        else if (index === 0) {
            newLayers = [
                layers[0],
                draggedLayer,
                ...layers.filter((_layer, i) => i !== dragTargetIndex && i !== 0)
            ];
        }
        //Indicates the drop zone is not a layer window, thus its at the end of the Array
        else if (index === layers.length) {
            newLayers = [
                ...layers.filter((_layer, i) => i !== dragTargetIndex),
                draggedLayer
            ]
        }
        //If the target has been dropped on the last layer, places the dragged layer before the last layer
        else if (index === layers.length - 1) {
            const dropLayer = layers[index];
            newLayers = [
                ...layers.filter((_layer, i) => i < index && i !== dragTargetIndex),
                draggedLayer,
                dropLayer
            ]
        }
        //If the target has been dropped on another layer other than itself or base layer
        else {
            const dropLayer = layers[index];
            newLayers = [
                ...layers.filter((_layer, i) => i < index && i !== dragTargetIndex),
                index < dragTargetIndex ? draggedLayer : dropLayer,
                index > dragTargetIndex ? draggedLayer : dropLayer,
                ...layers.filter((_layer, i) => i > index && i !== dragTargetIndex)
            ]
        }
        setLayers(newLayers);
        setDropTargetIndex(-1);
        setDragTargetIndex(-1);
    }

    //Updates image previews
    useEffect(() => {
        layers.length > 0 && setLayersCanvasPreviews(layers.map((layer, index) => getImageFromCanvasRef(`drawCanvasLayer${layer.id}`, true)));
    }, [history, layers, action]);

    return (
        <div id="drawDocLayersWindow"
            onDragOver={(e) => { handleLayerDragOver(e, layers.length) }}
            onDrop={(e) => { handleLayerDrop(e, layers.length); }}
        >
            {layers.map((layer, index) => {
                return (
                    <Fragment key={layer.id}>
                        {index !== 0 && <hr style={{ display: dropTargetIndex === index ? "block" : "none" }} />}
                        <div
                            className="drawDocLayersWindowLayer"
                            draggable={index !== 0}
                            onDragStart={(e) => setDragTargetIndex(index)}
                            onDrag={(e) => e.preventDefault()}
                            onDragOver={(e) => { handleLayerDragOver(e, index) }}
                            onDrop={(e) => { handleLayerDrop(e, index) }}
                            style={{ cursor: index === 0 ? "default" : "grab" }}
                        >
                            <img
                                src={layersCanvasPreviews[index] ? layersCanvasPreviews[index] : ""}
                                className="drawDocCheckersBackground"
                                onClick={() => changeCurrLayer(index)}
                                draggable={index !== 0}
                            />
                            <div>
                                <div>
                                    <input
                                        type="radio"
                                        value={index}
                                        checked={currLayer === index}
                                        onChange={() => changeCurrLayer(index)}
                                    />
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
                                </div>
                                <div>
                                    <button
                                        title="Undo Layer"
                                        aria-label="Undo Layer"
                                        disabled={!layer.canUndo || layer.locked}
                                        onClick={() => { setCurrLayer(index); setAction("Undo") }}
                                    >
                                        <BiUndo />
                                    </button>
                                    <button
                                        title="Redo Layer"
                                        aria-label="Redo Layer"
                                        disabled={!layer.canRedo || layer.locked}
                                        onClick={() => { setCurrLayer(index); setAction("Redo") }}
                                    >
                                        <BiRedo />
                                    </button>
                                    <button
                                        title="Duplicate Layer"
                                        aria-label="Duplicate Layer"
                                        onClick={() => duplicateLayer(index)}
                                    >
                                        <IoDuplicateSharp />
                                    </button>
                                </div>
                                <div>
                                    <button
                                        title="Rename Layer"
                                        aria-label="Rename Layer"
                                        disabled={index === 0}
                                        onClick={() => setRenameLayerIndex(index)}
                                    >
                                        <RiEditLine />
                                    </button>
                                    <button
                                        title="Toggle Visibility"
                                        aria-label="Toggle Visibility"
                                        onClick={() => toggleVisibility(index)}
                                    >
                                        {layer.visible ? <RiEyeFill /> : <RiEyeCloseFill />}
                                    </button>
                                    <button
                                        title="Delete Layer"
                                        aria-label="Delete Layer"
                                        disabled={index === 0 || layer.locked}
                                        onClick={() => deleteLayer(index)}
                                    >
                                        <FaTrashCan />
                                    </button>
                                </div>
                                <div>
                                    <button 
                                        title={layer.locked ? "Unlock Layer" : "Lock Layer"}
                                        aria-label={layer.locked ? "Unlock Layer" : "Lock Layer"}
                                        onClick={() => toggleLock(index)}
                                        className={layer.locked ? "buttonActive" : ""}
                                    >
                                        {layer.locked ? <TiLockClosed /> : <TiLockOpen />}
                                    </button>
                                </div>
                            </div>
                        </div>
                        {index === 0 && <hr style={{ display: dropTargetIndex === index ? "block" : "none" }} />}
                    </Fragment>)
            })
            }
            {dropTargetIndex === layers.length && <hr />}
            <button onClick={() => { createNewLayer() }}>
                New Layer
            </button>
        </div>);
};