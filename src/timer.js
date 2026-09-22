import { DEFAULT_SETTINGS, formatTime } from './state.js';

export class PomodoroTimer {
  constructor(settings = DEFAULT_SETTINGS) {
    this.settings = settings;
    this.mode = 'focus';
    this.totalSeconds = this.settings.focusMinutes * 60;
    this.remainingSeconds = this.totalSeconds;
    this.isRunning = false;
    this.isPaused = false;
    this.intervalId = null;
  }

  setSettings(settings) {
    this.settings = settings;
    if (!this.isRunning && !this.isPaused) {
      this.applyModeDuration();
    }
  }

  applyModeDuration() {
    const minutes = this.mode === 'focus' ? this.settings.focusMinutes : this.settings.breakMinutes;
    this.totalSeconds = minutes * 60;
    this.remainingSeconds = this.totalSeconds;
  }

  getSnapshot() {
    return {
      mode: this.mode,
      remainingSeconds: this.remainingSeconds,
      totalSeconds: this.totalSeconds,
      isRunning: this.isRunning,
      isPaused: this.isPaused,
    };
  }

  start() {
    if (this.isRunning) {
      return false;
    }

    this.isRunning = true;
    this.isPaused = false;
    this.intervalId = window.setInterval(() => {
      if (!this.isRunning) {
        return;
      }

      this.remainingSeconds -= 1;

      if (this.remainingSeconds <= 0) {
        this.stop();
        this.toggleMode();
      }
    }, 1000);

    return true;
  }

  pause() {
    if (!this.isRunning) {
      return false;
    }

    this.isRunning = false;
    this.isPaused = true;
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
    return true;
  }

  stop() {
    this.isRunning = false;
    this.isPaused = false;
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  reset() {
    this.stop();
    this.applyModeDuration();
  }

  toggleMode() {
    this.mode = this.mode === 'focus' ? 'break' : 'focus';
    this.applyModeDuration();
    this.isRunning = false;
    this.isPaused = false;
    this.intervalId = null;
    return this.mode;
  }

  getDisplayTime() {
    return formatTime(this.remainingSeconds);
  }
}
