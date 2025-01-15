import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Home from "../pages/Home/Home";
import Bank from "../pages/Bank/bank";
import BankLayout from "../layouts/BankLayout/BankLayout";
import Transaction from "../pages/transaction/transaction";
import Shop from "../pages/Shop/Shop";
import AuthLayout from "../layouts/AuthLayout/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import Product from "../pages/Product/Product";
import Payment from "../pages/payment/Payment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/shop/:id",
        element: <Product />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/bank/",
    element: <BankLayout />,
    children: [
      {
        index: true,
        element: <Bank />,
      },
      {
        path: "transaction",
        element: <Transaction />,
      },
    ],
  },
]);

export default router;
