// Login
export const login = (username, password) => {
    if (username === "admin" && password === "12345") {
        return "Login Successful";
    }
    return "Invalid Username or Password";
};

// Logout
export const logout = () => {
    return "Logout Successful";
};

// Check User
export const checkUser = (username) => {
    if (username) {
        return `${username} is logged in.`;
    }
    return "No user is logged in.";
};