import { useState, createContext } from "react";

export const Context = createContext({
  currLayer: 0,
  layers: [],
  setLayers: () => { },
  lastLayer: 0,
  setLastLayer: () => { },
  name: "",
  setName: () => { },
  setCurrLayer: () => { },
  history: {},
  setHistory: () => { },
  dimentions: {},
  setDimentions: () => { },
  useAlpha: false,
  setUseAlpha: () => { },
  newParams: {},
  setNewParams: () => { },
  tool: "",
  setTool: () => { },
  brushPoints: {},
  setBrushPoints: () => { },
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
      id: 0,
      name: "Base",
      visible: true,
      locked: false,
      canUndo: false,
      canRedo: false
    }
  ]);
  const [lastLayer, setLastLayer] = useState(0);
  const [name, setName] = useState("Untitled");
  const [history, setHistory] = useState({
    0: {
      data: [],
      lastIndex: 0
    }
  });
  const [dimentions, setDimentions] = useState({ width: 350, height: 350, });
  const [useAlpha, setUseAlpha] = useState(false);
  const [newParams, setNewParams] = useState({ 
    width: 350, 
    height: 350, 
    alpha: false,
    name: "Untitled",
  });
  const [tool, setTool] = useState("Brush");
  const [brushPoints, setBrushPoints] = useState([]);
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
    1: "hsla(0, 100%, 0%, 1)",
    2: "hsla(0, 100%, 100%, 1)",
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
    lastLayer: lastLayer,
    setLastLayer: setLastLayer,
    name: name,
    setName: setName,
    history: history,
    setHistory: setHistory,
    setCurrLayer: setCurrLayer,
    dimentions: dimentions,
    setDimentions: setDimentions,
    useAlpha: useAlpha,
    setUseAlpha: setUseAlpha,
    newParams: newParams,
    setNewParams: setNewParams,
    tool: tool,
    setTool: setTool,
    brushPoints: brushPoints,
    setBrushPoints: setBrushPoints,
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