export const dialogNew = (context, setAction, setAppDialog) => {

    let title = "New File";

    const info = <>
        <label htmlFor="New title">Name</label>
        <br/>
        <input
            id="New title"
            type="text"
            value={context.name}
            onChange={(e) => {context.setName(e.target.value);setAction("New") }} />
        <br />
        <label htmlFor="Width">Width</label>
        <br/>
        <input
            id="Width"
            type="number"
            value={context.dimention.width}
            onChange={(e) => {context.setDimention({ ...context.dimention, width: e.target.value });setAction("New")}} />
        <br />
        <label htmlFor="Height">Height</label>
        <br/>
        <input
            id="Height"
            type="number"
            value={context.dimention.height}
            onChange={(e) => {context.setDimention({ ...context.dimention, height: e.target.value });setAction("New")}} />
        <br />
    </>;

    
    const actions = {
        Confirm: () => {
            setAction("New Confirm");
            setAppDialog(null);
        },
        Cancel: () => {
            setAppDialog(null);
            setAction(false);
        }
    }
    
    setAppDialog({ title: title, info: info, actions: actions });
}