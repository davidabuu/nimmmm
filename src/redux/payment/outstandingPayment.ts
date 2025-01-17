// Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

// Define the response type
interface OutstandingPayment {
  id: string;
  amount: number;
  createdAt: string;
  status: string;
  description: string;
}

// Define the state type
interface OutstandingPaymentsState {
  data: OutstandingPayment[] | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: OutstandingPaymentsState = {
  data: null,
  loading: false,
  error: null,
};

// Define the async thunk
export const getOutstandingPayments = createAsyncThunk<
  OutstandingPayment[], // Success return type (array of payments)
  string, // Argument type (userId)
  { rejectValue: string } // Rejected value type
>(
  "outstandingPayments/getOutstandingPayments",
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("No access token found. Please log in again.");
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}payment/outstanding/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data; // Assuming the response is an array of payments
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(
          error.response?.data?.message ||
            "Failed to fetch outstanding payments."
        );
      }
      return rejectWithValue("An unknown error occurred.");
    }
  }
);

// Create the slice
const outstandingPaymentsSlice = createSlice({
  name: "outstandingPayments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOutstandingPayments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOutstandingPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload; // Array of payments
      })
      .addCase(getOutstandingPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred.";
      });
  },
});

// Export the reducer
export default outstandingPaymentsSlice.reducer;
