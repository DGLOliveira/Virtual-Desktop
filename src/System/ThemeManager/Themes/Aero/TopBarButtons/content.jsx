import {
    FaRegWindowMinimize,
    FaWindowRestore,
    FaWindowMaximize,
} from "react-icons/fa";
import { RiCloseLargeLine } from "react-icons/ri";
import "./style.css";

export default function content({ click, title, isMaximized }) {
    return (
        <>
            <button
                className="appTopBarButtonAero appTopBarButtonAeroMinimize"
                onClick={(e) => (e.stopPropagation(), click("Minimize"))}
                title={title.minimize}>
                <FaRegWindowMinimize />
            </button>
            <button
                className="appTopBarButtonAero appTopBarButtonAeroMaximize"
                onClick={(e) => (e.stopPropagation(), click("Maximize"))}
                title={isMaximized ? title.restore : title.maximize}>
                {isMaximized ? (
                    <FaWindowRestore />
                ) : (
                    <FaWindowMaximize />
                )}
            </button>
            <button
                className="appTopBarButtonAero appTopBarButtonAeroClose"
                onClick={(e) => (e.stopPropagation(), click("Close"))}
                title={title.close}>
                <RiCloseLargeLine />
            </button>
        </>
    );
}