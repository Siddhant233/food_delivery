import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getRecommendations } from "../api/recommendationApi";

export const fetchRecommendations = createAsyncThunk(
  "recommendation/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getRecommendations();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch recommendations");
    }
  }
);

const recommendationSlice = createSlice({
  name: "recommendation",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendations.pending, (state) => { state.loading = true; })
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchRecommendations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default recommendationSlice.reducer;
