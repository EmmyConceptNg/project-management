import { Navigate, useRoutes } from "react-router-dom"
import Signup from "../pages/auth/Signup"
import Login from "../pages/auth/Login";
import ConfirmEmail from "../pages/auth/EmailConfirm";
import WorkSpaceSetup from "../pages/WorkSpaceSetup";
import ProfileSetup from "../pages/ProfileSetup";
import ForgotPass1 from "../pages/auth/ForgotPass1";
import ForgotPass2 from "../pages/auth/ForgotPass2";

export const Router = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Signup />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/confirm-email",
      element: <ConfirmEmail />,
    },
    {
      path: "/workspace",
      element: <WorkSpaceSetup />,
    },
    {
      path: "/profile",
      element: <ProfileSetup />,
    },
    {
      path: "/password/email",
      element: <ForgotPass1 />,
    },
    {
      path: "/change-password",
      element: <ForgotPass2 />,
    },
  ]);
return routes;
}