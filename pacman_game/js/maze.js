import { CONFIG, Vector2, gridToPixel, getRandomInt, isValidGridPos } from './utils.js';

export class Maze {
    constructor() {
        this.grid = Array(CONFIG.GRID_HEIGHT).fill(null).map(() => Array(CONFIG.GRID_WIDTH).fill(0));
        this.pellets = new Map();
        this.walls = new Set();
        this.generateMaze();
    }

    generateMaze() {
        // Create border walls
        for (let x = 0; x < CONFIG.GRID_WIDTH; x++) {
            for (let y = 0; y < CONFIG.GRID_HEIGHT; y++) {
                if (x === 0 || x === CONFIG.GRID_WIDTH - 1 || y === 0 || y === CONFIG.GRID_HEIGHT - 1) {
                    this.setWall(x, y);
                }
            }
        }

        // Add some interior walls for maze
        this.addInteriorWalls();

        // Fill pellets
        for (let x = 1; x < CONFIG.GRID_WIDTH - 1; x++) {
            for (let y = 1; y < CONFIG.GRID_HEIGHT - 1; y++) {
                if (!this.isWall(x, y)) {
                    this.pellets.set(`${x},${y}`, { x, y, type: 'pellet' });
                }
            }
        }
    }

    addInteriorWalls() {
        // Vertical walls
        for (let y = 3; y < CONFIG.GRID_HEIGHT - 3; y += 4) {
            for (let x = 3; x < CONFIG.GRID_WIDTH - 1; x += 6) {
                if (x + 2 < CONFIG.GRID_WIDTH - 1) {
                    this.setWall(x, y);
                    this.setWall(x + 1, y);
                }
            }
        }

        // Horizontal walls
        for (let x = 3; x < CONFIG.GRID_WIDTH - 3; x += 5) {
            for (let y = 4; y < CONFIG.GRID_HEIGHT - 2; y += 5) {
                if (y + 1 < CONFIG.GRID_HEIGHT - 1) {
                    this.setWall(x, y);
                    this.setWall(x, y + 1);
                }
            }
        }
    }

    setWall(x, y) {
        if (isValidGridPos(x, y)) {
            this.grid[y][x] = 1;
            this.walls.add(`${x},${y}`);
        }
    }

    isWall(x, y) {
        return !isValidGridPos(x, y) || this.grid[y][x] === 1;
    }

    canMoveTo(x, y) {
        return !this.isWall(x, y);
    }

    removePellet(x, y) {
        const key = `${x},${y}`;
        if (this.pellets.has(key)) {
            this.pellets.delete(key);
            return true;
        }
        return false;
    }

    getPelletCount() {
        return this.pellets.size;
    }

    render(ctx) {
        // Render walls
        ctx.fillStyle = '#0088ff';
        for (const pos of this.walls) {
            const [x, y] = pos.split(',').map(Number);
            const pixel = gridToPixel(x, y);
            ctx.fillRect(pixel.x, pixel.y, CONFIG.TILE_SIZE, CONFIG.TILE_SIZE);
        }

        // Render pellets
        ctx.fillStyle = '#ffb8df';
        for (const [, pellet] of this.pellets) {
            const pixel = gridToPixel(pellet.x, pellet.y);
            ctx.beginPath();
            ctx.arc(pixel.x + CONFIG.TILE_SIZE / 2, pixel.y + CONFIG.TILE_SIZE / 2, 3, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}
