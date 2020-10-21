import { getCondition, setCondition } from "./data.js";

const socket = io("http://localhost:3000");

console.log(socket.connected); // false
socket.on("connect", () => {
  console.log(socket.connected); // true
});
socket.on("disconnect", () => {
  console.log(socket.connected); // false
});
socket.on("hello", (msg) => {
  console.log(msg);
  socket.emit("hello", "yes i can", 1, 2, "abc");
});
export const notifXlineChange = () => {
  socket.emit("xline", getCondition());
};
socket.on("xline", (change) => {
  setCondition(change);
  console.log(change);
});
export const notifYlineChange = () => {
  socket.emit("yline", getCondition());
};
socket.on("yline", (change) => {
  setCondition(change);
  console.log(change);
});

console.log("server isn't up!");
