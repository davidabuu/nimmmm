// imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

// Define the response type
interface OutstandingPayment {
  id: string;
  amount: number;
  dueDate: string;
  status: string;
  description: string;
}

interface OutstandingPaymentsResponse {
  payments: OutstandingPayment[];
}

// Define the state type
interface OutstandingPaymentsState {
  data: OutstandingPaymentsResponse | null;
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
  OutstandingPaymentsResponse, // Success return type
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

      return response.data;
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
        state.data = action.payload;
      })
      .addCase(getOutstandingPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred.";
      });
  },
});

// Export the reducer
export default outstandingPaymentsSlice.reducer;
