import { AiOutlineClose } from "react-icons/ai";
import { createPortal } from "react-dom";
export const AppDialog = ({ action, setAction, appDialog }) => {
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
                            className={name === "Close" ? "buttonActiveRed" : ""}
                            onClick={appDialog.actions[name]}>
                                {name}
                            </button>)}
                    </app-dialog-actions>
                </app-dialog>
                , document.body)}
        </>
    );

}