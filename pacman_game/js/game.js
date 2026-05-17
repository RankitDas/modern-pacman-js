import { CONFIG, gridToPixel } from './utils.js';
import { Maze } from './maze.js';
import { Player } from './player.js';
import { Ghost } from './ghost.js';
import { CollisionSystem } from './collision.js';
import { InputManager } from './input.js';
import { UIManager } from './ui.js';
import { AudioManager } from './audio.js';

export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.state = 'start'; // start, playing, paused, gameOver
        this.maze = null;
        this.player = null;
        this.ghosts = [];
        this.score = 0;
        this.lives = CONFIG.INITIAL_LIVES;
        this.level = 1;
        this.pelletsAtStart = 0;
        this.lastTime = Date.now();
        this.inputManager = new InputManager();
        this.uiManager = new UIManager();
        this.audioManager = new AudioManager();
        this.setupEventListeners();
        this.init();
    }

    setupEventListeners() {
        this.uiManager.onStartButtonClick(() => this.startGame());
        this.uiManager.onRestartButtonClick(() => this.restart());
        this.uiManager.onResumeButtonClick(() => this.resumeGame());
    }

    init() {
        this.uiManager.showStartScreen();
    }

    startGame() {
        this.uiManager.hideStartScreen();
        this.uiManager.hidePauseMenu();
        this.state = 'playing';
        this.setupGame();
        this.audioManager.resumeContext();
        this.gameLoop();
    }

    setupGame() {
        this.maze = new Maze();
        this.player = new Player(10, 12);
        this.ghosts = [
            new Ghost(2, 2, '#ff0000'),
            new Ghost(17, 2, '#ffb8e6'),
            new Ghost(2, 12, '#00ffff'),
            new Ghost(17, 12, '#ffa500')
        ];
        this.invulnerabilityTimer = 0;
        this.pelletsAtStart = this.maze.getPelletCount();
        this.uiManager.updateScore(this.score);
        this.uiManager.updateLives(this.lives);
    }

    update(deltaTime) {
        if (this.state !== 'playing') return;

        // Update invulnerability timer
        if (this.invulnerabilityTimer > 0) {
            this.invulnerabilityTimer -= deltaTime;
        }

        // Check for pause toggle
        if (this.inputManager.checkPause()) {
            this.state = 'paused';
            this.uiManager.showPauseMenu();
            return;
        }

        // Check for mute toggle
        if (this.inputManager.checkMute()) {
            this.audioManager.toggle();
        }

        // Update player
        const direction = this.inputManager.getPlayerDirection();
        if (direction.x !== 0 || direction.y !== 0) {
            this.player.setDirection(direction.x, direction.y);
        }
        this.player.update(deltaTime, this.maze);

        // Update ghosts
        const playerPos = this.player.getPosition();
        for (const ghost of this.ghosts) {
            ghost.update(deltaTime, this.maze, playerPos);
        }

        // Check pellet collision
        if (CollisionSystem.checkPelletCollision(this.maze, playerPos)) {
            this.score += 10;
            this.uiManager.updateScore(this.score);
            this.audioManager.playPelletSound();
        }

        // Check ghost collision (only if not invulnerable)
        if (this.invulnerabilityTimer <= 0) {
            const ghostPositions = this.ghosts.map(g => g.getPosition());
            if (CollisionSystem.checkPlayerGhostCollision(playerPos, ghostPositions)) {
                this.lives--;
                this.uiManager.updateLives(this.lives);
                this.audioManager.playPlayerDeathSound();

                if (this.lives <= 0) {
                    this.gameOver(false);
                } else {
                    this.resetPlayerPosition();
                    this.invulnerabilityTimer = 1.0; // 1 second invulnerability
                }
            }
        }

        // Check win condition
        if (this.maze.getPelletCount() === 0) {
            this.gameOver(true);
        }
    }

    resetPlayerPosition() {
        this.player.gridX = 10;
        this.player.gridY = 12;
        this.player.direction = { x: 0, y: 0 };
    }

    gameOver(won) {
        this.state = 'gameOver';
        if (won) {
            this.audioManager.playWinSound();
            this.score += 100;
        } else {
            this.audioManager.playGameOverSound();
        }
        this.uiManager.showGameOverScreen(won);
    }

    resumeGame() {
        if (this.state !== 'paused') return;
        this.state = 'playing';
        this.uiManager.hidePauseMenu();
    }

    restart() {
        this.score = 0;
        this.lives = CONFIG.INITIAL_LIVES;
        this.level = 1;
        this.uiManager.hideGameOverScreen();
        this.startGame();
    }

    render() {
        // Clear canvas
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.state === 'start' || this.state === 'gameOver') return;

        // Render maze
        this.maze.render(this.ctx);

        // Render player
        this.player.render(this.ctx);

        // Render ghosts
        for (const ghost of this.ghosts) {
            ghost.render(this.ctx);
        }
    }

    gameLoop = () => {
        const now = Date.now();
        const deltaTime = (now - this.lastTime) / 1000;
        this.lastTime = now;

        this.update(deltaTime);
        this.render();

        requestAnimationFrame(this.gameLoop);
    }
}
