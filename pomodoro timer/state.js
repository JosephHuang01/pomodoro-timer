export const DEFAULT_SETTINGS = {
  focusMinutes: 25,
  breakMinutes: 5,
  sound: 'chime',
  soundEnabled: true,
};

export const STORAGE_KEYS = {
  preferences: 'pomodoro-preferences',
  tasks: 'pomodoro-tasks',
};

export function readStorageJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.warn(`Unable to parse storage key ${key}:`, error);
    return fallback;
  }
}

export function writeStorageJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function normalizeSettings(raw = {}) {
  const safeFocus = Number(raw.focusMinutes ?? DEFAULT_SETTINGS.focusMinutes);
  const safeBreak = Number(raw.breakMinutes ?? DEFAULT_SETTINGS.breakMinutes);
  const sound = typeof raw.sound === 'string' ? raw.sound : DEFAULT_SETTINGS.sound;

  return {
    focusMinutes: Number.isFinite(safeFocus) && safeFocus > 0 ? Math.round(safeFocus) : DEFAULT_SETTINGS.focusMinutes,
    breakMinutes: Number.isFinite(safeBreak) && safeBreak > 0 ? Math.round(safeBreak) : DEFAULT_SETTINGS.breakMinutes,
    sound,
    soundEnabled: raw.soundEnabled !== false,
  };
}

export function formatTime(totalSeconds) {
  const safeSeconds = Math.max(0, Number(totalSeconds) || 0);
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
