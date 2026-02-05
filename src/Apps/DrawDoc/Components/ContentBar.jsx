import { useState, useContext } from "react";
import { Context } from "../Context.jsx";
import { GoTriangleLeft, GoTriangleRight } from "react-icons/go";
import LayersWindow from "./LayersWindow.jsx";

export default function ContentBar({ setAction, contextMenu }) {
    const context = useContext(Context);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState("Layers");

    const handleContextMenu = (event) => {
        event.preventDefault();
        let content = { "Hide": { action:()=>setAction("contentBar")} };
        contextMenu.setOpen();
        contextMenu.setPosition(event.clientX, event.clientY);
        contextMenu.setContent(content);
    };

    if (context.view.contentBar) {
        return (
            <div id="drawDocContentBar" onContextMenu={(event) => handleContextMenu(event)}>
                <nav>
                    <button onClick={() => setOpen(!open)}>{open ? <GoTriangleRight /> : <GoTriangleLeft />}</button>
                    <ul>
                        <li onClick={() => { setSelected("Layers"); setOpen(true); }} style={{ textDecoration: selected === "Layers" ? "underline" : "none" }}>Layers</li>
                    </ul>
                </nav>
                <div style={{ width: open ? "auto" : "0" }}>
                    {selected === "Layers" && <LayersWindow setAction={setAction} contextMenu={contextMenu} />}
                </div>
            </div>)
    }
}