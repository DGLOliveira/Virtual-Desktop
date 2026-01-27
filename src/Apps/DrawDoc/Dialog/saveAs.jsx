export const dialogSaveAs = (context, setAction, setAppDialog) => {

    const title = "Download As";

    const info = <>
        <label htmlFor="New Name">Name</label>
        <br />
        <input
            id="New name"
            type="text"
            value={context.name}
            onChange={(e) => { context.setName(e.target.value); setAction("Change Name") }} />
        <br />
    </>;

    const actions = {
        Confirm: () => {
            setAction("Save");
            setAppDialog(null);
        },
        Cancel: () => {
            setAppDialog(null);
            setAction(false);
        }
    };

    setAppDialog({ title: title, info: info, actions: actions });
}