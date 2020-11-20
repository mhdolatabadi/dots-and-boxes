import { get, set } from "./data.js";
import {
  addLineToSquare,
  checkCondition,
  findSpace,
  checkEnd,
  markLine,
  checkah,
  getNumberOfLine,
} from "./logic.js";
import { resign, send, requestGift, notifyEnd } from "./router.js";
import { getUserFirstName } from "./index.js";

const oddScale = 1;
const evenScale = 4;
const paper = document.getElementById("paper");
const header = document.getElementById("header");
const xlines = document.getElementsByClassName("xline");
const ylines = document.getElementsByClassName("yline");

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
      if (get("gift")) requestGift();
      set("gift", false);
    });
};

export const canHit = (line, color) => {
  return (
    (get("permission") || color === get("opponentColor")) &&
    get("role") !== "subscriber" &&
    !get("waiting") &&
    !get("end") &&
    get("table").lines[getNumberOfLine(line)] !== 1
  );
};

export const helpLine = (line, color) => {
  colorLine(line, color);
  addLineToSquare(line);
  markLine(line);
  checkCondition(color);
  checkEnd();
};

export const hitLine = (line, color) => {
  if (canHit(line, color)) {
    helpLine(line, checkah());
    send(line);
    set("permission", false);
    console.log(get("gift"));
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
  const myElement = document.getElementById(get("color"));
  const oppElement = document.getElementById(get("opponentColor"));
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
  const myElement = document.getElementById(get("color"));
  const oppElement = document.getElementById(get("opponentColor"));
  myElement.classList.toggle(`active-${myColor}`, isMyTurn);
  oppElement.classList.toggle(`active-${oppColor}`, !isMyTurn);
  myElement.innerHTML = get("name") + " : " + "0";
  oppElement.innerHTML = get("opponentName") + " : " + "0";
};

export const showEnd = (winner) => {
  notifyEnd();
  const myColor = get("color");
  document.body.style.backgroundColor = "dark" + winner;
  if (winner === myColor) showMessage("برنده");
  else showMessage("بازنده");
  set("end", true);
};

export const colorBox = (i, j, color) => {
  const space = findSpace(i, j);
  space.style.backgroundColor = "dark" + color;
  if (color === "red") space.innerHTML = "ق";
  else space.innerHTML = "آ";
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
};
