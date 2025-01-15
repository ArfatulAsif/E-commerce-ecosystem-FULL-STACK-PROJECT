import { Outlet } from "react-router-dom";
import Navbar from "../../components/shared/Navbar/Navbar";
import Footer from "../../components/shared/Footer/Footer";

const MainLayout = () => {
  return (
    <>
      <div className="max-w-[1800px] mx-auto">
        <Navbar />

        <Outlet />
      </div>

      <div className="mt-12">
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
