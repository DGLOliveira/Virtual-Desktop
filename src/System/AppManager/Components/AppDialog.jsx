import { createPortal } from "react-dom";
import{useState, useEffect, useContext} from "react";
import { ThemeContext } from "../../ThemeManager/context";
import "../Styles/Dialog.css";

export const AppDialog = ({ action, setAction, appDialog }) => {
    const theme = useContext(ThemeContext);
    const [buttonClassNeutral, setButtonClassNeutral] = useState("appDialogButtonFluent");
    const [buttonClassSuggested, setButtonClassSuggested] = useState("appDialogButtonFluent");
    const [buttonClassClose, setButtonClassClose] = useState("appDialogButtonFluent buttonActiveRed");
    useEffect(() => {
        switch(theme.theme) {
            case "Aqua":
                setButtonClassNeutral("appDialogButtonAqua appDialogButtonAquaNeutral");
                setButtonClassSuggested("appDialogButtonAqua appDialogButtonAquaBlue");
                setButtonClassClose("appDialogButtonAqua appDialogButtonAquaRed");
                break;
            default:
                setButtonClassNeutral("appDialogButtonFluent");
                setButtonClassSuggested("appDialogButtonFluent");
                setButtonClassClose("appDialogButtonFluent buttonActiveRed");
                break;
        }
    },[theme.theme]);

    const setButtonClass = (name) => {
        switch(name){
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
                    <app-dialog-info>
                        {appDialog.info}
                    </app-dialog-info>
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
                    </app-dialog-actions>
                </app-dialog>
                , document.body)}
        </>
    );

}