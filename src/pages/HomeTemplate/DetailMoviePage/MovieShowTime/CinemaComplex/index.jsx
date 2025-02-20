import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCinemaComplex } from "./slice";
import { useEffect } from "react";
import { Spinner } from "flowbite-react";
import Complex from "./complex";

export default function CinemaComplex() {
  const state = useSelector((state) => state.cinemaComplexReducer);
  const { maHeThongRap } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCinemaComplex(maHeThongRap));
  }, []);

  const renderCinemaComplex = () => {
    const { data } = state;

    return data?.map((complex) => (
      <Complex key={complex.maHeThongRap} complex={complex} />
    ));
  };

  if (state.loading)
    return (
      <div className="text-center">
        <Spinner aria-label="Extra large spinner example" size="xl" />
      </div>
    );
  return (<div>{renderCinemaComplex()}</div>); 
}
