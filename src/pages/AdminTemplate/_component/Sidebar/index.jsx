import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";

export default function Component() {
  const handleLogout = () => {
    dispatch(logoutAndReload());
  };

  return (
    <Sidebar aria-label="Sidebar with logo branding example">
      <Sidebar.Logo
        img="https://www.svgrepo.com/show/389961/cinema-imax-movie-4k-hd-screen.svg"
        imgAlt="HV MOVIE logo"
      >
        <NavLink to="dashboard">HV MOVIE</NavLink>
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item icon={HiChartPie}>
            <NavLink
              to="dashboard"
              className={({ isActive }) => (isActive ? "text-blue-700" : "")}
            >
              Movies
            </NavLink>
          </Sidebar.Item>

          <Sidebar.Item icon={HiInbox}>
            <NavLink
              to="add-movie"
              className={({ isActive }) => (isActive ? "text-blue-700" : "")}
            >
              Add Movie
            </NavLink>
          </Sidebar.Item>

          <Sidebar.Item icon={HiShoppingBag}>
            <NavLink
              to="add-cinema"
              className={({ isActive }) => (isActive ? "text-blue-700" : "")}
            >
              Add Cinema
            </NavLink>
          </Sidebar.Item>

          <Sidebar.Item icon={HiUser}>
            <NavLink
              to="users"
              className={({ isActive }) => (isActive ? "text-blue-700" : "")}
            >
              Users
            </NavLink>
          </Sidebar.Item>

          <Sidebar.Item icon={HiViewBoards}>
            <NavLink
              to="add-user"
              className={({ isActive }) => (isActive ? "text-blue-700" : "")}
            >
              Add User
            </NavLink>
          </Sidebar.Item>

          <Sidebar.Item icon={HiArrowSmRight}>
            <NavLink
              to="info"
              className={({ isActive }) => (isActive ? "text-blue-700" : "")}
            >
              Update Info
            </NavLink>
          </Sidebar.Item>

          <Sidebar.Item
          onClick={handleLogout}
            icon={HiTable}
            className={({ isActive }) => (isActive ? "text-blue-700" : "")
          }
          >
            Sign Up
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
