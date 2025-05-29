export default function dialogFind(setAction, setAppDialog, args){

    const title = "Find";

    const info = <>
        <label htmlFor="Find">Find</label>
        <br />
        <input
            id="Find"
            type="text"
            value={args.settings.findString}
            onChange={(e) => { args.setSettings({ ...args.settings, findString: e.target.value }); setAction("Find")}} />
        <br />
    </>;

    const actions = {
        Find: () => {
            setAction("Search Find");
        },
        Close: () => {
            setAction("Close Find");
        }
    };

    setAppDialog({ title, info, actions });
}