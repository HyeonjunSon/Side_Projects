const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let operator = '';
let previousInput = '';

buttons.forEach(button => {
    button.addEventListener('click', function () {
        const value = this.value;

        if (value === 'C') {
            currentInput = '';
            operator = '';
            previousInput = '';
            display.value = '';
        } else if (value === '=') {
            if (previousInput && operator && currentInput) {
                currentInput = calculate(previousInput, operator, currentInput);
                display.value = currentInput;
                operator = '';
                previousInput = '';
            }
        } else if (['+', '-', '*', '/'].includes(value)) {
            if (currentInput) {
                previousInput = currentInput;
                currentInput = '';
                operator = value;
            }
        } else {
            currentInput += value;
            display.value = currentInput;
        }
    });
});

function calculate(num1, operator, num2) {
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);
    switch (operator) {
        case '+':
            return (n1 + n2).toString();
        case '-':
            return (n1 - n2).toString();
        case '*':
            return (n1 * n2).toString();
        case '/':
            return (n1 / n2).toString();
        default:
            return num2;
    }
}
