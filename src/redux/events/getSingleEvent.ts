// Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

// Define the response type for a single event
interface Event {
  id: string;
  name: string;
  description: string;
}

// Define the state type for a single event
interface SingleEventState {
  data: Event | null;
  loading: boolean;
  error: string | null;
}

// Initial state for single event
const initialSingleEventState: SingleEventState = {
  data: null,
  loading: false,
  error: null,
};

// Define the async thunk for getting a single event by id
export const getSingleEvent = createAsyncThunk<
  Event, // Success return type
  string, // Argument type (eventId)
  { rejectValue: string } // Rejected value type
>(
  "Events/getSingleEvent",
  async (eventId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("No access token found. Please log in again.");
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}events/${eventId}`,
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
          error.response?.data?.message || "Failed to fetch the event."
        );
      }
      return rejectWithValue("An unknown error occurred.");
    }
  }
);

// Create a slice for single event
const SingleEventSlice = createSlice({
  name: "SingleEvent",
  initialState: initialSingleEventState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSingleEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getSingleEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred.";
      });
  },
});

// Export the reducer
export default SingleEventSlice.reducer;
