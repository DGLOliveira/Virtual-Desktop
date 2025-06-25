import {
    FaRegWindowMinimize,
    FaWindowRestore,
    FaWindowMaximize,
} from "react-icons/fa";
import { RiCloseLargeLine } from "react-icons/ri";
import "./style.css";

export default function content({ click, title, isMaximized, showButtons }) {
    return (
        <>
            {showButtons.minimize &&
                <button
                    className="appTopBarButtonClassic"
                    onClick={(e) => (e.stopPropagation(), click("Minimize"))}
                    title={title.minimize}>
                    <FaRegWindowMinimize />
                </button>}
            {showButtons.maximize &&
                <button
                    className="appTopBarButtonClassic"
                    onClick={(e) => (e.stopPropagation(), click("Maximize"))}
                    title={isMaximized ? title.restore : title.maximize}>
                    {isMaximized ? (
                        <FaWindowRestore />
                    ) : (
                        <FaWindowMaximize />
                    )}
                </button>}
            {showButtons.close &&
                <button
                    className="appTopBarButtonClassic"
                    onClick={(e) => (e.stopPropagation(), click("Close"))}
                    title={title.close}>
                    <RiCloseLargeLine />
                </button>}
        </>
    );
}