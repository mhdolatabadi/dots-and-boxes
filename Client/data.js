import { checkCondition } from "./logic.js";

export const rowCount = 5;
export const columnCount = 5;
let blueScore = 0;
let redScore = 0;
let turn = "red";
export const getBlueScore = () => {
  return blueScore;
};
export const getRedScore = () => {
  return redScore;
};
export const setBlueScore = (score) => {
  blueScore = score;
};
export const setRedScore = (score) => {
  redScore = score;
};
const create2DArray = (rows) => {
  let arr = [];
  for (let i = 0; i < rows; i++) arr[i] = [];
  return arr;
};

let squaresCondition = create2DArray(rowCount);
const getSquareCondition = () => {
  return squaresCondition;
};
export const changeTurn = () => {
  console.log("changing...");
  document.getElementById(turn).style.border = "";
  if (turn === "red") turn = "blue";
  else turn = "red";
  document.getElementById(turn).style.borderBottom = "solid rgb(46, 46, 46) 5px";
  document.getElementById("titr").style.backgroundColor =  "dark" + getTurn()
  document.getElementById("titr").style.color = "white"
};

export const getTurn = () => {
  return turn;
};
const getOpponent = () => {
  if (turn === "red") return "blue"
  else return "red"
}
export const addCondition = (i, j) => {
  if (squaresCondition[i][j] >= 1) squaresCondition[i][j] += 1;
  else if (squaresCondition[i][j] != 1) squaresCondition[i][j] = 1;
};
export const getCondition = () => {
  return squaresCondition;
};
