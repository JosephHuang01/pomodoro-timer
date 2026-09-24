import { DEFAULT_SETTINGS, STORAGE_KEYS, normalizeSettings, readStorageJSON, writeStorageJSON } from './state.js';
import { PomodoroTimer } from './timer.js';
import { getPreferences, savePreferences } from './settings.js';
import { addTask, loadTasks, removeTask, saveTasks, toggleTask } from './tasks.js';
import { SOUND_OPTIONS, playNotificationSound } from './audio.js';

const setupPanel = document.getElementById('setupPanel');
const timerPanel = document.getElementById('timerPanel');
const settingsToggle = document.getElementById('settingsToggle');
const settingsForm = document.getElementById('settingsForm');
const runtimeSettingsForm = document.getElementById('runtimeSettingsForm');
const optionsPanel = document.getElementById('optionsPanel');
const modeLabel = document.getElementById('modeLabel');
const timerDisplay = document.getElementById('timerDisplay');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const focusMinutesInput = document.getElementById('focusMinutes');
const breakMinutesInput = document.getElementById('breakMinutes');
const soundSelect = document.getElementById('soundSelect');
const runtimeFocusMinutes = document.getElementById('runtimeFocusMinutes');
const runtimeBreakMinutes = document.getElementById('runtimeBreakMinutes');
const runtimeSoundSelect = document.getElementById('runtimeSoundSelect');
const resetFromOptions = document.getElementById('resetFromOptions');
const sessionsCompletedEl = document.getElementById('sessionsCompleted');
const focusMinutesLoggedEl = document.getElementById('focusMinutesLogged');
const tasksRemainingEl = document.getElementById('tasksRemaining');

const preferences = getPreferences();
const timer = new PomodoroTimer(preferences);
let tasks = loadTasks();
const summary = {
  completedSessions: 0,
  focusMinutesLogged: 0,
};

function renderPreferencesIntoForm() {
  focusMinutesInput.value = String(preferences.focusMinutes);
  breakMinutesInput.value = String(preferences.breakMinutes);
  soundSelect.value = preferences.sound;

  runtimeFocusMinutes.value = String(preferences.focusMinutes);
  runtimeBreakMinutes.value = String(preferences.breakMinutes);
  runtimeSoundSelect.value = preferences.sound;
}

function renderSummary() {
  if (sessionsCompletedEl) {
    sessionsCompletedEl.textContent = String(summary.completedSessions);
  }
  if (focusMinutesLoggedEl) {
    focusMinutesLoggedEl.textContent = `${summary.focusMinutesLogged} min`;
  }
  if (tasksRemainingEl) {
    tasksRemainingEl.textContent = String(tasks.filter((task) => !task.completed).length);
  }
}

function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach((task) => {
    const item = document.createElement('li');
    item.className = `task-item${task.completed ? ' completed' : ''}`;

    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.setAttribute('aria-label', `Mark task ${task.title} complete`);
    checkbox.addEventListener('change', () => {
      tasks = toggleTask(tasks, task.id);
      saveTasks(tasks);
      renderTasks();
      renderSummary();
    });

    const text = document.createElement('span');
    text.className = 'task-text';
    text.textContent = task.title;

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'secondary-button';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      tasks = removeTask(tasks, task.id);
      saveTasks(tasks);
      renderTasks();
      renderSummary();
    });

    label.appendChild(checkbox);
    label.appendChild(text);
    item.appendChild(label);
    item.appendChild(deleteButton);
    taskList.appendChild(item);
  });

  renderSummary();
}

function renderTimer() {
  const snapshot = timer.getSnapshot();
  modeLabel.textContent = snapshot.mode === 'focus' ? 'Focus' : 'Break';
  timerDisplay.textContent = timer.getDisplayTime();

  if (snapshot.isRunning) {
    startButton.disabled = true;
    pauseButton.disabled = false;
  } else {
    startButton.disabled = false;
    pauseButton.disabled = true;
  }
}

function startSession() {
  if (timer.start()) {
    renderTimer();
  }
}

function pauseSession() {
  timer.pause();
  renderTimer();
}

function resetSession() {
  timer.reset();
  renderTimer();
}

function completeCycle() {
  if (timer.mode === 'focus') {
    summary.completedSessions += 1;
    summary.focusMinutesLogged += preferences.focusMinutes;
  }

  const nextMode = timer.toggleMode();
  playNotificationSound(preferences.sound);
  renderTimer();
  renderSummary();
  if (nextMode === 'break') {
    modeLabel.textContent = 'Break';
  }
}

function initializeTimer() {
  timer.setSettings(preferences);
  renderTimer();
}

if (settingsForm) {
  settingsForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const nextSettings = normalizeSettings({
      focusMinutes: Number(focusMinutesInput.value),
      breakMinutes: Number(breakMinutesInput.value),
      sound: soundSelect.value,
    });

    savePreferences(nextSettings);
    Object.assign(preferences, nextSettings);
    timer.setSettings(nextSettings);
    renderPreferencesIntoForm();
    renderTimer();

    if (setupPanel) {
      setupPanel.classList.add('hidden');
    }
    if (timerPanel) {
      timerPanel.classList.remove('hidden');
    }
  });
}

if (runtimeSettingsForm) {
  runtimeSettingsForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const nextSettings = normalizeSettings({
      focusMinutes: Number(runtimeFocusMinutes.value),
      breakMinutes: Number(runtimeBreakMinutes.value),
      sound: runtimeSoundSelect.value,
    });

    savePreferences(nextSettings);
    Object.assign(preferences, nextSettings);
    timer.setSettings(nextSettings);
    renderPreferencesIntoForm();
    renderTimer();
    if (optionsPanel) {
      optionsPanel.classList.add('hidden');
    }
    if (settingsToggle) {
      settingsToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

if (settingsToggle && optionsPanel) {
  settingsToggle.addEventListener('click', () => {
    const isHidden = optionsPanel.classList.toggle('hidden');
    settingsToggle.setAttribute('aria-expanded', String(!isHidden));
  });
}

if (startButton) {
  startButton.addEventListener('click', startSession);
}
if (pauseButton) {
  pauseButton.addEventListener('click', pauseSession);
}
if (resetButton) {
  resetButton.addEventListener('click', resetSession);
}
if (resetFromOptions) {
  resetFromOptions.addEventListener('click', resetSession);
}

if (taskForm) {
  taskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const nextTasks = addTask(tasks, taskInput.value);
    if (nextTasks.length !== tasks.length) {
      tasks = nextTasks;
      saveTasks(tasks);
      renderTasks();
    }
    taskInput.value = '';
  });
}

setInterval(() => {
  if (!timer.isRunning) {
    return;
  }

  renderTimer();

  if (timer.remainingSeconds <= 0) {
    completeCycle();
  }
}, 250);

renderPreferencesIntoForm();
initializeTimer();
renderTasks();
