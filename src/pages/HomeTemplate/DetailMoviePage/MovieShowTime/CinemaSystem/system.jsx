import { Dropdown } from "flowbite-react";
import CinemaComplex from "../CinemaComplex";

export default function System({ system }) {
  return (
    <Dropdown.Item onClick={false}>
      <Dropdown
        label={
          <div className="flex items-center gap-2">
            <img
              src={system.logo}
              alt={system.tenHeThongRap}
              className="w-6 h-6 rounded-full"
            />
            <span>{system.tenHeThongRap}</span>
          </div>
        }
        placement="right-start"
      >
        <Dropdown.Item onClick={false}>
          <CinemaComplex />
        </Dropdown.Item>
      </Dropdown>
    </Dropdown.Item>
  );
}
