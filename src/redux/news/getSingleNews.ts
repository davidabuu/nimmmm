// imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

// Define the response type for a single news item
interface SingleNews {
  id: string;
  amount: number;
  dueDate: string;
  status: string;
 content: string;
 title:string;
 image: string;
 createdAt:string;
  date: string;
}

// Define the state type for single news
interface SingleNewsState {
  data: SingleNews | null;
  loading: boolean;
  error: string | null;
}

// Initial state for single news
const initialSingleNewsState: SingleNewsState = {
  data: null,
  loading: false,
  error: null,
};

// Define the async thunk for fetching single news
export const getSingleNews = createAsyncThunk<
  SingleNews, // Success return type
  string, // Argument type (news ID)
  { rejectValue: string } // Rejected value type
>("News/getSingleNews", async (id, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw new Error("No access token found. Please log in again.");
    }

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}news/${id}`, // Pass the ID in the URL
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
        error.response?.data?.message || "Failed to fetch the news item."
      );
    }
    return rejectWithValue("An unknown error occurred.");
  }
});

// Create the slice for single news
const SingleNewsSlice = createSlice({
  name: "SingleNews",
  initialState: initialSingleNewsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSingleNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSingleNews.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getSingleNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred.";
      });
  },
});

// Export the reducer for single news
export default SingleNewsSlice.reducer;
