import { Outlet } from "react-router-dom";
import Header from "./_component/Header";
import Footer from "./_component/Footer";

export default function HomeTemplate() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
