import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface VerifyOTPState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: VerifyOTPState = {
  loading: false,
  success: false,
  error: null,
};

// Async Thunk for verifying OTP
export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async (payload: { email: string; otp: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}`,
        payload
      ); // Replace with your API endpoint
      return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "An error occurred"
      );
    }
  }
);

const verifyOTPSlice = createSlice({
  name: "verifyOTP",
  initialState,
  reducers: {
    resetVerifyOTPState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetVerifyOTPState } = verifyOTPSlice.actions;

export default verifyOTPSlice.reducer;
