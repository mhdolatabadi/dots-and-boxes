import { codeData, decodeData, setOwn, setIsTurn, getIsTurn } from "./data.js";
import { ynotifEndOfGame } from "./render.js";

const socket = io("http://localhost:3000");

socket.on("connect", () => {
});
socket.on("disconnect", () => {
});
socket.on("hello", (msg) => {
  setOwn(msg);
  socket.emit("hello", "understand!");
});
export const coding = () => {
  setIsTurn();
  socket.emit("change", codeData());
};
socket.on("change", (code) => {
  decodeData(code);
});

export const notifGift = () => {
  socket.emit("gift", "request");
};
socket.on("gift", (gift) => {
  setIsTurn();
});

export const resign = () => {
  ynotifEndOfGame("loser");
  socket.emit("resign")
};
socket.on("resign", () => {
  ynotifEndOfGame("winner");
  socket.emit("disconnect", "salam")
}); 
