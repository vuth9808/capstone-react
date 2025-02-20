import React, { useState, useEffect } from 'react';

const MovieShowtimeForm = ({ movieName, movieImage, maPhim }) => {
  const [heThongRaps, setHeThongRaps] = useState([]);
  const [cumRaps, setCumRaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    maHeThongRap: '',
    maCumRap: '',
    maRap: '',
    ngayChieuGioChieu: '',
    giaVe: 75000
  });

  // Fetch hệ thống rạp
  useEffect(() => {
    const fetchHeThongRap = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap');
        const data = await response.json();
        
        // Check if data.content exists and is an array
        if (data?.content && Array.isArray(data.content)) {
          setHeThongRaps(data.content);
        } else {
          setHeThongRaps([]);
          setError('Invalid data format received');
        }
      } catch (error) {
        console.error('Error fetching theater systems:', error);
        setError('Failed to fetch theater systems');
        setHeThongRaps([]);
      } finally {
        setLoading(false);
      }
    };
    fetchHeThongRap();
  }, []);

  // Fetch cụm rạp when hệ thống rạp changes
  useEffect(() => {
    const fetchCumRap = async () => {
      if (!formData.maHeThongRap) {
        setCumRaps([]);
        return;
      }
      
      try {
        const response = await fetch(
          `https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${formData.maHeThongRap}`
        );
        const data = await response.json();
        
        // Check if data.content exists and is an array
        if (data?.content && Array.isArray(data.content)) {
          setCumRaps(data.content);
        } else {
          setCumRaps([]);
          setError('Invalid data format received for theater clusters');
        }
      } catch (error) {
        console.error('Error fetching theater clusters:', error);
        setError('Failed to fetch theater clusters');
        setCumRaps([]);
      }
    };
    fetchCumRap();
  }, [formData.maHeThongRap]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const showTimeData = {
      maPhim: maPhim,
      ngayChieuGioChieu: formData.ngayChieuGioChieu,
      maRap: formData.maRap,
      giaVe: parseInt(formData.giaVe)
    };

    try {
      const response = await fetch('https://movienew.cybersoft.edu.vn/api/QuanLyDatVe/TaoLichChieu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(showTimeData)
      });
      
      if (response.ok) {
        alert('Tạo lịch chiếu thành công!');
      } else {
        alert('Có lỗi xảy ra khi tạo lịch chiếu!');
      }
    } catch (error) {
      console.error('Error creating showtime:', error);
      alert('Có lỗi xảy ra khi tạo lịch chiếu!');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
      <div className="flex gap-6 mb-6">
        <img 
          src={movieImage || '/api/placeholder/150/225'} 
          alt={movieName}
          className="w-32 h-48 object-cover rounded"
        />
        <div>
          <h2 className="text-2xl font-bold mb-2">Tạo lịch chiếu - {movieName}</h2>
        </div>
      </div>

      {loading && (
        <div className="text-center py-4">
          <p>Đang tải dữ liệu...</p>
        </div>
      )}

      {error && (
        <div className="text-red-500 py-2">
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="heThongRap" className="block text-sm font-medium text-gray-700 mb-1">
            Hệ thống rạp
          </label>
          <select
            id="heThongRap"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.maHeThongRap}
            onChange={(e) => setFormData({
              ...formData,
              maHeThongRap: e.target.value,
              maCumRap: '',
              maRap: ''
            })}
            required
            disabled={loading}
          >
            <option value="">Chọn hệ thống rạp</option>
            {Array.isArray(heThongRaps) && heThongRaps.map((rap) => (
              <option key={rap.maHeThongRap} value={rap.maHeThongRap}>
                {rap.tenHeThongRap}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="cumRap" className="block text-sm font-medium text-gray-700 mb-1">
            Cụm rạp
          </label>
          <select
            id="cumRap"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
            value={formData.maCumRap}
            onChange={(e) => setFormData({
              ...formData,
              maCumRap: e.target.value,
              maRap: ''
            })}
            disabled={!formData.maHeThongRap || loading}
            required
          >
            <option value="">Chọn cụm rạp</option>
            {Array.isArray(cumRaps) && cumRaps.map((cum) => (
              <option key={cum.maCumRap} value={cum.maCumRap}>
                {cum.tenCumRap}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="ngayChieu" className="block text-sm font-medium text-gray-700 mb-1">
            Ngày chiếu giờ chiếu
          </label>
          <input
            type="datetime-local"
            id="ngayChieu"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.ngayChieuGioChieu}
            onChange={(e) => setFormData({
              ...formData,
              ngayChieuGioChieu: e.target.value
            })}
            required
          />
        </div>

        <div>
          <label htmlFor="giaVe" className="block text-sm font-medium text-gray-700 mb-1">
            Giá vé
          </label>
          <input
            type="number"
            id="giaVe"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.giaVe}
            onChange={(e) => setFormData({
              ...formData,
              giaVe: e.target.value
            })}
            min="75000"
            max="200000"
            required
          />
        </div>

        <div className="flex justify-end">
          <button 
            type="submit"
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={loading}
          >
            Tạo lịch chiếu
          </button>
        </div>
      </form>
    </div>
  );
};

export default MovieShowtimeForm;