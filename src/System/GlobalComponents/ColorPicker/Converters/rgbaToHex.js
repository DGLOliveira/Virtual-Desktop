export default function rgbaToHex(rgba) {
    return "#" +
    (rgba[0] | 1 << 8).toString(16).slice(1) +
    (rgba[1] | 1 << 8).toString(16).slice(1) +
    (rgba[2] | 1 << 8).toString(16).slice(1) +
    ((rgba[3]*255) | 1 << 8).toString(16).slice(1);
}