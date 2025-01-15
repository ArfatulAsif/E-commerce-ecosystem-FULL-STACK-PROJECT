import { CiBoxList } from "react-icons/ci";
import { ImFire } from "react-icons/im";
import { MdOutlineMonitor } from "react-icons/md";
import { IoGameControllerOutline } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";
import PrimaryButton from "../../components/shared/PrimaryButton/PrimaryButton";
import { useEffect, useState } from "react";
import axiosInstance, { serverUrl } from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [visibleOrders, setVisibleOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/auth/login");
      return;
    }

    axiosInstance.get("/get/getCart", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      setVisibleOrders(res.data);
      setIsLoading(false);
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  const navigate = useNavigate();

  const handlePayment = () => {
   

    const modal = document.getElementById("paymentModal");
    if (modal) modal.showModal();
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const bankAccountNumber = formData.get("bankAccountNumber");
    const password = formData.get("password");

    console.log(bankAccountNumber);

    

    axiosInstance.post("/buy/buyproduct", {
      bankAccountNumber,
      password
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    }).then(response => {
      console.log("Payment Successful:", response.data);
      document.getElementById("paymentModal").close();
      navigate("/shop");
    }).catch(error => {
      
      console.error("Payment Error:", error);
      
    });
  };

  const calculateTotalAmount = () => {
    return visibleOrders.reduce((acc, order) => acc + order.paymentAmount, 0);
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3">
          {isLoading && (
            <div className="h-[200px] flex justify-center items-center">
              <span className="loading loading-spinner text-orange-500"></span>
            </div>
          )}

          <div className="flex flex-col gap-5">
            {!isLoading &&
              visibleOrders &&
              visibleOrders.length > 0 &&
              visibleOrders.map((order) => (
                <div
                  key={order._id}
                  className="cursor-pointer border border-1 rounded-md p-4 flex gap-6 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex gap-4 justify-between grow">
                    <div
                      onClick={() => navigate(order.productId)}
                      className="flex flex-col gap-3"
                    >
                      <h1 className="text-lg">{order.productId.productName}</h1>
                      <div className="flex flex-col gap-1">
                        <h2 className="text-sm text-gray-500">
                          ID: {order.productId}
                        </h2>
                        {order.productId.stock > 0 ? (
                          <h2 className="text-green-500 text-sm">
                            Product is carted, Pay to Get it delivered{" "}
                            <span className="text-red-400">
                              ({order.productId.stock} copies left)
                            </span>
                          </h2>
                        ) : (
                          <h2> {order.deliveryAddress} </h2>
                        )}
                        <p className="text-sm">{order.productId.description}</p>
                      </div>
                    </div>
                    <div>
                      <h1 className="text-md text-orange-500 font-semibold">
                        ${order.paymentAmount}
                      </h1>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {!isLoading && visibleOrders && visibleOrders.length === 0 && (
            <div className="h-[200px] flex justify-center items-center border border-1 rounded-md">
              <h1>No product found</h1>
            </div>
          )}

          <div className="mt-6 flex justify-between items-center">
            <h2 className="text-lg font-semibold">
              Total: ${calculateTotalAmount()}
            </h2>
            <span onClick={handlePayment} >
            <PrimaryButton title="Proceed to Payment" icon={<MdOutlinePayment />} />
            </span>
          
          </div>
        </div>
      </div>

      <dialog id="paymentModal" className="modal">
        <div className="modal-box">
          <form onSubmit={handlePaymentSubmit}>
            <button
              type="button"
              onClick={() => document.getElementById("paymentModal").close()}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
            <h3 className="font-bold text-lg mb-4">Make a Payment</h3>

            <div className="mb-4">
              <label
                htmlFor="bankAccountNumber"
                className="block text-sm font-medium"
              >
                Bank Account Number
              </label>
              <input
                type="text"
                id="bankAccountNumber"
                name="bankAccountNumber"
                className="input input-bordered w-full mt-1"
                placeholder="Enter your bank account number"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="input input-bordered w-full mt-1"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="modal-action">
              <PrimaryButton title="Submit" />
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default Cart;
