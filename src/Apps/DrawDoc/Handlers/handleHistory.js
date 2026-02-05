import { handleTopMenu } from "./handleTopMenu.js";

export const handleHistory = (context, history, setHistory, command, appMenu, setAppMenu, setCanClose) => {
    let updatedHistory = {};
    let args={};
    const height = context.canvas.height;
    const width = context.canvas.width;
    const MAX_HISTORY_LENGTH = 50;
    const hist = history.history;
    const histIndex = history.index;

    /*
    history structure
    {
        history: [
            layer[0].id:{
                history: [imageData1, imageData2, ...], -> indicates the history of the layer
                indices: [0, 2, ...], -> indicates wich steps belong to the layer
            },
            layer[1].id:{
                history: [imageData1, imageData2, ...], -> indicates the history of the layer
                indices: [1, 3, ...], -> indicates wich steps belong to the layer
            },
            ...
        ],
        index: 0,   -> indicates the number of steps the current history has
        canUndo: false, -> indicates if any layer can be undone
        canRedo: false -> indicates if any layer can be redone
    }
    */

    const saveAction = () => {
        if (hist.length < MAX_HISTORY_LENGTH && histIndex === hist.length) {
            updatedHistory = {
                history: [...hist, context.getImageData(0, 0, width, height),],
                index: histIndex + 1,
                canUndo: true,
                canRedo: false
            };
            setHistory(updatedHistory);
            handleTopMenu(appMenu, setAppMenu, args={history:{...updatedHistory}}, "history");
        } else if (hist.length === MAX_HISTORY_LENGTH && histIndex === hist.length) {
            updatedHistory = {
                history: [...hist.slice(1), context.getImageData(0, 0, width, height)],
                index: histIndex,
                canUndo: true,
                canRedo: false
            };
            setHistory(updatedHistory);
            handleTopMenu(appMenu, setAppMenu, args={history:{...updatedHistory}}, "history");
        } else if (histIndex < hist.length) {
                updatedHistory = {
                history: [...hist.slice(0, histIndex + 1), context.getImageData(0, 0, width, height)],
                index: histIndex + 1,
                canUndo: true,
                canRedo: false
            };
            setHistory(updatedHistory);
            handleTopMenu(appMenu, setAppMenu, args={history:{...updatedHistory}}, "history");
        }
        setCanClose(false);
    };
    const undoAction = () => {
        if (hist.length > 0 && histIndex > 0) {
            let undoFlag = true;
            if (histIndex - 1 === 0) {
                undoFlag = false;
            }
            context.putImageData(hist[histIndex - 1], 0, 0);
            updatedHistory = {
                ...history,
                index: histIndex - 1,
                canUndo: undoFlag,
                canRedo: true
            };
            setCanClose(undoFlag);
            setHistory(updatedHistory);
            handleTopMenu(appMenu, setAppMenu, args={history:{...updatedHistory}}, "history");
        }
    };
    const redoAction = () => {
        let redoFlag = true;
        if (histIndex + 1 === hist.length - 1) {
            redoFlag = false;
        }
        if (histIndex < hist.length - 1) {
            context.putImageData(hist[histIndex + 1], 0, 0);
            updatedHistory = {
                ...history,
                index: histIndex + 1,
                canUndo: true,
                canRedo: redoFlag
            };
            setHistory(updatedHistory);
            setCanClose(false);
            handleTopMenu(appMenu, setAppMenu, args={history:{...updatedHistory}}, "history");
        }
    };
    const clearAction = () => {
        updatedHistory = {
            history: [context.getImageData(0, 0, width, height)],
            index: 0,
            canUndo: false,
            canRedo: false
        };
        setHistory(updatedHistory);
        setCanClose(true);
        handleTopMenu(appMenu, setAppMenu, args={history:{...updatedHistory}}, "history");
    }

    switch (command) {
        case "undo":
            undoAction();
            break;
        case "redo":
            redoAction();
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