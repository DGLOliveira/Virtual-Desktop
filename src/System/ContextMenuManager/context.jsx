import { useState, createContext } from "react";

export const ContextMenuContext = createContext({
  isOpen: {},
  setOpen: () => {},
  setClose: () => {},
  content:{},
  setContent: () => {},
  position: {},
  setPosition: () => {},
  orientation: "",
  setOrientation: () => {},
});

export function ContextMenuProvider({ children }) {
    const [isOpen, switchOpen] = useState(false);
    const [content, setContent] = useState({});
    const [position, changePosition] = useState({x:0, y:0});
    const [orientation, setOrientation] = useState("top");
    const setOpen = () => {
        switchOpen(true);
    }
    const setClose = () => {
        switchOpen(false);
    }
    const setPosition = (left, top) => {
        changePosition({x:left, y:top});
    }
  const contextValue = {
    isOpen,
    setOpen,
    setClose,
    content,
    setContent,
    position,
    setPosition,
    orientation,
    setOrientation,
  };

  return (
    <ContextMenuContext.Provider value={contextValue}>
      {children}
    </ContextMenuContext.Provider>
  );
}
export default ContextMenuProvider;
