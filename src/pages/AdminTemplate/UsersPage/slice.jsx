import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../services/api";

export const fetchListUsers = createAsyncThunk(
  "listUsersPage/fetchListUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP06");
      return response.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  loading: false,
  data: [],
  error: null,
};

const listUsersPageSlice = createSlice({
  name: "listUsersPage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchListUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchListUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchListUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default listUsersPageSlice.reducer;
