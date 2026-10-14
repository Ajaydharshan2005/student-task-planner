
# Student Task Planner

A simple, responsive React application for organizing student tasks, tracking completion, and managing deadlines.

## Features

- Add tasks with a title.
- Assign Low, Medium, or High priority.
- Set an optional due date.
- Mark tasks as completed or pending.
- Filter tasks by All, Pending, and Completed.
- View total, pending, and completed task counts.
- Delete individual tasks.
- Clear all completed tasks.
- Save tasks in browser localStorage.
- Display overdue dates for incomplete tasks.
- Responsive layout for smaller screens.

## Tech Stack

- React
- Vite
- JavaScript
- CSS
- Browser localStorage

## Getting Started

### Prerequisites

Install Node.js and npm.

### Installation

Clone or download this repository, then open a terminal in the project directory.

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL shown in your terminal.

## Data Storage

Tasks are stored in the browser's localStorage. They remain available after a page refresh in the same browser, but are not synchronized across devices or users.

## AI Development

AI assistance was used during development to help implement React features, task persistence, and styling.

See [AI_WORKLOG.md](./AI_WORKLOG.md) for the development notes, prompts, and manual testing record.

## Future Improvements

- Edit existing tasks.
- Sort tasks by due date or priority.
- Add search functionality.
- Add automated tests.

## Status

Work in progress. Features and testing notes should be updated as development continues.
