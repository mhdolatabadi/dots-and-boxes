import { get, set } from "./data.js";
import { recieve } from "./logic.js";
import { initializeTurn, showMessage, showEnd, showTurn } from "./gameRender.js";
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
    showMessage("waiting");
    set("waiting", true);
  } else {
    showMessage("header");
    set("waiting", false);
    socket.emit("wait", get("userId"), get("roomId"), get("opponentColor"));
    socket.emit("name", get("userId"), get("roomId"));
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
  socket.emit("introduce", get("userId"), get("roomId"), getUserFirstName());
});

socket.on("name", (name) => {
  set("opponentName", name);
  showTurn();
});

socket.on("role", (role) => {
  set("role", role);
  showMessage("تماشاچی");
  socket.emit("getname", get("roomId"));
});

socket.on("getname", (redName, blueName) => {
  if (get("role") === "subscriber") {
    set("name", redName);
    set("opponentName", blueName);
  }
  showTurn();

});

export const notifyEnd = () => {
  socket.emit("end", get("userId"), get("roomId"));
};

export const send = (line) => {
  const i = line.getAttribute("i");
  const j = line.getAttribute("j");
  const type = line.getAttribute("class");
  const message = {
    x: i,
    y: j,
    kind: type,
  };
  socket.emit("change", get("userId"), get("roomId"), message, get("color"));
};

socket.on("change", (line, turn) => {
  if (get("role") === "subscriber") {
    set("opponentColor", turn);
    if (turn === "red") set("color", "blue");
    else set("color", "red");
  }
  if (get("opponentColor") === turn) set("permission", true);
  recieve(line, turn);
});

export const requestGift = () => {
  socket.emit("gift", get("userId"), get("roomId"));
};
socket.on("gift", () => {
  set("permission", !get("permission"));
});

export const resign = () => {
  showEnd(get("opponentColor"));
  socket.emit("resign", get("userId"), get("roomId"));
};
socket.on("resign", () => {
  showEnd(get("color"));
  socket.emit("disconnect", get("userId"), get("roomId"));
});
socket.on('permission', (permission) => {
  set('permission', permission)
})
