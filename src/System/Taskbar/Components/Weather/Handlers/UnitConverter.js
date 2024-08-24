export const unitConverter = (type, source, target, value) => {
    switch (type) {
        case "Temperature":
            switch (source) {
                case "°C":
                    switch (target) {
                        case "°C":
                            return value;
                        case "°F":
                            return ((value * 9 / 5) + 32).toFixed(1);
                        case "K":
                            return (value + 273.15).toFixed(1);
                    }
                case "°F":
                    switch (target) {
                        case "°C":
                            return ((value - 32) * 5 / 9).toFixed(1);
                        case "°F":
                            return value;
                        case "K":
                            return (((value - 32) * 5 / 9 + 273.15)).toFixed(1);
                    }
                case "K":
                    switch (target) {
                        case "°C":
                            return (value - 273.15).toFixed(1);
                        case "°F":
                            return (((value - 273.15) * 9 / 5 + 32)).toFixed(1);
                        case "K":
                            return value;
                    }
            }
        case "Precipitation":
            switch (source) {
                case "mm":
                    switch (target) {
                        case "mm":
                            return value;
                        case "in":
                            return (value / 25.4).toFixed(3);
                    }
                case "in":
                    switch (target) {
                        case "mm":
                            return (value * 25.4).toFixed(1);
                        case "in":
                            return value;
                    }
            }
        case "Wind":
            switch (source) {
                case "km/h":
                    switch (target) {
                        case "km/h":
                            return value;
                        case "mph":
                            return (value / 1.60934).toFixed(1);
                        case "m/s":
                            return (value / 3.6).toFixed(1);
                        case "ft/s":
                            return (value / 0.44704).toFixed(1);
                        case "knots":
                            return (value / 1.852).toFixed(1);
                    }
                case "mph":
                    switch (target) {
                        case "km/h":
                            return (value * 1.60934).toFixed(1);
                        case "mph":
                            return value;
                        case "m/s":
                            return (value * 0.44704).toFixed(1);
                        case "ft/s":
                            return (value * 0.868976).toFixed(1);
                        case "knots":
                            return (value / 1.15078).toFixed(1);
                    }
                case "m/s":
                    switch (target) {
                        case "km/h":
                            return (value * 3.6).toFixed(1);
                        case "mph":
                            return (value * 2.23694).toFixed(1);
                        case "m/s":
                            return value;
                        case "ft/s":
                            return (value * 3.28084).toFixed(1);
                        case "knots":
                            return (value / 0.51444).toFixed(1);
                    }
                case "ft/s":
                    switch (target) {
                        case "km/h":
                            return (value * 0.44704).toFixed(1);
                        case "mph":
                            return (value * 0.868976).toFixed(1);
                        case "m/s":
                            return (value * 0.3048).toFixed(1);
                        case "ft/s":
                            return value;
                        case "knots":
                            return (value / 1.68781).toFixed(1);
                    }
                case "knots":
                    switch (target) {
                        case "km/h":
                            return (value * 1.852).toFixed(1);
                        case "mph":
                            return (value * 1.15078).toFixed(1);
                        case "m/s":
                            return (value * 0.51444).toFixed(1);
                        case "ft/s":
                            return (value * 1.68781).toFixed(1);
                        case "knots":
                            return value;
                    }
            }
        case "Pressure":
            switch (source) {
                case "hPa":
                    switch (target) {
                        case "hPa":
                            return value;
                        case "psi":
                            return value / 68.9475729;
                        case "mmHg":
                            return value / 133.322368;
                        case "inHg":
                            return value / 3386.38;
                        case "atm":
                            return value / 1013.25;
                    }
                case "psi":
                    switch (target) {
                        case "hPa":
                            return value * 68.9475729;
                        case "psi":
                            return value;
                        case "mmHg":
                            return value * 6.89475729;
                        case "inHg":
                            return value * 0.0689475729;
                        case "atm":
                            return value / 14.6959487751941;
                    }
                case "mmHg":
                    switch (target) {
                        case "hPa":
                            return value * 133.322368;
                        case "psi":
                            return value * 0.0680459637;
                        case "mmHg":
                            return value;
                        case "inHg":
                            return value / 25.4;
                        case "atm":
                            return value / 760;
                    }
                case "inHg":
                    switch (target) {
                        case "hPa":
                            return value * 3386.38;
                        case "psi":
                            return value * 0.491154;
                        case "mmHg":
                            return value * 25.4;
                        case "inHg":
                            return value;
                        case "atm":
                            return value / 29.92126;
                    }
                case "atm":
                    switch (target) {
                        case "hPa":
                            return value * 1013.25;
                        case "psi":
                            return value * 14.6959487751941;
                        case "mmHg":
                            return value * 760;
                        case "inHg":
                            return value * 29.92126;
                        case "atm":
                            return value;
                    }
            }
        default:
            return value;
    }
}