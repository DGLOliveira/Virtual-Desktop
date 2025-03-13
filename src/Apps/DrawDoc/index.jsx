// Paint.exe style editor in javascript, makes use of two overlapping canvas elements
import { useEffect, useContext } from "react";

import Provider from "./Context.jsx";
import { Context } from "./Context.jsx";
import { DrawCanvas } from "./Components/DrawCanvas.jsx";
import { PreviewCanvas } from "./Components/PreviewCanvas.jsx";
import { TopNavBar } from "./Components/TopNavBar.jsx";
import { ToolBar } from "./Components/ToolBar.jsx";
import { BottomNavBar } from "./Components/BottomNavBar.jsx";

import "./style.css";
export default function DrawDoc(props) {

  const action = props.action;
  const setAction = props.setAction;
  const appMenu = props.appMenu;
  const setAppMenu = props.setAppMenu;
  const appDialog = props.appDialog;
  const setAppDialog = props.setAppDialog;
  const contextMenu = props.contextMenu;
  const canClose = props.canClose;
  const setCanClose = props.setCanClose;

  const context = useContext(Context);

  return (
    <Provider>
      <>
        <TopNavBar
          setAction={setAction}
          contextMenu={contextMenu}
        />
        <div style={{
          display: "flex",
          flexDirection: "row",
          width: "100%", 
          height: "100%",
          margin: "0px"
        }}>
          <ToolBar
            setAction={setAction}
            contextMenu={contextMenu}
          />
          <canvas-container>
            <DrawCanvas
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
            <PreviewCanvas
              setAction={setAction}
              contextMenu={contextMenu}
            />
          </canvas-container>
        </div>
        <BottomNavBar
          action={action}
          setAction={setAction}
          contextMenu={contextMenu}
        />
      </>
    </Provider>
  );
};