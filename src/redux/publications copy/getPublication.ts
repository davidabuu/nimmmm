// imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

// Define the response type
interface Publication {
  id: string;
  amount: number;
  dueDate: string;
  status: string;
  description: string;
  date: string;
}

interface PublicationResponse {
  payments: Publication[];
}

// Define the state type
interface PublicationState {
  data: PublicationResponse | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: PublicationState = {
  data: null,
  loading: false,
  error: null,
};

// Define the async thunk
export const getPublication = createAsyncThunk<
  PublicationResponse, // Success return type
  string, // Argument type (userId)
  { rejectValue: string } // Rejected value type
>(
  "Publication/getPublication",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("No access token found. Please log in again.");
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}publications`,
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
          error.response?.data?.message ||
            "Failed to fetch Publicationts."
        );
      }
      return rejectWithValue("An unknown error occurred.");
    }
  }
);

// Create the slice
const PublicationSlice = createSlice({
  name: "Publication",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPublication.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPublication.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getPublication.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred.";
      });
  },
});

// Export the reducer
export default PublicationSlice.reducer;
