import {
    CONFIG,
    gridToPixel,
    getRandomInt
} from './utils.js';

export class Ghost {
    constructor(startX, startY, color) {
        this.gridX = startX;
        this.gridY = startY;

        this.color = color;

        this.direction = { x: 0, y: 0 };

        this.moveTimer = 0;
    }

    update(deltaTime, maze, playerPos) {
        this.moveTimer += deltaTime;

        if (this.moveTimer < CONFIG.GHOST_MOVE_DELAY) {
            return;
        }

        this.moveTimer = 0;

        this.chooseDirection(maze, playerPos);

        const nextX = this.gridX + this.direction.x;
        const nextY = this.gridY + this.direction.y;

        if (maze.canMoveTo(nextX, nextY)) {
            this.gridX = nextX;
            this.gridY = nextY;
        }
    }

    chooseDirection(maze, playerPos) {
        const validMoves = [];

        const moves = [
            { x: 0, y: -1 },
            { x: 0, y: 1 },
            { x: -1, y: 0 },
            { x: 1, y: 0 }
        ];

        for (const move of moves) {
            const nextX = this.gridX + move.x;
            const nextY = this.gridY + move.y;

            if (maze.canMoveTo(nextX, nextY)) {
                const dist =
                    Math.abs(nextX - playerPos.x) +
                    Math.abs(nextY - playerPos.y);

                validMoves.push({
                    move,
                    dist
                });
            }
        }

        if (validMoves.length === 0) return;

        // 70% chase
        if (Math.random() < 0.7) {
            validMoves.sort((a, b) => a.dist - b.dist);
            this.direction = validMoves[0].move;
        } else {
            this.direction =
                validMoves[
                    getRandomInt(0, validMoves.length - 1)
                ].move;
        }
    }

    render(ctx) {
        const pixel = gridToPixel(this.gridX, this.gridY);

        const x = pixel.x;
        const y = pixel.y;

        const size = CONFIG.TILE_SIZE;

        ctx.fillStyle = this.color;

        ctx.fillRect(x, y, size, size * 0.8);

        // Eyes
        ctx.fillStyle = '#fff';

        ctx.fillRect(x + 5, y + 5, 8, 8);
        ctx.fillRect(x + size - 13, y + 5, 8, 8);

        ctx.fillStyle = '#000';

        ctx.fillRect(x + 7, y + 7, 4, 4);
        ctx.fillRect(x + size - 11, y + 7, 4, 4);
    }

    getPosition() {
        return {
            x: this.gridX,
            y: this.gridY
        };
    }
}