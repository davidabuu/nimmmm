// Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

// Define request body type


// Define response type
interface GradeUpgradeResponse {
  cumulativeCp: boolean;
  outstnd: [];
  yearCriteria: boolean;
  upgradePaymentMade: string| null;
}

// Define state type
interface GradeUpgradeState {
  data: GradeUpgradeResponse | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: GradeUpgradeState = {
  data: null,
  loading: false,
  error: null,
};

// Async thunk for the grade upgrade request
export const upgradeUserGrade = createAsyncThunk<
  GradeUpgradeResponse, // Success return type
  string, // userId as the only argument
  { rejectValue: string } // Rejected value type
>("Grade/upgradeUserGrade", async (userId, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw new Error("No access token found. Please log in again.");
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}grade/upgrade/user-eligible/${userId}`,
      {}, // Empty body since it's a POST request with headers only
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to upgrade grade."
      );
    }
    return rejectWithValue("An unknown error occurred.");
  }
});


// Create the slice
const gradeUpgradeSlice = createSlice({
  name: "GradeUpgrade",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(upgradeUserGrade.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(upgradeUserGrade.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(upgradeUserGrade.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred.";
      });
  },
});

// Export the reducer
export default gradeUpgradeSlice.reducer;
