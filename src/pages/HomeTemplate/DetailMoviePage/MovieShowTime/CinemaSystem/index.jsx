import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";

export default function CinemaSystem({ cinemaSystem }) {

  const { id } = useParams();
  const [selectedCinema, setSelectedCinema] = useState(null);

  const renderCinemaSystem = () => {
    if (!cinemaSystem || cinemaSystem.length === 0) {
      return <div>Không có hệ thống rạp nào cho phim này.</div>;
    }

    return (
      <div className="flex">
        <div className="w-1/4">
          {cinemaSystem.map((system) => (
            <div 
              key={system.maHeThongRap} 
              className={`p-2 cursor-pointer ${selectedCinema === system.maHeThongRap ? 'bg-gray-200' : ''}`}
              onClick={() => setSelectedCinema(system.maHeThongRap)}
            >
              <img src={system.logo} alt={system.tenHeThongRap} className="w-12 h-12" />
              <h3>{system.tenHeThongRap}</h3>
            </div>
          ))}
        </div>
        <div className="w-3/4">
          {selectedCinema && renderCumRap(cinemaSystem.find(system => system.maHeThongRap === selectedCinema).cumRapChieu)}
        </div>
      </div>
    );
  };

  const renderCumRap = (cumRapChieu) => {
    return cumRapChieu.map((cumRap) => (
      <div key={cumRap.maCumRap} className="mb-4">
        <h4 className="font-bold">{cumRap.tenCumRap}</h4>
        <p>{cumRap.diaChi}</p>
        {renderLichChieu(cumRap.lichChieuPhim)}
      </div>
    ));
  };

  const renderLichChieu = (lichChieuPhim) => {
    return (
      <div className="grid grid-cols-3 gap-2 mt-2">
        {lichChieuPhim.map((lichChieu) => (
          <Link 
            key={lichChieu.maLichChieu} 
            to={`/detail/${id}/booking/${lichChieu.maLichChieu}`}             
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
          >
            {new Date(lichChieu.ngayChieuGioChieu).toLocaleString()}
          </Link>
        ))}
      </div>
    );
  };

  return <div>{renderCinemaSystem()}</div>;
}