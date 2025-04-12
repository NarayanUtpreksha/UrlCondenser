import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user: { fullName: string; email: string } | null;
}

// Load initial state from localStorage
const initialState: AuthState = JSON.parse(localStorage.getItem("authState") || "null") || {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ fullName: string; email: string }>) {
      state.isAuthenticated = true;
      state.user = action.payload;
      // Save state to localStorage
      localStorage.setItem("authState", JSON.stringify(state));
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      // Clear state from localStorage
      localStorage.removeItem("authState");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;