import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { actLogin } from "./slice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { setUserInfo } from "../../_component/Header/slice";

export default function Login() {
  const state = useSelector((state) => state.authLoginReducer);
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(actLogin(user)).unwrap();
      // Sau khi đăng nhập thành công, cập nhật thông tin người dùng
      dispatch(setUserInfo(result));
      // Chuyển hướng hoặc thực hiện các hành động khác sau khi đăng nhập
    } catch (error) {
      // Xử lý lỗi
    }
  };

  if (state.data) {
    //redirect to dashboard
    return <Navigate to="/" />;
  }

  const handleErrorMessage = () => {
    const { error } = state;

    if (!error) return "";
    return (
      <div
        className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
        role="alert"
      >
        <span className="font-medium">{error.response.data.content}</span>
      </div>
    );
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex max-w-md flex-col gap-4 mx-auto"
    >
      {handleErrorMessage()}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email1" value="User name" />
        </div>
        <TextInput
          onChange={handleOnChange}
          name="taiKhoan"
          type="text"
          id="email1"
          placeholder="User name"
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1" value="Password" />
        </div>
        <TextInput
          id="password1"
          type="password"
          onChange={handleOnChange}
          name="matKhau"
          placeholder="Password"
          required
        />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember">Remember me</Label>
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
}
