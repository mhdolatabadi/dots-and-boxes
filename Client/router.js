import { codeData, decodeData, setOwn, setIsTurn} from "./data.js";

const socket = io("http://localhost:3000");

console.log(socket.connected); // false
socket.on("connect", () => {
  console.log(socket.connected); // true
});
socket.on("disconnect", () => {
  console.log(socket.connected); // false
});
socket.on("hello", (msg) => {
  setOwn(msg)
  console.log(msg)
  socket.emit("hello", "understand!");
});
export const coding = () => {
  setIsTurn();
  socket.emit("change", codeData());
};
socket.on("change", (code) => {
  decodeData(code)
});

export const notifGift = () => {
  socket.emit("gift", "request")
  setIsTurn()
}
socket.on("gift", (gift) => {
  setIsTurn();
})


