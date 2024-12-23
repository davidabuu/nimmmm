// imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

// Define the response type
interface Events {
  id: string;
  name: string;
  description: string;
  date: string;
mode: string;
  time: string;
  isFree: boolean;
}

interface EventsState {
  data: Events[] | null; // Directly hold an array of Events
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: EventsState = {
  data: null, // Initialize as null until events are fetched
  loading: false,
  error: null,
};
;

// Define the async thunk
export const getEvents = createAsyncThunk<
  Events[], // Now directly returns an array of Events
  string, // Argument type
  { rejectValue: string } // Rejected value type
>(
  "Events/getEvents",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("No access token found. Please log in again.");
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}events`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data; // Assume this is the array of events
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error.response?.data?.message || "Failed to fetch events."
        );
      }
      return rejectWithValue("An unknown error occurred.");
    }
  }
);


// Create the slice
const EventsSlice = createSlice({
  name: "Events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred.";
      });
  },
});

// Export the reducer
export default EventsSlice.reducer;
