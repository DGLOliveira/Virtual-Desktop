import { useState, useEffect } from "react";

export const Global = () => {
    const [fontFamily, setFontFamily] = useState(
        getComputedStyle(root).getPropertyValue("--GeneralFontFamily"));
    useEffect(() => {
        root.style.setProperty("--GeneralFontFamily", fontFamily);
    }, [fontFamily]);

    return (
        <>
        <div>
            <label>Font Family:</label>
            <select
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
            >
                <option style={{ fontFamily: "Arial" }}>Arial</option>
                <option style={{ fontFamily: "Times New Roman" }}>Times New Roman</option>
                <option style={{ fontFamily: "Monospace" }}>Monospace</option>
                <option style={{ fontFamily: "Verdana" }}>Verdana</option>
                <option style={{ fontFamily: "Georgia" }}>Georgia</option>
                <option style={{ fontFamily: "Courier New" }}>Courier New</option>
                <option style={{ fontFamily: "Tahoma" }}>Tahoma</option>
                <option style={{ fontFamily: "Garamond" }}>Garamond</option>
                <option style={{ fontFamily: "Impact" }}>Impact</option>
                <option style={{ fontFamily: "Helvetica" }}>Helvetica</option>
                <option style={{ fontFamily: "Comic Sans MS" }}>Comic Sans MS</option>
                <option style={{ fontFamily: "Lucida Console" }}>Lucida Console</option>
                <option style={{ fontFamily: "Lucida Sans Unicode" }}>Lucida Sans Unicode</option>
                <option style={{ fontFamily: "Palatino Linotype" }}>Palatino Linotype</option>
            </select>
            </div>
        </>
    )
}