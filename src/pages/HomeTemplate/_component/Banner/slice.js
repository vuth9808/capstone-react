import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../services/api";

export const fetchBanner = createAsyncThunk(
  "banner/fetchBanner",
  async (__dirname, { rejectWithValue }) => {
    try {
      const result = await api.get("/QuanLyPhim/LayDanhSachBanner");

      return result.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const bannerSlice = createSlice({
  name: "bannerSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBanner.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchBanner.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchBanner.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default bannerSlice.reducer;
