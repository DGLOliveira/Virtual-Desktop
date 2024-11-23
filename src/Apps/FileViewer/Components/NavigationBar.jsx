import { useContext, useState } from "react";
import { Context } from "../context.jsx";
import {
    FaSearch,
    FaHome,
    FaArrowLeft,
    FaArrowRight,
    FaArrowUp,
    FaSync
} from "react-icons/fa";
export default function NavigationBar() {
    const context = useContext(Context);

    return (
        <nav className="FileViewerControls">
            <div>
                <button title="Back" aria-label="Back" onClick={context.back} disabled={!context.canBack}>
                    <FaArrowLeft />
                </button>
                <button title="Forward" aria-label="Forward" onClick={context.forward} disabled={!context.canForward}>
                    <FaArrowRight />
                </button>
                <button title="Up" aria-label="Up" onClick={context.up} disabled={!context.canUp}>
                    <FaArrowUp />
                </button>
                <button title="Refresh" aria-label="Refresh" onClick={context.refresh}>
                    <FaSync />
                </button>
            </div>
            <div>
                <button title="Home" aria-label="Home" onClick={context.home}>
                    <FaHome />
                </button>
                <div>
                {context.path.map((name, index) => (
                    <button key={index} title={name} aria-label={name}>
                    {"> "}{name}
                    </button>
                ))}
                </div>
            </div>
            <div>
                <button title="Search" aria-label="Search">
                    <FaSearch />
                </button>
                <input type="text" 
                placeholder={context.path.length > 0 ? "Search in " + context.path[context.path.length - 1] : "Search in root"}
                onChange={(e) => context.setFind(e.target.value)}
                />
            </div>
        </nav>
    );
}