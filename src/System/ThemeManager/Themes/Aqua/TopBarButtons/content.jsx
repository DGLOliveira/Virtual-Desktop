import "./style.css"

export default function content({ click, title, isMaximized }) {
    return (
        <>
            <button
                className="appTopBarButtonAqua appTopBarButtonAquaGreen"
                onClick={(e) => (e.stopPropagation(), click("Minimize"))}
                title={title.minimize}>
                -
            </button>
            <button
                className="appTopBarButtonAqua appTopBarButtonAquaYellow"
                onClick={(e) => (e.stopPropagation(), click("Maximize"))}
                title={isMaximized ? title.restore : title.maximize}>
                +
            </button>
            <button
                className="appTopBarButtonAqua appTopBarButtonAquaRed"
                onClick={(e) => (e.stopPropagation(), click("Close"))}
                title={title.close}>
                x
            </button>
        </>
    );
}