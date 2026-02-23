import { createPortal } from "react-dom";
import { useContext, useCallback, lazy, Suspense, Fragment } from "react";
import { ThemeContext } from "../../ThemeManager/context";
import "../Styles/Dialog.css";

export const AppDialog = ({ action, setAction, appDialog }) => {
    const theme = useContext(ThemeContext);

    const setButtonType = (name) => {
        switch (name) {
            case "Exit":
            case "Close":
                return "Warning";
            case "Save":
            case "Ok":
                return "Suggested";
            default:
                return "Neutral";
        }
    };

    const ButtonDefault = ({ _type, name, click }) => {
        return (
            <button onClick={click}>
                {name}
            </button>
        )
    };

    const Button = useCallback((
        lazy(() => import(`../../ThemeManager/${theme.DialogButtonPath}`).catch(
            (_error) => {
                console.error("Failed to import thematic dialog buttons");
                return {
                    default: ButtonDefault
                }
            }))
    ), [theme.DialogButtonPath]);

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
                        <div>{appDialog.info}</div>
                        {theme.dialogButtonsLocation === "in info container" &&
                            <app-dialog-actions>
                                {Object.keys(appDialog.actions).map((name, index) =>
                                    <Fragment key={index}>
                                        <Suspense fallback={null}>
                                            <Button
                                                type={setButtonType(name)}
                                                name={name}
                                                click={appDialog.actions[name]}
                                            />
                                        </Suspense>
                                    </Fragment>
                                )}
                            </app-dialog-actions>}
                    </app-dialog-info>
                    {theme.dialogButtonsLocation === "in window" &&
                        <app-dialog-actions>
                            {Object.keys(appDialog.actions).map((name, index) =>
                                <Fragment key={index}>
                                    <Suspense fallback={null}>
                                        <Button
                                            type={setButtonType(name)}
                                            name={name}
                                            click={appDialog.actions[name]}
                                        />
                                    </Suspense>
                                </Fragment>
                            )}
                        </app-dialog-actions>}
                </app-dialog>
                , document.body)}
        </>
    );

}