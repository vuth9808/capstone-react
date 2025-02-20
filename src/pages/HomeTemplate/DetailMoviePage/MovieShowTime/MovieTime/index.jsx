import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieTime } from "./slice";
import { useEffect } from "react";
import { Spinner } from "flowbite-react";
import Time from "./time";

export default function MovieTime() {
  const state = useSelector((state) => state.movieTimeReducer);
  const { MaPhim } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovieTime(MaPhim));
  }, []);

  const renderMovieTime = () => {
    const { data } = state;
    return data?.heThongRapChieu.flatMap((heThongRap) =>
      heThongRap.cumRapChieu.flatMap((cumRap) =>
        cumRap.lichChieuPhim.map((time) => (
          <Time key={time.maRap + time.ngayChieuGioChieu} time={time} />
        ))
      )
    );
  };

  if (state.loading)
    return (
      <div className="text-center">
        <Spinner aria-label="Extra large spinner example" size="xl" />
      </div>
    );
  return <div className="flex flex-row gap-2" >{renderMovieTime()}</div>;
}
