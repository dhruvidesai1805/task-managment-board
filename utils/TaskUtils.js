const TASKS_KEY_PREFIX = 'tasks_';

const getLoggedInUser = () => localStorage.getItem('loggedInUser');

export const getTasksFromStorage = () => {
  const loggedInUser = getLoggedInUser();
  if (!loggedInUser) return { todo: [], inProgress: [], completed: [] };

  const savedTasks = localStorage.getItem(`${TASKS_KEY_PREFIX}${loggedInUser}`);
  return savedTasks ? JSON.parse(savedTasks) : { todo: [], inProgress: [], completed: [] };
};

export const saveTasksToStorage = (tasks) => {
  const loggedInUser = getLoggedInUser();
  if (!loggedInUser) return;

  localStorage.setItem(`${TASKS_KEY_PREFIX}${loggedInUser}`, JSON.stringify(tasks));
};