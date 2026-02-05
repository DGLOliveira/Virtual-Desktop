export const handleFile = (ctx, name, action, layers) => {

    const height = ctx.canvas.height;
    const width = ctx.canvas.width;

    const saveFile = (ctx) => {
        let downloadLink = document.createElement("a");
        downloadLink.setAttribute("download", name + ".png");
        let dataURL = ctx.canvas.toDataURL("image/png");
        let url = dataURL.replace(
            /^data:image\/png/,
            "data:application/octet-stream",
        );
        downloadLink.setAttribute("href", url);
        downloadLink.click();
    };
    const newFile = () => {
        const baseCanvas = document.getElementById(`drawCanvasLayer${layers[0].id}`).getContext("2d");
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