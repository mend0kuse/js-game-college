export const createTwoElements = () => {
    const posx1 = Math.random() * (1000 - 0) + 0
    const posy1 = Math.random() * (700 - 0) + 0
    const newElem1 = { id: Date.now(), posX: Number(posx1), posY: Number(posy1) }
    const posx2 = Math.random() * (1000 - 0) + 0
    const posy2 = Math.random() * (700 - 0) + 0
    const newElem2 = { id: Date.now() + 5, posX: Number(posx2), posY: Number(posy2) }

    return [newElem1, newElem2]

}
