let num1 = null;
let num2 = null;
let operator = "equal";
let solution = null;

let numButtons = document.querySelectorAll(".numButtons");
let opButtons = document.querySelectorAll(".opButtons");
let equalButton = document.querySelector("#equalButton");
let clearButton = document.querySelector("#clearButton");
let inputValue = document.querySelector("#inputValue");
let outputValue = document.querySelector("#outputValue");

let clearValueOnNextInputFlag = false;


clearButton.addEventListener('click', ()=>{
    num1 = null;
    num2 = null;
    solution = null;
    inputValue.textContent = "0";
    outputValue.textContent = "0";
})

numButtons.forEach(numButton => {
    numButton.addEventListener('click',event=>{
        updateInputValue(event.target.textContent);
    });
});

opButtons.forEach(opButton=>{
    opButton.addEventListener('click',event=>{
        highlightOpIcon(event.target.id);
        if (num1) {
            num2 = parseInt(inputValue.textContent)
            solution = operate(operator,num1,num2);
            outputValue.textContent = roundIfDecimal(solution);
            console.log(num1,operator,num2,"=",solution);
            num1 = solution;  
        } else {
            num1 = parseInt(inputValue.textContent);
        }
        operator = selectOperation(event.target.id);
        clearValueOnNextInputFlag = true;
    });
});

equalButton.addEventListener('click',event=>{
    num2 = parseInt(inputValue.textContent);
    solution = operate(operator,num1,num2);
    outputValue.textContent = roundIfDecimal(solution);
    clearValueOnNextInputFlag = true;
    console.log(num1,operator,num2,"=",solution);
    num1 = solution;
});

function roundIfDecimal(num) {
    return ( num % 1 !== 0 ? num.toFixed(9) : num);
}

function operate(operator,num1,num2) {
    switch (operator) {
        case "plus":
            return num1+num2;
        case "minus":
            return num1-num2;
        case "multiply":
            return num1*num2;
        case "divide":
            return num1/num2;
        }
}

function selectOperation(opButton) {
    switch (opButton) {
        case "plusButton":
            return "plus";
        case "minusButton":
            return "minus";
        case "multiplyButton":
            return "multiply";
        case "divideButton":
            return "divide";
        default:
            console.log("Invalid case in selectOperation");
        }
}

function updateInputValue(numButton) {
    let inputValueDisplay = document.querySelector("#inputValue");
    if (inputValueDisplay.textContent === "0" || clearValueOnNextInputFlag) {
        inputValueDisplay.textContent = numButton;
        clearValueOnNextInputFlag = false;
    } else {
        let inputValueArray = Array.from(inputValueDisplay.textContent);
        inputValueArray.push(numButton);
        inputValueDisplay.textContent = inputValueArray.join("");    
    }
}



function highlightOpIcon(opButton) {
    let highlightIconId = ""
    switch (opButton) {
        case "plusButton":
            highlightIconId = "plusIcon";
            break;
        case "minusButton":
            highlightIconId = "minusIcon";
            break;
        case "multiplyButton":
            highlightIconId = "multiplyIcon";
            break;
        case "divideButton":
            highlightIconId = "divideIcon";
            break;
        case "equalButton":
            resetAllOpIconColor();
            return;
        default:
            console.log("Invalid case in highlightOpIcon");
        }
    resetAllOpIconColor();
    let opIcon = document.querySelector(`#${highlightIconId}`);
    opIcon.style.backgroundColor = "yellow";
}

function resetAllOpIconColor() {
    let allOpIcons = document.querySelectorAll(".operationIcons");
    allOpIcons.forEach(opIcon => {
        opIcon.style.backgroundColor = "#f0f0f0";
    });
}