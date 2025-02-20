import { Dropdown } from "flowbite-react";
import MovieTime from "../MovieTime";

export default function Complex({ complex }) {
  return (
    <Dropdown label={complex.tenCumRap} placement="right-start">
      <Dropdown.Item onClick={false}>
        <MovieTime />
      </Dropdown.Item>
    </Dropdown>
  );
}
