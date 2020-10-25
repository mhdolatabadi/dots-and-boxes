import { codeData, decodeData, setOwn, setIsTurn, getIsTurn } from "./data.js";
import { ynotifEndOfGame, showError } from "./render.js";
import {roomId} from "./index.js"
const config = require("./config")

const socket = io(config.host);


socket.on("turn", (turn) => {
  setOwn(turn);
})

socket.on("error", (err) => {
  showError()
})

socket.on("handshake", (turn) => {
  setOwn(turn);
  socket.emit("handshake", roomId());
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
