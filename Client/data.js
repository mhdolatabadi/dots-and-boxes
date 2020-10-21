import { changeTurnStyle, notifEndOfGame } from "./render.js";
import { notifChange } from "./router.js";
let blueScore = 0;
let redScore = 0;
let turn = "red";

export const rowCount = 6;
export const columnCount = 6;
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
  if (turn === "red") turn = "blue";
  else turn = "red";
  changeTurnStyle();
};

export const getTurn = () => {
  return turn;
};
export const getOpponent = () => {
  if (turn === "red") return "blue";
  else return "red";
};
export const addCondition = (i, j) => {
  if (squaresCondition[i][j] >= 1) squaresCondition[i][j] += 1;
  else if (squaresCondition[i][j] != 1) squaresCondition[i][j] = 1;
  notifChange();
};
export const getCondition = () => {
  return squaresCondition;
};
export const setCondition = (change) => {
  squaresCondition = change;
};
export const checkEndOfGame = () => {
  if (blueScore + redScore == (rowCount - 1) * (rowCount - 1))
    return notifEndOfGame();
};
