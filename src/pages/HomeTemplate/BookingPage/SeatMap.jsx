import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSeatSelected } from './slice';
import { FaTimes, FaUser } from 'react-icons/fa';

export default function SeatMap() {
  const dispatch = useDispatch();
  const { listSeats, listSeatsSelected, currentUser } = useSelector((state) => state.bookingTicketReducer);

  if (!listSeats?.length) {
    return <p>Không có dữ liệu ghế</p>;
  }

  const seatsByRow = {};
  listSeats.forEach(seat => {
    const rowId = seat.tenGhe[0];
    if (!seatsByRow[rowId]) {
      seatsByRow[rowId] = [];
    }
    seatsByRow[rowId].push(seat);
  });

  const sortedRows = Object.keys(seatsByRow).sort();

  return (
    <div className="bg-gray-900 p-6 rounded-lg text-center">
      <div className="flex justify-center text-white mb-2">
        {Array.from({ length: 16 }, (_, i) => (
          <span key={i} className="w-8 text-center">{(i + 1).toString().padStart(2, '0')}</span>
        ))}
      </div>

      {sortedRows.map(rowId => (
        <div className="flex justify-center items-center" key={rowId}>
          <span className="w-6 text-white mr-2">{rowId}</span>
          {seatsByRow[rowId].sort((a, b) => a.tenGhe.localeCompare(b.tenGhe)).map(seat => {
            const isSelected = listSeatsSelected.some(s => s.maGhe === seat.maGhe);
            const isUserSeat = seat.daDat && seat.taiKhoanNguoiDat === currentUser?.taiKhoan;

            return (
              <button
                key={seat.maGhe}
                disabled={seat.daDat}
                onClick={() => dispatch(setSeatSelected(seat))}
                className={`w-8 h-8 m-1 rounded-md text-xs font-bold transition-colors duration-200
                  ${seat.loaiGhe === 'Vip' ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-400 hover:bg-gray-500'}
                  ${seat.daDat ? 'bg-gray-700 text-white cursor-not-allowed' : ''}
                  ${isSelected ? 'bg-green-500 text-white' : ''}
                  ${isUserSeat ? 'bg-purple-500 text-white' : ''}`}
              >
                {seat.daDat ? (isUserSeat ? <FaUser size={12} /> : <FaTimes size={12} />) : seat.tenGhe.substring(1)}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
