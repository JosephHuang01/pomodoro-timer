import { DEFAULT_SETTINGS, readStorageJSON, normalizeSettings, STORAGE_KEYS, writeStorageJSON } from './state.js';

export function getPreferences() {
  return normalizeSettings(readStorageJSON(STORAGE_KEYS.preferences, DEFAULT_SETTINGS));
}

export function savePreferences(settings) {
  const normalized = normalizeSettings(settings);
  writeStorageJSON(STORAGE_KEYS.preferences, normalized);
  return normalized;
}

export function buildSettingsOptions() {
  return [
    { value: 'chime', label: 'Chime' },
    { value: 'bell', label: 'Bell' },
    { value: 'digital', label: 'Digital' },
  ];
}
