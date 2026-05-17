export class CollisionSystem {
    static checkPlayerGhostCollision(playerPos, ghostPositions) {
        for (const ghostPos of ghostPositions) {
            if (playerPos.x === ghostPos.x && playerPos.y === ghostPos.y) {
                return true;
            }
        }
        return false;
    }

    static checkPelletCollision(maze, playerPos) {
        return maze.removePellet(playerPos.x, playerPos.y);
    }
}
