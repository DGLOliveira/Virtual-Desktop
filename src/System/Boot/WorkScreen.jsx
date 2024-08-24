import { useContext, useState, Suspense, lazy, useCallback } from "react";

import { BackgroundContext } from "../Desktop/BackgroundContext.js";
import { Desktop } from "./../Desktop/Desktop.js";
import { Taskbar } from "./../Taskbar/Taskbar.jsx";
import { ContextMenu } from "./../ContextMenuManager/ContextMenu.jsx";

import Loading from "./../GlobalComponents/Loading.jsx";
import ErrorBoundary from "./../GlobalComponents/ErrorBoundary.jsx";
import ErrorMessage from "./../GlobalComponents/ErrorMessage.jsx";

export default function WorkScreen() {
    const background = useContext(BackgroundContext);
    const Scenario = useCallback((
      lazy(() => import(`../Desktop/Scenario.jsx`).catch(
        (error) => {
          let errorMessage = "Failed to load 3d Scene";
          console.error(error);
          return { default: () => <ErrorMessage errorMessage={errorMessage} /> };
        }
      ))
    ), []);

    return (
        <>
        <ErrorBoundary fallback={<ErrorMessage errorMessage="Failed to load 3d Scene" />}>
          <Suspense fallback={<Loading message={"3D Scene"}/>}>
            {background.state.active === "scenario" && <Scenario />}
          </Suspense>
        </ErrorBoundary>
        <Desktop />
        <Taskbar />
        <ContextMenu />
        </>
    );
}