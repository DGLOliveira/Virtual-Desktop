export default function rgbaToHex(rgba) {
    let a = rgba[3]*255;
    return "#" + ((1 << 32) + (rgba[0] << 24) + (rgba[1] << 16) + (rgba[2] << 8) + a).toString(16).slice(1);
}