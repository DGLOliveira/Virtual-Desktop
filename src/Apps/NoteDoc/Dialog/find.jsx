export default function dialogFind(setAction, setAppDialog, args) {

    const title = "Find";

    const info = <>
        <label htmlFor="Find">Find</label>
        <br />
        <input
            id="Find"
            type="text"
            value={args.settings.searchParams.string}
            onChange={(e) => {
                args.setSettings({
                    ...args.settings,
                    searchParams: {
                        ...args.settings.searchParams,
                        string: e.target.value,
                        results: [],
                        index: -1
                    }
                });
                setAction("Find")
            }} />
        <br />
        <input
            id="Case Sensitive"
            type="checkbox"
            checked={args.settings.searchParams.caseSensitive}
            onChange={(e) => {
                args.setSettings({
                    ...args.settings,
                    searchParams: {
                        ...args.settings.searchParams,
                        caseSensitive: e.target.checked,
                        results: [],
                        index: -1
                    }
                });
                setAction("Find");
            }}
        />
        <label htmlFor="Case Sensitive">Case Sensitive</label>
        <br />
        <input
            id="Whole Word"
            type="checkbox"
            checked={args.settings.searchParams.wholeWord}
            onChange={(e) => {
                args.setSettings({
                    ...args.settings,
                    searchParams: {
                        ...args.settings.searchParams,
                        wholeWord: e.target.checked,
                        results: [],
                        index: -1
                    }
                });
                setAction("Find");
            }}
        />
        <label htmlFor="Whole Word">Whole Word</label>
    </>;

    const actions = {
        "Find Next": () => {
            setAction("Find Next");
        },
        "Find Previous": () => {
            setAction("Find Previous");
        },
        Close: () => {
            setAction("Close Find");
        }
    };

    setAppDialog({ title, info, actions });
}