import { get, set } from "./data.js";
import { decodeData } from "./logic.js";
import { initializeTurn, showMessage } from "./gameRender.js";
import { getUserFirstName, getUserId, roomId } from "./index.js";

// const socket = io("https://noghteh-bazi.wapp.weblite.me/");
const socket = io("http://localhost:3000");

socket.on("handshake", () => {
  socket.emit("handshake", roomId(), getUserId());
});

socket.on("turn", (turn) => {
  console.log(turn)
  set("color", turn);
  initializeTurn();
});

socket.on("wait", (type) => {
  if (type === "wait") {
    showMessage("در انتظار حریف");
    set("waiting", true);
  } else {
    socket.emit("wait", get("opponentColor"));
    showMessage("نقطه‌بازی");
    set("waiting", false);
  }
});

socket.on("watch", (changes) => {
  if (changes.length > 0) {
    for (let i = 0; i < changes.length; i++) {
      decodeData(changes[i]);
    }
  }
});

socket.on("greeting", () => {
  socket.emit("greeting", getUserFirstName());
});

socket.on("name", (name) => {
  set("opponentName", name);
});

socket.on("role", (role) => {
  set("role", role);
  showMessage("تماشاچی");
});


export const coding = (line) => {
  const i = line.getAttribute("i")
  const j = line.getAttribute("j")
  const type = line.getAttribute("class")
  const message = {
    x: i,
    y: j,
    kind: type,
  }
  set("permission", false);
  console.log(message)
  socket.emit("change", message, get("color"));
};
socket.on("change", (line, turn) => {
  console.log(line)
  if (get("opponentColor") === turn) {
    set("permission", true);
    decodeData(line, turn);
  }
});

export const requestGift = () => {
  socket.emit("gift", "request");
};
socket.on("gift", () => {
  set("permission", !get("permission"));
});

export const resign = () => {
  showEnd(get("opponentColor"));
  socket.emit("resign");
};
socket.on("resign", () => {
  showEnd(get("color"));
  socket.emit("disconnect", "salam");
});
