import { handleDraw } from "./handleDraw.js";
export const handleTools = (canvas, cursor, setCursor, params, action, setAction) => {
  switch (params.tool) {
    case "Brush":
    case "Eraser":
      handleDraw(canvas, cursor, params, false, action);
      if (action !== "drawing") {
        params.setBrushPoints([[cursor.current.x, cursor.current.y]]);
        setAction("drawing");
      }else{
        params.setBrushPoints([...params.brushPoints, [cursor.current.x, cursor.current.y]]);
      }
      break;
    case "Bucket":
      handleDraw(canvas, cursor, params, false);
      setAction("finished");
      break;
    case "Spray":
      for (let i = 0; i < 10; i++) {
        handleDraw(canvas, cursor, params, false);
      }
      setAction("spraying");
      break;
    case "Text":
      if (
        cursor.current.x !== 0 &&
        cursor.current.y !== 0
      ) {
        params.setText({
          ...params.text, 
          state: "preview"
        });
      }
      if (action === "confirm") {
        handleDraw(canvas, cursor, params, false);
        params.setText({ ...params.text, text: "", state: "none" });
        setAction("finished");
      }
      break;
    case "Pipette":
      handleDraw(canvas, cursor, params, false);
      break;
    case "Magnifier":
      break;
    case "Select":
      if (action === "clipping" && params.clipboard.state !== "carry") {
        handleDraw(canvas, cursor, params, false);
      } else if (action === "confirm") {
        handleDraw(canvas, cursor, params, false);
        setAction("finished");
      }
      break;
    case "Shape":
      if (params.subTool.shape === "Curve" && cursor.down) {
        let newState = params.curveControls.state;
        let newStart = params.curveControls.start;
        let newEnd = params.curveControls.end;
        let newControlPoint1 = params.curveControls.controlPoint1;
        let newControlPoint2 = params.curveControls.controlPoint2;
        if (params.curveControls.state==="none") {
          setAction("settingPoints");
          newState = "start";
          newStart = { x: cursor.start.x, y: cursor.start.y };
          newEnd = { x: cursor.end.x, y: cursor.end.y };
        }
        else if(params.curveControls.state==="start") {
            if(action==="settingPoints"){
              newEnd = { x: cursor.end.x, y: cursor.end.y };
            }else{
              setAction("settingPoints");
              newState = "point1";
              newControlPoint1 = { x: cursor.end.x, y: cursor.end.y };
            }
        } else if (params.curveControls.state === "point1") {
          if(action==="settingPoints"){
            newControlPoint1 = { x: cursor.end.x, y: cursor.end.y };
          }else{
            setAction("settingPoints");
            newState = "point2";
            newControlPoint2 = { x: cursor.end.x, y: cursor.end.y };
          }
        } else if (params.curveControls.state === "point2") {
          newControlPoint2 = { x: cursor.end.x, y: cursor.end.y };
        }
        params.setCurveControls({
          ...params.curveControls,
          state: newState,
          start: newStart,
          end: newEnd,
          controlPoint1: newControlPoint1,
          controlPoint2: newControlPoint2
        });
      } else if(params.subTool.shape === "Curve" && action==="cancel") {
        params.setCurveControls({
          state: "none",
          start: { x: -1, y: -1 },
          end: { x: -1, y: -1 },
          controlPoint1: { x: -1, y: -1 },
          controlPoint2: { x: -1, y: -1 }
        })
      }
      

      if (action === "confirm") {
        handleDraw(canvas, cursor, params, false);
        if (params.subTool.shape === "Curve") {
          params.setCurveControls({
            state: "none",
            start: { x: -1, y: -1 },
            end: { x: -1, y: -1 },
            controlPoint1: { x: -1, y: -1 },
            controlPoint2: { x: -1, y: -1 }
          })
        }
        setAction("finished");
        setCursor({
          ...cursor,
          start: { x: 0, y: 0 },
          end: { x: 0, y: 0 },
        })
      }
      break;
    default:
      break;
  }
};