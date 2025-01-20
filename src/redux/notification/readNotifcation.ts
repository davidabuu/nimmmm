import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to mark a notification as read
export const markNotificationAsRead = createAsyncThunk(
  "notifications/markAsRead",
  async (id: number, { rejectWithValue }) => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const accessToken = localStorage.getItem("accessToken");



      await axios.patch(`${baseUrl}notifications/${id}/read`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return id; // Return the ID of the read notification
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Slice
const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Mark notification as read
      .addCase(markNotificationAsRead.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(markNotificationAsRead.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(markNotificationAsRead.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string | null;
      });
  },
});

export default notificationsSlice.reducer;
