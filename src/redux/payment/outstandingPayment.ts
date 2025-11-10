// Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

// Define the response type
interface PaymentEntry {
  id: number;
  payer_id: number;
  description: string;
  amount: string;
  debit: string;
  paid: boolean;
  credit: string;
  fee: number;
  date: string;
  year: number;
  updatedAt: string;
}

interface PaymentSummary {
  entries: PaymentEntry[];
  totalUnpaid: number;
  totalCreditYes: number;
  balance: number;
}

// Define the state type
interface OutstandingPaymentsState {
  data: PaymentSummary | null;
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
  PaymentSummary, // Success return type (payment summary object)
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
        `${process.env.NEXT_PUBLIC_BASE_URL}billing/user/payment-history/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

  const filteredEntries = response.data.entries.filter(
  (entry: PaymentEntry) => entry.paid === false
);

// Calculate total unpaid fees
const totalUnpaid = filteredEntries.reduce(
  (sum: number, entry: { amount: string; }) => sum + parseFloat(entry.amount),
  0
);

// Return filtered data with total unpaid amount
const filteredData = {
  ...response.data,
  entries: filteredEntries,
  totalUnpaid,
}
      return filteredData; // Return only unpaid entries
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
        state.data = action.payload; // Payment summary object
      })
      .addCase(getOutstandingPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred.";
      });
  },
});

// Export the reducer
export default outstandingPaymentsSlice.reducer;
