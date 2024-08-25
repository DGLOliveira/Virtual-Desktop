export default function nameToHsl(name) {
    switch(name){
        case "red":
            return [0, 100, 50];
        case "green":
            return [120, 100, 50];
        case "blue":
            return [240, 100, 50];
        case "yellow":
            return [60, 100, 50];
        case "cyan":
            return [180, 100, 50];
        case "magenta":
            return [300, 100, 50];
        case "black":
            return [0, 0, 0];
        case "white":
            return [0, 0, 100];
        case "gray":
        case "grey":
            return [0, 0, 50];
        case "lightgray":
        case "lightgrey":
            return [0, 0, 75];
        case "darkgray":
        case "darkgrey":
            return [0, 0, 25];
        case "brown":
            return [30, 50, 50];
        case "orange":
            return [30, 100, 50];
        case "purple":
            return [270, 100, 50];
        case "pink":
            return [330, 100, 50];
        case "lime":
            return [120, 100, 50];
        case "teal":
            return [180, 100, 50];
        case "aqua":
            return [240, 100, 50];
        case "maroon":
            return [0, 100, 50];
        case "navy":
            return [240, 100, 50];
        case "olive":
            return [60, 100, 50];
        default:
            return [0, 0, 0];
    }
}