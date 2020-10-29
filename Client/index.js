import { render } from "./render.js";

let id = 0;

// const W = window.W;
// W.setHooks({
//   wappWillStart(start) {
//     start();
//   },
// });

export const roomId = () => {
//   if (W == undefined) return W.wapp.getWisId();
//   else 
  id++;
  return id;
};

render();
