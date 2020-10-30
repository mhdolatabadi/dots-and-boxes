import { render } from "./render.js";

let id = 12;
let userId = 0;

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
  else return id;
};
export const getUserFirstName = () => {
  if (W !== undefined) return W.user.getFirstname();
  else return "akbar";
};
export const getUserId = () => {
  if (W !== undefined) return W.user.getId();
  return userId++;
};

render();
