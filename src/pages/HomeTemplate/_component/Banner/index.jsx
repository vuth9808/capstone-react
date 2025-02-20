import { Carousel } from "flowbite-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBanner } from "./slice";
import Banner from "./banner";
import { Spinner } from "flowbite-react";

export default function Component() {
  const state = useSelector((state) => state.bannerReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBanner());
  }, []);

  const renderBanner = () => {
    const { data } = state;

    return data?.map((banner) => (
      <Banner key={banner.maPhim} banner={banner} />
    ));
  };

  if (state.loading)
    return (
      <div className="text-center">
      <Spinner aria-label="Extra large spinner example" size="xl" />
    </div>
    );

  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel pauseOnHover>{renderBanner()}</Carousel>
    </div>
  );
}
