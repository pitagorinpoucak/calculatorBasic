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
}
