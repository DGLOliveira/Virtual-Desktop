export default function hexToRgba(hex) {
    var result;
    if (hex.length === 5) {
        result = /^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i.exec(hex);
        if(result[4] == 0){
            result[4] = 'ff';
        }
    } else if(hex.length === 9) {
        result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    }else if(hex.length === 8) {
        result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        result[4] = 'ff';
    }
        return result
            ? [
                parseInt(result[1], 16),
                parseInt(result[2], 16),
                parseInt(result[3], 16),
                parseInt(result[4], 16) / 255,
            ]
            : null;
}