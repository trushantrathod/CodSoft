let display = document.getElementById('display');
let isOperatorClicked = false;

function clearDisplay() {
    display.textContent = '0';
    isOperatorClicked = false;
}

function appendToDisplay(value) {
    if (isOperatorClicked) {
        // If an operator was clicked, start a new expression with the entered digit
        display.textContent = value;
        isOperatorClicked = false;
    } else {
        // Otherwise, append the digit to the current display
        if (value === '.' && display.textContent.includes('.')) {
            // Avoid adding multiple decimal points
            return;
        }
        if (display.textContent === '0' && value !== '.') {
            display.textContent = value;
        } else {
            display.textContent += value;
        }
    }
}

function backspace() {
    let currentDisplay = display.textContent;
    display.textContent = currentDisplay.slice(0, -1);
}

function calculateResult() {
    try {
        const expression = display.textContent;
        const sanitizedExpression = expression.replace(/[^-()\d/*+.]/g, '');
        const result = new Function(`return ${sanitizedExpression}`)();

        if (Number.isFinite(result)) {
            display.textContent = parseFloat(result.toFixed(10));
        } else {
            display.textContent = 'Error';
        }

        isOperatorClicked = true;
    } catch (error) {
        display.textContent = 'Error';
    }
}
