import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./../../../../services/api";

export const actRegister = createAsyncThunk(
  "authRegister/actRegister",
  async (user, { rejectWithValue }) => {
    try {
      const result = await api.post("/QuanLyNguoiDung/DangKy", user);
      const userInfo = result.data.content;
      if (userInfo.taiKhoan === userInfo.taiKhoan ) {
        return rejectWithValue({
          response: {
            data: {
              content: "Tài khoản đã tồn tại. Vui lòng nhập tài khoản khác!",
            },
          },
        });
      }

    //   /**
    //    * 1. Save userInfo to local storage
    //    */

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

const authRegisterSlice = createSlice({
  name: "authRegisterSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actRegister.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(actRegister.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(actRegister.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default authRegisterSlice.reducer;
