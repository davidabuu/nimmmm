import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type RequestOTPPayload = {
  email: string;
};

type RequestOTPState = {
  loading: boolean;
  success: boolean;
  error: string | null;
};

const initialState: RequestOTPState = {
  loading: false,
  success: false,
  error: null,
};

// Async Thunk for requesting OTP
export const requestOTP = createAsyncThunk(
  "auth/requestOTP",
  async (payload: RequestOTPPayload, { rejectWithValue }) => {
    const token = localStorage.getItem("accessToken");

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}account/request-otp`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          email: payload.email,
        },
      });

      return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred while requesting OTP"
      );
    }
  }
);

const requestOTPSlice = createSlice({
  name: "requestOTP",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(requestOTP.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(requestOTP.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(requestOTP.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

export default requestOTPSlice.reducer;
