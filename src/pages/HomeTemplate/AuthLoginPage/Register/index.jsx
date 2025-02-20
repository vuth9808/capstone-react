import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { actRegister } from "./slice";
export default function Register() {
  const state = useSelector((state) => state.authRegisterReducer);
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "GP06",
    hoTen: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    dispatch(actRegister(user));
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
      onSubmit={handleRegister}
      className="flex max-w-md flex-col gap-4 mx-auto"
    >
      {handleErrorMessage()}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email2" value="User name" />
        </div>
        <TextInput
          onChange={handleOnChange}
          name="taiKhoan"
          id="email2"
          type="text"
          placeholder="User name"
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password2" value="Password" />
        </div>
        <TextInput
          onChange={handleOnChange}
          name="matKhau"
          placeholder="Password"
          id="password2"
          type="password"
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="" value="Email" />
        </div>
        <TextInput
          onChange={handleOnChange}
          name="email"
          type="text"
          placeholder="Email"
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="" value="Phone number" />
        </div>
        <TextInput
          onChange={handleOnChange}
          name="soDt"
          type="text"
          placeholder="Phone number"
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="" value="Full name" />
        </div>
        <TextInput
          onChange={handleOnChange}
          name="hoTen"
          type="text"
          placeholder="Full name"
          required
        />
      </div>

      <div className="flex items-center gap-2">
        <Checkbox id="agree" />
        <Label htmlFor="agree" className="flex">
          I agree with the&nbsp;
          <Link
            href="#"
            className="text-cyan-600 hover:underline dark:text-cyan-500"
          >
            terms and conditions
          </Link>
        </Label>
      </div>
      <Button type="submit">Register new account</Button>
    </form>
  );
}
