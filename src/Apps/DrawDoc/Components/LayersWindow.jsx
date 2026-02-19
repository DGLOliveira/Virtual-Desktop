import { useState, useEffect, useContext, Fragment } from "react";
import { Context } from "../Context.jsx";
import { handleTopMenu } from "../Handlers/handleTopMenu.js";
import { RiEyeCloseFill, RiEyeFill, RiEditLine } from "react-icons/ri";
import { FaTrashCan } from "react-icons/fa6";
import { BiUndo, BiRedo } from "react-icons/bi";
import { IoDuplicateSharp } from "react-icons/io5";
import { TiLockOpen, TiLockClosed } from "react-icons/ti";
import { IoClose } from "react-icons/io5";

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

    const BLEND_LIST = ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"];
    const FILTER_LIST = ["blur", "brightness", "contrast", "grayscale", "hue-rotate", "invert", "opacity", "saturate", "sepia"];


    function formatListName(name) {
        //Replaces all "-" with " "
        let formattedName = name.replace(/-/g, " ");
        //Capitalizes the first letter of each word
        formattedName = formattedName.replace(/\b([a-zÁ-ú]{3,})/g, (match) => match.charAt(0).toUpperCase() + match.slice(1));
        return formattedName
    }

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
            blending: "normal",
            filters: {},
            opacity: 1,
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
            blending: layers[index].blending,
            filters: layers[index].filters,
            opacity: layers[index].opacity,
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

    const changeBlending = (index, value) => {
        const newLayers = [...layers];
        newLayers[index].blending = value;
        setLayers(newLayers);
    }

    const changeOpacity = (index, value) => {
        const newLayers = [...layers];
        newLayers[index].opacity = value;
        setLayers(newLayers);
    }

    const addFilter = (index, key) => {
        if(layers[index].filters[key]) return
        const newLayers = [...layers];
        newLayers[index].filters[key] = 0;
        setLayers(newLayers);
    }

    const changeFilter = (index, key, value) => {
        const newLayers = [...layers];
        newLayers[index].filters[key] = value;
        setLayers(newLayers);
    }

    const removeFilter = (index, key) => {
        const newLayers = [...layers];
        delete newLayers[index].filters[key];
        setLayers(newLayers);
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
        layers.length > 0 && setLayersCanvasPreviews(layers.map((layer) => getImageFromCanvasRef(`drawCanvasLayer${layer.id}`, true)));
    }, [history, layers, action]);

    return (
        <>
            <div id="drawDocLayersWindowNav">
                <div id="drawDocLayersWindowHeaderMixes">
                    <select
                        id="drawDocBlendingSelect"
                        title="Change Blending"
                        aria-label="Change Blending"
                        onChange={(e) => changeBlending(currLayer, e.target.value)}
                        value={layers[currLayer].blending}
                        disabled={layers[currLayer].locked || currLayer === 0}
                    >
                        {BLEND_LIST.map((blend, index) => {
                            return <option key={index} value={blend}>{formatListName(blend)}</option>
                        })}
                    </select>
                    <div>
                        <label htmlFor="drawDocOpacityInput">Opacity:</label>
                        <input
                            id="drawDocOpacityInput"
                            type="number"
                            min="0"
                            max="1"
                            step="0.01"
                            value={layers[currLayer].opacity}
                            onChange={(e) => changeOpacity(currLayer, e.target.value)}
                            disabled={layers[currLayer].locked || currLayer === 0}
                        />
                    </div>
                </div>
                <div id="drawDocLayersWindowHeaderOptions">
                    <button
                        title="Duplicate Layer"
                        aria-label="Duplicate Layer"
                        onClick={() => duplicateLayer(currLayer)}
                    >
                        <IoDuplicateSharp />
                    </button>
                    <button
                        title="Rename Layer"
                        aria-label="Rename Layer"
                        disabled={currLayer === 0}
                        onClick={() => setRenameLayerIndex(currLayer)}
                    >
                        <RiEditLine />
                    </button>
                    <button
                        title={layers[currLayer].locked ? "Unlock Layer" : "Lock Layer"}
                        aria-label={layers[currLayer].locked ? "Unlock Layer" : "Lock Layer"}
                        onClick={() => toggleLock(currLayer)}
                        className={layers[currLayer].locked ? "buttonActive" : ""}
                    >
                        {layers[currLayer].locked ? <TiLockClosed /> : <TiLockOpen />}
                    </button>
                    <button
                        title="Delete Layer"
                        aria-label="Delete Layer"
                        disabled={currLayer === 0 || layers[currLayer].locked}
                        onClick={() => deleteLayer(currLayer)}
                    >
                        <FaTrashCan />
                    </button>
                </div>
            </div>
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
                            ><div>
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
                                                title="Toggle Visibility"
                                                aria-label="Toggle Visibility"
                                                onClick={() => toggleVisibility(index)}
                                            >
                                                {layer.visible ? <RiEyeFill /> : <RiEyeCloseFill />}
                                            </button>
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
                                        </div>
                                    </div>
                                    <div>
                                        Add Filter:
                                        <select
                                            title="Add filter"
                                            aria-label="Add filter"
                                            value=""
                                            onChange={(e) => addFilter(index, e.target.value)}
                                            disabled={layer.locked || index === 0}
                                        >
                                            <option value="">Select</option>
                                            {FILTER_LIST.map((filter, index) => {
                                                return <option key={index} value={filter}>{formatListName(filter)}</option>
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div
                                    className="drawDocLayersFilterList"
                                >
                                    {layer.filters && Object.keys(layer.filters).map((key) => {
                                        return <div key={key}>
                                            {formatListName(key)}:
                                            <input
                                                type="number"
                                                min="0"
                                                max="1"
                                                step="0.01"
                                                value={layer.filters[key]}
                                                onChange={(e) => changeFilter(index, key, e.target.value)}
                                            />
                                            <button
                                                title="Delete Filter"
                                                aria-label="Delete Filter"
                                                onClick={() => removeFilter(index, key)}
                                            >
                                                <IoClose />
                                            </button>
                                        </div>
                                    })}
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
            </div>
        </>);
};