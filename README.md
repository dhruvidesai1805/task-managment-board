# Task Management App

A simple task management application built using **React** and **MUI**, featuring **multi-user authentication** and **local storage** for persistent task storage per user.

## Features
- **User Authentication**: Signup and login with username and password.
- **Task Management**: Add, edit, delete, and update task statuses.
- **Drag & Drop Support**: Reorder tasks with ease.
- **Persistent Storage**: Tasks are saved per user using local storage.
- **Responsive UI**: Built using Material UI and Tailwind css for an intuitive interface.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dhruvidesai1805/task-managment-board
   cd task-managment-board
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the app in your browser at `http://localhost:5173`.

## Usage
- **Signup**: Create a new account with a username and password.
- **Login**: Use registered credentials to access tasks.
- **Task Operations**:
  - Click "Add Task" to create a new task.
  - Drag and drop tasks to change their status.
  - Click on a task to edit or delete it.
- **Logout**: Click on the user avatar to log out.

## Developer Notes
- Tasks are stored per user in `localStorage` under the key `tasks_<username>`.
- Users are managed using `localStorage` under the key `users`.
- Ensure passwords follow the security requirements (uppercase, lowercase, number, special character, min 6 characters).

## Contributing
Feel free to fork the repository and submit pull requests with improvements.

## License
This project is licensed under the **MIT License**.

