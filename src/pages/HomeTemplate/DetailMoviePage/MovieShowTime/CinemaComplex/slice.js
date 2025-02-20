import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../../services/api";

export const fetchCinemaComplex = createAsyncThunk(
  "cinemaComplex/fetchCinemaComplex",
  async (maHeThongRap, { rejectWithValue }) => {
    try {
      const result = await api.get(`/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=BHDStar`);
    //   const result = await api.get(`/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`);


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

const cinemaComplexSlice = createSlice({
  name: "cinemaComplexSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCinemaComplex.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCinemaComplex.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchCinemaComplex.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default cinemaComplexSlice.reducer;
