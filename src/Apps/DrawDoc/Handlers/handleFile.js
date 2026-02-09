export const handleFile = (ctx, context, action, layers, setAction) => {

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
        downloadLink.setAttribute("download", context.name + ".png");
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

    const openFile = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                const image = new Image();
                image.onload = () => {
                    const baseCanvas = document.getElementById(`drawCanvasLayer0`);
                    baseCanvas.width = image.width;
                    baseCanvas.height = image.height;
                    context.setDimentions({width: image.width, height: image.height});
                    context.setName(file.name);
                    const baseCtx = baseCanvas.getContext("2d");
                    baseCtx.drawImage(image, 0, 0);
                    setAction("Open Confirm");
                };
                image.src = reader.result;
            };
            reader.readAsDataURL(file);
        };
        input.click();

    }

    const uploadImage = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.onchange = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                const image = new Image();
                image.onload = () => {
                    const tempCanvas = document.createElement("canvas");
                    tempCanvas.width = image.width;
                    tempCanvas.height = image.height;
                    const tempCtx = tempCanvas.getContext("2d");
                    tempCtx.drawImage(image, 0, 0);
                    const data = tempCtx.getImageData(0, 0, image.width, image.height);
                    context.setClipboard({ data: data, state: "carry" });
                    context.setTool("Select");
                    setAction("clipping");
                };
                image.src = reader.result;
            };
            reader.readAsDataURL(file);
        };
        input.click();
    }

    switch (action) {
        case "new":
            newFile();
            break;
        case "save":
            saveFile(ctx);
            break;
        case "open":
            openFile(ctx);
            break;
        case "image":
            uploadImage(ctx);
            break;
        default:
            break;
    }
}