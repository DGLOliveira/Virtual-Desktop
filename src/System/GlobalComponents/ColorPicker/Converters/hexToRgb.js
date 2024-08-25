export default function hexToRgb(hex) {
    var result;
    if(hex.length === 4){
        result = /^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i.exec(hex);
    }else{
        result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    }
    return result
        ? [
               parseInt(result[1], 16),
               parseInt(result[2], 16),
               parseInt(result[3], 16),
          ]
        : null;
}