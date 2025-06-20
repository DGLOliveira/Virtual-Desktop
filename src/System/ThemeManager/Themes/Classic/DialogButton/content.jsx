import "./style.css";

export default function content({ type, click, name }) {

    return (
        <button
            className="appDialogButtonClassic"
            onClick={click}
        >
            {name}
        </button>
    );
};