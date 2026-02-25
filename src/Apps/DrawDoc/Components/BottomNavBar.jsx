import { useContext } from "react";
import { Context } from "../Context.jsx";
export const BottomNavBar = ({ action, setAction, contextMenu }) => {
  const context = useContext(Context);
  const handleContextMenu = (event) => {
    event.preventDefault();
    let content = { "Hide": { action: () => setAction("bottomNavBar") }, }
    contextMenu.setOpen();
    contextMenu.setPosition(event.clientX, event.clientY);
    contextMenu.setContent(content);
  };
  if (context.view.bottomNavBar) {
    return (
      <nav id="drawDocBottomNavBar" onContextMenu={(event) => handleContextMenu(event)}>
        {context.tool === "Text" &&
          <>
            <button
              title="Confirm Text"
              onClick={() => setAction("confirm")}
              disabled={context.layers[context.currLayer].locked}
            ><small>Confirm</small>
            </button>
            <vertical-rect ></vertical-rect>
            <button
              title="Use Fill"
              className={context.text.fill ? "buttonActive" : ""}
              onClick={() => { context.setText({ ...context.text, fill: !context.text.fill }) }}
            >
              <small>Fill</small>
            </button>
            <vertical-rect ></vertical-rect>
            <button
              title="Use Stroke"
              className={context.text.stroke ? "buttonActive" : ""}
              onClick={() => { context.setText({ ...context.text, stroke: !context.text.stroke }) }}
            >
              <small>Outline</small>
            </button>
            <input
              title="Stroke Width"
              type="number"
              step="1"
              min="1"
              max={context.size - 1}
              value={context.text.strokeWidth}
              onChange={(e) => { context.setText({ ...context.text, strokeWidth: e.target.value }) }}
            />
            <vertical-rect ></vertical-rect>
          </>}
        {context.tool === "Select" ?
          <>{action === "clipping" && context.clipboard.state === "carry" ?
            <button
              title="Paste"
              onClick={() => { setAction("confirm"); context.setClipboard({ ...context.clipboard, state: "paste" }) }}
              disabled={context.layers[context.currLayer].locked}
            ><small>Paste</small></button>
            :
            <>
              <button
                title="Cut"
                onClick={() => { setAction("clipping"); context.setClipboard({ ...context.clipboard, state: "cut" }) }}
              ><small>Cut</small></button>
              <vertical-rect ></vertical-rect>
              <button
                title="Copy"
                onClick={() => { setAction("clipping"); context.setClipboard({ ...context.clipboard, state: "copy" }) }}
              ><small>Copy</small></button>
            </>
          }</>
          : null}
        {context.tool === "Shape" ?
          <>
            <button
              title="Confirm Shape"
              onClick={() => setAction("confirm")}
              disabled={context.layers[context.currLayer].locked}
            ><small>Confirm</small></button>
            <vertical-rect ></vertical-rect>
            {context.subTool.shape === "Curve" &&
              <>
                <button
                  title="Cancel Shape"
                  onClick={() => setAction("cancel")}
                ><small>Cancel</small>
                </button>
                <vertical-rect ></vertical-rect>
              </>
            }
            {context.subTool.shape !== "Line" && context.subTool.shape !== "Curve" ?
              <>
                <button
                  title="Fill"
                  className={context.subTool.fill ? "buttonActive" : ""}
                  onClick={() => context.setSubTool({ ...context.subTool, fill: !context.subTool.fill })}
                ><small>Fill</small></button>
                <vertical-rect ></vertical-rect>
                {context.subTool.shape !== "Rectangle" && context.subTool.shape !== "Squagle" &&
                  <><button
                    title="Stretch"
                    className={context.subTool.stretch ? "buttonActive" : ""}
                    onClick={() => context.setSubTool({ ...context.subTool, stretch: !context.subTool.stretch })}
                  ><small>Stretch</small>
                  </button>
                    <vertical-rect ></vertical-rect></>}
                <button>
                  <label htmlFor="rotationAngle">Rotation</label>
                  <input
                    type="number"
                    title="Rotation Angle"
                    id="rotationAngle"
                    value={context.subTool.angle}
                    onChange={(e) => context.setSubTool({ ...context.subTool, angle: e.target.value })}
                    step="1" />
                </button>
                <vertical-rect ></vertical-rect>
                {context.subTool.shape === "Polygon" || context.subTool.shape === "Star" ?
                  <>
                    <button>
                      <label htmlFor="startAngle">Start Angle</label>
                      <input
                        type="number"
                        title="Start Angle"
                        id="startAngle"
                        value={context.subTool.startAngle}
                        onChange={(e) => context.setSubTool({ ...context.subTool, startAngle: e.target.value })}
                        step="1" />
                    </button>
                    <vertical-rect ></vertical-rect>
                  </> : null}
              </>
              : null}
            {context.subTool.shape === "Line" && context.subTool.shape === "Curve" &&
              <>
                <button>
                  <label htmlFor="lineCap">Cap</label>
                  <select
                    id="lineCap"
                    value={context.subTool.lineCap}
                    onChange={(e) => context.setSubTool({ ...context.subTool, lineCap: e.target.value })}>
                    <option value="butt">Butt</option>
                    <option value="round">Round</option>
                    <option value="square">Square</option>
                  </select>
                </button>
                <vertical-rect ></vertical-rect>
              </>}
            {context.subTool.shape !== "Line" && context.subTool.shape !== "Curve" && context.subTool.shape !== "Squagle" && context.subTool.shape !== "Rectangle" &&
              <><button>
                <label htmlFor="lineJoin">Joints</label>
                <select
                  id="lineJoin"
                  value={context.subTool.lineJoin}
                  onChange={(e) => context.setSubTool({ ...context.subTool, lineJoin: e.target.value })}>
                  <option value="miter">Miter</option>
                  <option value="round">Round</option>
                  <option value="bevel">Bevel</option>
                </select>
              </button>
                <vertical-rect ></vertical-rect>
              </>}
            {context.subTool.shape === "Squagle" &&
              <><button>
                <label htmlFor="topleft">Top Left</label>
                <input
                  id="topleft"
                  type="number"
                  step="1"
                  min="0"
                  value={context.subTool.radii[0]}
                  onChange={(e) => context.setSubTool({ ...context.subTool, radii: [e.target.value, ...context.subTool.radii.slice(1)] })}
                />
              </button>
                <vertical-rect ></vertical-rect>
                <button>
                  <label htmlFor="topright">Top Right</label>
                  <input
                    id="topright"
                    type="number"
                    step="1"
                    min="0"
                    value={context.subTool.radii[1]}
                    onChange={(e) => context.setSubTool({ ...context.subTool, radii: [...context.subTool.radii.slice(0, 1), e.target.value, ...context.subTool.radii.slice(2)] })}
                  />
                </button>
                <vertical-rect ></vertical-rect>
                <button>
                  <label htmlFor="bottomright">Bottom Right</label>
                  <input
                    id="bottomright"
                    type="number"
                    step="1"
                    min="0"
                    value={context.subTool.radii[2]}
                    onChange={(e) => context.setSubTool({ ...context.subTool, radii: [...context.subTool.radii.slice(0, 2), e.target.value, context.subTool.radii[3]] })}
                  />
                </button>
                <vertical-rect ></vertical-rect>
                <button>
                  <label htmlFor="bottomleft">Bottom Left</label>
                  <input
                    id="bottomleft"
                    type="number"
                    step="1"
                    min="0"
                    value={context.subTool.radii[3]}
                    onChange={(e) => context.setSubTool({ ...context.subTool, radii: [...context.subTool.radii.slice(0, 3), e.target.value] })}
                  />
                </button>
                <vertical-rect ></vertical-rect>
              </>}
          </> : null}
      </nav>
    )
  }
}