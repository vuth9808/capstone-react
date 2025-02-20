import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../../../../services/api";

export const actLogin = createAsyncThunk(
  "authLogin/actLogin",
  async (user, { rejectWithValue }) => {
    try {
      const result = await api.post("/QuanLyNguoiDung/DangNhap", user);
      /**
       * check permission user
       *  - Nếu là KhachHang => show error
       *  - Nếu là QuanTri => ....
       */
      const userInfo = result.data.content;
      if (userInfo.maLoaiNguoiDung === "QuanTri") {
        return rejectWithValue({
          response: {
            data: {
              content: "Bạn không có quyền truy cập trang này",
            },
          },
        });
      }

      /**
       * 1. Save userInfo to local storage
       */

      localStorage.setItem("userInfo", JSON.stringify(userInfo));

      return result.data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  loading: false,
  data: userInfo,
  error: null,
};

const authLoginSlice = createSlice({
  name: "authLoginSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(actLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(actLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default authLoginSlice.reducer;
