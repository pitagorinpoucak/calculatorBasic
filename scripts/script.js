const display = document.querySelector(".display");
const history = document.querySelector(".history");

const numbers = Array.from(document.querySelectorAll(".number"));
const operators = Array.from(document.querySelectorAll(".operator"));

const numberArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const operatorArray = ["+", "-", "*", "/"];
const functionArray = [
  ".",
  ",",
  "C",
  "c",
  "AC",
  "=",
  "Enter",
  "<-",
  "Backspace",
  "+/-",
  "p",
];

let historyArray = [];

let operatorPressedFLAG = false;
let equalsPressedFLAG = false;
let screenResetFlag = false;

window.addEventListener("keydown", (e) => keyPress(e.key));
numbers.forEach((element) =>
  element.addEventListener("click", (e) => keyPress(e.target.textContent))
);
operators.forEach((element) =>
  element.addEventListener("click", (e) => keyPress(e.target.textContent))
);

function keyPress(key) {
  if (numberArray.includes(Number(key))) {
    numberPressed(key);
  }
  if (operatorArray.includes(key)) {
    operatorPressed(key);
  }
  if (functionArray.includes(key)) {
    functionPressed(key);
  }
}

function numberPressed(number) {
  if (historyArray.slice(-2).includes("=")) {
    historyArray = [];
  }
  if (screenResetFlag) {
    display.textContent = "";
    screenResetFlag = false;
  }
  display.textContent += number;
  if (
    display.textContent.startsWith("0") &&
    !display.textContent.includes(".")
  ) {
    display.textContent = Number(display.textContent);
  }
}

function operatorPressed(operator) {
  if (historyArray.length < 2 || (isOperatorLast() && !screenResetFlag)) {
    historyArray.push(Number(display.textContent));
  }

  if (!isNaN(lastElement())) {
    equalsPressed();
  }
  if (isOperatorLast()) {
    historyArray.pop();
    historyArray.push(operator);
  } else {
    historyArray.push(operator);
  }
  console.log(historyArray);
  updateHistory();
  screenResetFlag = true;
}

function functionPressed(key) {
  switch (key) {
    case ".":
    case ",":
      decimalPressed();
      break;
    case "c":
    case "C":
    case "AC":
      allClearPressed();
      break;
    case "=":
    case "Enter":
      equalsPressed();
      break;
    case "<-":
    case "Backspace":
      backspacePressed();
      break;
    case "+/-":
    case "p":
      changePrefixPressed();
      break;
  }
}

function changePrefixPressed() {
  let input = display.textContent;
  input = Number(input) * -1;
  display.textContent = input;
}

function allClearPressed() {
  history.textContent = "";
  display.textContent = "";
  historyArray = [];
  operatorPressedFLAG = false;
  equalsPressedFLAG = false;
  screenResetFlag = false;
}

function decimalPressed() {
  if (display.textContent.includes(".") && !screenResetFlag) {
    return;
  }
  if (display.textContent === "" || screenResetFlag) {
    display.textContent = 0;
  }
  display.textContent += ".";
  screenResetFlag = false;
}

function backspacePressed() {
  let text = display.textContent.slice(0, display.textContent.length - 1);
  if (text.length === 0 || Number(text) === 0) {
    text = 0;
    screenResetFlag = true;
  }
  display.textContent = text;
}

function equalsPressed() {
  if (isOperatorLast()) {
    historyArray.push(Number(display.textContent));
  }
  updateHistory();

  if (historyArray.slice(-2).includes("=") || isNaN(lastElement())) {
    if (isNaN(lastElement())) {
      historyArray.pop();
    }
    return;
  }
  let operatorOne = historyArray[historyArray.length - 3];
  let operation = historyArray[historyArray.length - 2];
  let operatorTwo = lastElement();
  let result;
  console.log(operatorOne, operation, operatorTwo);
  switch (operation) {
    case "+":
      result = add(operatorOne, operatorTwo);
      break;
    case "-":
      result = subtract(operatorOne, operatorTwo);
      break;
    case "*":
      result = multiply(operatorOne, operatorTwo);
      break;
    case "/":
      result = divide(operatorOne, operatorTwo);
      break;
    default:
      break;
  }

  if (isNaN(result)) {
    display.textContent = result;
    historyArray.pop();
    screenResetFlag = true;
    return;
  }
  historyArray.push("=");
  historyArray.push(result);
  updateHistory();
  display.textContent = result;
  screenResetFlag = true;
}

