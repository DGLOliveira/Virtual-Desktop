import {
    FaRegWindowMinimize,
    FaWindowRestore,
    FaWindowMaximize,
} from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import "./style.css";

export default function content({ click, title, isMaximized }) {
    return (
        <>
            <button
                className="appTopBarButtonFluent appTopBarButtonFluentHoverGray"
                onClick={(e) => (e.stopPropagation(), click("Minimize"))}
                title={title.minimize}>
                <FaRegWindowMinimize />
            </button>
            <button
                className="appTopBarButtonFluent appTopBarButtonFluentHoverGray"
                onClick={(e) => (e.stopPropagation(), click("Maximize"))}
                title={isMaximized ? title.restore : title.maximize}>
                {isMaximized ? (
                    <FaWindowRestore />
                ) : (
                    <FaWindowMaximize />
                )}
            </button>
            <button
                className="appTopBarButtonFluent appTopBarButtonFluentHoverRed"
                onClick={(e) => (e.stopPropagation(), click("Close"))}
                title={title.close}>
                <AiOutlineClose />
            </button>
        </>
    );
}