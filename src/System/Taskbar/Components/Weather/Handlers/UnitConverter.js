export const unitConverter = (type, source, target, value) => {
    let val = Number(value);
    switch (type) {
        case "Temperature":
            switch (source) {
                case "°C":
                    switch (target) {
                        case "°C":
                            return val;
                        case "°F":
                            return ((val * 9 / 5) + 32).toFixed(1);
                        case "K":
                            return (val + 273.15).toFixed(1);
                    }
                case "°F":
                    switch (target) {
                        case "°C":
                            return ((val - 32) * 5 / 9).toFixed(1);
                        case "°F":
                            return val;
                        case "K":
                            return ((val - 32) * 5 / 9 + 273.15).toFixed(1);
                    }
                case "K":
                    switch (target) {
                        case "°C":
                            return (val - 273.15).toFixed(1);
                        case "°F":
                            return ((val - 273.15) * 9 / 5 + 32).toFixed(1);
                        case "K":
                            return val;
                    }
            }
        case "Precipitation":
            switch (source) {
                case "mm":
                    switch (target) {
                        case "mm":
                            return val;
                        case "in":
                            return (val / 25.4).toFixed(3);
                    }
                case "in":
                    switch (target) {
                        case "mm":
                            return (val * 25.4).toFixed(1);
                        case "in":
                            return val;
                    }
            }
        case "Wind":
            switch (source) {
                case "km/h":
                    switch (target) {
                        case "km/h":
                            return val;
                        case "mph":
                            return (val / 1.60934).toFixed(1);
                        case "m/s":
                            return (val / 3.6).toFixed(1);
                        case "ft/s":
                            return (val / 0.44704).toFixed(1);
                        case "knots":
                            return (val / 1.852).toFixed(1);
                    }
                case "mph":
                    switch (target) {
                        case "km/h":
                            return (val * 1.60934).toFixed(1);
                        case "mph":
                            return val;
                        case "m/s":
                            return (val * 0.44704).toFixed(1);
                        case "ft/s":
                            return (val * 0.868976).toFixed(1);
                        case "knots":
                            return (val / 1.15078).toFixed(1);
                    }
                case "m/s":
                    switch (target) {
                        case "km/h":
                            return (val * 3.6).toFixed(1);
                        case "mph":
                            return (val * 2.23694).toFixed(1);
                        case "m/s":
                            return val;
                        case "ft/s":
                            return (val * 3.28084).toFixed(1);
                        case "knots":
                            return (val / 0.51444).toFixed(1);
                    }
                case "ft/s":
                    switch (target) {
                        case "km/h":
                            return (val * 0.44704).toFixed(1);
                        case "mph":
                            return (val * 0.868976).toFixed(1);
                        case "m/s":
                            return (val * 0.3048).toFixed(1);
                        case "ft/s":
                            return val;
                        case "knots":
                            return (val / 1.68781).toFixed(1);
                    }
                case "knots":
                    switch (target) {
                        case "km/h":
                            return (val * 1.852).toFixed(1);
                        case "mph":
                            return (val * 1.15078).toFixed(1);
                        case "m/s":
                            return (val * 0.51444).toFixed(1);
                        case "ft/s":
                            return (val * 1.68781).toFixed(1);
                        case "knots":
                            return val;
                    }
            }
        case "Pressure":
            switch (source) {
                case "hPa":
                    switch (target) {
                        case "hPa":
                            return val;
                        case "psi":
                            return val / 68.9475729;
                        case "mmHg":
                            return val / 133.322368;
                        case "inHg":
                            return val / 3386.38;
                        case "atm":
                            return val / 1013.25;
                    }
                case "psi":
                    switch (target) {
                        case "hPa":
                            return val * 68.9475729;
                        case "psi":
                            return val;
                        case "mmHg":
                            return val * 6.89475729;
                        case "inHg":
                            return val * 0.0689475729;
                        case "atm":
                            return val / 14.6959487751941;
                    }
                case "mmHg":
                    switch (target) {
                        case "hPa":
                            return val * 133.322368;
                        case "psi":
                            return val * 0.0680459637;
                        case "mmHg":
                            return val;
                        case "inHg":
                            return val / 25.4;
                        case "atm":
                            return val / 760;
                    }
                case "inHg":
                    switch (target) {
                        case "hPa":
                            return val * 3386.38;
                        case "psi":
                            return val * 0.491154;
                        case "mmHg":
                            return val * 25.4;
                        case "inHg":
                            return val;
                        case "atm":
                            return val / 29.92126;
                    }
                case "atm":
                    switch (target) {
                        case "hPa":
                            return val * 1013.25;
                        case "psi":
                            return val * 14.6959487751941;
                        case "mmHg":
                            return val * 760;
                        case "inHg":
                            return val * 29.92126;
                        case "atm":
                            return val;
                    }
            }
        default:
            return val;
    }
}