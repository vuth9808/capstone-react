import HomeTemplate from "../pages/HomeTemplate";
import HomePage from "../pages/HomeTemplate/HomePage";
import ListMoviePage from "../pages/HomeTemplate/ListMoviePage";
import DetailMoviePage from "./../pages/HomeTemplate/DetailMoviePage";
import BookingPage from "../pages/HomeTemplate/BookingPage";
import PageNotFound from "./../pages/PageNotFound";
import AuthLoginPage from "../pages/HomeTemplate/AuthLoginPage";
import UserInfoPage from "../pages/HomeTemplate/UserInfoPage";


import AdminTemplate from "../pages/AdminTemplate";
import DashboardPage from "../pages/AdminTemplate/DashboardPage";
import AddUserPage from "../pages/AdminTemplate/AddUserPage";
import AuthPage from "../pages/AdminTemplate/AuthPage";
import { Route } from "react-router-dom";
import UsersPage from "../pages/AdminTemplate/UsersPage";
import AddMoviePage from "../pages/AdminTemplate/AddMoviePage";
import AddCinemaPage from "../pages/AdminTemplate/AddCinemaPage";
import AdminInfoPage from "../pages/AdminTemplate/AdminInfoPage";

const routes = [
    {
        path: "",
        element: HomeTemplate,
        chilren: [
            {
                path: "",
                element: HomePage,
            },
           
            {
                path: "list-movie",
                element: ListMoviePage,
            },
          
            
           
            {
                path: "detail/:id",
                element: DetailMoviePage,
            },
            {
                path: "detail/:id/booking/:maLichChieu",
                element: BookingPage,
            },
            {
                path: "auth-login",
                element: AuthLoginPage,
            },
            {
                path: "user-info",
                element: UserInfoPage,
            },
        ],
    },
    {
        path: "admin",
        element: AdminTemplate,
        chilren: [
            {
                path: "dashboard",
                element: DashboardPage,
            },
            {
                path: "add-user",
                element: AddUserPage,
            },
            {
                path: "users",
                element: UsersPage,
            },
            {
                path: "add-movie",
                element: AddMoviePage,
            },
            {
                path: "add-cinema",
                element: AddCinemaPage,
            },
            {
                path: "info",
                element: AdminInfoPage,
            },
        ],
    },
    {
        path: "auth",
        element: AuthPage,
    },
    {
        path: "*",
        element: PageNotFound,
    },
];

export const renderRoutes = () => {
    return routes.map((route) => {
        if (route.chilren) {
            return (
                <Route
                    key={route.path}
                    path={route.path}
                    element={<route.element />}
                >
                    {route.chilren.map((item) => (
                        <Route
                            key={item.path}
                            path={item.path}
                            element={<item.element />}
                        />
                    ))}
                </Route>
            );
        } else {
            return (
                <Route
                    key={route.path}
                    path={route.path}
                    element={<route.element />}
                />
            );
        }
    });
};
