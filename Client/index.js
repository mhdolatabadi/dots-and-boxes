import { set } from "./data.js";
import { render } from "./gameRender.js";

const room = "lsweWzenVd53sskh9s1d0nLnK383kJ;HiHgF8Nlj23esosdm1f45AXQwsl4dsw";

const W = window.W;
if (W !== undefined) {
  W.setHooks({
    wappWillStart(start) {
      start();
    },
  });
}

export const roomId = () => {
  if (W !== undefined){
    const roomId = W.wapp.getWisId() 
    set('roomId', roomId)
    return roomId;
  } else{
    set('roomId', room)
    return room;
  }
};
export const getUserFirstName = () => {
  if (W !== undefined) return W.user.getFirstname();
  else return "شما";
};
export const getUserId = () => {
  if (W !== undefined) {
    const id = W.user.getId()
    set("userId", id);
    return id;
  } else {
    const id = prompt('get number');
    set("userId", id);
    return id;
  }
};
render();
