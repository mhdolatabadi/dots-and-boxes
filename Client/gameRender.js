import {
  getTurn,
  rowCount,
  columnCount,
  getOpponentScore,
  setOpponentScore,
  getScore,
  setScore,
  getOpponent,
  checkEndOfGame,
  addLineCondition,
  getIsTurn,
  getIsWait,
  getName,
  getEnd,
  getOpponentName,
  setEnd,
} from "./data.js";
import { addLineToSquare, checkCondition, findSpace } from "./logic.js";
import { coding, resign, getRole } from "./router.js";

const oddScale = 1;
const evenScale = 4;
let paper = document.getElementById("paper");
const xlines = document.getElementsByClassName("xline");
const ylines = document.getElementsByClassName("yline");

export const colorLine = (line, color) => {
  line.style.backgroundColor = color;
};

const addEventToResign = (event) => {
  const resignDiv = document.getElementById("resign");
  resignDiv.addEventListener(event, () => {
    if (getRole() !== "subscriber" && !getIsWait() && !getEnd()) resign();
  });
};

const addEventToLines = (array, event) => {
  for (let i = 0; i < array.length; i++) {
    array[i].addEventListener(event, () => {
      if (
        getIsTurn() &&
        getRole() !== "subscriber" &&
        !getIsWait() &&
        !getEnd() &&
        array[i].style.backgroundColor !== "red" &&
        array[i].style.backgroundColor !== "blue"
      ) {
        addLineToSquare(array[i]);
        colorLine(array[i], getTurn());
        checkCondition();
        addLineCondition(array[i]);
        checkEndOfGame();
        coding();
      }
    });
  }
};

export const render = () => {
  createElements();
  stylePaperBy("row");
  stylePaperBy("column");
  addEventToLines(xlines, "click");
  addEventToLines(ylines, "click");
  addEventToLines(xlines, "touch");
  addEventToLines(ylines, "touch");
  addEventToResign("click");
  addEventToResign("touch");
};
const createElements = () => {
  const rootContainer = document.getElementById("root-container")
  const header = document.createElement("div")
  header.setAttribute("id", "titr")
  header.innerHTML = "نقطه‌بازی"
  const firstPaper = document.createElement("div")
  firstPaper.setAttribute("id", "paper")
  const red = document.createElement("div")
  red.setAttribute("class", "score")
  red.setAttribute("id", "red")
  red.innerHTML = "قرمز: 0"
  const blue = document.createElement("div")
  blue.setAttribute("class", "score")
  blue.setAttribute("id", "blue")
  blue.innerHTML = "آبی: 0"
  const buttonContainer = document.createElement("div")
  buttonContainer.setAttribute("id", "button-container")
  const resign = document.createElement("div")
  resign.setAttribute("id", "resign")
  resign.setAttribute("class", "button")
  resign.innerHTML = "🙌"
  buttonContainer.appendChild(resign)
  rootContainer.appendChild(header)
  rootContainer.appendChild(firstPaper)
  rootContainer.appendChild(red)
  rootContainer.appendChild(blue)
  rootContainer.appendChild(buttonContainer)
  paper = firstPaper

  for (let i = 1; i <= 2 * rowCount - 1; i++)
    for (let j = 1; j <= 2 * columnCount - 1; j++) {
      const div = document.createElement("div");
      div.setAttribute("class", "grid-item");
      div.setAttribute("i", i);
      div.setAttribute("j", j);
      firstPaper.appendChild(div);
      alignStyle(div, i, j);
    }
};
const stylePaperBy = (orientation) => {
  let template = "";
  for (let k = 0; k < 2 * rowCount - 1; k++) {
    if (k % 2 === 0) template += oddScale + "fr ";
    else template += evenScale + "fr ";
  }
  if (orientation === "row") paper.style.gridTemplateRows = template;
  else if (orientation === "column") paper.style.gridTemplateColumns = template;
};

