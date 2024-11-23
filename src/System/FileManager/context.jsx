import { useState, createContext } from "react";
import rootDefault from "./rootDefault.json";

export const FileContext = createContext({
  root:{},
  setRoot:()=>{},
  desktop:{},
  setDesktop:()=>{},
  taskbar:{},
  setTaskbar:()=>{},
});

export function FileProvider({ children }) {
  const [root, setRoot] = useState(rootDefault);
  const [desktop, setDesktop] = useState(rootDefault.children.User.children.Desktop.children);
  const [taskbar, setTaskbar] = useState(rootDefault.children.User.children.Taskbar.children);

  const contextValue = {
    root,
    setRoot,
    desktop,
    setDesktop,
    taskbar,
    setTaskbar
  };

  return (
    <FileContext.Provider value={contextValue}>
      {children}
    </FileContext.Provider>
  );
}
export default FileProvider;