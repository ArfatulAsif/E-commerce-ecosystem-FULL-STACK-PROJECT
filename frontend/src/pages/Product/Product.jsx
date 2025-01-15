import { FaCartPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance, { serverUrl } from "../../utils/axiosInstance";
import PrimaryButton from "../../components/shared/PrimaryButton/PrimaryButton";
import toast from "react-hot-toast";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleAddToCart = () => {
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("userType");

    if (!token) {
      navigate("/auth/login");
      return;
    }
    if (userType !== "customer") {
      toast.error("Only users can add product to cart!");
      return;
    }

    const productId = id;

    axiosInstance.post(
      "/product/AddToCart",
      { productId },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then((res) => {
      toast.success("Product added to cart successfully!");  // Display success message
      navigate("/shop");
    })
    .catch((error) => {
      console.error(error);
      toast.error("Failed to add product to cart!");
    });
  };

  useEffect(() => {
    axiosInstance
      .post("/product/productbyid", { productId: id })
      .then((res) => {
        setProduct(res.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  return (
    <div className="px-8 py-4">
      {!isLoading && product && (
        <div className="grid grid-cols-3 gap-6">
          <div>
            <Carousel
              showArrows={true} // Enable previous and next arrow
              autoPlay={true} // Enables auto-sliding
              infiniteLoop={true} // Allows infinite loop sliding
              interval={3000} // Adjusts the delay between slides (in milliseconds)
              stopOnHover={true} // Pauses the slide on hover
              showStatus={false} // Current page number
            >
              {product?.images &&
                product?.images.length > 0 &&
                product?.images.map((image, idx) => {
                  return (
                    <div className="rounded-lg" key={idx}>
                      <img
                        className="rounded-lg"
                        src={serverUrl + "/images/" + image}
                      />
                    </div>
                  );
                })}
            </Carousel>
          </div>
          <div className="col-span-2">
            <h1 className="text-lg">{product.productName}</h1>
            <div className="flex flex-col gap-1">
              <h2 className="text-sm text-gray-500">ID: {product._id}</h2>
              {product.stock > 0 ? (
                <div>
                  <h2 className="text-green-500 text-sm">
                    Product in stock{" "}
                    <span className="text-red-400">
                      ({product.stock} copies left)
                    </span>
                  </h2>
                  <div className="my-3">
                    <span onClick={handleAddToCart}>
                      <PrimaryButton
                        title="Add To Cart"
                        icon={<FaCartPlus />}
                      />
                    </span>
                  </div>
                </div>
              ) : (
                <h2>Product is out of stock</h2>
              )}
              <p className="text-sm">{product.description}</p>
            </div>
          </div>
        </div>
      )}
      {isLoading && (
        <div className="h-[200px] flex justify-center items-center">
          <span className="loading loading-spinner text-orange-500"></span>
        </div>
      )}
    </div>
  );
};

export default Product;
