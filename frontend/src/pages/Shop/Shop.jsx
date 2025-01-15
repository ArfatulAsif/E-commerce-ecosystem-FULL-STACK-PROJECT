import { CiBoxList } from "react-icons/ci";
import { ImFire } from "react-icons/im";
import { MdOutlineMonitor } from "react-icons/md";
import { IoGameControllerOutline } from "react-icons/io5";
import PrimaryButton from "../../components/shared/PrimaryButton/PrimaryButton";

const Shop = () => {
  return (
    <div className="px-8 my-6">
      {/* Search bar */}
      <form className="flex gap-6 items-center">
        <label className="input input-bordered flex items-center gap-2 grow">
          <input
            type="text"
            className="grow outline-none ring-0 focus:outline-none focus:ring-0 focus:border-gray-900"
            placeholder="Search"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        <div>
          <PrimaryButton title={"Search"} />
        </div>
      </form>

      {/* Main section */}
      <div className="grid grid-cols-4 gap-6 my-6 text-[#4B5966]">
        {/* Sidebar */}
        <div className="bg-[#F8F8FB] rounded-md px-6 py-4 border border-1">
          <h1 className="text-lg font-semibold">Category</h1>
          <hr className="my-3" />
          <div className="flex flex-col gap-4">
            <h2 className="flex items-center gap-3 cursor-pointer hover:text-orange-500 transition-all duration-150">
              <CiBoxList /> <span>All</span>
            </h2>
            <h2 className="flex items-center gap-3 cursor-pointer hover:text-orange-500 transition-all duration-150">
              <IoGameControllerOutline /> <span>Beginner</span>
            </h2>
            <h2 className="flex items-center gap-3 cursor-pointer hover:text-orange-500 transition-all duration-150">
              <MdOutlineMonitor /> <span>Intermediary</span>
            </h2>
            <h2 className="flex items-center gap-3 cursor-pointer hover:text-orange-500 transition-all duration-150">
              <ImFire /> <span>Expert</span>
            </h2>
          </div>
        </div>
        <div className="col-span-3">
          <h1>Product section</h1>
        </div>
      </div>
    </div>
  );
};

export default Shop;
