import "./style.css";

export default function content({ type, click, name }) {

    return (
        <button
            className="appDialogButtonAero"
            onClick={click}
        >
            {name}
        </button>
    );
};