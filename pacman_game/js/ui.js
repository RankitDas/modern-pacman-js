export class UIManager {
    constructor() {
        this.scoreEl = document.getElementById('score');
        this.livesEl = document.getElementById('lives');
        this.startScreen = document.getElementById('startScreen');
        this.gameOverScreen = document.getElementById('gameOverScreen');
        this.pauseMenu = document.getElementById('pauseMenu');
        this.gameOverMessage = document.getElementById('gameOverMessage');
    }

    updateScore(score) {
        this.scoreEl.textContent = score;
    }

    updateLives(lives) {
        this.livesEl.textContent = lives;
    }

    showStartScreen() {
        this.startScreen.classList.remove('hidden');
    }

    hideStartScreen() {
        this.startScreen.classList.add('hidden');
    }

    showGameOverScreen(won) {
        this.gameOverMessage.textContent = won ? 'YOU WIN!' : 'GAME OVER';
        this.gameOverScreen.classList.remove('hidden');
    }

    hideGameOverScreen() {
        this.gameOverScreen.classList.add('hidden');
    }

    showPauseMenu() {
        this.pauseMenu.classList.remove('hidden');
    }

    hidePauseMenu() {
        this.pauseMenu.classList.add('hidden');
    }

    onStartButtonClick(callback) {
        document.getElementById('startBtn').addEventListener('click', callback);
    }

    onRestartButtonClick(callback) {
        document.getElementById('restartBtn').addEventListener('click', callback);
    }

    onResumeButtonClick(callback) {
        document.getElementById('resumeBtn').addEventListener('click', callback);
    }
}
