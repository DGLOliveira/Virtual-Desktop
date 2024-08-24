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
export default function DrawDoc({ isSelected, action, setAction, appMenu, setAppMenu, appDialog, setAppDialog, contextMenu, canClose, setCanClose }) {
  const context = useContext(Context);

  return (
    <Provider>
      <app-container>
        <TopNavBar 
        setAction={setAction} 
        contextMenu={contextMenu} 
        />
        <app-body>
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
        </app-body>
        <BottomNavBar
          action={action}
          setAction={setAction}
          contextMenu={contextMenu}
        />
      </app-container>
    </Provider>
  );
};