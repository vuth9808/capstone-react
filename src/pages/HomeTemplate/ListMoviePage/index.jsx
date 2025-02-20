import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Movie from "./Movie";
import { fetchListMovie } from "./slice";
import { Spinner } from "flowbite-react";

export default function ListMoviePage() {
  const state = useSelector((state) => state.listMovieReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchListMovie());
  }, []);

  const renderListMovie = () => {
    const { data } = state;

    return data?.map((movie) => <Movie key={movie.maPhim} movie={movie} />);
  };

  if (state.loading)
    return (
      <div className="text-center">
      <Spinner aria-label="Extra large spinner example" size="xl" />
    </div>
    );

  return (
      <div className="grid grid-cols-4 gap-5 mx-60 ">{renderListMovie()}</div>
  );
}
