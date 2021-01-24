const { W } = window;
const devMode = false;
export default {
  id: W ? W.user.getId() : prompt("get number"),
  roomId: W
    ? W.wapp.getWisId()
    : "lswe?.']123zenV34e.d5m36sskh9s1d0n4LnK383kJ;HiHgF8Nlj23esosdm1f45AXQwsl4dsw",
  firstName: W ? W.user.getFirstname() : "شما",
};
