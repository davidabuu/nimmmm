// imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

// Define the response type
interface GradeCriterion {
  id: string;
  title: string;
  description: string;
}

// Define the state type
interface GradeCriteriaState {
  data: GradeCriterion[] | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: GradeCriteriaState = {
  data: null,
  loading: false,
  error: null,
};
export const fetchGradeCriteria = createAsyncThunk<
  GradeCriterion[], // Success return type
  void, // Argument type (no arguments needed)
  { rejectValue: string } // Rejected value type
>("gradeCriteria/fetchGradeCriteria", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw new Error("No access token found. Please log in again.");
    }

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}grade/criteria`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch Grade criteria."
      );
    }
    return rejectWithValue("An unknown error occurred.");
  }
});

// Create the slice
const gradeCriteriaSlice = createSlice({
  name: "gradeCriteria",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGradeCriteria.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGradeCriteria.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchGradeCriteria.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred.";
      });
  },
});

// Export the reducer
export default gradeCriteriaSlice.reducer;
