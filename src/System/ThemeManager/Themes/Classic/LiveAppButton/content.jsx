import "./style.css";

export default function LiveAppButton({ name, click, context, AppIcon, isSelected }) {
    return (
        <button
            onClick={click}
            onContextMenu={(e) => {context(e)}}
            className={isSelected ? "liveAppsClassic liveAppsClassicActive" : "liveAppsClassic"}
            aria-label={"Live App" + name}
        >
            <AppIcon appName={name} />
            <span>{name}</span>
        </button>
    );
}