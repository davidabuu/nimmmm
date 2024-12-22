// imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

// Define the response type
interface HistoryPayment {
  id: string;
  amount: number;
  dueDate: string;
  status: string;
  description: string;
  date: string;
}

interface HistoryPaymentsResponse {
  payments: HistoryPayment[];
}

// Define the state type
interface HistoryPaymentsState {
  data: HistoryPaymentsResponse | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: HistoryPaymentsState = {
  data: null,
  loading: false,
  error: null,
};

// Define the async thunk
export const getHistoryPayments = createAsyncThunk<
  HistoryPaymentsResponse, // Success return type
  string, // Argument type (userId)
  { rejectValue: string } // Rejected value type
>(
  "HistoryPayments/getHistoryPayments",
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("No access token found. Please log in again.");
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}payment/history/${userId}`,
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
            "Failed to fetch History payments."
        );
      }
      return rejectWithValue("An unknown error occurred.");
    }
  }
);

// Create the slice
const HistoryPaymentsSlice = createSlice({
  name: "HistoryPayments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHistoryPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHistoryPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getHistoryPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred.";
      });
  },
});

// Export the reducer
export default HistoryPaymentsSlice.reducer;
