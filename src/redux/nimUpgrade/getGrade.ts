// imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

// Define the response type

interface GradeResponse {
  name: string;
  nextGrade: {
    name:string
  }
}

// Define the state type
interface GradeState {
  data: GradeResponse | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: GradeState = {
  data: null,
  loading: false,
  error: null,
};

// Define the async thunk
export const getGradeName = createAsyncThunk<
  GradeResponse, // Success return type
  string, // Argument type (gradeId)
  { rejectValue: string } // Rejected value type
>("Grade/getGradeName", async (gradeId, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw new Error("No access token found. Please log in again.");
    }

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}grade/${gradeId}`,
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
        error.response?.data?.message || "Failed to fetch grade name."
      );
    }
    return rejectWithValue("An unknown error occurred.");
  }
});

// Create the slice
const GradeSlice = createSlice({
  name: "Grade",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGradeName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGradeName.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getGradeName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred.";
      });
  },
});

// Export the reducer
export default GradeSlice.reducer;
