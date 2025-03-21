import { useState, useEffect, useContext, useCallback, Suspense, lazy } from "react";
import { ContextMenuContext } from "../../ContextMenuManager/context.jsx";
import { ThemeContext } from "../../ThemeManager/context.jsx";
import { AppMenuBar } from "./AppMenuBar.jsx";
import { AppDialog } from "./AppDialog.jsx";
import { AppTopBar } from "./AppTopBar.jsx";
import Loading from "./../../GlobalComponents/Loading.jsx";
import ErrorBoundary from "./../../GlobalComponents/ErrorBoundary.jsx";
import ErrorMessage from "./../../GlobalComponents/ErrorMessage.jsx";
import "../Styles/App.css";

export const AppBody = ({ appName, isSelected, setClose }) => {
  const contextMenu = useContext(ContextMenuContext);
  const theme = useContext(ThemeContext);
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

  const appProps = {
    isSelected,
    action,
    setAction,
    appMenu,
    setAppMenu,
    appDialog,
    setAppDialog,
    contextMenu,
    canClose,
    setCanClose
  };

  return (
    <>
      <AppTopBar
        appName={appName}
        setAction={setAction}
      />
      <ErrorBoundary fallback={<ErrorMessage errorMessage={"Something went wrong while loading the App"} />}>
        <Suspense fallback={<Loading message={"App"} />}>
          {appMenu && theme.navMenuLocation === "in top bar" &&
            <AppMenuBar
              isSelected={isSelected}
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
          <app-container
          style={{
            color: isSelected ? "var(--AppFontColor)" : "var(--AppFontColorInactive)",
            backgroundColor: isSelected ? "var(--AppBkgrColor)" : "var(--AppBkgrColorInactive)",
            borderColor: isSelected ? "var(--AppBorderColor)" : "var(--AppBorderColorInactive)"
          }}>
          {appMenu && theme.navMenuLocation === "in app" &&
            <AppMenuBar
              isSelected={isSelected}
              action={action}
              setAction={setAction}
              appMenu={appMenu}
            />}
            <App {...appProps} />
          </app-container>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
