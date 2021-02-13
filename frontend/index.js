import { set } from "./src/data.js";
import { render } from "./src/render.js";
import config from "./src/helper/config.js";

gameanalytics.GameAnalytics.configureBuild("1.0.0");
gameanalytics.GameAnalytics.initialize(
  "e73000a93dcd27441dc06122212bcba0",
  "02cf80df151c71ff251b3e47e80bb29edbe2a87b"
);

const { W } = window;
if (W !== undefined) {
  W.setHooks({
    wappWillStart(start) {
      W.initializeAsync();
      start();
    },
  });
}
export const roomId = () => {
  set("roomId", config.roomId);
  return config.roomId;
};
export const getUserFirstName = () => {
  return config.firstName;
};
export const getUserId = () => {
  set("userId", config.id);
  return config.id;
};
render();
