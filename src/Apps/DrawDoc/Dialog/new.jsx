export const dialogNew = (context, setAction, setAppDialog) => {


    context.setNewParams({ ...context.newParams, width: context.dimentions.width, height: context.dimentions.height, name: context.name, alpha: context.useAlpha });

    let title = "New File";

    const info = <>
        <label htmlFor="New title">Name</label>
        <br />
        <input
            id="New title"
            type="text"
            value={context.newParams.name}
            onChange={(e) => { context.setNewParams({ ...context.newParams, name: e.target.value }); setAction("New") }} />
        <br />
        <label htmlFor="Width">Width</label>
        <br />
        <input
            id="Width"
            type="number"
            value={context.newParams.width}
            onChange={(e) => { context.setNewParams({ ...context.newParams, width: e.target.value }); setAction("New") }} />
        <br />
        <label htmlFor="Height">Height</label>
        <br />
        <input
            id="Height"
            type="number"
            value={context.newParams.height}
            onChange={(e) => { context.setNewParams({ ...context.newParams, height: e.target.value }); setAction("New") }} />
        <br />
        <label htmlFor="Alpha">Alpha</label>
        <br />
        <input
            id="Alpha"
            type="checkbox"
            checked={context.newParams.alpha}
            onChange={(e) => { context.setNewParams({ ...context.newParams, alpha: e.target.checked }); setAction("New") }} />
        <br />
    </>;


    const actions = {
        Confirm: () => {
            context.setDimentions({ height: context.newParams.height, width: context.newParams.width });
            context.setName(context.newParams.name);
            context.setUseAlpha(context.newParams.alpha);
            setAction("New Confirm");
            setAppDialog(null);
        },
        Cancel: () => {
            setAppDialog(null);
            setAction("Cancel Dialog");
        }
    }

    setAppDialog({ title: title, info: info, actions: actions });
}