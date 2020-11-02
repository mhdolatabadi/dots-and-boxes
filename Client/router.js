import {
  codeData,
  decodeData,
  setIsTurn,
  changeTurn,
  get,
  set
} from "./data.js";
import {
  notifEndOfGame,
  showError,
  waiting,
  unwaiting,
  render,
} from "./gameRender.js";
import { getUserFirstName, getUserId, roomId } from "./index.js";

const socket = io("https://noghteh-bazi.wapp.weblite.me/");
// const socket = io("http://localhost:3000");

let role = "";

export const getRole = () => {
  return role;
};

socket.on("turn", (turn) => {
  set(color, turn);
});

socket.on("watch", (changes) => {
  console.log("watching...")
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
      set(waiting, true);
    } else {
      socket.emit("wait", get(opponentColor));
      unwaiting();
      set(waiting, false);
    }
  }
});

socket.on("greeting", () => {
  console.log("greeting");
  socket.emit("greeting", getUserFirstName());
});

socket.on("name", (name) => {
  console.log("naming");
  if (role !== "subscriber") set(opponentName, name);
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
    socket.emit("change", codeData(), get(color));
  }
};
socket.on("change", (code, colori) => {
  if (role === "subscriber") {
    set(color, colori);
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
  notifEndOfGame(get(opponentColor));
  socket.emit("resign");
};
socket.on("resign", () => {
  notifEndOfGame(get(color));
  socket.emit("disconnect", "salam");
});
