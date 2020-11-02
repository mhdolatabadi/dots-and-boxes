const rootContainer = document.getElementById("root-container")
const render = () => {
    createButtonContainer()
    createButton("create-room", "ساخت اتاق")
    createButton("lobby-wait", "بازی در لابی")
}

const createButtonContainer = () => {
    const container = document.createElement("div")
    container.setAttribute("id", "button-container")
}
const createButton = (id, text) => {
    const button = document.createElement("div")
    button.setAttribute("id", id)
    button.setAttribute("class", "button")
    button.innerHTML = text
    document.getElementById("button-container").appendChild(button)
    
}