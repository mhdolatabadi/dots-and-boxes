import { checkCondition } from "./logic.js";

export const rowCount = 10;
export const columnCount = 10;
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
export const changeTurn = () => {
  document.getElementById(turn).style.border = "";
  if (turn === "red") turn = "blue";
  else turn = "red";
  document.getElementById(turn).style.border = "solid black 5px";
};
export const getTurn = () => {
  return turn;
};
export const getWinner = () => {
  if (turn == "red") return "blue";
  else return "red";
};
export const addCondition = (i, j) => {
  if (squaresCondition[i][j] >= 1) squaresCondition[i][j] += 1;
  else if (squaresCondition[i][j] != 1) squaresCondition[i][j] = 1;
  checkCondition();
};
export const getCondition = () => {
  return squaresCondition;
};
