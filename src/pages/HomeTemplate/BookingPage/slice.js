import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../services/api';

export const fetchSeatList = createAsyncThunk(
  'booking/fetchSeatList',
  async (maLichChieu, { rejectWithValue }) => {
    try {
      const response = await api.get(`/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`);
      return response.data.content;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const bookTickets = createAsyncThunk(
  'booking/bookTickets',
  async ({ maLichChieu, danhSachVe }, { rejectWithValue }) => {
    try {
      const response = await api.post('/QuanLyDatVe/DatVe', { maLichChieu, danhSachVe });
      return response.data.content;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const bookingTicket = createSlice({
  name: 'booking',
  initialState: {
    listSeats: [],
    listSeatsSelected: [],
    thongTinPhim: null,
    loading: false,
    error: null,
    bookingSuccess: false,
  },
  reducers: {
    setSeatSelected: (state, action) => {
      const index = state.listSeatsSelected.findIndex(seat => seat.maGhe === action.payload.maGhe);
      if (index !== -1) {
        state.listSeatsSelected.splice(index, 1);
      } else {
        state.listSeatsSelected.push(action.payload);
      }
    },
    clearSelectedSeats: (state) => {
      state.listSeatsSelected = [];
    },
    resetBookingState: (state) => {
      state.bookingSuccess = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeatList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSeatList.fulfilled, (state, action) => {
        state.loading = false;
        console.log('API response structure:', action.payload);
        // If the API returns nested structure, keep this
        state.listSeats = action.payload.danhSachGhe;
        state.thongTinPhim = action.payload.thongTinPhim;
      })
      .addCase(fetchSeatList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(bookTickets.pending, (state) => {
        state.loading = true;
      })
      .addCase(bookTickets.fulfilled, (state) => {
        state.loading = false;
        state.bookingSuccess = true;
        state.listSeatsSelected = [];
      })
      .addCase(bookTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSeatSelected, clearSelectedSeats, resetBookingState } = bookingTicket.actions;

export default bookingTicket.reducer;