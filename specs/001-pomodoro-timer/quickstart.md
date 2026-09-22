# Quickstart: Pomodoro Timer Validation

## Prerequisites

- A modern desktop or mobile browser with local storage support.
- A local static web server or direct browser opening of the app entry page.

## Run the app

1. Open the app entry page in the browser, or serve the project locally from the repository root.
2. If using a local static server, run one of the following commands from the project root:
   - `python -m http.server 8000`
   - or any equivalent static-hosting server
3. Open the app at `http://localhost:8000`.

## Validation Scenarios

### Scenario 1: Initial setup
- Open the app.
- Confirm the setup menu appears before the timer starts.
- Confirm default settings are 25 minutes focus and 5 minutes break.
- Select a sound option and continue to the timer screen.

Expected result: The timer opens in focus mode and the countdown begins only after start is pressed.

### Scenario 2: Start, pause, and reset
- Click Start.
- Confirm the timer counts down.
- Click Pause and confirm the timer stops.
- Click Reset and confirm the countdown returns to the configured focus duration.

Expected result: Timer state changes are clear and consistent.

### Scenario 3: Break transition and notification
- Allow the timer to reach zero or simulate a completed session.
- Confirm the app switches to the break duration and plays the selected sound notification.

Expected result: The user is clearly notified and the mode changes to break.

### Scenario 4: Task list and settings changes
- Add a task, complete it, and remove it.
- Open the settings panel while the timer is active.
- Change the sound or durations and confirm the app persists the updated values.

Expected result: Task management and settings changes work without breaking the active session unless reset is chosen.

## Expected Outcome

The app delivers a fully usable pomodoro workflow in a static browser-based experience, with consistent timer behavior, user settings persistence, and task management.
