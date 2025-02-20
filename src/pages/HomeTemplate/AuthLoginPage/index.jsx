import { Tabs } from "flowbite-react";
import { HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import Login from "./Login";
import Register from "./Register";
export default function Component() {
  return (
    <div className="bg-[url(public/images/image.png)]">
      <Tabs aria-label="Default tabs" variant="default" className="mx-auto">
        <Tabs.Item active title="Login" icon={HiUserCircle}>
          <Login />
        </Tabs.Item>
        <Tabs.Item title="Register" icon={MdDashboard}>
          <Register />
        </Tabs.Item>
      </Tabs>
    </div>
  );
}
