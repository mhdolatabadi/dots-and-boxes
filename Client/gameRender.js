import { get, set } from "./data.js";
import {
  addLineToSquare,
  checkCondition,
  findSpace,
  checkEnd,
  markLine,
} from "./logic.js";
import { coding, resign } from "./router.js";
import { getUserFirstName } from "./index.js";


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
    if (get("role") !== "subscriber" && !get("waiting") && !get("end"))
      resign();
  });
};

const addEventToLines = (array, event) => {
  for (let i = 0; i < array.length; i++) {
    array[i].addEventListener(event, () => {
      if (
        get("permission") &&
        get("role") !== "subscriber" &&
        !get("waiting") &&
        !get("end") &&
        array[i].style.backgroundColor !== "red" &&
        array[i].style.backgroundColor !== "blue"
      ) {
        addLineToSquare(array[i]);
        colorLine(array[i], get("color"));
        checkCondition();
        markLine(array[i]);
        checkEnd();
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
  const rootContainer = document.getElementById("root-container");
  const header = document.createElement("div");
  header.setAttribute("id", "titr");
  header.innerHTML = "نقطه‌بازی";
  const firstPaper = document.createElement("div");
  firstPaper.setAttribute("id", "paper");
  const red = document.createElement("div");
  red.setAttribute("class", "score");
  red.setAttribute("id", "red");
  red.innerHTML = "قرمز: 0";
  const blue = document.createElement("div");
  blue.setAttribute("class", "score");
  blue.setAttribute("id", "blue");
  blue.innerHTML = "آبی: 0";
  const buttonContainer = document.createElement("div");
  buttonContainer.setAttribute("id", "button-container");
  const resign = document.createElement("div");
  resign.setAttribute("id", "resign");
  resign.setAttribute("class", "button");
  resign.innerHTML = "🙌";
  buttonContainer.appendChild(resign);
  rootContainer.appendChild(header);
  rootContainer.appendChild(firstPaper);
  rootContainer.appendChild(red);
  rootContainer.appendChild(blue);
  rootContainer.appendChild(buttonContainer);
  paper = firstPaper;

  for (let i = 1; i <= 2 * get("row") - 1; i++)
    for (let j = 1; j <= 2 * get("column") - 1; j++) {
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
  for (let k = 0; k < 2 * get("row") - 1; k++) {
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
  document.getElementById(get("color")).innerHTML =
    get("name") + ": " + get("score");
  document.getElementById(get("opponentColor")).innerHTML =
    get("opponentName") + ": " + get("opponentScore");
};

export const updateScore = () => {
  if (get("permission")) set("score", get("score") + 1);
  else set("opponentScore", get("opponentScore") + 1);
  updateScoreBoard();
};

export const showTurn = () => {
  if (get("permission")) {
    document.getElementById(get("color")).style.backgroundColor = get("color");
    if (get("color") === "red") {
      document.getElementById(get("color")).style.boxShadow = "0 9px rgb(200, 0, 0)";
      document.getElementById(get("opponentColor")).style.backgroundColor = "rgb(0, 0, 100)";
      document.getElementById(get("opponentColor")).style.boxShadow = "0 9px rgb(0, 0, 100)";
    } else {
      document.getElementById(get("color")).style.boxShadow = "0 9px rgb(0, 0, 200)";
      document.getElementById(get("opponentColor")).style.backgroundColor = "rgb(100, 0, 0)";
      document.getElementById(get("opponentColor")).style.boxShadow = "0 9px rgb(100, 0, 0)";
    }
  } else {
    if (get("color") === "red") {
      document.getElementById(get("color")).style.backgroundColor = "rgb(100, 0, 0)";
      document.getElementById(get("color")).style.boxShadow = "0 9px rgb(100, 0, 0)";
      document.getElementById(get("opponentColor")).style.backgroundColor = "blue";
      document.getElementById(get("opponentColor")).style.boxShadow = "0 9px rgb(0, 0, 200)";
    } else {
      document.getElementById(get("opponentColor")).style.backgroundColor = "red";
      document.getElementById(get("opponentColor")).style.boxShadow = "0 9px rgb(200, 0, 0)";
      document.getElementById(get("color")).style.backgroundColor = "rgb(0, 0, 100)";
      document.getElementById(get("color")).style.boxShadow = "0 9px rgb(0, 0, 100)";
    }
  }
};

export const notifEndOfGame = (winner) => {
  document.body.style.backgroundColor = "goldenrod";
  if (winner === get("color")) {
    document.getElementById("titr").innerHTML = "برنده";
    document.getElementById("titr").backgroundColor = get("color");
  } else {
    document.getElementById("titr").innerHTML = "بازنده";
    document.getElementById("titr").backgroundColor = get("opponentColor");
  }
  set("end", true);
};

export const colorBox = (i, j) => {
  const space = findSpace(i, j);
  if (get("permission")) {
    space.style.backgroundColor = "dark" + get("color");
    if (get("color") === "red") space.innerHTML = "ق";
    else space.innerHTML = "آ";
  } else {
    if (get("opponentColor") === "red") space.innerHTML = "ق";
    else space.innerHTML = "آ";
    space.style.backgroundColor = "dark" + get("opponentColor");
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

export const initializeTurn = () => {
  if (get("color") === "red") set("permission", true);
  else set("permission", false);
  set("name", getUserFirstName());
  document.getElementById(get("color")).innerHTML = get("name") + ":" + "0";
  document.getElementById(get("opponentColor")).innerHTML =
    get("opponentName") + ":" + "0";
};
