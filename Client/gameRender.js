import { get, set } from "./data.js";
import {
  addLineToSquare,
  checkCondition,
  findSpace,
  checkEnd,
  markLine,
} from "./logic.js";
import { resign } from "./router.js";
import { getUserFirstName } from "./index.js";

const oddScale = 1;
const evenScale = 4;
const paper = document.getElementById("paper");
const header = document.getElementById("header");
const xlines = document.getElementsByClassName("xline");
const ylines = document.getElementsByClassName("yline");
const myElement = document.getElementById(get("color"));
const oppElement = document.getElementById(get("opponentColor"));

export const render = () => {
  createElements();
  stylePaperBy("row");
  stylePaperBy("column");
  lineInitializer(xlines, "click");
  lineInitializer(ylines, "click");
  lineInitializer(xlines, "touch");
  lineInitializer(ylines, "touch");
  resignInitializer("click");
  resignInitializer("touch");
};

const lineInitializer = (array, event) => {
  for (let i = 0; i < array.length; i++)
    array[i].addEventListener(event, () => {
      hitLine(array[i], get("color"));
      send(array[i]);
    });
};

export const canHit = (line) => {
  return (
    get("permission") &&
    get("role") !== "subscriber" &&
    !get("waiting") &&
    !get("end")
  );
};

export const hitLine = (line, color) => {
  if (canHit(line)) {
    addLineToSquare(line);
    colorLine(line, color);
    markLine(line);
    checkCondition();
    checkEnd();
  }
};

const resignInitializer = (event) => {
  const resignDiv = document.getElementById("resign");
  resignDiv.addEventListener(event, () => {
    if (get("role") !== "subscriber" && !get("waiting") && !get("end"))
      resign();
  });
};

export const colorLine = (line, color) => {
  line.style.backgroundColor = color;
};

const createElements = () => {
  for (let i = 1; i <= 2 * get("row") - 1; i++)
    for (let j = 1; j <= 2 * get("column") - 1; j++) {
      const div = document.createElement("div");
      div.setAttribute("class", "grid-item");
      div.setAttribute("i", i);
      div.setAttribute("j", j);
      paper.appendChild(div);
      alignStyle(div, i, j);
    }
};
const stylePaperBy = (orientation) => {
  let template = "";
  for (let k = 0; k < 2 * get("row") - 1; k++)
    if (k % 2 === 0) template += oddScale + "fr ";
    else template += evenScale + "fr ";
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
  myElement.innerHTML = get("name") + ": " + get("score");
  oppElement.innerHTML = get("opponentName") + ": " + get("opponentScore");
};

export const updateScore = () => {
  if (get("permission")) set("score", get("score") + 1);
  else set("opponentScore", get("opponentScore") + 1);
  updateScoreBoard();
};

export const showTurn = () => {
  const isMyTurn = get("permission");
  const myColor = get("color");
  const oppColor = get("opponentColor");
  myElement.classList.toggle(`active-${myColor}`, isMyTurn);
  oppElement.classList.toggle(`active-${oppColor}`, !isMyTurn);
};

export const showEnd = (winner) => {
  const myColor = get("color");
  document.body.style.backgroundColor = "goldenrod";
  if (winner === myColor) showMessage("برنده");
  else showMessage("بازنده");
  set("end", true);
};

export const colorBox = (i, j) => {
  const myColor = get("color");
  const oppColor = get("opponentColor");
  const space = findSpace(i, j);
  if (get("permission")) {
    space.style.backgroundColor = "dark" + myColor;
    if (myColor === "red") space.innerHTML = "ق";
    else space.innerHTML = "آ";
  } else {
    if (oppColor === "red") space.innerHTML = "ق";
    else space.innerHTML = "آ";
    space.style.backgroundColor = "dark" + oppColor;
  }
};

export const showMessage = (message) => {
  header.innerHTML = message;
};

export const initializeTurn = () => {
  const myColor = get("color");
  if (myColor === "red") {
    set("permission", true);
    set("opponentColor", "blue");
  } else {
    set("permission", false);
    set("opponentColor", "red");
  }
  set("name", getUserFirstName());
  myElement.innerHTML = get("name") + " : " + "0";
  oppElement.innerHTML = get("opponentName") + " : " + "0";
};
