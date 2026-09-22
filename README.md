# Pomodoro Timer

A simple, focused productivity app built with plain HTML, CSS, and JavaScript. It helps you work in timed focus sessions, take short breaks, and keep track of tasks without adding unnecessary complexity.

## What it does

- Runs a classic pomodoro cycle with configurable focus and break durations
- Switches between focus and break modes automatically
- Plays a notification sound when a session ends
- Stores preferences and tasks in the browser so your setup persists locally
- Lets you manage a small task list while you work

## How to run it

1. Open the project folder in your editor.
2. Launch the app by opening the file [src/index.html](src/index.html) in a browser.
3. If you prefer a local preview workflow, use a simple static server or the browser preview extension in VS Code.

## Project structure

- [src/index.html](src/index.html) — app layout and UI structure
- [src/app.js](src/app.js) — main app logic and event wiring
- [src/timer.js](src/timer.js) — timer state and timing behavior
- [src/state.js](src/state.js) — shared settings, storage helpers, and formatting utilities
- [src/settings.js](src/settings.js) — preferences loading and saving
- [src/tasks.js](src/tasks.js) — task creation, toggling, and removal
- [src/audio.js](src/audio.js) — sound playback for session transitions
- [src/styles.css](src/styles.css) — styling for the app interface

## Why this project is interesting

This app is a good example of a small front-end product that combines state management, browser persistence, user interaction, and a clean timer loop. It is intentionally approachable, making it a great starting point if you want to understand how a modest JavaScript app is organized.

## Explore the code

The best way to learn from this project is to start with the app entry points and follow the flow:

- begin with [src/app.js](src/app.js) to see how the UI and timer are connected
- look at [src/timer.js](src/timer.js) to understand the session lifecycle
- review [src/state.js](src/state.js) and [src/settings.js](src/settings.js) to see how preferences are stored and normalized
- inspect [src/tasks.js](src/tasks.js) to understand the task list behavior

If you are curious, try adjusting the timer values, adding a new sound option, or improving the task interaction model. There is a lot of room to extend this project in a clean, beginner-friendly way.

## License

This project is ready for personal exploration and adaptation. If you are using it as a learning project, feel free to build on it and keep exploring the code.

