const display = document.querySelector(".display");
const history = document.querySelector(".history");

const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener(
    "click",
    (e) => (display.textContent += e.target.textContent)
  );
}

for (let i = 0; i < operators.length; i++) {
  operators[i].addEventListener("click", (e) =>
    operatorPressed(e.target.textContent)
  );
}

function operatorPressed(operation) {
  console.log(operation);
  switch (operation) {
    case "+":
      console.log("add");
      break;
    case "-":
      console.log("subtract");
      break;
    case "*":
      console.log("multiply");
      break;
    case "/":
      console.log("divide");
      break;
    case ".":
      console.log("dot");
      break;
    case "<-":
      console.log("backspace");
      break;
    case "AC":
      console.log("all clear");
      break;
    case "=":
      console.log("equals");
      break;
      
  }
}
