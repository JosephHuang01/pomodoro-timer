export const SOUND_OPTIONS = [
  { value: 'chime', label: 'Chime' },
  { value: 'bell', label: 'Bell' },
  { value: 'digital', label: 'Digital' },
];

let audioContext = null;

function getAudioContext() {
  if (!audioContext) {
    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtor) {
      return null;
    }
    audioContext = new AudioCtor();
  }

  return audioContext;
}

function beep(frequency, duration, volume, delay = 0) {
  const context = getAudioContext();
  if (!context) {
    return;
  }

  const oscillator = context.createOscillator();
  const gainNode = context.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.value = frequency;
  gainNode.gain.value = volume;

  oscillator.connect(gainNode);
  gainNode.connect(context.destination);

  const startAt = context.currentTime + delay;
  oscillator.start(startAt);
  oscillator.stop(startAt + duration);
}

export function playNotificationSound(soundName = 'chime') {
  const context = getAudioContext();
  if (!context) {
    return;
  }

  if (context.state === 'suspended') {
    context.resume();
  }

  if (soundName === 'bell') {
    beep(880, 0.18, 0.06);
    beep(660, 0.2, 0.05, 0.15);
    return;
  }

  if (soundName === 'digital') {
    beep(520, 0.08, 0.04);
    beep(780, 0.08, 0.04, 0.09);
    return;
  }

  beep(660, 0.12, 0.05);
  beep(880, 0.18, 0.05, 0.12);
}
