import { getUserFirstName } from "./index.js";
import { addLineToSquare, checkCondition } from "./logic.js";
import { showTurn, notifEndOfGame, colorLine } from "./gameRender.js";
import { getRole } from "./router.js";
let opponentScore = 0;
let score = 0;
let turn = "red";
let isTurn = true;
let isWait = false;
let lineCondition = [];
let name = undefined;
let opponentName = undefined;
let end = false;

export const getTurn = () => {
  return turn;
};

export const getEnd = () => {
  return end;
};

export const setEnd = (state) => {
  end = state;
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

export const setName = (input) => {
  name = input;
};

export const setOpponentName = (input) => {
  opponentName = input;
  initializeTurn()
};

export const getIsWait = () => {
  return isWait;
};

export const setIsWait = () => {
  isWait = !isWait;
};

export const getConditionLine = () => {
  return lineCondition;
};
export const setConditionLine = (a) => {
  lineCondition = a;
};

export const rowCount = 6;
export const columnCount = 6;

const initializeArray = () => {
  for (let i = 1; i <= 2 * rowCount * (rowCount - 1); i++) {
    lineCondition[i] = 0;
  }
};
initializeArray();

export const getIsTurn = () => {
  return isTurn;
};

export const setIsTurn = () => {
  isTurn = !isTurn;
  showTurn();
};

export const falseTurn = () => {
  isTurn = false;
};

export const setTurn = (input) => {
  turn = input;
  initializeTurn();
};

const initializeTurn = () => {
  if (getTurn() === "red") isTurn = true;
  else isTurn = false;
  name = getUserFirstName();
  document.getElementById(getTurn()).innerHTML = getName() + ":" + "0";
  document.getElementById(getOpponent()).innerHTML =
    getOpponentName() + ":" + "0";
};

export const changeTurn = () => {
  if (turn === "red") {
    turn = "blue";
  } else {
    turn = "red";
  }
  showTurn();
};

export const getColoredLine = () => {};
export const getOpponentScore = () => {
  return opponentScore;
};
export const getScore = () => {
  return score;
};
export const setOpponentScore = (score) => {
  opponentScore = score;
};
export const setScore = (newScore) => {
  score = newScore;
};
const create2DArray = (rows) => {
  let arr = [];
  for (let i = 0; i < rows; i++) arr[i] = [];
  return arr;
};
let squaresCondition = create2DArray(rowCount);

export const getSquaresCondition = () => {
  return squaresCondition;
};
export const setSquaresCondition = (a) => {
  squaresCondition = a;
};

export const getOpponent = () => {
  if (turn === "red") return "blue";
  else return "red";
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
export const checkEndOfGame = () => {
  if (opponentScore + score == (rowCount - 1) * (rowCount - 1)) {
    setEnd(true);
    if (opponentScore > score) return notifEndOfGame(getOpponent());
    else return notifEndOfGame(getTurn());
  }
};

export const decodeData = (data) => {
  setIsTurn();
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
          colorLine(getLineFromIndex(i), getOpponent());
        else colorLine(getLineFromIndex(i), getTurn());
        addLineToSquare(getLineFromIndex(i));
        checkCondition();
        checkEndOfGame();
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
