export default function DefaultButton({ name, click, context, AppIcon, isSelected }) {

    return (
        <button
            onClick={click}
            onContextMenu={(e) => { context(e) }}
            aria-label={"Live App" + name}
        >
            <AppIcon appName={name} />
            <span>{name}</span>
        </button>
    );
}