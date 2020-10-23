import { changeTurnStyle, notifEndOfGame, colorLine } from "./render.js";
let blueScore = 0;
let redScore = 0;
let own = ""
let turn = "red";
let lineCondition = [];

export const rowCount = 6;
export const columnCount = 6;

const initializeArray = () => {
  for (let i = 1; i <= 2 * rowCount * (rowCount - 1); i++) {
    lineCondition[i] = 0;
  }
};
initializeArray();

export const setOwn = (string) => {
  own = string;
  turn = own;
}
export const getOwn = () => {
  return own
}

export const getColoredLine = () => {};
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
  // notifChange();
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

export const decodeData = (data) => {
  console.log("decoding...")
  let temp = data.split(",")
  for (let i = 0; i < temp.length; i++) {
    lineCondition[i+1] = temp[i]
  }
  console.log(lineCondition)
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
  console.log("getting line condition ...")
  for (let i = 1; i <= lineCondition.length; i++) {
    if(lineCondition[i] == 1){
      colorLine(getLineFromIndex(i), getOpponent())

    } else console.log("nabood ke!")
    
  }
}

export const getLineFromIndex = (index) => {
  console.log("getting line from index ...")
  const elements = document.getElementById("paper").childNodes
  for (let k = 0; k < elements.length; k++) {
    const j = elements[k].getAttribute("j");
    const i = elements[k].getAttribute("i");
    const kind = elements[k].getAttribute("class")

    if((index == Math.floor(i / 2) * 11 + j / 2 && kind == "xline") || (index == (i - 1) * 5 + Math.floor(j / 2) + i / 2 && kind == "yline")){
      console.log(elements[k])
      return elements[k]
    }
  }
}
