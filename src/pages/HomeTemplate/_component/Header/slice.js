import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../../../services/api";

export const fetchUserInfo = createAsyncThunk(
    "userInfo/fetchUserInfo",
    async (__dirname, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token"); // Kiểm tra token đăng nhập
            if (!token) {
                return rejectWithValue("No token found");
              }
              api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
              const response = await api.post("/QuanLyNguoiDung/ThongTinTaiKhoan");
              return response.data.content;
            } catch (error) {
              return rejectWithValue(error.response.data);
            }
          }
        );

        
const initialState = {
    loading: false,
    data: JSON.parse(localStorage.getItem("userInfo")) || null, // Lấy user từ localStorage
    error: null,
};

export const logoutAndReload = createAsyncThunk(
  "userInfo/logoutAndReload",
  async (_, { dispatch }) => {
    await dispatch(logout());  // Chờ logout xong
    setTimeout(() => {
      window.location.reload();
    }, 100);  // Chờ 100ms trước khi reload
  }
);
  

const userInfoSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
      logout: (state) => {
        state.data = null;
        state.error = null;
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");
        delete api.defaults.headers.common["Authorization"];
      },
      setUserInfo: (state, action) => {
        state.data = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchUserInfo.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchUserInfo.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
          state.error = null;
          localStorage.setItem("userInfo", JSON.stringify(action.payload));
        })
        .addCase(fetchUserInfo.rejected, (state, action) => {
          state.loading = false;
          state.data = null;
          state.error = action.payload;
        });
    },
  });
export const { logout, setUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
