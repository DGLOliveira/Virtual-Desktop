import { useState, useRef, createContext, createRef } from "react";

export const Context = createContext({
  currLayer: 0,
  layers: [],
  setLayers: () => { },
  name: "",
  setName: () => { },
  setCurrLayer: () => { },
  history: {},
  setHistory: () => { },
  dimentions: {},
  setDimentions: () => { },
  tempDimentions: {},
  setTempDimentions: () => { },
  tool: "",
  setTool: () => { },
  subTool: {},
  setSubTool: () => { },
  curveControls: {},
  setCurveControls: () => { },
  color: {},
  setColor: () => { },
  size: 0,
  setSize: () => { },
  text: {},
  setText: () => { },
  clipboard: {},
  setClipboard: () => { },
  zoom: 1,
  setZoom: () => { },
  cursor: {},
  setCursor: () => { },
  view: {},
  setView: () => { },
});

export function ContextProvider({ children }) {
  const [currLayer, setCurrLayer] = useState(0);
  const [layers, setLayers] = useState([
    {
      canvas: createRef(),
      name: "Base",
      visible: true
    }
  ]);
  const [name, setName] = useState("Untitled");
  const [history, setHistory] = useState({
    history: [],
    index: 0,
    canUndo: false,
    canRedo: false
  });
  const [dimentions, setDimentions] = useState({ width: 350, height: 350, });
  const [tempDimentions, setTempDimentions] = useState({ width: 350, height: 350, });
  const [tool, setTool] = useState("Brush");
  const [subTool, setSubTool] = useState({
    shape: "Circle",
    fill: false,
    stretch: false,
    sides: 4,
    angle: 0,
    startAngle: 0
  });
  const [curveControls, setCurveControls] = useState({
    state: "none",
    start: { x: -1, y: -1 },
    end: { x: -1, y: -1 },
    controlPoint1: { x: -1, y: -1 },
    controlPoint2: { x: -1, y: -1 }
  });
  const [color, setColor] = useState({
    selected: "hsl(0, 100%, 0%)",
    1: "hsl(0, 100%, 0%)",
    2: "hsl(0, 100%, 100%)",
  });
  const [size, setSize] = useState(16);
  const [text, setText] = useState({
    text: "",
    fill: true,
    stroke: false,
    strokeWidth: 2,
    lineHeight: 1.2,
    fontFamily: "Arial",
    state: "none",
  });
  const [clipboard, setClipboard] = useState({
    data: {},
    state: "none",
  });
  const [zoom, setZoom] = useState(1);
  const [cursor, setCursor] = useState({
    current: { x: 0, y: 0 },
    start: { x: 0, y: 0 },
    end: { x: 0, y: 0 },
    down: false,
    selecting: false
  });
  const [view, setView] = useState({
    toolBar: true,
    contentBar: true,
    topNavBar: true,
    bottomNavBar: true,
    menu: true
  })

  const contextValue = {
    currLayer: currLayer,
    layers: layers,
    setLayers: setLayers,
    name: name,
    setName: setName,
    history: history,
    setHistory: setHistory,
    setCurrLayer: setCurrLayer,
    dimentions: dimentions,
    setDimentions: setDimentions,
    tempDimentions: tempDimentions,
    setTempDimentions: setTempDimentions,
    tool: tool,
    setTool: setTool,
    subTool: subTool,
    setSubTool: setSubTool,
    curveControls: curveControls,
    setCurveControls: setCurveControls,
    color: color,
    setColor: setColor,
    size: size,
    setSize: setSize,
    text: text,
    setText: setText,
    clipboard: clipboard,
    setClipboard: setClipboard,
    zoom: zoom,
    setZoom: setZoom,
    cursor: cursor,
    setCursor: setCursor,
    view: view,
    setView: setView
  };

  return (
    <Context.Provider value={contextValue}>{children}</Context.Provider>
  );
}

export default ContextProvider;