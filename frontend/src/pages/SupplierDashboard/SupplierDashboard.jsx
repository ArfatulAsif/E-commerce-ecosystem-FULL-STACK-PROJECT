import React, { useState, useEffect } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/shared/PrimaryButton/PrimaryButton";
import { CiDeliveryTruck } from "react-icons/ci";


const SupplierDashboard = () => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token"); // Adjust based on how you store the token
  const userType = localStorage.getItem("userType");

  if(userType != "supplier")
  {
        navigate("/");
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const pendingResponse = await axiosInstance.get("/get/getAllPendingOrdersSupplier", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPendingOrders(pendingResponse.data.pendingOrders || []);
      } catch (error) {
        console.error("Error fetching pending orders:", error);
      }

      try {
        const deliveredResponse = await axiosInstance.get("/get/getAllDeliveredOrdersSupplier", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDeliveredOrders(deliveredResponse.data.deliveredOrders || []);
      } catch (error) {
        console.error("Error fetching delivered orders:", error);
      }
    };

    fetchOrders();
  }, [token]);

  const handleDeliver = async (orderId) => {
    try {
      await axiosInstance.post(
        "/supply/supplyproduct",
        { orderId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const pendingResponse = await axiosInstance.get("/get/getAllPendingOrdersSupplier", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingOrders(pendingResponse.data.pendingOrders || []);
    } catch (error) {
      console.error("Error marking order as delivered:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Supplier Dashboard</h1>
      
      <h2 className="text-xl font-semibold mb-3">Pending Orders</h2>
      <Card className="h-full w-full overflow-scroll mb-6">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className="p-4 border-b border-blue-gray-100">Order ID</th>
              <th className="p-4 border-b border-blue-gray-100">Address</th>
              <th className="p-4 border-b border-blue-gray-100">Items</th>
              <th className="p-4 border-b border-blue-gray-100">Amount</th>
              <th className="p-4 border-b border-blue-gray-100">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingOrders.map((order) => (
              <tr key={order._id}>
                <td className="p-4 border-b">{order._id}</td>
                <td className="p-4 border-b">{order.deliveryAddress}</td>
                <td className="p-4 border-b">{order.numberOfItems}</td>
                <td className="p-4 border-b">{order.paymentAmount}</td>
                <td className="p-4 border-b">
                  <Button
                    size="sm"
                    onClick={() => handleDeliver(order._id)}
                  >
                    Deliver
                  </Button>

                  <span size = "sm" onClick={() => handleDeliver(order._id)} >
                   <PrimaryButton title="Deliver" icon={<CiDeliveryTruck />} />
                 </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <h2 className="text-xl font-semibold mb-3">Delivered Orders</h2>
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Address</th>
              <th className="p-4">Items</th>
              <th className="p-4">Amount</th>
            </tr>
          </thead>
          <tbody>
            {deliveredOrders.map((order) => (
              <tr key={order._id}>
                <td className="p-4">{order._id}</td>
                <td className="p-4">{order.deliveryAddress}</td>
                <td className="p-4">{order.numberOfItems}</td>
                <td className="p-4">{order.paymentAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default SupplierDashboard;
