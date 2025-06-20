import "./style.css";

export default function content({ type, click, name }) {

    function setButtonClass() {
        switch (type) {
            case "Warning":
                return "appDialogButtonAqua appDialogButtonAquaRed";
            case "Suggested":
                return "appDialogButtonAqua appDialogButtonAquaBlue";
            case "Neutral":
            default:
                return "appDialogButtonAqua appDialogButtonAquaNeutral";
        }
    }

    return (
        <button
            className={setButtonClass()}
            onClick={click}
        >
            {name}
        </button>
    );
};