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
        setHistory(updatedHistory)
        setLayers(updatedLayers)
        setCanClose(canClose);
        handleTopMenu(appMenu, setAppMenu, args = { history: { ...updatedHistory } }, "history");
    }

    const saveAction = () => {
        let id = layers[currLayer].id
        let updatedData = history.data
        let targetCanvas = document.getElementById(`drawCanvasLayer${id}`).getContext("2d")
        updatedData[id] = {
            history: [...updatedData[id].history, targetCanvas.getImageData(0, 0, width, height)],
            steps: [...updatedData[id].steps, history.currStep + 1]
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
            //undoAction(-1);
            break;
        case "redo":
            //redoAction(-1);
            break;
        case "undo layer":
            //undoAction(currLayer);
            break;
        case "redo layer":
            //redoAction(currLayer);
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