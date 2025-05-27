export default function dialogChangeName(setAction, setAppDialog, args){

    const title = "Change Title";

    const info = <>
        <label htmlFor="New title">Title</label>
        <br />
        <input
            id="New title"
            type="text"
            value={args.settings.newTitle}
            onChange={(e) => { args.setSettings({ ...args.settings, newTitle: e.target.value }); setAction("Change Title") }} />
        <br />
    </>;

    const actions = {
        Confirm: () => {
            setAction("Change Title Confirm");
        },
        Cancel: () => {
            setAction("Change Title Cancel");
        }
    };

    setAppDialog({ title, info, actions });
}