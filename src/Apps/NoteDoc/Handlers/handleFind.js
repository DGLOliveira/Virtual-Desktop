export default function handleFind(action, args) {
    var indexArr = [];
    var selection = window.getSelection();
    const string = args.settings.searchParams.string;
    var targetIndex;

    function setSelection(node, startIndex, endIndex) {
        var range = document.createRange();
        range.setStart(node, startIndex);
        range.setEnd(node, endIndex);
        selection.addRange(range);
    }

    args.ref.current.focus();
    args.ref.current.childNodes.forEach((node, index) => {
        if (node.nodeName === "#text") {
            var flag = false;
            var startIndex = 0;
            var endIndex = 0;
            if (node.nodeValue.includes(string)
                && args.settings.searchParams.caseSensitive) {
                flag = true;
                startIndex = node.nodeValue.indexOf(string);
                endIndex = node.nodeValue.indexOf(string) + string.length;
            } else if (node.nodeValue.toLowerCase().includes(string.toLowerCase())
                && !args.settings.searchParams.caseSensitive) {
                flag = true;
                startIndex = node.nodeValue.toLowerCase().indexOf(string.toLowerCase());
                endIndex = node.nodeValue.toLowerCase().indexOf(string.toLowerCase()) + string.length;
            }
            flag && args.settings.searchParams.wholeWord
                && (startIndex === 0 || node.nodeValue[startIndex - 1] === " ")
                && (endIndex === node.nodeValue.length || node.nodeValue[endIndex] === " ")
                ? flag = true : flag = false;
            flag && indexArr.push({
                node: node,
                startIndex: startIndex,
                endNode: endIndex
            });
        }
    }
    );
    if (indexArr.length > 0) {
        if (indexArr.length === 1) {
            targetIndex = 0;
        } else if (args.settings.searchParams.index === -1) {
            action === "Find Next" ? targetIndex = 0 : targetIndex = indexArr.length - 1;
        } else if (args.settings.searchParams.index === indexArr.length - 1) {
            action === "Find Next" ? targetIndex = 0 : targetIndex = args.settings.searchParams.index - 1;
        } else if (args.settings.searchParams.index === 0) {
            action === "Find Next" ? targetIndex = 1 : targetIndex = indexArr.length - 1;
        } else {
            action === "Find Next" ? targetIndex = args.settings.searchParams.index + 1 : targetIndex = args.settings.searchParams.index - 1;
        }
        selection.removeAllRanges();
        setSelection(indexArr[targetIndex].node, indexArr[targetIndex].startIndex, indexArr[targetIndex].endNode);
    }
    args.setSettings({ ...args.settings, searchParams: { ...args.settings.searchParams, results: indexArr, index: targetIndex } });
}