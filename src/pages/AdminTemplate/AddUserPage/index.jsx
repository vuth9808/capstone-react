import { useState } from "react";
import api from "../../../services/api";
import { toast, ToastContainer } from "react-toastify";

export default function AddUserPage() {
    const [user, setUser] = useState({
        taiKhoan: "",
        matKhau: "",
        email: "",
        soDt: "",
        maNhom: "GP06",
        maLoaiNguoiDung: "KhachHang",
        hoTen: "",
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("user submit", user);

        try {
            const result = await api.post(
                "/QuanLyNguoiDung/ThemNguoiDung",
                user
            );

            console.log("result: ", result);

            // hiển thị noti
            toast.success(result.data.message, {
                position: "bottom-right",
            });
        } catch (error) {
            console.log("error: ", error);

            const messageError = error.response.data.content;
            console.log("messageError: ", messageError);

            // hiển thị noti
            toast.error(messageError, {
                position: "bottom-right",
            });
        }
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-center text-red-500 text-4xl">Add User Page</h1>

            <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Tài khoản
                    </label>
                    <input
                        onChange={handleOnChange}
                        name="taiKhoan"
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Mật khẩu
                    </label>
                    <input
                        onChange={handleOnChange}
                        name="matKhau"
                        type="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Email
                    </label>
                    <input
                        onChange={handleOnChange}
                        name="email"
                        type="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Số Điện Thoại
                    </label>
                    <input
                        onChange={handleOnChange}
                        name="soDt"
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Họ tên
                    </label>
                    <input
                        onChange={handleOnChange}
                        name="hoTen"
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="maLoaiNguoiDung"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Loại người dùng
                    </label>
                    <select
                        onChange={handleOnChange}
                        id="maLoaiNguoiDung"
                        name="maLoaiNguoiDung"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value={"KhachHang"}>KhachHang</option>
                        <option value={"QuanTri"}>QuanTri</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Submit
                </button>
            </form>

            {/* toast noti */}
            <ToastContainer />
        </div>
    );
}
