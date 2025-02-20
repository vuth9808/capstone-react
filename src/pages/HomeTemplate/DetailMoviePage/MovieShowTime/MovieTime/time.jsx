import { Button } from "flowbite-react";
import { NavLink, useParams } from "react-router-dom";

export default function Time({ time }) {
  const { id } = useParams();
  return (
    <NavLink to={`/detail/${id}/booking/${time.maLichChieu}`}>     
         <Button>{time.ngayChieuGioChieu}</Button>
</NavLink>
  );
}
