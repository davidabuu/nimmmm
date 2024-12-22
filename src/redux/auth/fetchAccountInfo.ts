import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the shape of the state
interface AccountInfoState {
  accountInfo: Record<string, string> | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: AccountInfoState = {
  accountInfo: null,
  loading: false,
  error: null,
};

// Async thunk for fetching account information
export const fetchAccountInfo = createAsyncThunk(
  "account/fetchInfo",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken"); // Retrieve access token from localStorage
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}account/fetch-info`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to the authorization header
          },
        }
      );
      return response.data; // Assuming the API returns account information in the response body
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch account information"
      );
    }
  }
);

// Create the slice
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    clearAccountInfo(state) {
      state.accountInfo = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccountInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAccountInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.accountInfo = action.payload.data;
        state.error = null;
      })
      .addCase(fetchAccountInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { clearAccountInfo } = accountSlice.actions;
export default accountSlice.reducer;
