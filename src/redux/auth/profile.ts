import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

/* =========================
   TYPES (MATCH API EXACTLY)
========================= */

export interface Chapter {
  id: number;
  name: string;
  state: string;
}

export interface Member {
  id: number;
  member_no: string;
  first_name: string;
  last_name: string;
  other_name?: string;
  phone?: string;
  address?: string;
  gender?: string;
  date_of_birth?: string;
  date_of_election?: string;
  grade?: string;
  state_of_residence?: string;
  license_status?: string;
  chapter?: Chapter;
}

export interface UserProfileData {
  id: number;
  email: string;
  username: string;
  image?: string;
  member: Member;
}

export interface ProfileApiResponse {
  success: boolean;
  data: UserProfileData;
}

export interface ProfileState {
  profile: ProfileApiResponse | null;
  loading: boolean;
  error: string | null;
}

/* =========================
   INITIAL STATE
========================= */

const initialState: ProfileState = {
  profile: null,
  loading: false,
  error: null,
};

/* =========================
   ASYNC THUNK
========================= */

export const fetchProfile = createAsyncThunk<
  ProfileApiResponse,
  void,
  { rejectValue: string }
>("profile/fetchProfile", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      return rejectWithValue("Authentication token missing");
    }

    const response = await axios.get<ProfileApiResponse>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/account/fetch-info`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data; // IMPORTANT: return full object
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile"
      );
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

/* =========================
   SLICE
========================= */

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.profile = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProfile.fulfilled,
        (state, action: PayloadAction<ProfileApiResponse>) => {
          state.loading = false;
          state.profile = action.payload;
        }
      )
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load profile";
      });
  },
});

/* =========================
   EXPORTS
========================= */

export const { clearProfile } = profileSlice.actions;
export default profileSlice.reducer;
