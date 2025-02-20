import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Navbar, Avatar, Dropdown } from "flowbite-react";
import { NavLink } from "react-router-dom";
import { fetchUserInfo, logoutAndReload } from "./slice";

export default function Component() {
  const { data: user, loading } = useSelector((state) => state.userInfoReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutAndReload());
  };

  return (
    <Navbar fluid rounded>
      <Navbar.Brand>
        <NavLink to="/" className="flex flex-row">
          <img
            src="https://www.svgrepo.com/show/389961/cinema-imax-movie-4k-hd-screen.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite React Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            HV MOVIE
          </span>
        </NavLink>
      </Navbar.Brand>
      <div className="flex md:order-2">
        {!loading && (
          <>
            {!user ? (
              <>
                <Button color={false}>
                  <NavLink to="auth-login">Login</NavLink>
                </Button>
                <Button>
                  <NavLink to="auth-login">Register</NavLink>
                </Button>
              </>
            ) : (
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar
                    alt="User settings"
                    img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    rounded
                  />
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm">{user.taiKhoan}</span>
                  <span className="block truncate text-sm font-medium">
                    {user.email}
                  </span>
                </Dropdown.Header>
                <NavLink to="user-info">
                  <Dropdown.Item>Profile</Dropdown.Item>
                </NavLink>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
              </Dropdown>
            )}
          </>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "text-blue-700" : "")}
          >
            Home
          </NavLink>
        </Navbar.Link>

        <Navbar.Link>
          <NavLink
            to="list-movie"
            className={({ isActive }) => (isActive ? "text-blue-700" : "")}
          >
            List Movie
          </NavLink>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
