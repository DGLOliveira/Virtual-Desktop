export default function handleFindReplace(action, args) {
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
            if(flag && args.settings.searchParams.wholeWord){
                (startIndex === 0 || node.nodeValue[startIndex - 1] === " ")
                && (endIndex === node.nodeValue.length || node.nodeValue[endIndex] === " ")
                ? flag = true : flag = false;
            }
            flag && indexArr.push({
                node: node,
                startIndex: startIndex,
                endIndex: endIndex
            });
        }
    }
    );
    if (indexArr.length > 0) {
        var isNext = action === "Find Next" || action === "Replace Next";
        if (indexArr.length === 1) {
            targetIndex = 0;
        } else if (args.settings.searchParams.index === -1) {
            isNext ? targetIndex = 0 : targetIndex = indexArr.length - 1;
        } else if (args.settings.searchParams.index === indexArr.length - 1) {
            isNext ? targetIndex = 0 : targetIndex = args.settings.searchParams.index - 1;
        } else if (args.settings.searchParams.index === 0) {
            isNext ? targetIndex = 1 : targetIndex = indexArr.length - 1;
        } else {
            isNext ? targetIndex = args.settings.searchParams.index + 1 : targetIndex = args.settings.searchParams.index - 1;
        }
        selection.removeAllRanges();
    if(args.settings.searchParams.replaceString !== ""
        && args.settings.searchParams.replace
    ){
        var ogString = indexArr[targetIndex].node.nodeValue; 
        indexArr[targetIndex].node.nodeValue = ogString.slice(0, indexArr[targetIndex].startIndex) + args.settings.searchParams.replaceString + ogString.slice(indexArr[targetIndex].endIndex);
        setSelection(indexArr[targetIndex].node, indexArr[targetIndex].startIndex, indexArr[targetIndex].startIndex + args.settings.searchParams.replaceString.length);
        indexArr.splice(targetIndex, 1);
        targetIndex = targetIndex - 1;
    }else{
        setSelection(indexArr[targetIndex].node, indexArr[targetIndex].startIndex, indexArr[targetIndex].endIndex);
    }
    }
    args.setSettings({ ...args.settings, searchParams: { ...args.settings.searchParams, results: indexArr, index: targetIndex } });
}