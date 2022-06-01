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
  if (display.textContent.length >= 11) {
    display.textContent = display.textContent.slice(-11);
  }
  if (
    display.textContent.startsWith("0") &&
    !display.textContent.includes(".")
  ) {
    display.textContent = Number(display.textContent);
  }
}

function operatorPressed(operator) {
  if (historyArray.length < 2 || (isOperatorLast() && !screenResetFlag)) {
    if (display.textContent.includes("Too big!")) {
      historyArray = [];
      historyArray.push(0);
    } else {
      historyArray.push(Number(display.textContent));
    }
  }
  if (isOperatorLast()) {
    historyArray.pop();
    historyArray.push(operator);
  } else if (lastElement() === undefined) {
    historyArray.push(0);
    historyArray.push(operator);
  } else {
    historyArray.push(operator);
    console.log(historyArray);
    updateHistory();
    screenResetFlag = true;
  }
  if (!isNaN(lastElement())) {
    equalsPressed();
  }
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
  if (input === "" && screenResetFlag) {
    display.textContent = "-";
    screenResetFlag = false;
    return;
  }
  input = Number(input) * -1;
  display.textContent = input;
}

function allClearPressed() {
  if (display.textContent !== "Too big!") {
    display.textContent = "";
  }
  screenResetFlag = false;
  history.textContent = "";
  historyArray = [];
  operatorPressedFLAG = false;
  equalsPressedFLAG = false;
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

  if (result.toString().length >= 12) {
    result = "Too big!";
    display.textContent = result;
    allClearPressed();
    screenResetFlag = true;

    return;
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
  if (historyArray.length === 0) {
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
