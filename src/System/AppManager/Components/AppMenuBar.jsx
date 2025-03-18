/*
This component is meant to be used on any app that has a menu bar. 
It receives the action to be triggered when the user clicks on the menu bar. 
It also receives the content of the menu bar as a json object in order to be displayed.
*/

import { useState, useEffect, useCallback, Fragment } from "react";
import parseKeybinds from "./../Handlers/parseKeybinds.js";
import "../Styles/MenuBar.css";

export const AppMenuBar = ({ isSelected, setAction, appMenu }) => {
    const [menuState, setMenuState] = useState(false);
    /*useEffect(() => {
        (import(`./../../../Apps/${appName}/appData.json`)).then(appData => {setAppMenu(appData.default.menu)}).catch(
            (error) => {
                console.error(error);
                return { default: () => <></> }
            }
        )
    }, [appName]);*/
    const handleBlur = (event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
            setMenuState(false);
        }
    }
    const handleMouseEnter = (name) => {
        if (menuState) {
            setMenuState(name);
        }
    }
    const Keybinds = useCallback(() => { if (appMenu) return parseKeybinds(appMenu) }, [appMenu]);
    const handleKeydown = (event) => {
        if (appMenu) {
            let keybinds = Keybinds();
            Object.keys(keybinds).forEach((action) => {
                if (event.ctrlKey === keybinds[action].ctrlKey
                    && event.shiftKey === keybinds[action].shiftKey
                    && event.altKey === keybinds[action].altKey
                    && event.key === keybinds[action].key) {
                    setAction(action);
                }
            })
        }
    }
    useEffect(() => {
        if (appMenu) {
            addEventListener("keydown", handleKeydown);
            return () => removeEventListener("keydown", handleKeydown);
        }
    }, [handleKeydown, appMenu]);
    return (
        <nav 
        className="appMenuBar" 
        style={{
            backgroundColor: isSelected ? "var(--WindowMenuNavBkgr)": "var(--WindowMenuNavBkgrInactive)"}}
        onBlur={(e) => handleBlur(e)}
        >
            {Object.keys(appMenu).map((name, index) => (
                <Fragment key={name + "appMenuBar"}>
                    <drop-down>
                        {appMenu[name] !== undefined && menuState === name ?
                            <ul>{
                                Object.keys(appMenu[name]).map((subname, index) => (
                                    <li key={index + "appMenuBar"}>
                                        {subname.slice(0, 9) !== "LineBreak" ? <>
                                            <button
                                                onClick={() => setAction(appMenu[name][subname].action)}
                                                disabled={appMenu[name][subname].disabled}
                                                {...appMenu[name][subname].title ? { title: appMenu[name][subname].title } : null}
                                            >
                                                <div>{subname}</div>
                                                <span />
                                                {appMenu[name][subname].checkbox !== undefined ?
                                                    <input type="checkbox" checked={appMenu[name][subname].checkbox} readOnly /> : null}
                                                {appMenu[name][subname].keybind !== undefined ?
                                                    <kbd>{appMenu[name][subname].keybind}</kbd> : null}
                                                {appMenu[name][subname].radio !== undefined ?
                                                    <input type="radio" name={appMenu[name][subname].name} checked={appMenu[name][subname].radio} readOnly /> : null}
                                            </button></>
                                            : <hr />}
                                    </li>
                                ))
                            }
                            </ul> : null}
                    </drop-down>
                    <button
                        onClick={() => setMenuState(name)}
                        onMouseEnter={() => handleMouseEnter(name)}
                    >
                        {name}
                    </button>
                </Fragment>
            ))}
        </nav>
    )
}