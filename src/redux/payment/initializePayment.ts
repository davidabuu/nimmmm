import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
interface PaymentResponse {
  success: boolean;
  message: string;
 
    authorization_url: string;
    transactionId: string;
  
}

interface PaymentState {
  loading: boolean;
  error: string | null;
  data: PaymentResponse | null;
}

const initialState: PaymentState = {
  loading: false,
  error: null,
  data: null,
};
interface InitializePaymentPayload {
  description: string;
  amount: number;
  callbackUrl: string;
  currency: string;
  provider: string;
  email:string;
}
// Define the API call as a thunk
export const initializePayment = createAsyncThunk<
  PaymentResponse, // Thunk return type
  InitializePaymentPayload, // Thunk argument type
  { rejectValue: string } // Type for rejectWithValue
>("payment/initialize", async (payload, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      throw new Error("No access token found. Please log in again.");
    }

    const { description, amount, provider, email, currency, callbackUrl } = payload; // Destructure payload
    const response = await axios.post<PaymentResponse>(
      `${process.env.NEXT_PUBLIC_BASE_URL}payment/initialize?provider=${provider}`,
      {email, description, amount, currency, callbackUrl},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to initialize payment"
    );
  }
});

// Create the slice
const initializePaymentSlice = createSlice({
  name: "initializePayment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initializePayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        initializePayment.fulfilled,
        (state, action: PayloadAction<PaymentResponse>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(
        initializePayment.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "An unknown error occurred";
        }
      );
  },
});

export default initializePaymentSlice.reducer;
