import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../../../services/api";

export const fetchDetailMovie = createAsyncThunk(
  "detailMoviePage/fetchDetailMovie",
  async (id, { rejectWithValue }) => {
    try {
      const result = await api.get(`/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`);

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

const detailMoviePageSlice = createSlice({
  name: "detailMoviePageSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDetailMovie.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDetailMovie.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchDetailMovie.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export default detailMoviePageSlice.reducer;
