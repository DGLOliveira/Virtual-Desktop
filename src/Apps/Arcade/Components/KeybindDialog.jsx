import { useState, useEffect } from "react";
export const KeybindDialog = ({ showKeybindDialog, setShowKeybindDialog, setAppDialog, keyboard, setKeyboard }) => {
    const [newKeybinds, setNewKeybinds] = useState(structuredClone(keyboard));
    const [keybindState, setKeybindState] = useState("");
    const [update, setUpdate] = useState(0);
    const title = "Keybinds";
    
    const addNewKeybind = (key) => {
        setKeybindState("Press new key...");
        const keyPromise = new Promise((resolve, reject) => {
            document.addEventListener("keydown", (e) => resolve(e.key));
            setTimeout(() => {
                document.removeEventListener("keydown", (e) => resolve(e.key));
                reject("timeout");
            }, 10000);
        });
        keyPromise.then((value) => {
            newKeybinds[key].keys[newKeybinds[key].keys.length] = value;
            setNewKeybinds(newKeybinds);
            setKeybindState("");
        }).catch((error) => {
            setKeybindState(error);
        });
    };
    const changeKeybind = (key, index) => {
        setKeybindState("Press new key...");
        const keyPromise = new Promise((resolve, reject) => {
            document.addEventListener("keydown", (e) => resolve(e.key));
            setTimeout(() => {
                document.removeEventListener("keydown", (e) => resolve(e.key));
                reject("timeout");
            }, 10000);
        });
        keyPromise.then((value) => {
            newKeybinds[key].keys[index] = value;
            setNewKeybinds(newKeybinds);
            setKeybindState("");
        }).catch((error) => {
            setKeybindState(error);
        });
    };
    const removeKeybind = (key, index) => {
        newKeybinds[key].keys.splice(index, 1);
        setNewKeybinds(newKeybinds);
        setUpdate(update + 1);
    };
    const info =
        <div>
            {Object.keys(newKeybinds).map((key) => (
                <div key={key} style={{ display: "flex", flexDirection: "row", width: "100%", marginLeft: "5px" }}>
                    <div style={{ width: "55px", height:"30px", display: "flex", justifyContent: "start", alignItems: "center", textAlign: "center" }}><b>{key}:</b></div>
                    {newKeybinds[key].keys.map((keybind, index) =>
                        <button
                            key={key}
                            style={{ width: "75px", height:"30px", border: "1px solid dimgray"}}
                            onContextMenu={(e) => removeKeybind(key, index)}
                            onClick={() => changeKeybind(key, index)}
                        >{keybind}</button>
                    )}
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        {newKeybinds[key].keys.length < 3 &&
                            <button onClick={() => addNewKeybind(key)}>+</button>}
                    </div>
                </div>
            ))}
            {keybindState}
        </div>;

    const actions = {
        Confirm: () => {
            setKeyboard(newKeybinds);
            setShowKeybindDialog(false);
            setAppDialog(null);
        },
        Reset: () => {
            setNewKeybinds(keyboard);
            setUpdate(update + 1);
        },
        Cancel: () => {
            setNewKeybinds(keyboard);
            setShowKeybindDialog(false);
            setAppDialog(null);
        }
    };
    useEffect(() => {
        if (showKeybindDialog) {
            setAppDialog({ title: title, info: info, actions: actions });
        }
    }, [showKeybindDialog, newKeybinds, keybindState, update]);
    return <></>;
}