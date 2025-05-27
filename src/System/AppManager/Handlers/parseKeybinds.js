export default function parseKeybinds( appMenu ) {
    let keybinds = {};
    let keystrings = {};
    Object.keys(appMenu).map((name) => {
        Object.keys(appMenu[name]).map((subname) => {
            if (appMenu[name][subname].keybind 
                && !("keybindDisabled" in appMenu[name][subname])) {
                keystrings[subname] = appMenu[name][subname].keybind
            }
        })
    })
    Object.keys(keystrings).forEach((action) => {
        let ctrlKey = false;
        let shiftKey = false;
        let altKey = false;
        let key = "";
        let keyArr = keystrings[action].split("+");
        keyArr.forEach((word) => {
            if (word.includes("Ctrl")) {
                ctrlKey = true;
            }
            if (word.includes("Shift")) {
                shiftKey = true;
            }
            if (word.includes("Alt")) {
                altKey = true;
            }
        })
        if (key === "") {
            if(keyArr[keyArr.length - 1][0] === "F"){
                key = keyArr[keyArr.length - 1];
            }else if(keyArr[keyArr.length - 1]===""){
                key="+";
            }else if(keyArr[keyArr.length - 1]==="Esc"){
                key = "Escape";
            }else{
                key = keyArr[keyArr.length - 1].toLowerCase();
            }
        }
        keybinds[action] = {
            ctrlKey: ctrlKey,
            shiftKey: shiftKey,
            altKey: altKey,
            key: key,
            arr: keyArr
        }
    })
    return keybinds;
}