/* eslint-disable @typescript-eslint/no-explicit-any */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state interface
interface AccountState {
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  user: Record<string, string> | null; // To store user data if required
}

// Initial state
const initialState: AccountState = {
  loading: false,
  error: null,
  isAuthenticated: false,
  user: null,
};

// Async thunk for account validation
export const loginUser = createAsyncThunk(
  "account/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}account/login`,
        credentials,
        { headers: { "Content-Type": "application/json" } }
      );
      
      return response.data; // Assuming the response contains user data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Unexpected error occurred. Please try again."
      );
    }
  }
);

// Create the slice
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    resetAccount(state) {
      state.loading = false;
      state.error = null;
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user || null; // Assuming response contains `user`
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      });
  },
});

// Export the actions
export const { resetAccount } = accountSlice.actions;

// Export the reducer
export default accountSlice.reducer;
