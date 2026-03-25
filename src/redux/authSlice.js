import { createSlice } from "@reduxjs/toolkit";

/**
 * NOTE: Passwords are stored in plain text here for demo purposes only.
 * In a real application, NEVER store plain-text passwords — always hash
 * them server-side (e.g., bcrypt) and validate via a secure backend.
 */
const DEMO_USERS = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@shopify.com",
    password: "admin123",
    role: "admin",
  },
  {
    id: 2,
    name: "John Doe",
    email: "user@shopify.com",
    password: "user123",
    role: "user",
  },
];

/** Returns a sanitised (no password) copy of all registered users. */
export const getPublicUsers = () =>
  DEMO_USERS.map(({ password: _pw, ...u }) => u);

const persistedUser = localStorage.getItem("authUser")
  ? JSON.parse(localStorage.getItem("authUser"))
  : null;

const initialState = {
  user: persistedUser,
  isAuthenticated: !!persistedUser,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { email, password } = action.payload;
      const found = DEMO_USERS.find(
        (u) => u.email === email && u.password === password,
      );
      if (found) {
        const { password: _pw, ...safeUser } = found;
        state.user = safeUser;
        state.isAuthenticated = true;
        state.error = null;
        localStorage.setItem("authUser", JSON.stringify(safeUser));
      } else {
        state.error = "Invalid email or password.";
      }
    },
    register: (state, action) => {
      const { name, email, password } = action.payload;
      const exists = DEMO_USERS.find((u) => u.email === email);
      if (exists) {
        state.error = "An account with this email already exists.";
        return;
      }
      // Use max existing ID + 1 to avoid collisions after in-place mutations
      const maxId = DEMO_USERS.reduce((m, u) => Math.max(m, u.id), 0);
      const newUser = {
        id: maxId + 1,
        name,
        email,
        role: "user",
      };
      DEMO_USERS.push({ ...newUser, password });
      state.user = newUser;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem("authUser", JSON.stringify(newUser));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("authUser");
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
});

export const { login, register, logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
