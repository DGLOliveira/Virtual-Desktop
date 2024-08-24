export const handleAction = (action, setAction, args) => {
    switch (action) {
        case "Basic":
            args.setCalculatorState({...args.calculatorState, type: "Basic"});
            setAction(false);
            break;
        case "Scientific":
            args.setCalculatorState({...args.calculatorState, type: "Scientific"});
            setAction(false);
            break;
        case "Graphic":
            args.setCalculatorState({...args.calculatorState, type: "Graphic"});
            setAction(false);
            break;
        case false:
            break;
        default:
            setAction(false);
            break;
    }
}