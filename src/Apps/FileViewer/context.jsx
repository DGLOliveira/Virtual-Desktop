import { useState, useEffect, createContext, useContext } from "react";
import { FileContext } from "./../../System/FileManager/context.jsx";
import { AppContext } from "./../../System/AppManager/Context/context.jsx";
import { handleHistory } from "./Handlers/handleHistory.js";

export const Context = createContext({
    file: {},
    path: [],
    find: "",
    setFind: () => { },
    findResult: {},
    open: () => { },
    refresh: () => { },
    home: () => { },
    up: () => { },
    canUp: {},
    back: () => { },
    canBack: {},
    forward: () => { },
    canForward: {}
});

export function Provider({ children }) {
    const fileContext = useContext(FileContext);
    const appContext = useContext(AppContext);
    const [file, setFile] = useState(fileContext.root.children);
    const [path, setPath] = useState([]);
    const [find, setFind] = useState("");
    const [findResult, setFindResult] = useState({});
    const [clipboard, setClipboard] = useState({});
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(0);
    const [canUp, setCanUp] = useState(false);
    const [canBack, setCanBack] = useState(false);
    const [canForward, setCanForward] = useState(false);

    const open = (name) => {
        if (file[name].type === "Folder") {
            setFile(file[name].children);
            setPath([...path, name]);
            handleHistory(
                "add",
                [...path, name],
                history,
                setHistory,
                historyIndex,
                setHistoryIndex,
                setCanBack,
                setCanForward
            );
            if (!canUp) {
                setCanUp(true);
            }
        } else {
            appContext.setOpen(name);
        }
    }

    const up = () => {
        if (path.length > 1) {
            setPath(path.slice(0, path.length - 1));
            handleHistory(
                "add",
                path.slice(0, path.length - 1),
                history,
                setHistory,
                historyIndex,
                setHistoryIndex,
                setCanBack,
                setCanForward
            );
            let newFile = fileContext.root.children;
            for (let i = 0; i < path.length - 1; i++) {
                newFile = newFile[path[i]].children;
            }
            setFile(newFile);
        } else {
            setFile(fileContext.root.children);
            setPath([]);
            handleHistory(
                "add",
                [],
                history,
                setHistory,
                historyIndex,
                setHistoryIndex,
                setCanBack,
                setCanForward
            );
            setCanUp(false);
        }
    }

    const refresh = () => {
        setFile(file);
    }

    const home = () => {
        if (path.length > 0) {
            setFile(fileContext.root.children);
            setPath([]);
            handleHistory(
                "add",
                [],
                history,
                setHistory,
                historyIndex,
                setHistoryIndex,
                setCanBack,
                setCanForward
            );
            setCanUp(false);
        }
    }

    const back = () => {
        if (historyIndex > 0) {
            setPath(history[historyIndex - 1]);
            let newFile = fileContext.root.children;
            for (let i = 0; i < history[historyIndex - 1].length ; i++) {
                newFile = newFile[history[historyIndex - 1][i]].children;
            }
            setFile(newFile);
            handleHistory(
                "back",
                [],
                history,
                setHistory,
                historyIndex,
                setHistoryIndex,
                setCanBack,
                setCanForward
            );
        }
    }

    const forward = () => {
        if (historyIndex < history.length - 1) {
            setPath(history[historyIndex + 1]);
            let newFile = fileContext.root.children;
            for (let i = 0; i < history[historyIndex + 1].length ; i++) {
                newFile = newFile[history[historyIndex + 1][i]].children;
            }
            setFile(newFile);
            handleHistory(
                "forward",
                [],
                history,
                setHistory,
                historyIndex,
                setHistoryIndex,
                setCanBack,
                setCanForward
            );
        }
    }

    const contextValue = {
        file,
        path,
        find,
        setFind,
        findResult,
        open,
        refresh,
        home,
        up,
        canUp,
        back,
        canBack,
        forward,
        canForward
    };

    return (
        <Context.Provider value={contextValue}>
            {children}
        </Context.Provider>
    );
}
export default Provider;