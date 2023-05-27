import React from 'react'
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import HomeApp from '../pages/app/HomeApp';
import NotFound from '../pages/app/NotFound';
import VerifyApp from '../pages/app/VerifyApp';
import Register from '../pages/auth/Register';
import SignIn from '../pages/auth/SignIn';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const AllRoutes = () => {

// const router = createBrowserRouter(
//     createRoutesFromElements(
//         <Route path="/" element={<SignIn />}>
//             <Route path="/register" element={<Register />} />
//         {/* ... etc. */}
//         </Route>
//     )
//     );
const router = createBrowserRouter([
    {
        path: "/",
        element: <PublicRoute><SignIn /></PublicRoute>,
    },
    {
        path: "/register",
        element: <PublicRoute><Register /></PublicRoute>,
    },
    {
        path: "/app",
        element: <PrivateRoute><HomeApp /></PrivateRoute>,
    },
    {
      path: "/app/verify",
      element: <VerifyApp />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
]);
  return (
    <div>
        <RouterProvider router={router} />
    </div>
  )
}

export default AllRoutes