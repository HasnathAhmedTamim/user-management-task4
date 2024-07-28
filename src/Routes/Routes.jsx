
import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main/Main";
import Home from "../Pages/Home/Home";
import SignUp from "../Pages/Signup/SignUp";
import Login from "../Pages/Login/Login";
import PrivateRoutes from "./PrivateRoutes";
import UserManagement from "../Pages/UserManagement/UserManagement";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "usermanagement",
        element: (
          <PrivateRoutes>
            <UserManagement />
          </PrivateRoutes>
        ),
      },
    ],
  },
]);
