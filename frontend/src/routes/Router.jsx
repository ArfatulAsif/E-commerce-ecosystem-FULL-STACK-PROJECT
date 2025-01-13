import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
{
        path: "/",
        element:<p> Hello world </p>
},
{
        path: "/dashboard",
        element: <div>This is dashboard</div>
},
{
        path : "/test",
        element: <div>HI </div>
}
]);

export default router;