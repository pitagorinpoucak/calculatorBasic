const display = document.querySelector(".display");
const history = document.querySelector(".history");

const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

let operationList = [];

let operatorPressedFLAG = false;

for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener("click", (e) => {
    if (operatorPressedFLAG) {
      display.textContent = "";
      operatorPressedFLAG = false;
    }
    let displayContent = display.textContent;

    if (displayContent.length < 12) {
      display.textContent += e.target.textContent;
    } else {
      display.textContent = displayContent.slice(1);
      display.textContent += e.target.textContent;
    }
  });
}

for (let i = 0; i < operators.length; i++) {
  operators[i].addEventListener("click", (e) =>
    operatorPressed(e.target.textContent)
  );
}

/* koristiti zadnje elemente u operationList arrayu za izračun operacije, voditi računa o nuli kod dijeljenja i baciti eror po potrebi, srediti da to ne blokira cijeli program
- ako se ide ubacivati novi broj nakon pritisnutog = onda sve počistiti ko da se ide ispočetka
dodati = u history display po potrebi da bi se objasni izračun

- opcionalno - omogućiti klik na history da se vidi cijeli proces ako je više operacija u lancu
- osposobiti decimalnu točku - obavezno koristiti flag za deaktivirati posli prve točke

- porediti malo kod da liči u nešto*/

function operatorPressed(operation) {
  operatorPressedFLAG = true;
  switch (operation) {
    case "+":
    case "-":
    case "*":
    case "/":
      operate(operation);
      break;
    case ".":
      //console.log("dot");
      break;
    case "<-":
      backspace();
      break;
    case "AC":
      allClear();
      break;
    case "=":
      //console.log("equals");
      break;
  }
}

function backspace() {
  let content = display.textContent;
  display.textContent = content.slice(0, content.length - 1);
}

function operate(operation) {
  if (display.textContent != "") {
    operationList.push(display.textContent);
  }
  if (isNumber(operationList[operationList.length - 1])) {
    operationList.push(operation);
    display.textContent = "";
  } else {
    operationList.pop();
    operationList.push(operation);
  }

  if (operationList.join("").length >= 16) {
    history.textContent = "..." + operationList.join("").slice(-16);
  } else {
    history.textContent = operationList.join("");
  }
  let num1 = Number(operationList[operationList.length - 2]);
  let num2 = 0;
  if (operationList.length > 3) {
    num2 = Number(operationList[operationList.length - 4]);
  }
  console.log(num1, num2);

  switch (operation) {
    case "+":
      display.textContent = add(num1, num2);
      console.log(add(num1, num2));
      break;
    case "-":
      display.textContent = subtract(num1, num2);
      break;
    case "*":
      display.textContent = multiply(num1, num2);
      break;
    case "/":
      display.textContent = divide(num1, num2);
      break;
  }
}

function add(n1, n2) {
  return n1 + n2;
}

function subtract(n1, n2) {
  return n1 - n2;
}

function multiply(n1, n2) {
  return n1 * n2;
}
function divide(n1, n2) {
  if (n2 === 0) {
    return "error";
  } else {
    return n1 / n2;
  }
}

function allClear() {
  display.textContent = "";
  history.textContent = "";
  operationList = [];
  //console.log(operationList);
}

function isNumber(item) {
  return !(item == "+" || item == "-" || item == "*" || item == "/");
}
