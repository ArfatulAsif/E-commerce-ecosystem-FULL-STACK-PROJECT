import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div>
      <Toaster />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
