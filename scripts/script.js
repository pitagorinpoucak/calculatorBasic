const display = document.querySelector(".display");
const history = document.querySelector(".history");

const numbers = Array.from(document.querySelectorAll(".number"));
const operators = Array.from(document.querySelectorAll(".operator"));

const numberArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const operatorArray = ["+", "-", "*", "/"];
const functionArray = [".", ",", "C", "c", "=", "Enter"];

let operatorOne = null;
let operatorTwo = null;
let operation = "";

window.addEventListener("keydown", (e) => {
  if (e.key === "Backspace") {
    console.log("bckspc");
  }
});

window.addEventListener("keypress", (e) => keyPress(e.key));

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
