import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CinemaSystem from './CinemaSystem';
import { fetchMovieShowtimes } from './slice';

export default function MovieShowTime() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const movieShowtimeState = useSelector((state) => state.movieShowtimeReducer);
  const { data: movieShowtime, loading, error } = movieShowtimeState || {};

  useEffect(() => {
    if (id) {
      dispatch(fetchMovieShowtimes(id));
    }
  }, [dispatch, id]);

  // Thêm console.log để kiểm tra
  console.log('movieShowtime:', movieShowtime);
  console.log('id:', id);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='mx-20'>
      <h1 className='text-center uppercase text-xl font-mono font-semibold mt-10'>Vui lòng chọn rạp và lịch chiếu bên dưới </h1>
      {movieShowtime?.heThongRapChieu?.length > 0 ? (
        <CinemaSystem cinemaSystem={movieShowtime.heThongRapChieu} />
      ) : (
        <div className='text-center uppercase text-xl font-mono font-semibold mt-10 text-red-700'>Không có dữ liệu lịch chiếu.</div>
      )}
    </div>
  );
}