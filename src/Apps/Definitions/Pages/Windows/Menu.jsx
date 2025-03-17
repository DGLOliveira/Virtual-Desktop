import { useState, useEffect, useContext, Fragment } from "react";

import { ThemeContext } from "../../../../System/ThemeManager/context.jsx";
import ColorPicker from "../../../../System/GlobalComponents/ColorPicker/ColorPicker.jsx";


export const MenuPreview = () => {
    return (
        <>
            <app-window
                style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "80%",
                    height: "100%",
                    backgroundColor: "var(--WindowBkgrColor)"
                }}
                className="app"
            >
                <nav
                    className="appMenuBar"
                    style={{
                        color: "var(--WindowTopBarFontColor)",
                        backgroundColor: "var(--WindowTopBarBkgrColor)"
                    }}
                >
                    <Fragment>
                        <drop-down>
                            <ul>
                                <li>
                                    <button>
                                        <div>Button</div>
                                        <span />
                                        <kbd>keybind</kbd>
                                    </button>
                                </li>
                                <li>
                                    <button disabled>
                                        <div>Disabled Button</div>
                                        <span />
                                        <kbd>keybind</kbd>
                                    </button>
                                </li>
                                <li>
                                    <hr />
                                </li>
                                <li>
                                    <button>
                                        <div>Checkbox</div>
                                        <span />
                                        <input type="checkbox" />
                                    </button>
                                </li>
                                <li>
                                    <hr />
                                </li>
                                <li>
                                    <button>
                                        <div>Checkbox 1</div>
                                        <span />
                                        <input type="radio" name="radio" />
                                    </button>
                                </li>
                                <li>
                                    <button>
                                        <div>Checkbox 2</div>
                                        <span />
                                        <input type="radio" name="radio" />
                                    </button>
                                </li>
                            </ul>
                        </drop-down>
                        <button>
                            Menu 1
                        </button>
                    </Fragment>
                    <button>
                        Menu 3
                    </button>
                    <button>
                        Menu 4
                    </button>
                </nav>
                <app-container></app-container>
            </app-window>
        </>
    );
};

export const Menu = () => {
    return (
        <></>
    );
};