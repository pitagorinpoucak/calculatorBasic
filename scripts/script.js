const display = document.querySelector(".display");
const history = document.querySelector(".history");

const numbers = Array.from(document.querySelectorAll(".number"));
const operators = Array.from(document.querySelectorAll(".operator"));

const numberArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const operatorArray = ["+", "-", "*", "/", ".", ",", "C", "c", "=", "Enter"];

window.addEventListener("keydown", (e) => {
  if (e.key === "Backspace") {
    console.log("bckspc");
  }
});

window.addEventListener("keypress", (e) => console.log(e.key));
