import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define the structure of the membership form data
export interface Institution {
  name: string;
  year: number;
  qualification: string;
}

export interface WorkExperience {
  name: string;
  position: string;
  address: string;
  year: number;
}

export interface MembershipForm {
  login_id: number;
  current_grade: string;
  membership_number: string;
  expected_new_grade: string;
  date_elected: string;
  surname: string;
  othernames: string;
  current_address: string;
  telephone: string;
  mobile_phone: string;
  email: string;
  profession: string;
  institutions: Institution[];
  work_experience: WorkExperience[];
}

// Define the shape of the slice state
export interface MembershipState {
  formData: MembershipForm | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

// Async thunk to submit membership form
export const submitMembershipForm = createAsyncThunk(
  "membership/submitForm",
  async (formData: Omit<MembershipForm, "login_id">, { rejectWithValue }) => {
    try {
      // Get login_id from localStorage
      const loginId = localStorage.getItem("userId");
      if (!loginId) {
        return rejectWithValue("User is not logged in");
      }

      // Add login_id to form data
      const dataToSubmit = { ...formData, login_id: Number(loginId) };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}grade/upgrade/applications`,
        dataToSubmit
      );

      return response.data; // Assuming API returns saved form or success message
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to submit membership form"
      );
    }
  }
);

// Initial state
const initialState: MembershipState = {
  formData: null,
  loading: false,
  error: null,
  success: false,
};

// Create the slice
const membershipSlice = createSlice({
  name: "membership",
  initialState,
  reducers: {
    clearMembershipState(state) {
      state.formData = null;
      state.error = null;
      state.success = false;
    },
    setMembershipForm(state, action: PayloadAction<MembershipForm>) {
      state.formData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitMembershipForm.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitMembershipForm.fulfilled, (state, action) => {
        state.loading = false;
        state.formData = action.payload; // Save API response
        state.success = true;
        state.error = null;
      })
      .addCase(submitMembershipForm.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

// Export actions and reducer
export const { clearMembershipState, setMembershipForm } = membershipSlice.actions;
export default membershipSlice.reducer;
