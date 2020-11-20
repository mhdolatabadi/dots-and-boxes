import { set } from "./data.js";
import { render } from "./gameRender.js";

const room = "lsweWzeVd5sskh90nLK383kJ;HiHgF8Nlj23esosdm1f45AXQwsl4dsw";

const createId = () => {
  return "_" + Math.random().toString(36).substr(2, 9);
};

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
  set('roomId', room)
  return room;
};
export const getUserFirstName = () => {
  if (W !== undefined) return W.user.getFirstname();
  else return "اکبر";
};
export const getUserId = () => {
  if (W !== undefined) return W.user.getId();
  // const id = createId();
  const id = prompt('get number');

  set("userId", id);
  return id;
};
render();
