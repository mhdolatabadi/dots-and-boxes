import {
  addCondition,
  getCondition,
  rowCount,
  columnCount,
} from "./data.js";
import { colorBox, updateScore } from "./render.js";

let gift = false;

const spaces = document.getElementsByClassName("space");

export const addLineToSquare = (line) => {
  const j = line.getAttribute("j");
  const i = line.getAttribute("i");
  if (line.className == "yline") {
    if (j != 1) addCondition(i / 2, Math.floor(j / 2));
    if (j != 2 * rowCount - 1) addCondition(i / 2, Math.ceil(j / 2));
  } else if (line.className == "xline") {
    if (i != 1) addCondition(Math.floor(i / 2), j / 2);
    if (i != 2 * columnCount - 1) addCondition(Math.ceil(i / 2), j / 2);
  }
};
export const checkCondition = () => {
  console.log("checking...");
  const condition = getCondition();
  for (let i = 0; i < condition.length; i++)
    for (let j = 0; j < condition[i].length; j++)
      if (condition[i][j] == 4) {
        colorBox(i, j);
        condition[i][j] += 1;
        updateScore();
        gift = true;
      }
  // if (!gift) ;
  // gift = false;
};
export const findSpace = (i, j) => {
  for (let k = 0; k < spaces.length; k++) {
    const x = spaces[k].getAttribute("i");
    const y = spaces[k].getAttribute("j");
    if (i == x / 2 && j == y / 2) return spaces[k];
  }
};
