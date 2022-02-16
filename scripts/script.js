//FLAGS
let operatorOneSaved = false;
let operatorTwoSaved = false;
let operationSaved = false;
//GLOBAL VARIABLES

let operatorOne = 0;
let operatorTwo = 0;
let operation = "";

//GLOBAL DOM ELEMENTS

const display = document.getElementById("display");

//READ-WRITE

function numberClicked(e) {
  display.innerText += e.target.innerText;
}

function operatorClicked(e) {
  if (!operatorOneSaved) {
    operatorOne = Number(display.innerText);
    operatorOneSaved = true;
    operation = e.target.innerText;
    operationSaved = true;
    display.innerText = "";
  } else if (!operatorTwoSaved) {
    operatorTwo = Number(display.innerText);
    operatorTwoSaved = true;
    display.innerText = "";
    operate(operation, operatorOne, operatorTwo);
    operation = e.target.innerText;
    operationSaved = true;
    operatorOne = Number(display.innerText);
    operatorOneSaved = true;
    display.innerText = "";
  } else {
    operate(operation, operatorOne, operatorTwo);
    operation = e.target.innerText;
    operationSaved = true;
    operatorOne = Number(display.innerText);
    operatorOneSaved = true;
  }
}

function equalsClicked() {
  if (!operatorTwoSaved) {
    operatorTwo = Number(display.innerText);
    operatorTwoSaved = true;
    console.log(operatorOne);
    console.log(operation);
    console.log(operatorTwo);
    operate(operation, operatorOne, operatorTwo);
  } else if (operationSaved && operatorOneSaved && operatorTwoSaved) {
    operate(operation, operatorOne, operatorTwo);
    operatorOne = display.innerText;
    operatorOneSaved = true;
    operatorTwo = 0;
  }
}

function allClear() {
  operatorOne = 0;
  operatorTwo = 0;
  operatorOneSaved = false;
  operatorTwoSaved = false;
  display.innerText = "";
  operation = "";
  operationSaved = false;
  console.clear();
  console.log("cleared");
}

//OPERATIONS

function operate(operator, num1, num2) {
  let result = 0;
  switch (operator) {
    case "+":
      result = add(num1, num2);
      break;
    case "-":
      result = subtract(num1, num2);
      break;
    case "*":
      result = multiply(num1, num2);
      break;
    case "/":
      result = divide(num1, num2);
      break;
    default:
      display.innerText = operator;
      break;
  }
  display.innerText = result;
  console.log(result);
  operatorOneSaved = false;
  operatorTwoSaved = false;
  operationSaved = false;
}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (num2 === 0) {
    return "Seriously?!?";
  } else {
    return num1 / num2;
  }
}
