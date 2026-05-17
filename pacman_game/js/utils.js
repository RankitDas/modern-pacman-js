export const CONFIG = {
    CANVAS_WIDTH: 800,
    CANVAS_HEIGHT: 600,

    TILE_SIZE: 40,

    GRID_WIDTH: 20,
    GRID_HEIGHT: 15,

    // Time in seconds between tile movements
    PLAYER_MOVE_DELAY: 0.15,
    GHOST_MOVE_DELAY: 0.22,

    INITIAL_LIVES: 3
};

export class Vector2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    add(v) {
        return new Vector2(this.x + v.x, this.y + v.y);
    }

    multiply(scalar) {
        return new Vector2(this.x * scalar, this.y * scalar);
    }

    distance(v) {
        const dx = this.x - v.x;
        const dy = this.y - v.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    copy() {
        return new Vector2(this.x, this.y);
    }

    equals(v) {
        return this.x === v.x && this.y === v.y;
    }
}

export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

export function gridToPixel(gridX, gridY) {
    return {
        x: gridX * CONFIG.TILE_SIZE,
        y: gridY * CONFIG.TILE_SIZE
    };
}

export function pixelToGrid(pixelX, pixelY) {
    return {
        x: Math.floor(pixelX / CONFIG.TILE_SIZE),
        y: Math.floor(pixelY / CONFIG.TILE_SIZE)
    };
}

export function isValidGridPos(x, y) {
    return (
        x >= 0 &&
        x < CONFIG.GRID_WIDTH &&
        y >= 0 &&
        y < CONFIG.GRID_HEIGHT
    );
}