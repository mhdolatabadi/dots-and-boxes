let turn = "red"
const turnBar = document.getElementById("turn")
export const changeTurn = () => {
    if (turn === "red") turn = "blue";
    else turn = "red";
    turnBar.style.backgroundColor = turn
}
export const getTurn = () => {
    return turn
}