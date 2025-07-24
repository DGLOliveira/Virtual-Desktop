import CheckValue from "./CheckValue.js";

export default function InputGraphWindow(input, graph, setGraph) {
    let key = 0;
    if (graph.window.active === "maxx" || graph.window.active === "maxy") {
        key = 1;
    }
    let target = graph.window[graph.window.active.slice(3, 4)];
    if (CheckValue("Number", input)) {
        if (CheckValue("Number", target[key])) {
            if (Math.floor(target[key]) === target[key]) {
                if (graph.window.decimal) {
                    target[key] = target[key] + input / 10;
                } else {
                    target[key] = target[key] * 10 + input;
                }
            } else {
                let numberDecimals = Number(
                    String(
                        Number(
                            Math.abs(target[key] - Math.trunc(target[key])).toFixed(15),
                        ),
                    ).length - 1,
                );
                if (numberDecimals <= 14) {
                    target[key] = target[key] + input / Math.pow(10, numberDecimals+1);
                }
            }
            graph.window.decimal = false;
        } else if (target[key] === 0) {
            target[key] = input;
        } else {
            target[key] = target[key] + input;
        }
    } else if (input === ".") {
        graph.window.decimal = !graph.window.decimal;
    } else if (input === "-") {
        target[key] = -target[key];
    } else if (input === "C") {
        target[key] = 0;
    } else if (input === "←") {
        if (String(target[key]).length > 1) {
            let carry = Number(String(target[key]).slice(0, -1));
            if (CheckValue("Number", carry)) {
                target[key] = carry;
            } else {
                target[key] = 0;
            }
        } else {
            target[key] = 0;
        }
    } else if (input === "=") {
        graph.draw = !graph.draw;
    }
    setGraph({ ...graph });
};