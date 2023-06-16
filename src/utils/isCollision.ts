export const isCollision = (playerPos: DOMRect, trapPos: DOMRect) => {
    return !(((playerPos.top + playerPos.height) < (trapPos.top)) ||
        (playerPos.top > (trapPos.top + trapPos.height)) ||
        ((playerPos.left + playerPos.width) < trapPos.left) ||
        (playerPos.left > (trapPos.left + trapPos.width)))
}