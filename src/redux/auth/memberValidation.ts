import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the types for the state and payloads
interface MemberValidationState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

interface ValidationPayload {
  membership: string;
  nameOrDob: string;
}

// Initial state
const initialState: MemberValidationState = {
  loading: false,
  error: null,
  success: false,
};

// Async thunk for member validation
export const validateMember = createAsyncThunk(
  "member/validateMember",
  async (payload: ValidationPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}account/validate`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "Validation failed";
        return rejectWithValue(errorMessage);
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

// Create the slice
const memberValidationSlice = createSlice({
  name: "memberValidation",
  initialState,
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(validateMember.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(validateMember.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(validateMember.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions and reducer
export const { resetState } = memberValidationSlice.actions;

export default memberValidationSlice.reducer;
