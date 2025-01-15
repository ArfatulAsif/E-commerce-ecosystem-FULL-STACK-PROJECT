import { CiBoxList } from "react-icons/ci";
import { ImFire } from "react-icons/im";
import { MdOutlineMonitor } from "react-icons/md";
import { IoGameControllerOutline } from "react-icons/io5";
import PrimaryButton from "../../components/shared/PrimaryButton/PrimaryButton";
import { useEffect, useState } from "react";
import axiosInstance, { serverUrl } from "../../utils/axiosInstance";
import { Link } from "react-router-dom";

const Shop = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleProducts, setVisibleProducts] = useState([]);

  useEffect(() => {
    axiosInstance.get("/product/allproducts").then((res) => {
      console.log(res.data);
      setAllProducts(res.data);
      setVisibleProducts(res.data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (selectedCategory === "All") {
      setVisibleProducts(allProducts);
    } else {
      const filteredProducts = allProducts.filter(
        (p) => p.category === selectedCategory
      );
      setVisibleProducts(filteredProducts);
    }
  }, [allProducts, selectedCategory]);

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
        <div>
          <div className="bg-[#F8F8FB] rounded-md px-6 py-5 border border-1">
            <h1 className="text-lg font-semibold">Category</h1>
            <hr className="my-3" />
            <div className="flex flex-col gap-4">
              <h2
                onClick={() => setSelectedCategory("All")}
                className={`${
                  selectedCategory === "All" ? "text-orange-500" : ""
                } flex items-center gap-3 cursor-pointer hover:text-orange-500 transition-all duration-150`}
              >
                <CiBoxList /> <span>All</span>
              </h2>
              <h2
                onClick={() => setSelectedCategory("Beginner")}
                className={`${
                  selectedCategory === "Beginner" ? "text-orange-500" : ""
                } flex items-center gap-3 cursor-pointer hover:text-orange-500 transition-all duration-150`}
              >
                <IoGameControllerOutline /> <span>Beginner</span>
              </h2>
              <h2
                onClick={() => setSelectedCategory("Intermediary")}
                className={`${
                  selectedCategory === "Intermediary" ? "text-orange-500" : ""
                } flex items-center gap-3 cursor-pointer hover:text-orange-500 transition-all duration-150`}
              >
                <MdOutlineMonitor /> <span>Intermediary</span>
              </h2>
              <h2
                onClick={() => setSelectedCategory("Expert")}
                className={`${
                  selectedCategory === "Expert" ? "text-orange-500" : ""
                } flex items-center gap-3 cursor-pointer hover:text-orange-500 transition-all duration-150`}
              >
                <ImFire /> <span>Expert</span>
              </h2>
            </div>
          </div>
        </div>

        {/* Products section */}
        <div className="col-span-3">
          {isLoading && <h1>Loading...</h1>}

          <div className="flex flex-col gap-5">
            {!isLoading &&
              visibleProducts &&
              visibleProducts.length > 0 &&
              visibleProducts.map((product) => (
                <Link
                  to={product._id}
                  key={product._id}
                  className="border border-1 rounded-md p-4 flex gap-6 hover:shadow-md transition-all duration-300"
                >
                  <div className="">
                    <img
                      src={serverUrl + "/images/" + product?.images[0]}
                      className="w-[150px] h-auto object-cover"
                    />
                  </div>
                  <div className="flex gap-4 justify-between grow">
                    <div className="flex flex-col gap-3">
                      <h1 className="text-lg">{product.productName}</h1>
                      <div className="flex flex-col gap-1">
                        <h2 className="text-sm text-gray-500">
                          ID: {product._id}
                        </h2>
                        {product.totalSold < product.stock ? (
                          <h2 className="text-green-500 text-sm">
                            Product in stock{" "}
                            <span className="text-red-400">
                              ({product.stock - product.totalSold} copies left)
                            </span>
                          </h2>
                        ) : (
                          <h2>Product is out of stock</h2>
                        )}
                        <p className="text-sm">{product.description}</p>
                      </div>
                    </div>
                    <div>
                      <h1 className="text-md text-orange-500 font-semibold">
                        ${product.price}
                      </h1>
                    </div>
                  </div>
                </Link>
              ))}
          </div>

          {!isLoading && visibleProducts && visibleProducts.length === 0 && (
            <h1>No product found</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
