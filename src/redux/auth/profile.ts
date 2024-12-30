import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the type for the user profile
interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string; // Optional field
}

// Define the type for the slice state
interface ProfileState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ProfileState = {
  profile: null,
  loading: false,
  error: null,
};

// Async thunk for fetching the profile
export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.get<UserProfile>(`${process.env.NEXT_PUBLIC_BASE_URL}account/fetch-profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export the reducer
export default profileSlice.reducer;
