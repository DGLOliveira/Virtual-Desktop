import CheckValue from "./CheckValue.js";

export default function InputFunct(input, graph, setGraph) {
    let carry = 0;
    let key = graph.active;
    if (input === "=") {
        graph.draw = !graph.draw;
    } else if (input === "C") {
        graph[key].display = "";
        graph[key].calc = [];
    } else if (input === "←") {
        if (graph[key].calc.length >= 1) {
            graph[key].display = graph[key].display.slice(0, -1);
            if (
                CheckValue("Number", graph[key].calc[graph[key].calc.length - 1]) &&
                graph[key].calc[graph[key].calc.length - 1] >= 10
            ) {
                carry = Math.trunc(graph[key].calc[graph[key].calc.length - 1] / 10);
                graph[key].calc[graph[key].calc.length - 1] = carry;
            } else if (graph[key].calc[graph[key].calc.length - 1] === "𝑥") {
                //Special character "𝑥" is converted to "\uD835" instead of erased by string.splice(0,-1)
                //This section deals specifically with that nonsense by repeating the splice(0,-1)
                graph[key].display = graph[key].display.slice(0, -1);
                graph[key].calc.pop();
            } else if (graph[key].calc[graph[key].calc.length - 1].length > 1) {
                graph[key].display = graph[key].display.slice(
                    0,
                    -graph[key].calc[graph[key].calc.length - 1].length + 1,
                );
                graph[key].calc.pop();
            } else {
                graph[key].calc.pop();
            }
        } else {
            graph[key].display = "";
            graph[key].calc = [];
        }
    } else {
        if (
            CheckValue("Number", input) &&
            graph[key].calc[graph[key].calc.length - 1] === "."
        ) {
            graph[key].display = graph[key].display + String(input);
            graph[key].calc = [...graph[key].calc, String(input)];
        } else if (
            CheckValue("Number", input) &&
            graph[key].calc[graph[key].calc.length - 2] === "."
        ) {
            graph[key].calc[graph[key].calc.length - 1] =
                String(graph[key].calc[graph[key].calc.length - 1]) + String(input);
            graph[key].display = graph[key].display + String(input);
        } else if (
            CheckValue("Number", input) &&
            CheckValue("Number", graph[key].calc[graph[key].calc.length - 1])
        ) {
            carry = graph[key].calc[graph[key].calc.length - 1] * 10 + input;
            graph[key].calc.pop();
            graph[key].display = graph[key].display + input;
            graph[key].calc = [...graph[key].calc, carry];
        } else {
            graph[key].display = graph[key].display + input;
            graph[key].calc = [...graph[key].calc, input];
        }
    }
    setGraph({ ...graph });
};