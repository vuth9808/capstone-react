import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../../services/api";

export const fetchCinemaSystem = createAsyncThunk(
  "cinemaSystem/fetchCinemaSystem",
  async (__dirname, { rejectWithValue }) => {
    try {
      const result = await api.get("/QuanLyRap/LayThongTinHeThongRap");

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

const cinemaSystemSlice = createSlice({
  name: "cinemaSystemSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCinemaSystem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCinemaSystem.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchCinemaSystem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default cinemaSystemSlice.reducer;
