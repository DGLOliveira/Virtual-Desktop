import { useContext } from "react";
import { Context } from "../Context.jsx";
import { BiUndo, BiRedo } from "react-icons/bi";
import { TfiSave, TfiFile } from "react-icons/tfi";

import ColorPicker from "../../../System/GlobalComponents/ColorPicker/ColorPicker.jsx";

export const TopNavBar = ({ setAction, contextMenu }) => {
  const context = useContext(Context);
  const handleZoom = (e) => {
    context.setZoom(Number(e.target.value));
    if (e.target.value === "0.25") {
      setAction("Zoom Min");
    } else if (e.target.value === "4") {
      setAction("Zoom Max");
    }
    else if (e.target.value === "1") {
      setAction("Zoom Default");
    }
    else {
      setAction("Zoom Change");
    }
  }

  const handleContextMenu = (event) => {
    event.preventDefault();
    let content = { "Hide": { action: () => setAction("topNavBar") } };
    contextMenu.setOpen();
    contextMenu.setPosition(event.clientX, event.clientY);
    contextMenu.setContent(content);
  };

  if (context.view.topNavBar) {
    return (
      <nav onContextMenu={(event) => handleContextMenu(event)}>
        <button onClick={() => setAction("Undo")} disabled={!context.history.canUndo}>
          <BiUndo title="Undo" />
        </button>
        <button onClick={() => setAction("Redo")} disabled={!context.history.canRedo}>
          <BiRedo title="Redo" />
        </button>
        <vertical-rect ></vertical-rect>
        <button onClick={() => setAction("New")}>
          <TfiFile title="New File" />
        </button>
        <button onClick={() => setAction("Save")} disabled={!(context.history.canRedo || context.history.canUndo)}>
          <TfiSave title="Save File" />
        </button>
        <vertical-rect ></vertical-rect>
        <div style={{ display: "flex" }}>
          <button className={context.color.selected === context.color[1] ? "buttonActive" : ""}
            onClick={() => context.setColor({ ...context.color, selected: context.color[1] })}>
            <label htmlFor="drawColor1" onClick={(e) => e.preventDefault()}>1</label>
          </button>
          <ColorPicker
            color={context.color[1]}
            setColor={(color) => { context.setColor({ ...context.color, selected: color, 1: color }) }}
            useAlpha={false}
          />
        </div>
        <vertical-rect ></vertical-rect>
        <div style={{ display: "flex" }}>
          <button className={context.color.selected === context.color[2] ? "buttonActive" : ""}
            onClick={() => context.setColor({ ...context.color, selected: context.color[2] })}>
            <label htmlFor="drawColor2" onClick={(e) => e.preventDefault()}>2</label>
          </button>
          <ColorPicker
            color={context.color[2]}
            setColor={(color) => context.setColor({ ...context.color, selected: color, 2: color })}
            useAlpha={false}
          />
        </div>
        <vertical-rect ></vertical-rect>
        {context.tool === "Magnifier" &&
          <select
            value={context.zoom}
            onChange={(e) => { handleZoom(e) }}
            title="Zoom"
          >
            <option value={0.25}>25%</option>
            <option value={0.5}>50%</option>
            <option value={0.75}>75%</option>
            <option value={1}>100%</option>
            <option value={2}>200%</option>
            <option value={3}>300%</option>
            <option value={4}>400%</option>
          </select>}
        {context.tool !== "Select" && context.tool !== "Pipette" && context.tool !== "Magnifier" &&
          <select
            value={context.size}
            onChange={(e) => {
              context.setSize(e.target.value);
            }}
            title={context.tool === "Text" ? "Font Size" : context.tool === "Shape" ? "Line Width" : "Radius"}
          >
            <option value={1}>1px</option>
            <option value={2}>2px</option>
            <option value={4}>4px</option>
            <option value={8}>8px</option>
            <option value={16}>16px</option>
            <option value={32}>32px</option>
          </select>}
        {context.tool === "Text" &&
          <select
            title="Font Family"
            value={context.text.fontFamily}
            onChange={(e) => context.setText({ ...context.text, fontFamily: e.target.value })}
          >
            <option>Arial</option>
            <option>Times New Roman</option>
            <option>Monospace</option>
            <option>Verdana</option>
            <option>Georgia</option>
            <option>Courier New</option>
            <option>Tahoma</option>
            <option>Garamond</option>
            <option>Impact</option>
            <option>Comic Sans MS</option>
            <option>Lucida Console</option>
            <option>Lucida Sans Unicode</option>
            <option>Palatino Linotype</option>
            <option>Symbol</option>
            <option>Wingdings</option>
            <option>Helvetica</option>
          </select>}
        {context.tool === "Shape" &&
          <>
            <select
              title="Shape"
              value={context.subTool.shape}
              onChange={(e) => context.setSubTool({ ...context.subTool, shape: e.target.value })}
            >
              <option>Line</option>
              <option>Curve</option>
              <option>Circle</option>
              <option>Rectangle</option>
              <option>Polygon</option>
              <option>Star</option>
              <option>Arrow</option>
              <option>Heart</option>
            </select>
            {(context.subTool.shape === "Polygon" || context.subTool.shape === "Star") &&
              <input
                type="number"
                title="Sides"
                value={context.subTool.sides}
                onChange={(e) => context.setSubTool({ ...context.subTool, sides: e.target.value })}
                min="3"
                step="1" />
            }
          </>}
      </nav>
    )
  }
}
