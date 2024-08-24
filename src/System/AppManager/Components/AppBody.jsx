import { useState, useEffect, useContext, useCallback, Suspense, lazy } from "react";
import { ContextMenuContext } from "../../ContextMenuManager/context.jsx";
import { AppMenuBar } from "./AppMenuBar.jsx";
import { AppDialog } from "./AppDialog.jsx";
import { AppTopBar } from "./AppTopBar.jsx";
import Loading from "./../../GlobalComponents/Loading.jsx";
import ErrorBoundary from "./../../GlobalComponents/ErrorBoundary.jsx";
import ErrorMessage from "./../../GlobalComponents/ErrorMessage.jsx";

export const AppBody = ({ appName, isSelected, setClose }) => {
  const contextMenu = useContext(ContextMenuContext);
  const [appMenu, setAppMenu] = useState(null);
  const [appDialog, setAppDialog] = useState(null);
  const [canClose, setCanClose] = useState(true);
  const [action, setAction] = useState("Startup");
  useEffect(() => {
    if (action === "Close" && canClose) {
      setClose(appName);
    }
  }, [action, canClose]); 

  const App = useCallback((
    lazy(() => import(`./../../../Apps/${appName}/index.jsx`).catch(
      (error) => {
        let errorMessage = "Failed to load App";
        console.error(error);
        return { default: () => <ErrorMessage errorMessage={errorMessage} /> }
      }
    ))
  ), [appName]);

  return (
    <>
      <AppTopBar
        appName={appName}
        setAction={setAction}
      />
      <ErrorBoundary fallback={<ErrorMessage errorMessage={"Something went wrong while loading the App"} />}>
        <Suspense fallback={<Loading message={"App"}/>}>
          {appMenu &&
            <AppMenuBar
              action={action}
              setAction={setAction}
              appMenu={appMenu}
            />}
          {appDialog &&
            <AppDialog
              action={action}
              setAction={setAction}
              appDialog={appDialog}
            />
          }
          <App
            isSelected={isSelected}
            action={action}
            setAction={setAction}
            appMenu={appMenu}
            setAppMenu={setAppMenu}
            appDialog={appDialog}
            setAppDialog={setAppDialog}
            contextMenu={contextMenu}
            canClose={canClose}
            setCanClose={setCanClose}
          />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}