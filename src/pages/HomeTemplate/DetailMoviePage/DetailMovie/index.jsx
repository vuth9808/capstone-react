import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDetailMovie } from "./slice";
import { useEffect } from "react";
import ReactPlayer from "react-player";
import { Spinner, Breadcrumb, Card } from "flowbite-react";
import { HiHome } from "react-icons/hi";

export default function DetailMovie() {
  const state = useSelector((state) => state.detailMovieReducer);
  const { data } = state;
  const { id } = useParams();
  const disptach = useDispatch();

  useEffect(() => {
    disptach(fetchDetailMovie(id));
  }, []);

  if (state.loading)
    return (
      <div className="text-center">
        <Spinner aria-label="Extra large spinner example" size="xl" />
      </div>
    );
  return (
    <div>
      <Breadcrumb
        aria-label="Solid background breadcrumb example"
        className="bg-gray-50 px-5 py-3 dark:bg-gray-800 mx-60"
      >
        <NavLink to="/list-movie">
          <Breadcrumb.Item icon={HiHome}>
            List Movies
          </Breadcrumb.Item>
        </NavLink>

        {data && (
  <Breadcrumb.Item>{data.tenPhim}</Breadcrumb.Item>
)}      </Breadcrumb>
      <div className="grid grid-cols-2 mx-60">
        <div>
          {data && <Card className="max-w-sm" imgSrc={data.hinhAnh}></Card>}
        </div>
        <div>
          {data && (
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {data.tenPhim}
              </h2>
              <p>{data.moTa}</p>
              <p>Ngày khởi chiếu: {data.ngayKhoiChieu}</p>
              <ReactPlayer url={data.trailer} controls={true} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
