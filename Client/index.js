import {render} from "./render.js";
const socket = io("http://localhost:3000")
console.log(socket.connected); // false

socket.on('connect', () => {
  console.log(socket.connected); // true
  
});

socket.on('disconnect', () => {
  console.log(socket.connected); // false
});
render();