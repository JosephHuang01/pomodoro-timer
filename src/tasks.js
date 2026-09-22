import { STORAGE_KEYS, readStorageJSON, writeStorageJSON } from './state.js';

export function loadTasks() {
  const saved = readStorageJSON(STORAGE_KEYS.tasks, []);
  return Array.isArray(saved) ? saved : [];
}

export function saveTasks(tasks) {
  writeStorageJSON(STORAGE_KEYS.tasks, tasks);
}

export function addTask(taskList, title) {
  const cleaned = title.trim();
  if (!cleaned) {
    return taskList;
  }

  const newTask = {
    id: crypto.randomUUID ? crypto.randomUUID() : `task-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title: cleaned,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  return [...taskList, newTask];
}

export function toggleTask(taskList, taskId) {
  return taskList.map((task) =>
    task.id === taskId
      ? { ...task, completed: !task.completed }
      : task,
  );
}

export function removeTask(taskList, taskId) {
  return taskList.filter((task) => task.id !== taskId);
}
