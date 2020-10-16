import { checkCondition } from "./logic.js";

let turn = "red";
let blueScore = 0;
let redScore = 0;
const updateScoreBoard = () => {
  document.getElementById("blue").innerHTML = "Blue: " + blueScore
  document.getElementById("red").innerHTML = "Red: " + redScore

}
export const updateScore = () => {
  if (getWinner() != "red") redScore += 1;
  else blueScore += 1;
  updateScoreBoard();
};
const create2DArray = (rows) => {
  let arr = [];
  for (let i = 0; i < rows; i++) arr[i] = [];
  return arr;
};
let squaresCondition = create2DArray(5);
// const turnBar = document.getElementById("turn");

export const changeTurn = () => {
  document.getElementById(turn).style.border = ""

  if (turn === "red") turn = "blue";
  else turn = "red";
  document.getElementById(turn).style.border = "solid black 5px"
  // turnBar.style.backgroundColor = turn;
};
export const getTurn = () => {
  return turn;
};
export const getWinner = () => {
  if (turn == "red") return "blue";
  else return "red";
};
export const addCondition = (i, j) => {
  console.log(i, j);
  if (squaresCondition[i][j] >= 1) squaresCondition[i][j] += 1;
  else if (squaresCondition[i][j] != 1) squaresCondition[i][j] = 1;
  checkCondition();
  console.log(squaresCondition[i][j]);
};
export const getCondition = () => {
  return squaresCondition;
};
