import { getUserFirstName } from "./index.js";
import { addLineToSquare, checkCondition, checkEnd } from "./logic.js";
import { showTurn, colorLine } from "./gameRender.js";
import { getRole } from "./router.js";
let turn = "red";
let waiting = false;
let lineCondition = [];
let name = undefined;
let opponentName = undefined;

const dataCreator = (rowCount, columnCount) => ({
  score: 0,
  opponentScore: 0,
  row: rowCount,
  column: columnCount,
  name: undefined,
  opponentName: undefined,
  color: "red",
  opponentColor: "blue",
  end: false,
  permission: false,
  waiting: true,
  stateTable: [],
});

var data = dataCreator(6, 6);

export const get = (key) => data[key];

export const set = (key, value) => {
  data[key] = value;
  render();
  initializeTurn();
  showTurn();
};
export const reset = () => {
  data = dataCreator(8, 360, randomGenerator(8));

  render();
  initializeTurn();
  showTurn();
};

export const getName = () => {
  if (name == undefined) {
    if (turn === "red") return "قرمز";
    else return "آبی";
  } else return name;
};

export const getOpponentName = () => {
  if (opponentName == undefined) {
    if (turn === "blue") return "قرمز";
    else return "آبی";
  } else return opponentName;
};

export const setIsWait = () => {
  waiting = !waiting;
};

export const getConditionLine = () => {
  return lineCondition;
};
export const setConditionLine = (a) => {
  lineCondition = a;
};

const initializeArray = () => {
  for (let i = 1; i <= 2 * get(row) * (get(row) - 1); i++) {
    lineCondition[i] = 0;
  }
};
initializeArray();

const initializeTurn = () => {
  if (get(color) === "red") permission = true;
  else permission = false;
  name = getUserFirstName();
  document.getElementById(get(color)).innerHTML = getName() + ":" + "0";
  document.getElementById(get(opponentColor)).innerHTML =
    get(opponentName) + ":" + "0";
};

export const changeTurn = () => {
  if (turn === "red") turn = "blue";
  else turn = "red";

  showTurn();
};

const create2DArray = (rows) => {
  let arr = [];
  for (let i = 0; i < rows; i++) arr[i] = [];
  return arr;
};
let squaresCondition = create2DArray(get(row));

export const getSquaresCondition = () => {
  return squaresCondition;
};
export const setSquaresCondition = (a) => {
  squaresCondition = a;
};

export const addCondition = (i, j) => {
  if (squaresCondition[i][j] >= 1) squaresCondition[i][j] += 1;
  else if (squaresCondition[i][j] != 1) squaresCondition[i][j] = 1;
};
export const getCondition = () => {
  return squaresCondition;
};
export const setCondition = (change) => {
  squaresCondition = change;
};


export const decodeData = (data) => {
  setcanMove();
  let temp = data.split(",");
  for (let i = 0; i < temp.length; i++) {
    lineCondition[i + 1] = temp[i];
  }
  getLineCondition();
};
export const codeData = () => {
  let code = "";
  for (let i = 1; i < lineCondition.length; i++) {
    code += lineCondition[i];
    if (i !== lineCondition.length - 1) code += ",";
  }
  return code;
};
export const addLineCondition = (line) => {
  let index;
  const j = line.getAttribute("j");
  const i = line.getAttribute("i");
  if (i % 2 == 1) index = Math.floor(i / 2) * 11 + j / 2;
  else index = (i - 1) * 5 + Math.floor(j / 2) + i / 2;
  lineCondition[index] = 1;
};
export const getLineCondition = () => {
  for (let i = 1; i <= lineCondition.length; i++) {
    if (lineCondition[i] == 1) {
      if (
        getLineFromIndex(i).style.backgroundColor != "red" &&
        getLineFromIndex(i).style.backgroundColor != "blue"
      ) {
        if (getRole() !== "subscriber")
          colorLine(getLineFromIndex(i), get(opponentColor));
        else colorLine(getLineFromIndex(i), get(color));
        addLineToSquare(getLineFromIndex(i));
        checkCondition();
        checkEnd();
      }
    }
  }
};

export const getLineFromIndex = (index) => {
  const elements = document.getElementById("paper").childNodes;
  for (let k = 0; k < elements.length; k++) {
    const j = elements[k].getAttribute("j");
    const i = elements[k].getAttribute("i");
    const kind = elements[k].getAttribute("class");

    if (
      (index == Math.floor(i / 2) * 11 + j / 2 && kind == "xline") ||
      (index == (i - 1) * 5 + Math.floor(j / 2) + i / 2 && kind == "yline")
    ) {
      return elements[k];
    }
  }
};
