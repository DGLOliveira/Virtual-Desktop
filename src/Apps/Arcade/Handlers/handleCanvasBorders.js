export const handleCanvasBorders = (ctx, width, height) => {
    ctx.fillStyle = "silver";
    ctx.fillRect(0, 0, width, 1);
    ctx.fillRect(0, 0, 1, height);
    ctx.fillRect(width - 1, 0, 1, height);
    ctx.fillRect(0, height - 1, width, 1);
} 