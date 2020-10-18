import {render} from "./render.js";
// import io from 'socket.io-client';
const socket = io()
console.log(socket.connected); // false

socket.on('connect', () => {
  console.log(socket.connected); // true
});

socket.on('disconnect', () => {
  console.log(socket.connected); // false
});
render();