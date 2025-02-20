import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../../services/api";

export const fetchMovieTime = createAsyncThunk(
  "movieTime/fetchMovieTime",
  async (MaPhim, { rejectWithValue }) => {
    try {
      const result = await api.get(`/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${MaPhim}`);

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

const movieTimeSlice = createSlice({
  name: "movieTimeSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovieTime.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMovieTime.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchMovieTime.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export default movieTimeSlice.reducer;
