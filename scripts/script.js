const display = document.querySelector(".display");
const history = document.querySelector(".history");

const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");

let operationList = [];

for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener("click", (e) => {
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

- porediti malo kod da liči u nešto
- skužiti zašto prettier ne rodi!!*/

function operatorPressed(operation) {
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