const alignStyle = (div, i, j) => {
  if ((i * j) % 2 === 1) setDivStyle(div, `${j}`, `${i}`, "dot");
  else if (i % 2 === 1 && j % 2 !== 1)
    setDivStyle(div, `${j - 1} / ${j + 2}`, `${i}`, "xline");
  else if (i % 2 !== 1 && j % 2 === 1)
    setDivStyle(div, `${j}`, `${i - 1} / ${i + 2}`, "yline");
  else setDivStyle(div, `${j - 1} / ${j + 2}`, `${i - 1} / ${i + 2}`, "space");
};

const setDivStyle = (div, col, row, styleClass) => {
  div.style.gridColumn = col;
  div.style.gridRow = row;
  div.setAttribute("class", styleClass);
  if (styleClass == "space") {
    div.setAttribute("line", 0);
  }
};

const updateScoreBoard = () => {
  document.getElementById(getTurn()).innerHTML = getName() + ": " + getScore();
  document.getElementById(getOpponent()).innerHTML =
    getOpponentName() + ": " + getOpponentScore();
};

export const updateScore = () => {
  if (getIsTurn()) setScore(getScore() + 1);
  else setOpponentScore(getOpponentScore() + 1);
  updateScoreBoard();
};

export const showTurn = () => {
  if (getIsTurn()) {
    if (getTurn() === "red") {
      document.getElementById(getTurn()).style.backgroundColor = "red";
      document.getElementById(getTurn()).style.boxShadow =
        "0 9px rgb(200, 0, 0)";
      document.getElementById(getOpponent()).style.backgroundColor =
        "rgb(0, 0, 100)";
      document.getElementById(getOpponent()).style.boxShadow =
        "0 9px rgb(0, 0, 100)";
    } else {
      document.getElementById(getTurn()).style.backgroundColor = "blue";
      document.getElementById(getTurn()).style.boxShadow =
        "0 9px rgb(0, 0, 200)";
      document.getElementById(getOpponent()).style.backgroundColor =
        "rgb(100, 0, 0)";
      document.getElementById(getOpponent()).style.boxShadow =
        "0 9px rgb(100, 0, 0)";
    }
  } else {
    if (getTurn() === "red") {
      document.getElementById(getTurn()).style.backgroundColor =
        "rgb(100, 0, 0)";
      document.getElementById(getTurn()).style.boxShadow =
        "0 9px rgb(100, 0, 0)";
      document.getElementById(getOpponent()).style.backgroundColor = "blue";
      document.getElementById(getOpponent()).style.boxShadow =
        "0 9px rgb(0, 0, 200)";
    } else {
      document.getElementById(getOpponent()).style.backgroundColor = "red";
      document.getElementById(getOpponent()).style.boxShadow =
        "0 9px rgb(200, 0, 0)";
      document.getElementById(getTurn()).style.backgroundColor =
        "rgb(0, 0, 100)";
      document.getElementById(getTurn()).style.boxShadow =
        "0 9px rgb(0, 0, 100)";
    }
  }
};

export const notifEndOfGame = (winner) => {
  document.body.style.backgroundColor = "goldenrod";
  if (winner === getTurn()) {
    document.getElementById("titr").innerHTML = "برنده";
    document.getElementById("titr").backgroundColor = getTurn();
  } else {
    document.getElementById("titr").innerHTML = "بازنده";
    document.getElementById("titr").backgroundColor = getOpponent();
  }
  setEnd(true)
};

export const colorBox = (i, j) => {
  const space = findSpace(i, j);
  if (getIsTurn()) {
    space.style.backgroundColor = "dark" + getTurn();
    if (getTurn() === "red") space.innerHTML = "ق";
    else space.innerHTML = "آ";
  } else {
    if (getOpponent() === "red") space.innerHTML = "ق";
    else space.innerHTML = "آ";
    space.style.backgroundColor = "dark" + getOpponent();
  }
};

export const showError = () => {
  document.getElementById("titr").innerHTML = "تماشاچی";
};
export const waiting = () => {
  document.getElementById("titr").innerHTML = "در انتظار حریف";
};

export const unwaiting = () => {
  document.getElementById("titr").innerHTML = "نقطه‌بازی";
};
