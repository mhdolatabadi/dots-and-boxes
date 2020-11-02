import { addCondition, get, set } from "./data.js";
import { colorBox, updateScore, colorLine } from "./gameRender.js";
import { notifGift } from "./router.js";

const spaces = document.getElementsByClassName("space");

export const addLineToSquare = (line) => {
  const j = line.getAttribute("j");
  const i = line.getAttribute("i");
  if (line.className == "yline") {
    if (j != 1) addCondition(i / 2, Math.floor(j / 2));
    if (j != 2 * get("row") - 1) addCondition(i / 2, Math.ceil(j / 2));
  } else if (line.className == "xline") {
    if (i != 1) addCondition(Math.floor(i / 2), j / 2);
    if (i != 2 * get("column") - 1) addCondition(Math.ceil(i / 2), j / 2);
  }
};
export const checkCondition = () => {
  const condition = get("tabel").squares
  for (let i = 0; i < condition.length; i++)
    for (let j = 0; j < condition[i].length; j++)
      if (condition[i][j] == 4) {
        colorBox(i, j);
        condition[i][j] += 1;
        updateScore();
        set("gift", true)
      }
  if (get("gift")) notifGift();
  set("gift", false);
};
export const findSpace = (i, j) => {
  for (let k = 0; k < spaces.length; k++) {
    const x = spaces[k].getAttribute("i");
    const y = spaces[k].getAttribute("j");
    if (i == x / 2 && j == y / 2) return spaces[k];
  }
};

export const checkEnd = () => {
  if (opponentScore + score == (rowCount - 1) * (rowCount - 1)) {
    set("end", true);
    if (opponentScore > score) return notifEndOfGame(get("opponentColor"));
    else return notifEndOfGame(get("color"));
  }
};

export const decodeData = (data) => {
  let temp = data.split(",");
  for (let i = 0; i < temp.length; i++) {
    get("table").lines[i + 1] = temp[i];
  }
  getLineCondition();
};

export const codeData = () => {
  let code = "";
  for (let i = 1; i < get("table").lines.length; i++) {
    code += get("table").lines[i];
    if (i !== get("table").lines.length - 1) code += ",";
  }
  return code;
};
export const markLine = (line) => {
  let index;
  const j = line.getAttribute("j");
  const i = line.getAttribute("i");
  if (i % 2 == 1) index = Math.floor(i / 2) * 11 + j / 2;
  else index = (i - 1) * 5 + Math.floor(j / 2) + i / 2;
  get("table").lines[index] = 1;
};
export const getLineCondition = () => {
  for (let i = 1; i <= get("table").lines.length; i++) {
    if (get("table").lines[i] == 1) {
      if (
        getLineFromIndex(i).style.backgroundColor != "red" &&
        getLineFromIndex(i).style.backgroundColor != "blue"
      ) {
        if (get("role") !== "subscriber")
        colorLine(getLineFromIndex(i), get("opponentColor"));
        else colorLine(getLineFromIndex(i), get("color"));
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
