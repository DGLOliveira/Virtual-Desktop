import { handleTools } from "./handleTools.js";
import { handleHistory } from "./handleHistory.js";
import { handleFile } from "./handleFile.js";
import { handleTopMenu } from "./handleTopMenu.js";

import { dialogNew } from "../Dialog/new.jsx";
import { dialogChangeName } from "../Dialog/changeName.jsx";
export const handleAction = (canvas, ctx, params, action, setAction, context, appMenu, setAppMenu, appDialog, setAppDialog, contextMenu, canCLose, setCanClose, title, setTitle) => {
  let args = {};
  switch (action) {
    case "Startup":
      handleFile(ctx, context.name, "new");
      handleHistory(ctx, context.history, context.setHistory, "clear", appMenu, setAppMenu, setCanClose);
      setAction(false);
      break;
    case "New":
      dialogNew(context, setAction, setAppDialog);
      setAction(false);
      break;
    case "New Confirm":
      setAppDialog(null);
      handleFile(ctx, context.name, "new");
      handleHistory(ctx, context.history, context.setHistory, "clear", appMenu, setAppMenu, setCanClose);
      setAction(false);
      break;
    case "Save":
      handleFile(ctx, context.name, "save");
      setAction(false);
      break;
    case "Save As":
      //TODO
      break;
    case "Change Name":
      dialogChangeName(context, setAction, setAppDialog);
      setAction(false);
      break;
    case "Change Name Confirm":
      setTitle(context.name);
      setAppDialog(null);
      setAction(false);
      break;
    case "Undo":
      handleHistory(ctx, context.history, context.setHistory, "undo", appMenu, setAppMenu, setCanClose);
      setAction(false);
      break;
    case "Redo":
      handleHistory(ctx, context.history, context.setHistory, "redo", appMenu, setAppMenu, setCanClose);
      setAction(false);
      break;
    case "Zoom In":
      if (context.zoom < 4) {
        if (context.zoom < 1) {
          context.setZoom(context.zoom + 0.25);
          args = { zoom: context.zoom + 0.25 };
        } else {
          context.setZoom(context.zoom + 1);
          args = { zoom: context.zoom + 1 };
        }
        handleTopMenu(appMenu, setAppMenu, args, "zoom");
      }
      setAction(false);
      break;
    case "Zoom Out":
      if (context.zoom > 0.25) {
        if (context.zoom <= 1) {
          context.setZoom(context.zoom - 0.25);
          args = { zoom: context.zoom - 0.25 };
        } else {
          context.setZoom(context.zoom - 1);
          args = { zoom: context.zoom - 1 };
        }
        handleTopMenu(appMenu, setAppMenu, args, "zoom");
      }
      setAction(false);
      break;
    case "Zoom Reset":
      context.setZoom(1);
      args = { zoom: 1 };
      handleTopMenu(appMenu, setAppMenu, args, "zoom");
      setAction(false);
      break;
    case "Zoom Min":
      args = { zoom: 0.25 };
      handleTopMenu(appMenu, setAppMenu, args, "zoom");
      setAction(false);
      break;
    case "Zoom Max":
      args = { zoom: 4 };
      handleTopMenu(appMenu, setAppMenu, args, "zoom");
      setAction(false);
      break;
    case "Zoom Default":
      args = { zoom: 1 };
      handleTopMenu(appMenu, setAppMenu, args, "zoom");
      setAction(false);
      break;
    case "Zoom Change":
      args = { zoom: 2 } // Any value between 0.25 and 4 except for 1 will work to correctly update top menu
      handleTopMenu(appMenu, setAppMenu, args, "zoom");
      setAction(false);
      break;
    case "Cut":
      //TODO
      setAction(false);
      break;
    case "Copy":
      //TODO
      setAction(false);
      break;
    case "Paste":
      //TODO
      setAction(false);
      break;
    case "Select All":
      //TODO
      setAction(false);
      break;
    case "Select Clear":
      //TODO
      setAction(false);
      break;
    case "finished":
      handleHistory(ctx, context.history, context.setHistory, "save", appMenu, setAppMenu, setCanClose);
      setAction(false);
      break;
    case "drawing":
      if (context.cursor.down) {
        handleTools(canvas, context.cursor, context.setCursor, params, action, setAction);
      } else {
        setAction("finished");
      }
      break;
    case "settingPoints":
      if(context.cursor.down) {
        handleTools(canvas, context.cursor, context.setCursor, params, action, setAction);
      } else{
        setAction(false);
      }
    break;
    case "cancel":
    case "clipping":
    case "confirm":
      handleTools(canvas, context.cursor, context.setCursor, params, action, setAction);
      break;
    case false:
      if (context.cursor.down) {
        handleTools(canvas, context.cursor, context.setCursor, params, action, setAction);
      }
      break;
    case "topNavBar":
      context.setView({ ...context.view, topNavBar: !context.view.topNavBar });
      args = { view: { ...context.view, topNavBar: !context.view.topNavBar } };
      handleTopMenu(appMenu, setAppMenu, args, "view");
      setAction(false);
      break;
    case "bottomNavBar":
      context.setView({ ...context.view, bottomNavBar: !context.view.bottomNavBar });
      args = { view: { ...context.view, bottomNavBar: !context.view.bottomNavBar } };
      handleTopMenu(appMenu, setAppMenu, args, "view");
      setAction(false);
      break;
    case "toolBar":
      context.setView({ ...context.view, toolBar: !context.view.toolBar });
      args = { view: { ...context.view, toolBar: !context.view.toolBar } };
      handleTopMenu(appMenu, setAppMenu, args, "view");
      setAction(false);
      break;
    /*case "menuBar":
      context.setView({ ...context.view, menuBar: !context.view.menuBar });
      args={view: { ...context.view, menuBar: !context.view.menuBar }};
      handleTopMenu(appMenu, setAppMenu, args, "view");
      setAction(false);
      break;*/
    case "Close":
      if(!canCLose){
        setAppDialog({
          title: "Warning",
          info: "Do you want to download the file before closing?",
          actions:{
            Save: () => {
              handleFile(ctx, context.name, "save");
              setCanClose(true);
              setAppDialog(null);
            },
            Close: () => {
              setCanClose(true);
              setAppDialog(null);
            },
            Cancel: () => {
              setAppDialog(null);
              setAction(false);
            }
          }
        });
      }
      break;
    default:
      setAction(false);
      break;
  }
};