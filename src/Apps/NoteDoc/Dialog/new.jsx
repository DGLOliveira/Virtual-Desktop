export default function dialogNew(setAction, setAppDialog, args) {

    let title = "New File";

    const info = <>
        <label htmlFor="New title">Title</label>
        <br />
        <input
            id="New title"
            type="text"
            value={args.settings.newTitle}
            onChange={(e) => { args.setSettings({ ...args.settings, newTitle: e.target.value }); setAction("New") }} />
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