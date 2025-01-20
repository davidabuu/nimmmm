// imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

// Define the response type
interface News {
  id: string;
  amount: number;
  dueDate: string;
  status: string;
  description: string;
  date: string;
}

interface NewsResponse {
  payments: News[];
}

// Define the state type
interface NewsState {
  data: NewsResponse | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: NewsState = {
  data: null,
  loading: false,
  error: null,
};

// Define the async thunk
export const getNews = createAsyncThunk<
  NewsResponse, // Success return type
  string, // Argument type (userId)
  { rejectValue: string } // Rejected value type
>("News/getNews", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw new Error("No access token found. Please log in again.");
    }

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}news`,
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
        error.response?.data?.message || "Failed to fetch Newsts."
      );
    }
    return rejectWithValue("An unknown error occurred.");
  }
});

// Create the slice
const NewsSlice = createSlice({
  name: "News",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNews.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred.";
      });
  },
});

// Export the reducer
export default NewsSlice.reducer;
