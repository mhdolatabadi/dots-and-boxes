import { render } from "./gameRender.js";

let id = 30;
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
  else return "اکبر";
};
export const getUserId = () => {
  if (W !== undefined) return W.user.getId();
  return userId++;
};

render();
