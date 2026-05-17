import { CONFIG, gridToPixel } from './utils.js';

export class Player {
    constructor(startX, startY) {
        this.gridX = startX;
        this.gridY = startY;

        this.direction = { x: 0, y: 0 };
        this.nextDirection = { x: 0, y: 0 };

        this.moveTimer = 0;

        this.mouthOpen = true;
        this.mouthTimer = 0;
    }

    setDirection(dx, dy) {
        this.nextDirection = { x: dx, y: dy };
    }

    update(deltaTime, maze) {
        // Mouth animation
        this.mouthTimer += deltaTime;

        if (this.mouthTimer >= 0.1) {
            this.mouthOpen = !this.mouthOpen;
            this.mouthTimer = 0;
        }

        // Movement timing
        this.moveTimer += deltaTime;

        if (this.moveTimer < CONFIG.PLAYER_MOVE_DELAY) {
            return;
        }

        this.moveTimer = 0;

        // Turning
        if (this.nextDirection.x !== 0 || this.nextDirection.y !== 0) {
            const turnX = this.gridX + this.nextDirection.x;
            const turnY = this.gridY + this.nextDirection.y;

            if (maze.canMoveTo(turnX, turnY)) {
                this.direction = this.nextDirection;
            }
        }

        // Movement
        const nextX = this.gridX + this.direction.x;
        const nextY = this.gridY + this.direction.y;

        if (maze.canMoveTo(nextX, nextY)) {
            this.gridX = nextX;
            this.gridY = nextY;
        }
    }

    render(ctx) {
        const pixel = gridToPixel(this.gridX, this.gridY);

        const cx = pixel.x + CONFIG.TILE_SIZE / 2;
        const cy = pixel.y + CONFIG.TILE_SIZE / 2;

        const radius = CONFIG.TILE_SIZE / 2 - 2;

        ctx.fillStyle = '#ffff00';

        ctx.beginPath();

        let mouthAngle = this.mouthOpen ? 0.3 : 0.1;

        const dirAngle = Math.atan2(
            this.direction.y,
            this.direction.x
        );

        ctx.arc(
            cx,
            cy,
            radius,
            dirAngle + mouthAngle,
            dirAngle - mouthAngle + Math.PI * 2,
            false
        );

        ctx.lineTo(cx, cy);

        ctx.fill();
    }

    getPosition() {
        return {
            x: this.gridX,
            y: this.gridY
        };
    }
}