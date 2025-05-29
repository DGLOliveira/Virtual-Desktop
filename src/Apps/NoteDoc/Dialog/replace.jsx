export default function dialogReplace(setAction, setAppDialog, args) {

    const title = "Replace";

    const info = <>
        <label htmlFor="Target">Target</label>
        <br />
        <input
            id="Target"
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
                setAction("Replace")
            }} />
        <br />
        <label htmlFor="Replace">Replace</label>
        <br />
        <input
            id="Replace"
            type="text"
            value={args.settings.searchParams.replaceString}
            onChange={(e) => {
                args.setSettings({
                    ...args.settings,
                    searchParams: {
                        ...args.settings.searchParams,
                        replace: true,
                        replaceString: e.target.value,
                        results: [],
                        index: -1
                    }
                });
                setAction("Replace")
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
                setAction("Replace");
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
                setAction("Replace");
            }}
        />
        <label htmlFor="Whole Word">Whole Word</label>
    </>;

    const actions = {
        "Replace Next": () => {
            setAction("Replace Next");
        },
        Close: () => {
            setAction("Close Replace");
        }
    };

    setAppDialog({ title, info, actions });
}