export const handleFile = (ctx, name, action) => {

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
    const newFile = (ctx) => {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, width, height);
    };

    switch (action) {
        case "new":
            newFile(ctx);
            break;
        case "save":
            saveFile(ctx);
            break;
        default:
            break;
    }
}