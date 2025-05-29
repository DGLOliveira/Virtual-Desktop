export default function handleFind(args) {
    var indexArr = [];
    var selection = window.getSelection();

    function setSelection(node, startIndex, endIndex) {
        var range = document.createRange();
        range.setStart(node, startIndex);
        range.setEnd(node, endIndex);
        selection.addRange(range);
    }

    args.ref.current.focus();
    args.ref.current.childNodes.forEach((node, index) => {
        if (node.nodeName === "#text") {
            if (node.nodeValue.includes(args.settings.findString)) {
                indexArr.push({
                    node: node,
                    startIndex: node.nodeValue.indexOf(args.settings.findString),
                    endNode: node.nodeValue.indexOf(args.settings.findString) + args.settings.findString.length
                });
                setSelection(indexArr[indexArr.length - 1].node, indexArr[indexArr.length - 1].startIndex, indexArr[indexArr.length - 1].endNode);
            }
        }
    })
    if (indexArr.length > 0)
        selection.removeAllRanges();
        indexArr.forEach((value, index) => {
            setSelection(value.node, value.startIndex, value.endNode);
        });
    console.log(indexArr);
}