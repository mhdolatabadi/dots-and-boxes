import { get, set } from "./data.js";
import { recieve } from "./logic.js";
import { initializeTurn, showMessage,showEnd } from "./gameRender.js";
import { getUserFirstName, getUserId, roomId } from "./index.js";

// const socket = io("https://noghteh-bazi.wapp.weblite.me/");
const socket = io("http://localhost:3000");

socket.on("handshake", () => {
  socket.emit("handshake", roomId(), getUserId());
});

socket.on("color", (turn) => {
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
    socket.emit("name");
  }
});

socket.on("watch", (history) => {
  if (history.length > 0) {
    for (let i = 0; i < history.length; i++) {
      recieve(history[i], history[i].color);
    }
  }
});

socket.on("introduce", () => {
  socket.emit("introduce", getUserFirstName());
});

socket.on("name", (name) => {
  set("opponentName", name);
});

socket.on("role", (role) => {
  set("role", role);
  showMessage("تماشاچی");
});

export const notifyEnd = () => {
  socket.emit("end", "end");
}

export const send = (line) => {
  const i = line.getAttribute("i");
  const j = line.getAttribute("j");
  const type = line.getAttribute("class");
  const message = {
    x: i,
    y: j,
    kind: type,
  };
  set("permission", false);
  socket.emit("change", message, get("color"));
};

socket.on("change", (line, turn) => {
  if (get("opponentColor") === turn) {
    recieve(line, turn);
    set("permission", true);
  }
});

export const requestGift = () => {
  socket.emit("gift", "request");
};
socket.on("gift", () => {
  console.log(get("permission"));
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