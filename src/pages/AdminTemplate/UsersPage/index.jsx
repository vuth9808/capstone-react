import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListUsers } from "./slice";
import { Table, TextInput, Button, Pagination, Spinner } from "flowbite-react";
import { HiSearch, HiPencil, HiTrash } from "react-icons/hi";

export default function UsersPage() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.listUsersReducer);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchListUsers());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Sau này có thể cập nhật Redux để fetch theo tìm kiếm
    console.log("Searching for:", searchTerm);
  };

  const handleDelete = (taiKhoan) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa tài khoản: ${taiKhoan} không?`)) {
      console.log("Xóa tài khoản:", taiKhoan);
    }
  };

  const handleEdit = (taiKhoan) => {
    console.log("Chỉnh sửa tài khoản:", taiKhoan);
  };

  const paginatedUsers = data ? data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : [];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">Đã xảy ra lỗi: {error.message}</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-center text-blue-600 text-2xl font-bold mb-6">Quản lý người dùng</h1>

      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <TextInput
          type="text"
          placeholder="Nhập tài khoản hoặc họ tên..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
          icon={HiSearch}
        />
        <Button type="submit">Tìm</Button>
      </form>

      {data?.length === 0 ? (
        <p className="text-center">Không có người dùng nào.</p>
      ) : (
        <div className="overflow-x-auto">
          <Table striped>
            <Table.Head>
              <Table.HeadCell>STT</Table.HeadCell>
              <Table.HeadCell>Tài khoản</Table.HeadCell>
              <Table.HeadCell>Họ tên</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Số ĐT</Table.HeadCell>
              <Table.HeadCell>Loại</Table.HeadCell>
              <Table.HeadCell>Hành động</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {paginatedUsers.map((user, index) => (
                <Table.Row key={user.taiKhoan}>
                  <Table.Cell>{(currentPage - 1) * itemsPerPage + index + 1}</Table.Cell>
                  <Table.Cell>{user.taiKhoan}</Table.Cell>
                  <Table.Cell>{user.hoTen}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.soDT}</Table.Cell>
                  <Table.Cell className={user.maLoaiNguoiDung === "KhachHang" ? "text-green-500" : "text-red-500"}>
                    {user.maLoaiNguoiDung}
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex gap-2">
                      <Button size="sm" color="info" onClick={() => handleEdit(user.taiKhoan)}>
                        <HiPencil className="h-4 w-4" />
                      </Button>
                      <Button size="sm" color="failure" onClick={() => handleDelete(user.taiKhoan)}>
                        <HiTrash className="h-4 w-4" />
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      )}

      {data?.length > 0 && (
        <div className="flex justify-center mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(data.length / itemsPerPage)}
            onPageChange={setCurrentPage}
            showIcons
          />
        </div>
      )}
    </div>
  );
}
