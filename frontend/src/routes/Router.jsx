import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Home from "../pages/Home/Home";

const router = createBrowserRouter([
{
        path: "/",
        element: <MainLayout />,
        children: [
                {
                        index: true,
                        element: <Home />
                },
                {
                        path : "test2",
                        element: <div>this is test 2 </div>
                }
        ]
},
{
        path: "/dashboard",
        element: <div>This is dashboard</div>
},

]);

export default router;