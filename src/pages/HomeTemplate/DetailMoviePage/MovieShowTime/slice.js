import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../../services/api';

export const fetchMovieShowtimes = createAsyncThunk(
    'movieShowtime/fetchMovieShowtimes',
    async (movieId, { rejectWithValue }) => {
      try {
        const response = await api.get(`/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movieId}`);
        console.log('API Response:', response.data); // Thêm log này
        if (!response.data.content) {
          return rejectWithValue('Không có dữ liệu');
        }
        return response.data?.content || {}; // Đảm bảo không trả về undefined
    } catch (error) {   
        console.error('API Error:', error); // Thêm log này
        return rejectWithValue(error.response?.data || 'Có lỗi xảy ra');
      }
    }
  );

const movieShowtimeSlice = createSlice({
  name: 'movieShowtime',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieShowtimes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieShowtimes.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload || {}; // Đảm bảo không bị undefined
      })
            .addCase(fetchMovieShowtimes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default movieShowtimeSlice.reducer;