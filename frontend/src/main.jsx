import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  RouterProvider,
} from "react-router-dom";




const router = createBrowserRouter([
  {
    path: "/",
    element:<p> Hello world </p>
  },
  {
    path: "/dashboard",
    element: <div>This is dashboard</div>
  }
  {
    path : "/test",
    element: <div>HI </div>
  }
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
