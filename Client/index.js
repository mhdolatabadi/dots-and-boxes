import { render } from "./render.js";

let id = 0;

const W = window.W
W.setHooks({
    wappWillStart(start){
        start()
    }
})

export const roomId = () => {
    return W.wapp.getWisId()
    // id++;
    // return id;
}

render();
