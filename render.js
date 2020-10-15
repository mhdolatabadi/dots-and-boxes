import { getTurn, changeTurn, addColoredLine } from "./data.js";
const rowCount = 5;
const columnCount = 5;
const oddScale = 1;
const evenScale = 4;
const paper = document.getElementById("paper");
const xlines = document.getElementsByClassName("xline");
const ylines = document.getElementsByClassName("yline");
const spaces = document.getElementsByClassName("space");
const setClickEventLine = (array) => {
  for (let i = 0; i < array.length; i++) {
    array[i].addEventListener("click", () => {
      array[i].style.backgroundColor = getTurn();
      changeTurn();
      addColoredLine(array[i]);
    });
  }
};
const render = () => {
  createElements();
  stylePaperBy("row");
  stylePaperBy("column");
  setClickEventLine(xlines);
  setClickEventLine(ylines);
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
  if ((i * j) % 2 === 1) setSpanStyle(div, `${j}`, `${i}`, "dot");
  else if (i % 2 === 1 && j % 2 !== 1)
    setSpanStyle(div, `${j - 1} / ${j + 2}`, `${i}`, "xline");
  else if (i % 2 !== 1 && j % 2 === 1)
    setSpanStyle(div, `${j}`, `${i - 1} / ${i + 2}`, "yline");
  else setSpanStyle(div, `${j - 1} / ${j + 2}`, `${i - 1} / ${i + 2}`, "space");
};
const setSpanStyle = (div, col, row, styleClass) => {
  div.style.gridColumn = col;
  div.style.gridRow = row;
  div.setAttribute("class", styleClass);
};
render();
