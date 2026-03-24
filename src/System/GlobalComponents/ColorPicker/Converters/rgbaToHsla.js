export default function rgbaToHsla(rgba) {
    var r = rgba[0],
        g = rgba[1],
        b = rgba[2],
        a = rgba[3];
        r /= 255;
        g /= 255;
        b /= 255;
        let cmin = Math.min(r, g, b),
            cmax = Math.max(r, g, b),
            delta = cmax - cmin,
            h = 0,
            s = 0,
            l = ((cmax + cmin) / 2);
        if (delta === 0) {
            s = 0;
            h = 0;
        }else {
            if (l <= 0.5) {
                s = delta / (cmax + cmin);
            } else {
                s = delta / (2 - cmax-cmin);
            };
            if (cmax === r) {
                h = (g - b) / delta;
            } else if (cmax === g) {
                h = ((b - r) / delta) + 2;
            } else if(cmax === b) {
                h = ((r - g) / delta) + 4;
            }
        }
        h = Math.round(h * 60);
        if (h < 0) {
            h += 360;
        }
        s = Math.abs(s * 100).toFixed(0);
        l = (l * 100 ).toFixed(0);
        let hsla = [Number(h), Number(s), Number(l), Number(a)];
        return hsla;
    }