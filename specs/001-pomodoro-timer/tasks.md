# Tasks: Pomodoro Timer

**Input**: Design documents from `/specs/001-pomodoro-timer/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic static web app structure.

- [X] T001 Create project structure per implementation plan in `src/` and `tests/`
- [X] T002 Create initial static app shell in `src/index.html`, `src/styles.css`, and `src/app.js`
- [X] T003 [P] Configure browser-friendly linting and formatting defaults for the static web app in `.editorconfig` and package metadata if present

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core state, persistence, and timer logic that must be complete before user story implementation.

**Critical**: No user story work can begin until this phase is complete.

- [X] T004 Create shared app state model and default configuration in `src/state.js`
- [X] T005 [P] Implement timer engine and countdown logic in `src/timer.js`
- [X] T006 [P] Implement audio notification helper for session alerts in `src/audio.js`
- [X] T007 Implement browser local storage helpers for preferences and tasks in `src/settings.js` and `src/tasks.js`
- [X] T008 Create startup wiring to initialize state, preferences, and timer view in `src/app.js`
- [X] T009 Add basic keyboard and screen-reader support hooks in `src/index.html` and `src/styles.css`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel.

---

## Phase 3: User Story 1 - Start a focused work session (Priority: P1) 🎯 MVP

**Goal**: Deliver the primary pomodoro experience: a focus timer with start, pause, and reset controls.

**Independent Test**: A user can open the app, confirm the initial setup menu, start the 25-minute focus timer, pause it, and reset it without leaving the main workflow.

### Implementation for User Story 1

- [X] T010 [US1] Build the first-run configuration menu and default focus/break settings in `src/index.html` and `src/app.js`
- [X] T011 [US1] Implement default 25-minute focus duration and 5-minute break duration behavior in `src/state.js` and `src/timer.js`
- [X] T012 [US1] Add start, pause, and reset controls to the timer view in `src/index.html` and `src/app.js`
- [X] T013 [US1] Wire countdown updates and timer state visibility in `src/timer.js` and `src/styles.css`
- [X] T014 [US1] Save and restore configured defaults in browser storage via `src/settings.js`

**Checkpoint**: At this point, User Story 1 should be fully functional and independently testable.

---

## Phase 4: User Story 2 - Manage a break and notifications (Priority: P1)

**Goal**: Transition from focus to break automatically and notify the user clearly when the session changes.

**Independent Test**: A user can complete a focus cycle, observe the transition to the 5-minute break, and hear or see the alert indicating the end of the session.

### Implementation for User Story 2

- [X] T015 [US2] Implement automatic switching between focus and break modes in `src/timer.js`
- [X] T016 [US2] Trigger sound notifications on session completion in `src/audio.js` and `src/app.js`
- [X] T017 [US2] Add visible state changes and transition messaging in `src/app.js` and `src/styles.css`
- [X] T018 [US2] Add the in-session settings button and options panel access without forcing interruption in `src/index.html`, `src/app.js`, and `src/styles.css`

**Checkpoint**: This user story should now work independently as a complete pomodoro cycle experience.

---

## Phase 5: User Story 3 - Manage tasks while working in focus mode (Priority: P2)

**Goal**: Provide a lightweight task list that supports user productivity tracking alongside timer usage.

**Independent Test**: A user can add a task, mark it complete, and delete it without disrupting the active timer state.

### Implementation for User Story 3

- [X] T019 [US3] Build the task list UI in `src/index.html` and `src/styles.css`
- [X] T020 [US3] Implement task creation, completion toggling, and removal logic in `src/tasks.js`
- [X] T021 [US3] Connect task actions to the app state and render the task list in `src/app.js`
- [X] T022 [US3] Persist task data to local storage so tasks survive reloads in `src/tasks.js`

**Checkpoint**: User Story 3 should be independently usable alongside the timer.

---

## Phase 6: User Story 4 - Adjust settings and reset the session (Priority: P2)

**Goal**: Allow users to change sound and timer configuration while keeping the active session stable unless reset is chosen.

**Independent Test**: A user can open the options menu during an active session, update the focus and break durations or sound selection, and reset the session explicitly when they choose to interrupt it.

### Implementation for User Story 4

- [X] T023 [US4] Add settings panel for focus duration, break duration, and sound selection in `src/index.html` and `src/styles.css`
- [X] T024 [US4] Implement runtime preference updates without forcing interruption in `src/settings.js` and `src/app.js`
- [X] T025 [US4] Add explicit reset action for the active session in `src/timer.js` and `src/app.js`
- [X] T026 [US4] Ensure accessibility and mobile responsiveness for the full settings flow in `src/styles.css` and `src/index.html`

**Checkpoint**: User Story 4 should provide complete manual control over the timer workflow.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final fixes, validation, and quality improvements across the full product.

- [X] T027 [P] Review timer edge cases such as repeated start clicks, paused state transitions, and reset behavior across `src/timer.js` and `src/app.js`
- [X] T028 [P] Review accessibility states, focus indicators, and screen-reader labels across `src/index.html` and `src/styles.css`
- [X] T029 [P] Run the validation scenarios in `specs/001-pomodoro-timer/quickstart.md` and check the full pomodoro flow end-to-end
- [X] T030 [P] Refine UI copy, state messages, and visual clarity in `src/styles.css` and `src/app.js`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - blocks all user stories
- **User Stories (Phase 3+)**: All depend on Foundational completion
  - User Story 1 can be implemented first as the MVP
  - User Story 2 can proceed once the focus timer works reliably
  - User Story 3 and User Story 4 can proceed in parallel after the timer foundation is solid
- **Polish (Final Phase)**: Depends on all user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: No dependencies on other stories; acts as the MVP
- **User Story 2 (P1)**: Depends on the timer engine and session state from US1
- **User Story 3 (P2)**: Depends on timer state and app shell from US1, but remains independently testable
- **User Story 4 (P2)**: Depends on timer state and settings persistence from the foundation and US1/US2

### Parallel Opportunities

- T003 can run in parallel with project shell creation
- T005, T006, and T007 are parallelizable after the app shell is established
- T010 and T019 are independent user-story setup tasks that can run in parallel once the foundation is ready
- T015 and T019 can proceed independently if the shared state is stable
- T027 through T030 can run in parallel during final polish

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Validate the timer behavior and stop before extending scope
5. Add break and task features only after the core timer is proven stable

### Incremental Delivery

1. Setup + Foundational -> stable base app
2. Add User Story 1 -> earn the MVP
3. Add User Story 2 -> add automatic break cycle and alerts
4. Add User Story 3 -> add task tracking
5. Add User Story 4 -> complete custom settings and reset control
6. Finish with polish and validation

### Parallel Team Strategy

With multiple contributors:

1. One person completes Setup and Foundational tasks together
2. Another implements User Story 1 timer flow
3. A second person implements User Story 3 task workflow independently
4. Later, User Story 2 and User Story 4 can be integrated around the shared timer state

---

## Notes

- [P] tasks indicate work on different files with no direct dependency chain
- [Story] labels map tasks to the relevant user story for traceability
- Each user story is independently testable as a product increment
- Keep the static app architecture simple and avoid unnecessary framework complexity
- Validate timer behavior in the browser before moving on to polish
