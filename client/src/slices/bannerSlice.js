import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for fetching banners
export const getBannersAsync = createAsyncThunk(
  'banner/getBannersAsync',
  async (_, { dispatch }) => {
    try {
      dispatch(setBannersLoading(true));
      // Fetch banners from API
      const response = await fetch("/api/admin/getBanners"); // Update the API endpoint
      const data = await response.json();

      // Dispatch the setBanners action
      dispatch(setBanners(data));
    } catch (error) {
      // Handle error
      console.error("Error fetching banners:", error);
      dispatch(setBannersError(error));
      throw error;
    } finally {
      // Set isLoading to false after fetching
      dispatch(setBannersLoading(false));
    }
  }
);

const bannerSlice = createSlice({
  name: "banner",
  initialState: {
    data: [],
    error: null,
    isLoading: false,
  },
  reducers: {
    setBanners: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setBannersLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setBannersError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBannersAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBannersAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getBannersAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setBanners, setBannersLoading, setBannersError } = bannerSlice.actions;

export default bannerSlice.reducer;
