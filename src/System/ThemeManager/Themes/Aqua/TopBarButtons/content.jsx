import "./style.css"

export default function content({ click, title, isMaximized, showButtons }) {
    return (
        <>
            {showButtons.minimize &&
                <button
                    className="appTopBarButtonAqua appTopBarButtonAquaGreen"
                    onClick={(e) => (e.stopPropagation(), click("Minimize"))}
                    title={title.minimize}>
                    -
                </button>}
            {showButtons.maximize &&
                <button
                    className="appTopBarButtonAqua appTopBarButtonAquaYellow"
                    onClick={(e) => (e.stopPropagation(), click("Maximize"))}
                    title={isMaximized ? title.restore : title.maximize}>
                    +
                </button>}
            {showButtons.close &&
                <button
                    className="appTopBarButtonAqua appTopBarButtonAquaRed"
                    onClick={(e) => (e.stopPropagation(), click("Close"))}
                    title={title.close}>
                    x
                </button>}
        </>
    );
}