import {
  codeData,
  decodeData,
  setTurn,
  setIsTurn,
  changeTurn,
} from "./data.js";
import { ynotifEndOfGame, showError } from "./render.js";
import { roomId } from "./index.js";
const config = require("./config")

const socket = io(config.host);
let role = "";

export const getRole = () => {
  return role;
}

socket.on("turn", (turn) => {
  setTurn(turn);
});

socket.on("role", (err) => {
  role = err;
  showError();
});

socket.on("handshake", (turn) => {
  setTurn(turn);
  socket.emit("handshake", roomId());
});
export const coding = () => {
  if(role !== "subscriber"){
    setIsTurn();
    socket.emit("change", codeData());

  }
};
socket.on("change", (code) => {
  decodeData(code);
  if (role === "subscriber"){
    changeTurn();
  } 
});

export const notifGift = () => {
  socket.emit("gift", "request");
};
socket.on("gift", (gift) => {
  setIsTurn();
});

export const resign = () => {
  ynotifEndOfGame("loser");
  socket.emit("resign");
};
socket.on("resign", () => {
  ynotifEndOfGame("winner");
  socket.emit("disconnect", "salam");
});
