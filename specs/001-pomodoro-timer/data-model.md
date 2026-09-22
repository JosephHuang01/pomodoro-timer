# Data Model: Pomodoro Timer

## Entities

### TimerSession

Represents the current active cycle and state of the productivity timer.

Fields:
- mode: "focus" | "break"
- remainingSeconds: number
- totalSeconds: number
- isRunning: boolean
- isPaused: boolean
- completedCycles: number

Relationships:
- Belongs to the current user session in the browser runtime.
- Uses stored user preferences for default durations.

### UserPreferences

Stores user-selected settings for repeated use.

Fields:
- focusMinutes: number
- breakMinutes: number
- selectedSound: string
- soundEnabled: boolean

Relationships:
- Applies to the current browser instance and persists in local storage.

### Task

Represents a task tracked during a work session.

Fields:
- id: string
- title: string
- completed: boolean
- createdAt: timestamp

Relationships:
- Zero or more tasks belong to the current user’s task list.
- Completion status updates independently of the timer state.

### SoundNotification

Represents the notification channel selected for timer transitions.

Fields:
- name: string
- type: "browser-chime" | "custom-file"
- source: string | null

Relationships:
- Selected by the user in configuration and applied on cycle transitions.

## Validation Rules

- Focus and break durations must be positive integers.
- A task title must not be empty when created.
- The app must maintain one active timer mode at a time.
- Settings changes must be persisted immediately after confirmation.
- Breaking or reset actions must leave the app in a valid state.

## State Transitions

- Idle -> Running when start is pressed.
- Running -> Paused when pause is pressed.
- Paused -> Running when start is pressed again.
- Running -> Completed when remaining time reaches zero.
- Completed -> Focus or Break mode according to current cycle.
- Any state -> Reset when user confirms reset.
