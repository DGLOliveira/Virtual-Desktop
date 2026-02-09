import { handleTopMenu } from "./handleTopMenu.js";

export const handleHistory = (context, history, setHistory, command, appMenu, setAppMenu, setCanClose, currLayer, layers, setLayers) => {
    let updatedHistory = {};
    let args = {};
    const height = context.canvas.height;
    const width = context.canvas.width;
    const MAX_HISTORY_LENGTH = 50;

    /*
    history structure
    {
            layer[0].id:{
                data: [imageData1, imageData2, ...], -> indicates the history of the layer
                lastIndex: 0 -> indicates the last step of the layer
            },
            layer[1].id:{
                data: [imageData1, imageData2, ...], -> indicates the history of the layer
                lastIndex: 0 -> indicates the last step of the layer
            },
            ...
    }
    */

    const updateStates = (updatedHistory, updatedLayers, canClose) => {
        setHistory(updatedHistory)
        setLayers(updatedLayers)
        setCanClose(canClose);
        handleTopMenu(appMenu, setAppMenu, args = { history: { ...updatedLayers[currLayer] } }, "history");
    }


    const undoAction = () => {
        const id = layers[currLayer].id
        updatedHistory = history
        const targetCanvas = document.getElementById(`drawCanvasLayer${id}`).getContext("2d")
        targetCanvas.putImageData(history[id].data[history[id].lastIndex - 1], 0, 0)
        const canUndoLayer = history[id].lastIndex - 1 > 0
        updatedHistory[id].lastIndex--
        let updatedLayers = layers
        updatedLayers[currLayer] = {
            ...updatedLayers[currLayer],
            canUndo: canUndoLayer,
            canRedo: true
        }
        updateStates(updatedHistory, updatedLayers, false)
    }

    const redoAction = () => {
        let id = layers[currLayer].id
        updatedHistory = history
        const targetCanvas = document.getElementById(`drawCanvasLayer${id}`).getContext("2d")
        targetCanvas.putImageData(history[id].data[history[id].lastIndex + 1], 0, 0)
        const canRedoLayer = history[id].lastIndex + 1 < history[id].data.length - 1
        updatedHistory[id].lastIndex++
        let updatedLayers = layers
        updatedLayers[currLayer] = {
            ...updatedLayers[currLayer],
            canUndo: true,
            canRedo: canRedoLayer
        }
        updateStates(updatedHistory, updatedLayers, false)
    }

    const saveAction = () => {
        let id = layers[currLayer].id
        updatedHistory = history
        let targetCanvas = document.getElementById(`drawCanvasLayer${id}`).getContext("2d")
        //Checks if the layer does not have a history
        if (!updatedHistory[id]) {
            updatedHistory[id] = {
                data: [targetCanvas.getImageData(0, 0, width, height)],
                lastIndex: 0
            }
        } else {
            //Checks if the save action is at the end of the history
            if (updatedHistory[id].lastIndex === updatedHistory[id].data.length - 1) {
                updatedHistory[id] = {
                    data: [...updatedHistory[id].data, targetCanvas.getImageData(0, 0, width, height)],
                    lastIndex: updatedHistory[id].data.length
                }
            }
            //if not, remove all history after the current step
            else{
                updatedHistory[id].data.splice(updatedHistory[id].lastIndex + 1, 0, targetCanvas.getImageData(0, 0, width, height))
                updatedHistory[id].lastIndex++
            }
        }
        let updatedLayers = layers
        updatedLayers[currLayer] = {
            ...updatedLayers[currLayer],
            canUndo: true,
            canRedo: false
        }
        //if the history is too long, remove the oldest step and associated data
        if (updatedHistory[id].data.length > MAX_HISTORY_LENGTH) {
            updatedHistory[id].data.shift()
            updatedHistory[id].lastIndex--
        }
        updateStates(updatedHistory, updatedLayers, false)
    }

    const clearAction = () => {
        updatedHistory = {
            0: {
                data: [context.getImageData(0, 0, width, height)],
                lastIndex: 0
            }
        }
        const updatedLayers = [{ id: 0, name: "Base", visible: true, canUndo: false, canRedo: false }]
        updateStates(updatedHistory, updatedLayers, true)
    }

    const duplicateLayer = () => {
        let id = layers[currLayer].id
        const target = document.getElementById(`drawCanvasLayer${id}`).getContext("2d")
        const image = history[id].data[history[id].lastIndex]
        target.putImageData(image, 0, 0)
    }

    switch (command) {
        case "undo":
            undoAction();
            break;
        case "redo":
            redoAction();
            break;
        case "delete layer":
            //deleteLayer(currLayer);
            break;
        case "duplicate layer":
            duplicateLayer();
            break;
        case "save":
            saveAction();
            break;
        case "clear":
            clearAction();
            break;
        default:
            break;
    }

}