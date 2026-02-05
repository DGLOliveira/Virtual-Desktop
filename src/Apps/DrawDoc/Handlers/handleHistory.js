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
        setLayers([{ id: 0, name: "Base", visible: true, canUndo: false, canRedo: false }]);
        setHistory(updatedHistory);
        setCanClose(true);       
        handleTopMenu(appMenu, setAppMenu, args={history:{...updatedHistory}}, "history");
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
            //saveAction(currLayer);
            break;
        case "clear":
            clearAction();
            break;
        default:
            break;
    }

}