let turn = "red";
let coloredLine = [];
const turnBar = document.getElementById("turn");
export const changeTurn = () => {
  if (turn === "red") turn = "blue";
  else turn = "red";
  turnBar.style.backgroundColor = turn;
};
export const getTurn = () => {
  return turn;
};
export const addColoredLine = (line) => {
  coloredLine.push(line);
};
export const getColoredLine = () => {
  return coloredLine;
};
