export const dialogChangeName = (context, setAction, setAppDialog) => {

    const title = "Change Name";

    const info = <>
        <label htmlFor="New title">Name</label>
        <br />
        <input
            id="New title"
            type="text"
            value={context.name}
            onChange={(e) => { context.setName(e.target.value); setAction("Change Name") }} />
        <br />
    </>;

    const actions = {
        Confirm: () => {
            setAction("Change Name Confirm");
            setAppDialog(null);
        },
        Cancel: () => {
            setAppDialog(null);
            setAction(false);
        }
    };

    setAppDialog({ title: title, info: info, actions: actions });
}