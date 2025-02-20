import { configureStore } from "@reduxjs/toolkit";
import bookingTicketReducer from "./../pages/HomeTemplate/BookingPage/slice";
import listMovieReducer from "./../pages/HomeTemplate/ListMoviePage/slice";
import detailMovieReducer from "./../pages/HomeTemplate/DetailMoviePage/DetailMovie/slice";
import authReducer from "./../pages/AdminTemplate/AuthPage/slice";
import listUsersReducer from "./../pages/AdminTemplate/UsersPage/slice";
import bannerReducer from "../pages/HomeTemplate/_component/Banner/slice";
import cinemaSystemReducer from "../pages/HomeTemplate/DetailMoviePage/MovieShowTime/CinemaSystem/slice";
import cinemaComplexReducer from "../pages/HomeTemplate/DetailMoviePage/MovieShowTime/CinemaComplex/slice";
import movieTimeReducer from "../pages/HomeTemplate/DetailMoviePage/MovieShowTime/MovieTime/slice";
import authLoginReducer from "./../pages/HomeTemplate/AuthLoginPage/Login/slice";
import authRegisterReducer from "./../pages/HomeTemplate/AuthLoginPage/Register/slice";
import userInfoReducer from "./../pages/HomeTemplate/_component/Header/slice";
import movieShowtimeReducer from "../pages/HomeTemplate/DetailMoviePage/MovieShowTime/slice";




export const store = configureStore({
    reducer: {
        // Add your child reducers here
        bookingTicketReducer,
        listMovieReducer,
        detailMovieReducer,
        authReducer,
        listUsersReducer,
        bannerReducer,
        cinemaSystemReducer,
        cinemaComplexReducer,
        movieTimeReducer,
        authLoginReducer,
        authRegisterReducer,
        userInfoReducer,
        movieShowtimeReducer,
    },
});
