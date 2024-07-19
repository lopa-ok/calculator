let display = document.getElementById('display');
let currentInput = '';

function appendNumber(number) {
    currentInput += number;
    updateDisplay();
}

function appendOperator(operator) {
    currentInput += ` ${operator} `;
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    updateDisplay();
}

function calculateResult() {
    try {
        currentInput = eval(currentInput).toString();
        updateDisplay();
    } catch {
        currentInput = 'Error';
        updateDisplay();
        currentInput = '';
    }
}

function updateDisplay() {
    display.value = currentInput;
}
