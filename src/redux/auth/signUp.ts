import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the types for the state and payloads
interface SignUpState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

interface SignUpPayload {
  email: string;
  username: string;
  password: string;
}

// Initial state
const initialState: SignUpState = {
  loading: false,
  error: null,
  success: false,
};

// Async thunk for user signup
export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (payload: SignUpPayload, { rejectWithValue }) => {
    const token = localStorage.getItem("memberToken");
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}account/create-user`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || "Signup failed";
        return rejectWithValue(errorMessage);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

// Create the slice
const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(signUpUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { resetState } = signUpSlice.actions;

export default signUpSlice.reducer;
