import { createPortal } from "react-dom";
import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../ThemeManager/context";
import "../Styles/Dialog.css";

export const AppDialog = ({ action, setAction, appDialog }) => {
    const theme = useContext(ThemeContext);
    const [buttonClassNeutral, setButtonClassNeutral] = useState("appDialogButtonFluent");
    const [buttonClassSuggested, setButtonClassSuggested] = useState("appDialogButtonFluent");
    const [buttonClassClose, setButtonClassClose] = useState("appDialogButtonFluent buttonActiveRed");
    useEffect(() => {
        switch (theme.dialogButtonTheme) {
            case "Aero":
                setButtonClassNeutral("appDialogButtonAero");
                setButtonClassSuggested("appDialogButtonAero");
                setButtonClassClose("appDialogButtonAero");
                break;
            case "Aqua":
                setButtonClassNeutral("appDialogButtonAqua appDialogButtonAquaNeutral");
                setButtonClassSuggested("appDialogButtonAqua appDialogButtonAquaBlue");
                setButtonClassClose("appDialogButtonAqua appDialogButtonAquaRed");
                break;
            case "Classic":
                setButtonClassNeutral("appDialogButtonClassic");
                setButtonClassSuggested("appDialogButtonClassic");
                setButtonClassClose("appDialogButtonClassic");
                break;
            case "Fluent":
                setButtonClassNeutral("appDialogButtonFluent");
                setButtonClassSuggested("appDialogButtonFluent");
                setButtonClassClose("appDialogButtonFluent buttonActiveRed");
                break;
        }
    }, [theme.dialogButtonTheme]);

    const setButtonClass = (name) => {
        switch (name) {
            case "Close":
                return buttonClassClose;
            case "Save":
            case "Ok":
                return buttonClassSuggested;
            default:
                return buttonClassNeutral;
        }
    }

    return (
        <>
            {createPortal(
                <app-dialog>
                    <app-dialog-top-bar>
                        {appDialog.title}
                    </app-dialog-top-bar>
                    <app-dialog-info
                        style={{
                            paddingBottom: theme.dialogButtonsLocation === "in window" ? "5px" : "0px",
                            marginBottom: theme.dialogButtonsLocation === "in window" ? "0px" : "var(--DialogPadding)"
                        }}>
                        <p>{appDialog.info}</p>
                        {theme.dialogButtonsLocation === "in info container" &&
                            <app-dialog-actions>
                                {Object.keys(appDialog.actions).map((name, index) =>
                                    <button
                                        key={index}
                                        className={setButtonClass(name)}
                                        onClick={appDialog.actions[name]}
                                    >
                                        {name}
                                    </button>
                                )}
                            </app-dialog-actions>}
                    </app-dialog-info>
                    {theme.dialogButtonsLocation === "in window" &&
                        <app-dialog-actions>
                            {Object.keys(appDialog.actions).map((name, index) =>
                                <button
                                    key={index}
                                    className={setButtonClass(name)}
                                    onClick={appDialog.actions[name]}
                                >
                                    {name}
                                </button>
                            )}
                        </app-dialog-actions>}
                </app-dialog>
                , document.body)}
        </>
    );

}