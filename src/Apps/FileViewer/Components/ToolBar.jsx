
import {
    FaCopy,
    FaPaste,
    FaCut,
    FaPlus,
    FaTrash
} from "react-icons/fa";
import { BiRename } from "react-icons/bi";
export default function NavigationBar() {
    return(
        <nav>
            <button title="New" aria-label="New" disabled={true}>
                <FaPlus />
            </button>
            <button title="Copy" aria-label="Copy" disabled={true}>
                <FaCopy />
            </button>
            <button title="Paste" aria-label="Paste" disabled={true}>
                <FaPaste />
            </button>
            <button title="Cut" aria-label="Cut" disabled={true}>
                <FaCut />
            </button>
            <button title="Delete" aria-label="Delete" disabled={true}>
                <FaTrash />
            </button>
            <button title="Rename" aria-label="Rename" disabled={true}>
                <BiRename />
            </button>
            <vertical-rect></vertical-rect>
        </nav>
    )
}