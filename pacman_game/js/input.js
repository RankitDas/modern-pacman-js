import { CONFIG } from './utils.js';

export class InputManager {
    constructor() {
        this.keys = {};
        this.lastPauseKeyState = false;
        this.lastMuteKeyState = false;
        this.setupListeners();
    }

    setupListeners() {
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));
    }

    handleKeyDown(e) {
        const key = e.key.toLowerCase();
        this.keys[key] = true;

        if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'w', 'a', 's', 'd'].includes(key)) {
            e.preventDefault();
        }
    }

    handleKeyUp(e) {
        const key = e.key.toLowerCase();
        this.keys[key] = false;
    }

    getPlayerDirection() {
        if (this.keys['arrowup'] || this.keys['w']) return { x: 0, y: -1 };
        if (this.keys['arrowdown'] || this.keys['s']) return { x: 0, y: 1 };
        if (this.keys['arrowleft'] || this.keys['a']) return { x: -1, y: 0 };
        if (this.keys['arrowright'] || this.keys['d']) return { x: 1, y: 0 };
        return { x: 0, y: 0 };
    }

    checkPause() {
        const currentState = this.keys['p'];
        if (currentState && !this.lastPauseKeyState) {
            this.lastPauseKeyState = true;
            return true;
        }
        this.lastPauseKeyState = currentState;
        return false;
    }

    checkMute() {
        const currentState = this.keys['m'];
        if (currentState && !this.lastMuteKeyState) {
            this.lastMuteKeyState = true;
            return true;
        }
        this.lastMuteKeyState = currentState;
        return false;
    }

    clearKeys() {
        this.keys = {};
        this.lastPauseKeyState = false;
        this.lastMuteKeyState = false;
    }
}
