import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Home from "../pages/Home/Home";
import Bank from "../pages/Bank/bank";
import BankLayout from "../layouts/BankLayout/BankLayout";
import Transaction from "../pages/transaction/transaction";



const router = createBrowserRouter([
{
        path: "/",
        element : <MainLayout />,
        children: [
                {
                        index: true,
                        element : <Home/>
                },
                
        ]
},

{
        path: "/bank/",
        element: <BankLayout/>,
        children : [
                {
                        index: true,
                        element: <Bank />
                },
                {
                        path: "transaction",
                        element: <Transaction/>
                }
                
                
        ]
}

]);

export default router;