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

function appendFunction(func) {
    switch (func) {
        case 'sqrt':
            currentInput += '√(';
            break;
        case 'square':
            currentInput += '^2';
            break;
        case 'cube':
            currentInput += '^3';
            break;
        case 'power':
            powerMode = true;
            powerBase = currentInput;
            currentInput += '^';
            break;
        case 'sin':
            currentInput += 'sin(';
            break;
        case 'cos':
            currentInput += 'cos(';
            break;
        case 'tan':
            currentInput += 'tan(';
            break;
        case 'log':
            currentInput += 'log(';
            break;
    }
    updateDisplay();
}

function appendBracket(bracket) {
    currentInput += bracket;
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    powerMode = false;
    powerBase = '';
    updateDisplay();
}

function backspace() {
    currentInput = currentInput.trim();
    if (currentInput.endsWith(' ')) {
        currentInput = currentInput.slice(0, -3);
    } else if (currentInput.endsWith('^')) {
        powerMode = false;
        powerBase = '';
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
}

function calculateResult() {
    if (powerMode) {
        const parts = currentInput.split('^');
        currentInput = `Math.pow(${parts[0]},${parts[1]})`;
    }
    try {
        currentInput = eval(currentInput
            .replace(/√/g, 'Math.sqrt')
            .replace(/sin/g, 'Math.sin')
            .replace(/cos/g, 'Math.cos')
            .replace(/tan/g, 'Math.tan')
            .replace(/log/g, 'Math.log10')
            .replace(/\^2/g, '**2')
            .replace(/\^3/g, '**3')
        ).toString();
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
