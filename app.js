function deletecomma(number) {
  return number.replace(/,/g, "");
}

function displaytoFixed(number) {
  number = String(Number(number).toFixed(10));
  const decimal = Math.abs(Number(number) - parseInt(number));
  if (decimal > 0 && decimal < 1) {
    const numberlength = Math.max(0, 10 - (number.length - 12));
    number = String(Number(number).toFixed(numberlength));
    return String(number);
  } else {
    return String(parseInt(number));
  }
}

function displayNumber(number) {
  number = displaytoFixed(number);
  number = parseFloat(number);
  // 숫자 3자리마다 콤마 찍기
  number = number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  if (number.length <= 8) {
    display.style.fontSize = "80px";
  } else if (number.length <= 10) {
    display.style.fontSize = "65px";
  } else if (number.length <= 13) {
    display.style.fontSize = "50px";
  } else {
    //글자길이가 11이상 10^10이상인 경우
    number = deletecomma(number);
    a = (Number(number) / 10 ** (String(parseInt(number)).length - 1)).toFixed(
      6
    );
    b = String(parseInt(number)).length - 1;
    number = `${a}e${b}`;
    display.style.fontSize = "50px";
  }
  display.innerHTML = number;
}

function allclear() {
  num1 = 0;
  num2 = "";
  oper = "+";
  displayNumber(num1);
  etc[0].innerHTML = "AC";
}

function inputNumber(event) {
  if (num2 !== "") {
    num2 += event.target.innerText;
  } else {
    num2 = event.target.innerText;
  }
  displayNumber(num2);
  etc[0].innerHTML = "C";
}

function inputOperator(event) {
  if (oper === "+") {
    num1 = num1 + Number(num2);
  } else if (oper === "−") {
    num1 = num1 - Number(num2);
  } else if (oper === "×") {
    num1 = num1 * Number(num2);
  } else if (oper === "÷") {
    num1 = num1 / Number(num2);
  }
  displayNumber(num1);
  num2 = "";
  oper = event.target.innerText;

  if (oper === "=") {
    num1 = 0;
    num2 = "";
    oper = "+";
  }
}

function inputEtc(event) {
  const etc = event.target.innerText;
  if (etc === "AC" || etc === "C") {
    allclear();
  } else if (etc === "+/−") {
    num2 = deletecomma(num2);
    num2 = String(Number(num2) * -1);
    displayNumber(num2);
  } else if (etc === "%") {
    num2 = deletecomma(num2);
    num2 = String(Number(num2) / 100);
    displayNumber(num2);
  }
}

const num = document.querySelectorAll(".number");
const operator = document.querySelectorAll(".operator");
const etc = document.querySelectorAll(".allclear");
const display = document.getElementById("display");
let num1 = 0;
let num2 = "";
let oper = "+";

num.forEach((element) => element.addEventListener("click", inputNumber));
operator.forEach((element) => element.addEventListener("click", inputOperator));
etc.forEach((element) => element.addEventListener("click", inputEtc));
