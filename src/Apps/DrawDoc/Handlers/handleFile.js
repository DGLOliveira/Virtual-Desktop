export const handleFile = (ctx, name, action, layers) => {

    const height = ctx.canvas.height;
    const width = ctx.canvas.width;

    const saveFile = () => {
        let finalCanvas = document.createElement("canvas");
        finalCanvas.width = width;
        finalCanvas.height = height;
        layers.forEach((layer) => {
            if (layer.visible) {
                finalCanvas.getContext("2d").drawImage(
                    document.getElementById(`drawCanvasLayer${layer.id}`),
                    0,
                    0
                );
            }
        })
        let downloadLink = document.createElement("a");
        downloadLink.setAttribute("download", name + ".png");
        let dataURL = finalCanvas.getContext("2d").canvas.toDataURL("image/png");
        let url = dataURL.replace(
            /^data:image\/png/,
            "data:application/octet-stream",
        );
        downloadLink.setAttribute("href", url);
        downloadLink.click();
    };
    const newFile = () => {
        const baseCanvas = document.getElementById(`drawCanvasLayer0`).getContext("2d");
        baseCanvas.fillStyle = "#FFFFFF";
        baseCanvas.fillRect(0, 0, width, height);
    };

    switch (action) {
        case "new":
            newFile();
            break;
        case "save":
            saveFile(ctx);
            break;
        default:
            break;
    }
}