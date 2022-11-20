//create variables for our html elements 
const numbers = document.querySelectorAll('.num')
const operations = document.querySelectorAll('.fun')
const equal = document.querySelector('[data-equal]')
const deleteBtn = document.querySelector('[data-delete]')
const clear = document.querySelector('[data-clear]')
const firstOutput = document.querySelector('.output1')
const lastOutput = document.querySelector('.output2')
const decimal = document.querySelector('.dec')

firstOutput.textContent = ' ';
lastOutput.textContent = ' ';

// create the basic ad, subtract, multiply and divide functions.
function add(a, b) {
    return (a) + (b);
}

function subtract(a, b) {
    return (a) - (b);
}

function multiply(a, b) {
    return (a) * (b)
}

function divide(a, b) {
        return (a) / (b)
}

// create the operation function.
function operate (a, b, operator) {
    switch (operator) {
        case '+': 
            return add(a, b);
        case '-':
           return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '÷':
            return divide(a, b);
    }
}


let lastNumber = '';
let clickedOperator = '';
let firstNumber = '';
let result 
lastOutput.textContent = 0;

// create a function to display the clicked numbers
numbers.forEach((num) => {
    num.addEventListener('click', () => {
        lastNumber += num.textContent;
        lastOutput.textContent = lastNumber;
    })
});

// create a function to disable the dismal button after one click.
decimal.addEventListener('click', () => {
    if (!lastOutput.textContent.includes('.')) {
        lastNumber += decimal.textContent;
        lastOutput.textContent = lastNumber;
    }
})

// create a function to take the clicked operator button.
operations.forEach((op) => {
    op.addEventListener('click', () => {
        if(firstNumber && lastNumber) {
            displayResult();
        } 
        firstNumber = lastNumber
        clickedOperator = op.textContent;
        firstOutput.textContent = lastNumber + clickedOperator;
        lastNumber = '';
        lastOutput.textContent = '';
    })
});

//create a function to display the result when the equal button is clicked.
equal.addEventListener('click', () => {
    if (clickedOperator === "÷" && lastNumber == '0') {
        alert("Error: You can't divide by zero")
        return;
    }
    if (!firstNumber == ""){
        result = roundResult(operate(Number(firstNumber), Number(lastNumber), clickedOperator))
        lastOutput.textContent = result;
        firstOutput.textContent = firstNumber + ' ' + clickedOperator + ' ' + lastNumber
    }else if (clickedOperator == "") {
        return;
    } else {
        firstNumber = 0;
        displayResult()
    }
})

// create a function to display the results.
function displayResult() {
    if (clickedOperator === "÷" && lastNumber == '0') {
        alert("Error: You can't divide by zero")
        return;
    }
    result = roundResult(operate(Number(firstNumber), Number(lastNumber), clickedOperator))
    lastOutput.textContent = result;
    firstOutput.textContent = firstNumber + ' ' + clickedOperator + ' ' + lastNumber
    lastNumber = result;
}

// create a function to clear the display when the clear button is clicked.
clear.addEventListener('click', () => {
    firstOutput.textContent = ' ';
    lastOutput.textContent = 0;
    firstNumber = '';
    lastNumber = '';
    clickedOperator = '';
})

//create a function to delete the last clicked button when the delete button is clicked.
deleteBtn.addEventListener('click', () => {
    lastNumber = lastNumber.toString().slice(0,-1)
    lastOutput.textContent = lastNumber
})

// create a function to round the result to 3 decimal numbers.
function roundResult (num) {
    return Math.round(num*1000)/1000
}