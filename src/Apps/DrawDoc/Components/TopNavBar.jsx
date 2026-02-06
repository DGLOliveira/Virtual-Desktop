import { useContext } from "react";
import { Context } from "../Context.jsx";
import { BiUndo, BiRedo } from "react-icons/bi";
import { TfiSave, TfiFile } from "react-icons/tfi";
import { CiLineHeight } from "react-icons/ci";
import { AiOutlineColumnHeight } from "react-icons/ai";
import { RiFontSize, RiShapesLine } from "react-icons/ri";
import { BiShapePolygon } from "react-icons/bi";

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
      <nav id="drawDocTopNavBar" onContextMenu={(event) => handleContextMenu(event)}>
        <button title="Undo" onClick={() => setAction("Undo")} disabled={!context.layers[context.currLayer].canUndo}>
          <BiUndo />
        </button>
        <button title="Redo" onClick={() => setAction("Redo")} disabled={!context.layers[context.currLayer].canRedo}>
          <BiRedo />
        </button>
        <vertical-rect ></vertical-rect>
        <button title="New File" onClick={() => setAction("New")}>
          <TfiFile />
        </button>
        <button title="Download File" onClick={() => setAction("Save")} disabled={!(context.history.canRedo || context.history.canUndo)}>
          <TfiSave />
        </button>
        <vertical-rect ></vertical-rect>
        <div style={{ display: "flex" }}>
          <button title="Color 1" className={context.color.selected === context.color[1] ? "buttonActive" : ""}
            onClick={() => context.setColor({ ...context.color, selected: context.color[1] })}>
            <label htmlFor="drawColor1" style={{ textDecoration: context.color.selected === context.color[1] ? "underline" : "" }} onClick={(e) => e.preventDefault()}>1</label>
          </button>
          <ColorPicker
            color={context.color[1]}
            setColor={(color) => { context.setColor({ ...context.color, selected: color, 1: color }) }}
            useAlpha={false}
          />
        </div>
        <vertical-rect ></vertical-rect>
        <div style={{ display: "flex" }}>
          <button title="Color 2" className={context.color.selected === context.color[2] ? "buttonActive" : ""}
            onClick={() => context.setColor({ ...context.color, selected: context.color[2] })}>
            <label htmlFor="drawColor2" style={{ textDecoration: context.color.selected === context.color[2] ? "underline" : "" }} onClick={(e) => e.preventDefault()}>2</label>
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
        {context.tool !== "Select" && context.tool !== "Pipette" && context.tool !== "Magnifier" && context.tool !== "Bucket" &&
          <>
            <AiOutlineColumnHeight />
            <input
              type="number"
              min="1"
              max="100"
              value={context.size}
              onChange={(e) => context.setSize(Number(e.target.value))}
              title={context.tool === "Text" ? "Font Size" : context.tool === "Shape" ? "Line Width" : "Radius"}
            />
          </>
        }
        {context.tool === "Text" &&
          <>
            <vertical-rect ></vertical-rect>
            <RiFontSize />
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
            </select>
            <vertical-rect ></vertical-rect>
            <CiLineHeight />
            <input
              title="Line Height"
              type="number"
              step="0.01"
              min="0"
              value={context.text.lineHeight}
              onChange={(e) => { context.setText({ ...context.text, lineHeight: e.target.value }) }}
            />
            <vertical-rect ></vertical-rect>
          </>
        }
        {context.tool === "Shape" &&
          <>
            <vertical-rect ></vertical-rect>
            <RiShapesLine />
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
            <vertical-rect ></vertical-rect>
            {(context.subTool.shape === "Polygon" || context.subTool.shape === "Star") &&
              <>
                <BiShapePolygon />
                <input
                  type="number"
                  title="Sides"
                  value={context.subTool.sides}
                  onChange={(e) => context.setSubTool({ ...context.subTool, sides: e.target.value })}
                  min="3"
                  step="1" />
                <vertical-rect ></vertical-rect>
              </>
            }
          </>}
      </nav>
    )
  }
}
