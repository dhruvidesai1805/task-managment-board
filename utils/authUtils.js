const USERS_KEY = 'users';
const CURRENT_USER_KEY = 'currentUser';

export const registerUser = (username, password) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY)) || {};
    if (users[username]) {
        return { success: false, message: 'Username already exists' };
    }
    users[username] = { password };
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    return { success: true };
};

export const loginUser = (username, password) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY)) || {};
    if (!users[username] || users[username].password !== password) {
        return { success: false, message: 'Invalid username or password' };
    }
    localStorage.setItem(CURRENT_USER_KEY, username);
    return { success: true };
};

export const logoutUser = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
};

export const getCurrentUser = () => {
    return localStorage.getItem(CURRENT_USER_KEY);
};

export const isAuthenticated = () => {
    return !!getCurrentUser();
};
