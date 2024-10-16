document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    const historyList = document.getElementById('history-list');
    const clearHistoryBtn = document.getElementById('clear-history');
    const shareHistoryBtn = document.getElementById('share-history');

    let currentInput = '';
    let operator = null;
    let operand1 = null;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.value;

            if (value === 'C') {
                clearDisplay();
            } else if (value === '=') {
                calculate();
            } else if (['+', '-', '*', '/'].includes(value)) {
                setOperator(value);
            } else {
                appendValue(value);
            }
        });
    });

    clearHistoryBtn.addEventListener('click', clearHistory);
    shareHistoryBtn.addEventListener('click', shareHistory);

    function appendValue(value) {
        if (display.value === '0' && value !== '.') {
            display.value = value;
        } else {
            display.value += value;
        }
        currentInput += value;
    }

    function setOperator(op) {
        if (currentInput) {
            operand1 = parseFloat(currentInput);
            operator = op;
            currentInput = '';
            display.value = '';
        }
    }

    function calculate() {
        if (operator && operand1 !== null && currentInput) {
            const operand2 = parseFloat(currentInput);
            let result;
            switch (operator) {
                case '+':
                    result = operand1 + operand2;
                    break;
                case '-':
                    result = operand1 - operand2;
                    break;
                case '*':
                    result = operand1 * operand2;
                    break;
                case '/':
                    result = operand2 !== 0 ? operand1 / operand2 : 'Error';
                    break;
                default:
                    return;
            }
            display.value = result;
            addHistory(`${operand1} ${operator} ${operand2} = ${result}`);
            currentInput = result.toString();
            operator = null;
            operand1 = null;
        }
    }

    function clearDisplay() {
        display.value = '0';
        currentInput = '';
        operator = null;
        operand1 = null;
    }

    function addHistory(record) {
        const historyItem = document.createElement('li');
        historyItem.textContent = record;
        historyList.appendChild(historyItem);
        historyList.scrollTop = historyList.scrollHeight;
    }

    function clearHistory() {
        historyList.innerHTML = '';
    }

    function shareHistory() {
        const historyItems = [...historyList.querySelectorAll('li')].map(item => item.textContent).join('\n');
        if (historyItems) {
            navigator.clipboard.writeText(historyItems)
                .then(() => alert('Calculation history has been copied to the clipboard.'))
                .catch(() => alert('Failed to copy the history to the clipboard.'));
        } else {
            alert('There is no history to share.');
        }
    }

    // Support for keyboard input
    document.addEventListener('keydown', (e) => {
        if (e.key >= 0 && e.key <= 9 || e.key === '.') {
            appendValue(e.key);
        } else if (['+', '-', '*', '/'].includes(e.key)) {
            setOperator(e.key);
        } else if (e.key === 'Enter' || e.key === '=') {
            calculate();
        } else if (e.key === 'Backspace') {
            display.value = display.value.slice(0, -1);
            currentInput = currentInput.slice(0, -1);
        } else if (e.key === 'Escape') {
            clearDisplay();
        }
    });
});
