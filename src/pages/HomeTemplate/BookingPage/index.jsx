import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import {
  Card,
  Spinner,
  Alert,
  Badge,
  Button,
  Breadcrumb,
} from "flowbite-react";
import { fetchSeatList, clearSelectedSeats, resetBookingState } from "./slice";
import { FaTimes, FaUser, FaCouch } from "react-icons/fa";
import SeatMap from "./SeatMap";
import ConfirmationModal from "./ConfirmationModal";
import { HiHome } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function BookingPage() {


    const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBooking = () => {
    setIsModalOpen(true);
  };
  const confirmBooking = () => {
    // Implement the actual booking logic here
    alert("Đặt vé thành công!");
    setIsModalOpen(false);
    // You might want to dispatch an action to clear the selected seats and update the booking state
  };

  const { id, maLichChieu } = useParams();
  const dispatch = useDispatch();
  const {
    listSeats,
    listSeatsSelected,
    thongTinPhim,
    loading,
    error,
    currentUser,
  } = useSelector((state) => state.bookingTicketReducer);

  useEffect(() => {
    if (maLichChieu) {
      dispatch(fetchSeatList(maLichChieu));
    }
    return () => {
      dispatch(clearSelectedSeats());
    };
  }, [dispatch, maLichChieu]);

  const renderScreen = () => {
    return (
      <div className="mb-8 relative">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 uppercase font-bold tracking-wider text-white">
          SCREEN
        </div>
        <div className="h-10 bg-gradient-to-b from-gray-300 to-transparent rounded-t-lg trapezoid"></div>
      </div>
    );
  };

  const calculateTotal = () => {
    return listSeatsSelected.reduce((total, seat) => total + seat.giaVe, 0);
  };

  const renderSeatLegend = () => {
    return (
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6 py-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <Button size="sm" color="dark" className="w-8 h-8 p-0">
            <FaTimes size={10} />
          </Button>
          <span className="text-sm">Đã đặt</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button size="sm" color="light" className="w-8 h-8 p-0">
            1
          </Button>
          <span className="text-sm">Ghế thường</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button size="sm" color="warning" className="w-8 h-8 p-0">
            1
          </Button>
          <span className="text-sm">Ghế VIP</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button size="sm" color="success" className="w-8 h-8 p-0">
            1
          </Button>
          <span className="text-sm">Ghế đang chọn</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button size="sm" color="purple" className="w-8 h-8 p-0">
            <FaUser size={10} />
          </Button>
          <span className="text-sm">Ghế của bạn</span>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert color="failure" className="mx-auto max-w-2xl mt-8">
        <span className="font-medium">Lỗi!</span> {error.message}
      </Alert>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Breadcrumb
        aria-label="Solid background breadcrumb example"
        className="bg-gray-50 px-5 py-3 dark:bg-gray-800"
      >
        <NavLink onClick={() => navigate(-1)}>
          {thongTinPhim && (
            <Breadcrumb.Item icon={HiHome}>
              {thongTinPhim.tenPhim}
            </Breadcrumb.Item>
          )}
        </NavLink>

        <Breadcrumb.Item>List Movies</Breadcrumb.Item>
      </Breadcrumb>

      {thongTinPhim && (
        <Card className="mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {thongTinPhim.tenPhim}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {thongTinPhim.tenCumRap} - {thongTinPhim.tenRap}
              </p>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {thongTinPhim.diaChi}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-gray-600 dark:text-gray-400">
                Suất chiếu: {thongTinPhim.gioChieu} - {thongTinPhim.ngayChieu}
              </p>
            </div>
          </div>
        </Card>
      )}

      

      <div className="flex flex-col md:flex-row gap-8">
        <Card className="w-full md:w-3/5">
          {renderScreen()}
          <SeatMap />
          {renderSeatLegend()}
        </Card>

        <Card className="w-full md:w-2/5">
          <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            Ghế đã chọn
          </h5>
          <div className="space-y-4">
            {listSeatsSelected.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">
                Chưa có ghế nào được chọn
              </p>
            ) : (
              <>
                {listSeatsSelected.map((seat) => (
                  <div
                    key={seat.maGhe}
                    className="flex justify-between py-2 border-b dark:border-gray-700"
                  >
                    <span className="dark:text-white">
                      Ghế {seat.tenGhe}
                      {seat.loaiGhe === "Vip" && (
                        <Badge color="warning" className="ml-2">
                          VIP
                        </Badge>
                      )}
                    </span>
                    <span className="font-medium dark:text-white">
                      {seat.giaVe.toLocaleString()}đ
                    </span>
                  </div>
                ))}
                <div className="flex justify-between mt-4 pt-4 border-t dark:border-gray-700 font-bold">
                  <span className="dark:text-white">Tổng tiền</span>
                  <span className="text-orange-500 dark:text-orange-400 text-xl">
                    {calculateTotal().toLocaleString()}đ
                  </span>
                </div>

                <div className="mt-6">
                  

                  <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmBooking}
        selectedSeats={listSeatsSelected}
        total={calculateTotal()}
      />

      {/* Update the "ĐẶT VÉ" button to open the modal */}
      <button
        className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg rounded transition duration-200"
        onClick={handleBooking}
        disabled={listSeatsSelected.length === 0}
      >
        ĐẶT VÉ
      </button>




                </div>
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
