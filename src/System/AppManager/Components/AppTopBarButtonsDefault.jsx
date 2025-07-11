import {
    FaRegWindowMinimize,
    FaWindowRestore,
    FaWindowMaximize,
} from "react-icons/fa";
import { RiCloseLargeLine } from "react-icons/ri";

export default function TopBarButtonsDefault({ click, title, isMaximized, showButtons }) {
    return (
        <>
            {showButtons.minimize && <button
                onClick={(e) => (e.stopPropagation(), click("Minimize"))}
                title={title.minimize}>
                <FaRegWindowMinimize />
            </button>}
            {showButtons.maximize &&
                <button
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
                    onClick={(e) => (e.stopPropagation(), click("Close"))}
                    title={title.close}>
                    <RiCloseLargeLine />
                </button>}
        </>
    )
};