import { showTurn, render, showEnd } from "./gameRender.js";
import { create2DArray } from "./helper/functions/create2DArray";

const dataCreator = (rowCount, columnCount) => ({
  roomId: undefined,
  userId: undefined,
  score: 0,
  opponentScore: 0,
  row: rowCount,
  column: columnCount,
  name: "نامشخص",
  opponentName: "نامشخص",
  letter: undefined,
  role: undefined,
  color: "red",
  opponentColor: "blue",
  end: false,
  permission: false,
  waiting: false,
  gift: false,
  language: "persian",
  table: {
    lines: [],
    squares: [],
  },
});

var data = dataCreator(6, 6);

export const get = (key) => data[key];

export const set = (key, value) => {
  data[key] = value;
  showTurn();
};
export const reset = () => {
  render();
  showTurn();
};
const initializeArray = (array, type, length) => {
  if (type == "lines")
    for (let i = 1; i <= length; i++) get("table").lines[i] = 0;
  else if (type == "squares")
    for (let i = 0; i < length; i++)
      for (let j = 0; j < length; j++) array[i][j] = 0;
};

get("table").squares = create2DArray(get("row"));
initializeArray(get("table").squares, "squares", get("table").squares.length);
initializeArray(get("table").lines, "lines", 2 * get("row") * (get("row") - 1));

export const addCondition = (i, j) => {
  get("table").squares[i][j] = get("table").squares[i][j] + 1;
};

export const messages = {
  english: {
    waiting: "waiting for opponent...",
    languageButton: "english",
    resignButton: "resign",
    header: "Dots and Boxes",
    winner: "winner",
    loser: "loser",
    subscriber: "subscriber",
  },
  persian: {
    waiting: "در انتظار حریف...",
    languageButton: "فارسی",
    resignButton: "تسلیم",
    header: "نقطه‌بازی",
    winner: "برنده",
    loser: "بازنده",
    subscriber: "تماشاچی",
  },
};
