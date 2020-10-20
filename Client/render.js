import {
  getTurn,
  rowCount,
  columnCount,
  getBlueScore,
  getRedScore,
  setBlueScore,
  setRedScore,
  getOpponent,
  checkEndOfGame,
} from "./data.js";
import { addLineToSquare, checkCondition, findSpace } from "./logic.js";

const oddScale = 1;
const evenScale = 4;
const paper = document.getElementById("paper");
const xlines = document.getElementsByClassName("xline");
const ylines = document.getElementsByClassName("yline");


const addEventToLines = (array, event) => {
  console.log("setting event listener...");
  for (let i = 0; i < array.length; i++) {
    array[i].addEventListener(event, () => {
      if (
        array[i].style.backgroundColor !== "red" &&
        array[i].style.backgroundColor !== "blue"
      ) {
        array[i].style.backgroundColor = getTurn();
        addLineToSquare(array[i]);
        checkCondition();
        checkEndOfGame();
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
};
const createElements = () => {
  for (let i = 1; i <= 2 * rowCount - 1; i++)
    for (let j = 1; j <= 2 * columnCount - 1; j++) {
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
  document.getElementById("blue").innerHTML = "آبی: " + getBlueScore();
  document.getElementById("red").innerHTML = "قرمز: " + getRedScore();
};
export const updateScore = () => {
  if (getTurn() == "red") setRedScore(getRedScore() + 1);
  else setBlueScore(getBlueScore() + 1);
  updateScoreBoard();
};
export const changeTurnStyle = () => {
  document.getElementById(getOpponent()).style.border = "none";
  if(getTurn() === "red"){
    document.getElementById(getTurn()).style.borderRight =
    "solid" + " " + getTurn() + " " + " 5px";
  } else {
    document.getElementById(getTurn()).style.borderLeft =
    "solid" + " " + getTurn() + " " + " 5px";
  }
  
  document.getElementById("titr").style.border = "none"
  document.getElementById("titr").style.backgroundColor = "dark" + getTurn();
  document.getElementById("titr").style.color = "white";
};
export const notifEndOfGame = () => {
  document.body.style.backgroundColor = "goldenrod";
  document.getElementById("titr").innerHTML = "برنده بازی" + ": ";
  if (getTurn() === "red") document.getElementById("titr").innerHTML += " قرمز";
  else document.getElementById("titr").innerHTML += "آبی";
};
export const colorBox = (i, j) => {
  const space = findSpace(i, j);
  if (getTurn() === "red") space.innerHTML = "ق";
  else space.innerHTML = "آ";
  space.style.backgroundColor = "dark" + getTurn();
};
