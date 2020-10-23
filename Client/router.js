import { codeData, decodeData, setOwn} from "./data.js";

const socket = io("http://localhost:3000");

console.log(socket.connected); // false
socket.on("connect", () => {
  console.log(socket.connected); // true
});
socket.on("disconnect", () => {
  console.log(socket.connected); // false
});
socket.on("hello", (msg) => {
  console.log(msg)
  setOwn(msg)
  socket.emit("hello", "understand!");
});
export const coding = () => {
  socket.emit("change", codeData());
};
socket.on("change", (code) => {
  console.log(code)
  decodeData(code)
});

