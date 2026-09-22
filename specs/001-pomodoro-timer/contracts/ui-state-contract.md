# UI State Contract: Pomodoro Timer

## Purpose

This document defines the browser-side UI state contract for the pomodoro app. It is intentionally minimal because the app is static and internal to the browser.

## State Shape

```json
{
  "timer": {
    "mode": "focus",
    "remainingSeconds": 1500,
    "totalSeconds": 1500,
    "isRunning": false,
    "isPaused": false
  },
  "preferences": {
    "focusMinutes": 25,
    "breakMinutes": 5,
    "selectedSound": "default-chime",
    "soundEnabled": true
  },
  "tasks": [
    {
      "id": "task-1",
      "title": "Draft project outline",
      "completed": false,
      "createdAt": "2026-09-20T09:30:00Z"
    }
  ]
}
```

## Contract Rules

- The `timer.mode` value must be either `focus` or `break`.
- `remainingSeconds` must never be negative.
- `preferences` must be stored locally in browser storage and restored on page load.
- `tasks` data must remain independent of timer state and remain editable while a session is active.
- The UI must visibly reflect running, paused, and reset states.
- The selected sound is used when session transitions occur and is not required to interrupt the active session.

## Event Behavior

- `start` begins a countdown from the current `remainingSeconds`.
- `pause` stops the countdown without clearing the timer value.
- `reset` restores the current mode to its configured duration and clears the active run.
- `sessionComplete` transitions from `focus` to `break`, or `break` to `focus`, and triggers the selected sound notification.
