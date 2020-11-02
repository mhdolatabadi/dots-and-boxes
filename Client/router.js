import { get, set } from "./data.js";
import { codeData, decodeData } from "./logic.js"
import { notifEndOfGame, showError, waiting, unwaiting, initializeTurn, render } from "./gameRender.js";
import { getUserFirstName, getUserId, roomId } from "./index.js";


const socket = io("https://noghteh-bazi.wapp.weblite.me/");
// const socket = io("http://localhost:3000");

socket.on("turn", (turn) => {
  set("color", turn);
  initializeTurn()
});

socket.on("watch", (changes) => {
  console.log("watching...");
  if (changes.length > 0) {
    for (let i = 0; i < changes.length; i++) {
      decodeData(changes[i]);
    }
  }
});

socket.on("wait", (state) => {
  if (get("role") !== "subscriber") {
    if (state === "wait") {
      waiting();
      set("waiting", true);
    } else {
      socket.emit("wait", get("opponentColor"));
      unwaiting();
      set("waiting", false);
    }
  }
});

socket.on("greeting", () => {
  console.log("greeting");
  socket.emit("greeting", getUserFirstName());
});

socket.on("name", (name) => {
  console.log("naming");
  if (get("role") !== "subscriber") set("opponentName", name);
});

socket.on("role", (role) => {
  set("role", role)
  showError();
});

socket.on("handshake", (turn) => {
  socket.emit("handshake", roomId(), getUserId());
});
export const coding = () => {
  if (get("role") !== "subscriber") {
    set("permission", false);
    socket.emit("change", codeData(), get("color"));
  }
};
socket.on("change", (code, turn) => {
  if (get("role") === "subscriber") {
    set("color", turn);
  }
  set("permission", "true");
  decodeData(code);
});

export const notifGift = () => {
  if (get("role") !== "subscriber") socket.emit("gift", "request");
};
socket.on("gift", () => {
  set("permission", !get("permission"));
});

export const resign = () => {
  notifEndOfGame(get("opponentColor"));
  socket.emit("resign");
};
socket.on("resign", () => {
  notifEndOfGame(get("color"));
  socket.emit("disconnect", "salam");
});
