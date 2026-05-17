export class AudioManager {
    constructor() {
        this.audioContext = null;
        this.muted = false;
        this.initAudioContext();
    }

    initAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.warn('Web Audio API not supported');
        }
    }

    resumeContext() {
        if (this.audioContext?.state === 'suspended') {
            this.audioContext.resume();
        }
    }

    playPelletSound() {
        if (this.muted || !this.audioContext) return;
        this.playTone(800, 0.05);
    }

    playGhostDeathSound() {
        if (this.muted || !this.audioContext) return;
        this.playTone(200, 0.1);
    }

    playPlayerDeathSound() {
        if (this.muted || !this.audioContext) return;
        this.playTone(100, 0.2);
    }

    playWinSound() {
        if (this.muted || !this.audioContext) return;
        this.playSequence([800, 1000, 1200], 0.1);
    }

    playGameOverSound() {
        if (this.muted || !this.audioContext) return;
        this.playSequence([500, 400, 300], 0.15);
    }

    playTone(frequency, duration) {
        const now = this.audioContext.currentTime;
        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.frequency.value = frequency;
        osc.type = 'sine';

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

        osc.connect(gain);
        gain.connect(this.audioContext.destination);

        osc.start(now);
        osc.stop(now + duration);
    }

    playSequence(frequencies, durationPerNote) {
        let delay = 0;
        frequencies.forEach(freq => {
            const now = this.audioContext.currentTime + delay;
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();

            osc.frequency.value = freq;
            osc.type = 'sine';
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + durationPerNote);

            osc.connect(gain);
            gain.connect(this.audioContext.destination);

            osc.start(now);
            osc.stop(now + durationPerNote);

            delay += durationPerNote;
        });
    }

    toggle() {
        this.muted = !this.muted;
    }
}
