import "./style.css";

export default function content({ type, click, name }) {

    function setButtonClass() {
        switch (type) {
            case "Warning":
                return "appDialogButtonFluent appDialogButtonFluentRed";
            case "Neutral":
            default:
                return "appDialogButtonFluent";
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