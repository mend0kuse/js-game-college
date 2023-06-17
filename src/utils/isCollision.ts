export const isCollision = (playerPos: DOMRect, trapPos: DOMRect) => {
    return !(((playerPos.top + playerPos.height) < (trapPos.top)) || //сверху
        (playerPos.top > (trapPos.top + trapPos.height)) || //снизу
        ((playerPos.left + playerPos.width) < trapPos.left) || // слева
        (playerPos.left > (trapPos.left + trapPos.width))) // справа
}