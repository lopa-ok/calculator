let display = document.getElementById('display');
let currentInput = '';
let powerMode = false;
let powerBase = '';

function appendNumber(number) {
    currentInput += number;
    updateDisplay();
}

function appendOperator(operator) {
    currentInput += ` ${operator} `;
    updateDisplay();
}

function appendFunction(func, arg = '') {
    if (func === 'Math.pow(' && arg === '') {
        powerMode = true;
        powerBase = currentInput;
        currentInput += '^';
    } else if (func === 'Math.pow(') {
        currentInput = `${func}${currentInput},${arg})`;
    } else {
        currentInput += func;
    }
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    powerMode = false;
    powerBase = '';
    updateDisplay();
}

function calculateResult() {
    if (powerMode) {
        const parts = currentInput.split('^');
        currentInput = `Math.pow(${parts[0]},${parts[1]})`;
    }
    try {
        currentInput = eval(currentInput.replace(/sqrt/g, 'Math.sqrt')
                                      .replace(/sin/g, 'Math.sin')
                                      .replace(/cos/g, 'Math.cos')
                                      .replace(/tan/g, 'Math.tan')
                                      .replace(/log/g, 'Math.log10')).toString();
        updateDisplay();
    } catch {
        currentInput = 'Error';
        updateDisplay();
        currentInput = '';
    }
    powerMode = false;
    powerBase = '';
}

function updateDisplay() {
    display.value = currentInput;
}
