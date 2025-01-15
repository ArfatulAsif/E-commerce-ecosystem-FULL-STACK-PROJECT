import { TbLayoutDashboard } from "react-icons/tb";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import PrimaryButton from "../PrimaryButton/PrimaryButton";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  return (
    <div className="">
      <div className="flex justify-between mx-auto py-4 px-8">
        <Link className="flex items-center gap-3" to="/">
          <Logo />
          <h1 className="text-xl font-semibold tracking-wide">
            LEVEL{" "}
            <span className="text-orange-600 font-bold tracking-wide">UP</span>
          </h1>
        </Link>

        <ul className="flex gap-[30px] items-center">
          <Link to="/shop">
            <li className="cursor-pointer hover:text-orange-600 transition-all duration-150 font-semibold tracking-wide px-3 py-2 rounded-md">
              Shop
            </li>
          </Link>
          <li className="cursor-pointer hover:text-orange-600 transition-all duration-150 font-semibold tracking-wide px-3 py-2 rounded-md">
            Cart
          </li>
          <li className="cursor-pointer hover:text-orange-600 transition-all duration-150 font-semibold tracking-wide px-3 py-2 rounded-md">
            Dashboard
          </li>
          <li className="cursor-pointer hover:text-orange-600 transition-all duration-150 font-semibold tracking-wide px-3 py-2 rounded-md">
            Contact
          </li>
        </ul>
        <div>
          {!token && (
            <Link to="/auth/login">
              <PrimaryButton title={"Login"} />
            </Link>
          )}

          {token && (
            <Link to="/dashboard">
              <PrimaryButton title={"Dashboard"} icon={<TbLayoutDashboard />} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
