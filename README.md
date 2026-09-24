# Pomodoro Timer

I am a recent college graduate, and I have been building a growing set of demo projects to continue developing my skills as a software developer. This Pomodoro Timer is one of those projects. It reflects my interest in combining Python-based problem solving, AI application development, and modern web development to create practical tools that are useful, approachable, and easy to understand.

I have been learning how to use AI tools effectively by writing clear instructions, using the right tools for the job, and reviewing the generated code critically instead of treating AI as a black box. This project is a good example of that approach: a simple web app built with careful structure, clean front-end logic, and a focus on real user value.

## Live demo

[Open the live portfolio and Pomodoro Timer demo](https://josephhuang01.github.io/pomodoro-timer/)

## What it does

- Runs a classic pomodoro cycle with configurable focus and break durations
- Switches between focus and break modes automatically
- Plays a notification sound when a session ends
- Stores preferences and tasks in the browser so your setup persists locally
- Lets you manage a small task list while you work

## How to run it locally

1. Open the project folder in your editor.
2. Start a static server from the project root:

	```powershell
	python -m http.server 8123
	```

3. Open [http://localhost:8123](http://localhost:8123) to view the portfolio landing page and embedded app.

The original standalone timer entry point remains available at [src/index.html](src/index.html).

## Deploy with GitHub Pages

This is a static site, so GitHub Pages can deploy it directly from the repository root.

1. Push the repository to GitHub:

	```powershell
	git add .
	git commit -m "Prepare portfolio site for deployment"
	git push origin main
	```

2. Open the repository on GitHub and go to **Settings** → **Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch and the `/ (root)` folder, then click **Save**.
5. Wait for the deployment workflow to finish. The public URL will be:
	`https://josephhuang01.github.io/pomodoro-timer/`

The root [index.html](index.html) is the public portfolio page. No build command or publish directory configuration is required.

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

It also reflects the way I approach building software: I like to learn by shipping small but purposeful projects, exploring tools and frameworks, and applying AI thoughtfully to accelerate development without losing control of the final result.

## Explore the code

The best way to learn from this project is to start with the app entry points and follow the flow:

- begin with [src/app.js](src/app.js) to see how the UI and timer are connected
- look at [src/timer.js](src/timer.js) to understand the session lifecycle
- review [src/state.js](src/state.js) and [src/settings.js](src/settings.js) to see how preferences are stored and normalized
- inspect [src/tasks.js](src/tasks.js) to understand the task list behavior

If you are curious, try adjusting the timer values, adding a new sound option, or improving the task interaction model. There is a lot of room to extend this project in a clean, beginner-friendly way.

If you are an employer or recruiter and want to understand my approach, I encourage you to explore the code and see how I structure a small web app, manage state, and apply AI tools responsibly in real projects.

## License

This project is ready for personal exploration and adaptation. If you are using it as a learning project, feel free to build on it and keep exploring the code.

