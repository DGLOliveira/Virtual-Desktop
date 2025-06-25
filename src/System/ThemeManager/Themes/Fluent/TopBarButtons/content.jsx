import {
    FaRegWindowMinimize,
    FaWindowRestore,
    FaWindowMaximize,
} from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import "./style.css";

export default function content({ click, title, isMaximized, showButtons }) {
    return (
        <>
            {showButtons.minimize &&
                <button
                    className="appTopBarButtonFluent appTopBarButtonFluentHoverGray"
                    onClick={(e) => (e.stopPropagation(), click("Minimize"))}
                    title={title.minimize}>
                    <FaRegWindowMinimize />
                </button>}
            {showButtons.maximize &&
                <button
                    className="appTopBarButtonFluent appTopBarButtonFluentHoverGray"
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
                    className="appTopBarButtonFluent appTopBarButtonFluentHoverRed"
                    onClick={(e) => (e.stopPropagation(), click("Close"))}
                    title={title.close}>
                    <AiOutlineClose />
                </button>}
        </>
    );
}