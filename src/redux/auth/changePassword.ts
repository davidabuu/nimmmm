import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AxiosError } from "axios";

// Define the async thunk for changing the password
export const changePassword = createAsyncThunk(
  "account/changePassword",
  async ({ newPassword }: { newPassword: string }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken"); // Retrieve access token from localStorage
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}account/change-password`,
        {
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to the authorization header
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        // Handle Axios error and return meaNIMgful messages
        return rejectWithValue(error.response?.data || "An error occurred");
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

// Define the initial state
interface PasswordState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: PasswordState = {
  isLoading: false,
  error: null,
  success: false,
};

// Create the slice
const passwordSlice = createSlice({
  name: "password",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

// Export the reducer
export default passwordSlice.reducer;
