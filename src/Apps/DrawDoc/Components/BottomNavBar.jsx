import { useContext } from "react";
import { Context } from "../Context.jsx";
export const BottomNavBar = ({ action, setAction, contextMenu }) => {
  const context = useContext(Context);
  const handleContextMenu = (event) => {
    event.preventDefault();
    let content = { "Hide": { action:() => setAction("bottomNavBar")}, }
    contextMenu.setOpen();
    contextMenu.setPosition(event.clientX, event.clientY);
    contextMenu.setContent(content);
};
  if (context.view.bottomNavBar) {
    return (
      <nav onContextMenu={(event) => handleContextMenu(event)}>
        {context.tool === "Text" &&
          <>
            <button
              title="Confirm Text"
              onClick={() => setAction("confirm")}
            ><small>Confirm</small>
            </button>
            <vertical-rect ></vertical-rect>
            <input
              type="text"
              title="Text Input"
              value={context.text.text}
              onChange={(e) => context.setText({ ...context.text, text: e.target.value })}
            />
          </>}
        {context.tool === "Select" ?
          <>{action === "clipping" && context.clipboard.state === "carry" ?
            <button
              title="Paste"
              onClick={() => { setAction("confirm"); context.setClipboard({ ...context.clipboard, state: "paste" }) }}
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
            ><small>Confirm</small></button>
            <vertical-rect ></vertical-rect>
            {context.subTool.shape === "Curve" && 
            <button
            title="Cancel Shape"
            onClick={() => setAction("cancel")}
            ><small>Cancel</small></button>
              }
            {context.subTool.shape !== "Line" && context.subTool.shape !== "Curve" ?
              <>
                <button
                  title="Fill"
                  className={context.subTool.fill ? "appMenuButtonON" : ""}
                  onClick={() => context.setSubTool({ ...context.subTool, fill: !context.subTool.fill })}
                ><small>Fill</small></button>
                <vertical-rect ></vertical-rect>
                <button
                  title="Stretch"
                  className={context.subTool.stretch ? "appMenuButtonON" : ""}
                  onClick={() => context.setSubTool({ ...context.subTool, stretch: !context.subTool.stretch })}
                ><small>Stretch</small>
                </button>
                <vertical-rect ></vertical-rect>
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
          </> : null}
      </nav>
    )
  }
}