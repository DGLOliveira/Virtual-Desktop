export function handleHistory(
    command,
    newPath,
    history,
    setHistory,
    historyIndex,
    setHistoryIndex,
    setCanBack,
    setCanForward) {

    const MAX_HISTORY_LENGTH = 50;

    switch (command) {
        case "add":
            if (history.length < MAX_HISTORY_LENGTH) {
                setHistory([...history, newPath]);
                setHistoryIndex(history.length + 1);
                setCanBack(true);
                if (history.length > historyIndex) {
                    setCanForward(true);
                } else {
                    setCanForward(false);
                }
            } else {
                setHistory([...history.slice(1), newPath]);
                if (history.length === historyIndex) {
                    setCanForward(false);
                } else {
                    setCanForward(true);
                }
            }
            break;
        case "back":
            if (history.length > 1) {
                setHistoryIndex(historyIndex - 1);
                setCanForward(true);
                if (historyIndex === 1) {
                    setCanBack(false);
                }
            }
            break;
        case "forward":
            if (history.length > historyIndex) {
                setHistoryIndex(historyIndex + 1);
                setCanBack(true);
                if (historyIndex === history.length - 1) {
                    setCanForward(false);
                }
            }
            break;
        default:
            break;
    }
}