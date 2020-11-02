import { showTurn, render } from "./gameRender.js";


const dataCreator = (rowCount, columnCount) => ({
  score: 0,
  opponentScore: 0,
  row: rowCount,
  column: columnCount,
  name: undefined,
  opponentName: undefined,
  letter: undefined,
  role: undefined,
  color: "red",
  opponentColor: "blue",
  end: false,
  permission: false,
  waiting: true,
  gift: false,
  table: {
    lines: [],
    squares: [],
  },
});

var data = dataCreator(6, 6);

export const get = (key) => data[key];

export const set = (key, value) => {
  data[key] = value;
  render();
  showTurn();
};
export const reset = () => {
  render();
  showTurn();
};
const initializeArray = () => {
  for (let i = 1; i <= 2 * get("row") * (get("row") - 1); i++) {
    get("table").lines[i] = 0;
  }
};

initializeArray();
const create2DArray = (rows) => {
  let arr = [];
  for (let i = 0; i < rows; i++) arr[i] = [];
  return arr;
};
export const addCondition = (i, j) => {
  if ( get("table").squares[i][j] >= 1) get("table").squares[i][j] += 1;
  else if (get("table").squares[i][j] != 1) get("table").squares[i][j] = 1;
};