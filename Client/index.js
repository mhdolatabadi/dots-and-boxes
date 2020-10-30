import { render } from "./render.js";

let id = 0;

const W = window.W;
if (W !== undefined) {
  W.setHooks({
    wappWillStart(start) {
      start();
    },
  });
}

export const roomId = () => {
  if (W !== undefined) return W.wapp.getWisId();
  else id++;
  return id;
};
export const getUserFirstName = () => {
  if (W !== undefined) return  W.user.getFirstname();
}


render();
