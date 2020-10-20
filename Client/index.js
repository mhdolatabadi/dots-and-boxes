import { render } from "./render.js";

try {
  const socket = io("http://localhost:3000");
  console.log(socket.connected); // false
  socket.on("connect", () => {
    console.log(socket.connected); // true
    socket.send("salam")
  });
  socket.on("disconnect", () => {
    console.log(socket.connected); // false
  });
} catch (e) {
  console.log("server isn't up!");
}
render();
