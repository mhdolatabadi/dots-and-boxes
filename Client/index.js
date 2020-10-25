import { render } from "./render.js";

const W = window.W
W.setHooks({
    wappWillStart(start){
        start()
    }
})

export const roomId = () => {
    return W.wapp.getWisId()
}

render();
