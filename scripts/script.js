const display = document.querySelector(".display");
const history = document.querySelector(".history");

const numbers = Array.from(document.querySelectorAll(".number"));
const operators = Array.from(document.querySelectorAll(".operator"));

const numberArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const operatorArray = ["+", "-", "*", "/"];
const functionArray = [".", ",", "C", "c", "=", "Enter", "Backspace"];

let operatorPressedFLAG = false;
let equalsPressedFLAG = false;

let operatorOne = null;
let operatorTwo = null;
let operation = "";

window.addEventListener("keydown", (e) => keyPress(e.key));

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

/*window.addEventListener("keydown", (e) => {
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
  if (operatorTwo == 0) {
    return "ERROR!";
  } else {
    return operatorOne / operatorTwo;
  }
}
*/
