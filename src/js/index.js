import {
  duplicationOperator,
  maxLength,
  plus,
  minus,
  division,
  multiplication,
  equal,
  zero,
} from "./utils/define.js";

const numberBtn = document.getElementById("number");
const totalCount = document.getElementById("total");
const clearBtn = document.getElementById("clear");
const operatorBtn = document.getElementById("operator");

const isNaNCustom = (value) => Number.isNaN(Number(value));
const totalCountToArr = () => totalCount.textContent.split("");
const valueList = (operator) => totalCount.textContent.split(operator);
const isOperator = (value) => isNaNCustom(value);
const curOperator = () => totalCountToArr().find(isOperator);

const isFirstNodeIsZero = () => {
  const [firstNode] = totalCountToArr();
  return firstNode === zero;
};

const isLessThanMaxValue = () => {
  const MAX_VALUE = 1000;
  const curCount = totalCount.textContent;
  if (curOperator()) {
    const [_, second] = valueList(curOperator());
    return Number(second) < MAX_VALUE;
  }
  return Number(curCount) < MAX_VALUE;
};

const addNumber = (cur) => {
  if (isFirstNodeIsZero()) {
    totalCount.textContent = "";
  }

  totalCount.appendChild(document.createTextNode(cur));

  const isErr = !isLessThanMaxValue() && !isOperator(cur);
  if (isErr) {
    onErrHandler(maxLength);
    totalCount.removeChild(totalCount.lastChild);
  }
};

const onErrHandler = (type) => {
  switch (type) {
    case duplicationOperator:
      alert("숫자를 먼저 입력한 후 연산자를 입력해주세요!");
      break;
    case maxLength:
      alert("숫자는 세 자리까지만 입력 가능합니다!");
      break;
    default:
      return;
  }
};

const roundDown = (value) =>
  value >= 0 ? Math.floor(value) : Math.ceil(value);

const sum = () => {
  const [first, second] = valueList(curOperator()).map(Number);

  const lookupTable = {
    [plus]: first + second,
    [minus]: first - second,
    [division]: roundDown(first / second),
    [multiplication]: roundDown(first * second),
  };

  return lookupTable[curOperator()];
};

// EventListener
numberBtn.addEventListener("click", (e) => {
  const cur = e.target.firstChild.nodeValue;
  addNumber(cur);
});

clearBtn.addEventListener("click", (_) => {
  totalCount.textContent = zero;
});

operatorBtn.addEventListener("click", (e) => {
  const operator = e.target.firstChild.nodeValue;
  const isSum = e.target.firstChild.nodeValue === equal;
  const [lastNode] = totalCountToArr().reverse();
  const isLastNodeIsNaN = isNaNCustom(lastNode);

  if (isSum) {
    totalCount.textContent = sum() ?? totalCount.textContent;
  } else if (isLastNodeIsNaN || isFirstNodeIsZero()) {
    onErrHandler(duplicationOperator);
  } else {
    addNumber(operator);
  }
});
