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
        data: {
            layer[0].id:{
                history: [imageData1, imageData2, ...], -> indicates the history of the layer
                steps: [0, 2, ...], -> indicates wich steps belong to the layer
            },
            layer[1].id:{
                history: [imageData1, imageData2, ...], -> indicates the history of the layer
                steps: [1, 3, ...], -> indicates wich steps belong to the layer
            },
            ...
        },
        currStep: 0,   -> indicates the number of steps the current history has
        canUndo: false, -> indicates if any layer can be undone
        canRedo: false -> indicates if any layer can be redone
    }
    */

    function getHistoryLength() {
        let historyLength = 0;
        Object.keys(history.data).forEach((id) => {
            historyLength += history.data[id].history.length
        })
        return historyLength;
    }

    function getLayerFromStep(step) {
        let layerId = null;
        Object.keys(history.data).forEach((id) => {
            if (history.data[id].steps.includes(step)) {
                layerId = id;
            }
        })
        return layerId;
    }

    function getLayerIdWithLowestStep() {
        let lowestStep = history.currStep
        let lowestStepId = 0
        Object.keys(history.data).forEach((id) => {
            if (history.data[id].steps[0] < lowestStep)
                lowestStep = history.data.steps[0]
            lowestStepId = id
        })
        return lowestStepId
    }

    function getLayerIndexFromId(id) {
        let result = 0
        layers.forEach((layer, index) => {
            if (layer.id === id) result = index
        })
        return result
    }

    const updateStates = (updatedHistory, updatedLayers, canClose) => {
        console.log(updatedHistory)
        setHistory(updatedHistory)
        setLayers(updatedLayers)
        setCanClose(canClose);
        handleTopMenu(appMenu, setAppMenu, args = { history: { ...updatedHistory } }, "history");
    }


    const undoAction = (layerIndex) => {
        let targetIndex, targetId, targetHistoryIndex
        //Check if undo action comes from a specific layer or not
        if (layerIndex === -1) {
            targetId = getLayerFromStep(history.currStep - 1)
            targetIndex = getLayerIndexFromId(targetId)
            targetHistoryIndex = history.data[targetId].steps.indexOf(history.currStep - 1)
        } else {
            targetId = layers[layerIndex].id
            targetIndex = layerIndex
            if(history.data[targetId].steps.indexOf(history.currStep - 1) !== -1){
                targetHistoryIndex = history.data[targetId].steps.indexOf(history.currStep - 1)
            }else{
                targetHistoryIndex = -1
                history.data[targetId].steps.some((step)=>{
                    ++targetHistoryIndex
                    return step > history.currStep - 1
                })
            }
        }

        const targetCanvas = document.getElementById(`drawCanvasLayer${targetId}`).getContext("2d")
        targetCanvas.putImageData(history.data[targetId].history[targetHistoryIndex], 0, 0)

        const canUndoLayer = targetHistoryIndex > 0
        let canUndoAny = getLayerFromStep(history.currStep - 2) !== null
        updatedHistory = {
            data: history.data,
            currStep: history.currStep - 1,
            canUndo: canUndoAny,
            canRedo: true
        }
        let updatedLayers = layers
        updatedLayers[targetIndex] = {
            ...updatedLayers[targetIndex],
            canUndo: canUndoLayer,
            canRedo: true
        }
        updateStates(updatedHistory, layers, false)
    }

    const redoAction = (layerIndex) => {
        let targetIndex, targetId, targetHistoryIndex
        //Check if undo action comes from a specific layer or not
        if (layerIndex === -1) {
            targetId = getLayerFromStep(history.currStep + 1)
            targetIndex = getLayerIndexFromId(targetId)
            targetHistoryIndex = history.data[targetId].steps.indexOf(history.currStep + 1)
        } else {
            targetId = layers[layerIndex].id
            targetIndex = layerIndex
            if(history.data[targetId].steps.indexOf(history.currStep + 1) !== -1){
                targetHistoryIndex = history.data[targetId].steps.indexOf(history.currStep + 1)
            }
            else{
                targetHistoryIndex = -1
                history.data[targetId].steps.some((step)=>{
                    ++targetHistoryIndex
                    return step > history.currStep + 1
                })
            }
        }
        const targetCanvas = document.getElementById(`drawCanvasLayer${targetId}`).getContext("2d")
        targetCanvas.putImageData(history.data[targetId].history[targetHistoryIndex], 0, 0)
        const canRedoLayer = targetHistoryIndex < history.data[targetId].history.length - 1
        let canRedoAny = getLayerFromStep(history.currStep + 2) !== null
        updatedHistory = {
            data: history.data,
            currStep: history.currStep + 1,
            canUndo: true,
            canRedo: canRedoAny
        }
        let updatedLayers = layers
        updatedLayers[targetIndex] = {
            ...updatedLayers[targetIndex],
            canUndo: true,
            canRedo: canRedoLayer
        }
        updateStates(updatedHistory, layers, false)
    }

    const saveAction = () => {
        let id = layers[currLayer].id
        let updatedData = history.data
        let targetCanvas = document.getElementById(`drawCanvasLayer${id}`).getContext("2d")
        if (!updatedData[id]) {
            updatedData[id] = {
                history: [targetCanvas.getImageData(0, 0, width, height)],
                steps: [history.currStep + 1]
            }
        } else {
            updatedData[id] = {
                history: [...updatedData[id].history, targetCanvas.getImageData(0, 0, width, height)],
                steps: [...updatedData[id].steps, history.currStep + 1]
            }
        }
        let updatedLayers = layers
        updatedLayers[currLayer] = {
            ...updatedLayers[currLayer],
            canUndo: true,
            canRedo: false
        }
        updatedHistory = {
            data: updatedData,
            currStep: history.currStep + 1,
            canUndo: true,
            canRedo: false
        }
        const historyLength = getHistoryLength()
        //if the history is too long, remove the oldest step and associated data
        if (historyLength > MAX_HISTORY_LENGTH) {
            const lowestStepId = getLayerIdWithLowestStep()
            updatedHistory.data[lowestStepId].history.shift()
            updatedHistory.data[lowestStepId].steps.shift()
            if (updatedHistory.data[lowestStepId].steps.length === 0) {
                targetIndex = getLayerIndexFromId(lowestStepId)
                updatedLayers[lowestStepId] = {
                    ...updatedLayers[lowestStepId],
                    canUndo: false,
                    canRedo: false
                }
            }
        }
        updateStates(updatedHistory, updatedLayers, false)
    }

    const clearAction = () => {
        updatedHistory = {
            data: {
                0: {
                    history: [context.getImageData(0, 0, width, height)],
                    steps: [0]
                }
            },
            currStep: 0,
            canUndo: false,
            canRedo: false
        }
        const updatedLayers = [{ id: 0, name: "Base", visible: true, canUndo: false, canRedo: false }]
        updateStates(updatedHistory, updatedLayers, true)
    }

    switch (command) {
        case "undo":
            undoAction(-1);
            break;
        case "undo layer":
            undoAction(currLayer);
            break;
        case "redo":
            redoAction(-1);
            break;
        case "redo layer":
            redoAction(currLayer);
            break;
        case "delete layer":
            //deleteLayer(currLayer);
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