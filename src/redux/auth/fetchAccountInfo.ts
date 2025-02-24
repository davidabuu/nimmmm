
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/// Define the structure of the account info
export interface MemberInfo {
  first_name: string;
  lastName: string;
  email: string;
  chapter:{
    state:string;
  };
  grade:string;
  key: string; // Additional fields, if any
}

export interface AccountInfo {
  id: string;
  member: MemberInfo;
  key: string; // Additional fields, if any
}

// Define the shape of the state
export interface AccountInfoState {
  accountInfo: AccountInfo | null;
  loading: boolean;
  error: string | null;
}

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
      localStorage.setItem("accountInfo", response.data.data.email);
      localStorage.setItem("userId", response.data.data.id);
      
      // Store encrypted grade
      return response.data; // Assuming the API returns account information in the response body
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch account information"
      );
    }
  }
);

// Initial state
const initialState: AccountInfoState = {
  accountInfo: null,
  loading: false,
  error: null,
};

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
