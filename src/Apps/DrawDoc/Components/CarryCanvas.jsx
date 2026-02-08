import { useContext } from "react"
import { Context } from "../Context.jsx"

export default function CarryCanvas() {
    const context = useContext(Context);
    const tool = context.tool;
    const clipboard = context.clipboard;
    const cursor = context.cursor;
    const zoom = context.zoom;
    const currLayer = context.currLayer;
    const layers = context.layers;
        return (
            <canvas 
            id="carryCanvas" 
            height={clipboard.data.height}
            width={clipboard.data.width}
            style={{ 
                display:tool === "Select" && clipboard.state === "carry" ? "block" : "none", 
                position: "absolute",
                zIndex: currLayer+1, 
                top: cursor.end.y + 1 + "px", 
                left: cursor.end.x + 1 + "px" 
            }} />
        )
    
}