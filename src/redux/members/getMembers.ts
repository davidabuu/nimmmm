import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

// Define the response type
interface Member {
  id: number;
  first_name: string;
  last_name: string;
  grade: string;
  chapter: number;

  zone: number;

  date_of_election: string;

  license_status: string;

  phone: string;
}

// Define the state type
interface MembersSearchState {
  data: Member[];
  loading: boolean;
  error: string | null;
  page: number;
}

// Initial state
const initialState: MembersSearchState = {
  data: [],
  loading: false,
  error: null,
  page: 1,
};

// Define the async thunk
export const searchMembers = createAsyncThunk<
  { data: Member[]; page: number }, // Success return type (data and page)
  { query: string; page: number }, // Argument type
  { rejectValue: string } // Rejected value type
>(
  "members/searchMembers",
  async ({ query, page }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}members/search?search=${query}&page=${page}&limit=30`
      );
      return { data: response.data.data, page };
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error.response?.data?.message || "Failed to fetch members."
        );
      }
      return rejectWithValue("An unknown error occurred.");
    }
  }
);

// Create the slice
const membersSearchSlice = createSlice({
  name: "membersSearch",
  initialState,
  reducers: {
    resetMembers: (state) => {
      state.data = [];
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMembers.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.page === 1) {
          state.data = action.payload.data;
        } else {
          state.data = [...state.data, ...action.payload.data];
        }
        state.page = action.payload.page;
      })
      .addCase(searchMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred.";
      });
  },
});

export const { resetMembers } = membersSearchSlice.actions;
export default membersSearchSlice.reducer;
