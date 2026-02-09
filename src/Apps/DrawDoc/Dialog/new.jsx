export const dialogNew = (context, setAction, setAppDialog) => {


    context.setTempDimentions({ width: context.dimentions.width, height: context.dimentions.height });

    let title = "New File";

    const info = <>
        <label htmlFor="New title">Name</label>
        <br />
        <input
            id="New title"
            type="text"
            value={context.name}
            onChange={(e) => { context.setName(e.target.value); setAction("New") }} />
        <br />
        <label htmlFor="Width">Width</label>
        <br />
        <input
            id="Width"
            type="number"
            value={context.tempDimentions.width}
            onChange={(e) => { context.setTempDimentions({ ...context.tempDimentions, width: e.target.value }); setAction("New") }} />
        <br />
        <label htmlFor="Height">Height</label>
        <br />
        <input
            id="Height"
            type="number"
            value={context.tempDimentions.height}
            onChange={(e) => { context.setTempDimentions({ ...context.tempDimentions, height: e.target.value }); setAction("New") }} />
        <br />
    </>;


    const actions = {
        Confirm: () => {
            context.setDimentions({...context.tempDimentions});
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