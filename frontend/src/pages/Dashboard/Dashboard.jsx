import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { Card, IconButton, Typography } from "@material-tailwind/react";
import { DocumentIcon } from "@heroicons/react/24/solid";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const TABLE_HEAD = [
  "Order ID",
  "Customer",
  "Amount",
  "Delivery Address",
  "Status",
  "Created At",
  "Actions",
];

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      const userType = localStorage.getItem("userType");

      if (!token) {
        console.error("No token found in local storage.");
        return;
      }

      try {
        console.log(userType);
        let response;
        if (userType === "customer") {
          response = await axiosInstance.get("/get/getAllOrdersCustomer", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } else if (userType === "admin") {
          response = await axiosInstance.get("/get/getAllOrders", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        } else if (userType === "supplier") {
          console.log("Supplier-specific dashboard is under construction.");
          navigate("/supplierDashboard");
          return;
        }

        if (response && response.data && response.data.orders) {
          setOrders(response.data.orders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th key={head} className="p-4 pt-10">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold leading-none"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order._id}>
              <td className="p-4">
                <Typography variant="small" color="blue-gray" className="font-bold">
                  {order._id}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" className="font-normal text-gray-600">
                  {order.customerId}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" className="font-normal text-gray-600">
                  ${order.paymentAmount}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" className="font-normal text-gray-600">
                  {order.deliveryAddress}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" className="font-normal text-gray-600">
                  {order.status}
                </Typography>
              </td>
              <td className="p-4">
                <Typography variant="small" className="font-normal text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString()}
                </Typography>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <IconButton variant="text" size="sm">
                    <DocumentIcon className="h-4 w-4 text-gray-900" />
                  </IconButton>
                  <IconButton variant="text" size="sm">
                    <ArrowDownTrayIcon strokeWidth={3} className="h-4 w-4 text-gray-900" />
                  </IconButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default Dashboard;
