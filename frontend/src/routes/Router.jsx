import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Home from "../pages/Home/Home";


const router = createBrowserRouter([
{
        path: "/",
        element : <MainLayout />,
        children: [
                {
                        index: true,
                        element : <Home/>
                },
                {
                        path : "test2",
                        element : <h1>this is the test page</h1>
                }
        ]
}

]);

export default router;