function add(op1, op2) {
  return op1 + op2;
}

function subtract(op1, op2) {
  return op1 - op2;
}

function multiply(op1, op2) {
  return op1 * op2;
}

function divide(op1, op2) {
  if (op2 == 0) {
    return "ERROR!";
  } else {
    return op1 / op2;
  }
}

function lastElement() {
  if (historyArray.length <= 1) {
    return;
  }
  return historyArray[historyArray.length - 1];
}
function isOperatorLast() {
  let last = lastElement();
  console.log(last);
  if (last === "+" || last === "-" || last === "*" || last === "/") {
    return true;
  }
  return false;
}

function updateHistory() {
  let hist = historyArray.join("");
  if (hist.length > 16) {
    history.textContent = "..." + hist.slice(-16);
  } else {
    history.textContent = hist;
  }
}
/*
function numberPressed(number) {
  if (operatorPressedFLAG || equalsPressedFLAG) {
    display.textContent = "";
    operatorPressedFLAG = false;
    if (equalsPressedFLAG) {
      equalsPressedFLAG = false;
    }
  }
  display.textContent += number;
}

function operatorPressed(operator) {
  operatorPressedFLAG = true;
  if (operatorOne === null && !equalsPressedFLAG) {
    operatorOne = Number(display.textContent);
    operation = operator;
    history.textContent += operatorOne;
    history.textContent += operation;
  } else {
    if (operatorTwo === null && equalsPressedFLAG) {
      operation = operator;
      operatorTwo = Number(display.textContent);
      history.textContent += operatorTwo;
    } else {
      equalsPressed();
    }
    //izračunati (pretisnuti =), prikazati rezultat, spremiti ga u operatorOne
  }
}

function functionPressed(functionCode) {
  switch (functionCode) {
    case ".":
    case ",":
      break;
    case "c":
    case "C":
    case "AC":
      break;
    case "=":
    case "Enter":
      equalsPressed();
      break;
    case "Backspace":
      break;
  }
}

function equalsPressed() {
  let result = 0;

  if (operatorTwo === null) {
    operatorTwo = Number(display.textContent);
    history.textContent += operatorTwo;
  }

  console.log(operatorOne, operation, operatorTwo);

  switch (operation) {
    case "+":
      result = add();
      break;
    case "-":
      result = subtract();
      break;
    case "*":
      result = multiply();
      break;
    case "/":
      result = divide();
      break;
  }

  display.textContent = result;
  history.textContent += "=";
  history.textContent += result;
  equalsPressedFLAG = true;
  operatorPressedFLAG = false;
  console.log(result);
  operatorOne = result;
  operatorTwo = null;
  operation = "";
}

function add() {
  return operatorOne + operatorTwo;
}
function subtract() {
  return operatorOne - operatorTwo;
}
function multiply() {
  return operatorOne * operatorTwo;
}
function divide() {
  if (operatorTwo === 0) {
    return "error";
  } else {
    return operatorOne / operatorTwo;
  }
}

window.addEventListener("keydown", (e) => {
  if (e.key === "Backspace") {
    console.log("bckspc");
  }
});
function keyPress(key) {
  if (numberArray.includes(Number(key))) {
    display.textContent += key;
  }
  
  if (operatorArray.includes(key)) {
    if (operatorOne !== null && operatorTwo !== null && operation !== "") {
      enterPressed();
      operatorOne = Number(display.textContent);
    }
    if (operatorOne === null) {
      operatorOne = Number(display.textContent);
      operation = key;
      display.textContent = "";
      return;
    }
    operatorTwo = Number(display.textContent);
    display.textContent = "";
  }

  if (functionArray.includes(key)) {
    switch (key) {
      case ".":
      case ",":
        break;
      case "C":
      case "c":
      case "AC":
        break;
      case "=":
      case "Enter":
        if (operatorTwo === null) {
          operatorTwo = Number(display.textContent);
        }
        enterPressed();
        break;
    }
  }

  console.log(operatorOne, operation, operatorTwo);
}

function enterPressed() {
  if (operatorOne === null || operatorTwo === null || operation === "") {
    return;
  }

  switch (operation) {
    case "+":
      display.textContent = add();
      break;
    case "-":
      display.textContent = subtract();
      break;
    case "*":
      display.textContent = multiply();
      break;
    case "/":
      display.textContent = divide();
      break;
  }

  operatorOne = null;
  operatorTwo = null;
  operation = "";
}


*/
