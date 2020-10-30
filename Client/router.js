import {
  codeData,
  decodeData,
  setTurn,
  setIsTurn,
  changeTurn,
  setIsWait,
  getOpponent,
  getTurn,
  setOpponentName,
} from "./data.js";
import {
  notifEndOfGame,
  showError,
  waiting,
  unwaiting,
  render,
} from "./render.js";
import { getUserFirstName, getUserId, roomId } from "./index.js";

const socket = io("https://noghteh-bazi.wapp.weblite.me/");
// const socket = io("http://localhost:3000");

let role = "";

export const getRole = () => {
  return role;
};

socket.on("turn", (turn) => {
  setTurn(turn);
});

socket.on("watch", (changes) => {
  if (changes.length > 0) {
    for (let i = 0; i < changes.length; i++) {
      decodeData(changes[i]);
      changeTurn();
    }
  }
});

socket.on("wait", (state) => {
  if (role !== "subscriber") {
    if (state === "wait") {
      waiting();
      setIsWait();
    } else {
      socket.emit("wait", getOpponent());
      unwaiting();
      setIsWait();
    }
  }
});

socket.on("greeting", () => {
  console.log("greeting");
  socket.emit("greeting", getUserFirstName());
});

socket.on("name", (name) => {
  console.log("naming");
  if (role !== "subscriber") setOpponentName(name);
});

socket.on("role", (err) => {
  role = err;
  showError();
});

socket.on("handshake", (turn) => {
  socket.emit("handshake", roomId(), getUserId());
});
export const coding = () => {
  if (role !== "subscriber") {
    setIsTurn();
    socket.emit("change", codeData(), getTurn());
  }
};
socket.on("change", (code, color) => {
  if (role === "subscriber") {
    setTurn(color);
  }
  decodeData(code);
});

export const notifGift = () => {
  if (role !== "subscriber") socket.emit("gift", "request");
};
socket.on("gift", (gift) => {
  setIsTurn();
  if (role === "subscriber") {
    changeTurn();
  }
});

export const resign = () => {
  notifEndOfGame(getOpponent());
  socket.emit("resign");
};
socket.on("resign", () => {
  notifEndOfGame(getTurn());
  socket.emit("disconnect", "salam");
});
