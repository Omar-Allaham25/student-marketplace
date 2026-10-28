import { createAsyncThunk, createSlice,type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../types/user";
import { userApi } from "../services/userApi";
import { authApi } from "../services/authApi";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: true,
};

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async () => {
    const response = await userApi.getMe();
    return response.user;
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { dispatch }) => {
    try {
      await authApi.logout();
    } finally {
      dispatch(logout());
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers:{
    setCredentials: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
      });
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
